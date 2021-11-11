import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Pressable, Platform, TextInput, Switch, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './styles/styles';
import { deleteProduct } from './DeleteProduct';
import { Picker } from '@react-native-picker/picker'; //Dropdown https://reactnative.dev/docs/picker is deprecated, using documentation based picker

interface INWProductsResponse {
    //Typescript -interface
    productId: number;
    productName: string;
    supplierId: number;
    categoryId: number;
    quantityPerUnit: string;
    unitPrice: number;
    unitsInStock: number;
    unitsOnOrder: number;
    reorderLevel: number;
    discontinued: boolean;
    imageLink: string;
    category: string;
    supplier: string;
}
interface INWCategories {
    //Typescript -interface
    categoryId: number;
    categoryName: string;
    description: string;
    picture: string;
}
interface INWSuppliers {
    //Typescript -interface
    supplierId: number;
    companyName: string;
}

const EditProduct = (props: { passProductId: number, closeModal: any, refreshAfterEdit: any, passCategories: any }) => {
    const [ProductId, setProductId] = useState(props.passProductId);
    const [ProductName, setProductName] = useState('');
    const [SupplierId, setSupplierId] = useState(0);
    const [CategoryId, setCategoryId] = useState(0);
    const [QuantityPerUnit, setQuantityPerUnit] = useState('');
    const [UnitPrice, setUnitPrice] = useState('');
    const [UnitsInStock, setUnitsInStock] = useState('');
    const [UnitsOnOrder, setUnitsOnOrder] = useState('');
    const [ReorderLevel, setReorderLevel] = useState('');
    const [Discontinued, setDiscontinued] = useState(false);
    const [ImageLink, setImageLink] = useState('');
    const [categories, setCategories] = useState(props.passCategories);
    const [suppliers, setSuppliers] = useState<any>([]);

    const categoriesList = categories.map((cat: INWCategories, index: any) => {
        return (
            <Picker.Item label={cat.categoryName} value={cat.categoryId} key={index} />
        )
    });

    const suppliersList = suppliers.map((cat: INWSuppliers) => {
        return (
            <Picker.Item label={cat.companyName} value={cat.supplierId} key={cat.supplierId} />
        )
    });

    useEffect(() => {
        GetProductInfo();
        GetSuppliers();
        //console.log('Editing product: ' + ProductId);
    }, [props.passProductId]); //whenever productid changes we run useEffect


    //**************************************************************************************
    //Get product info from the API with productid
    //**************************************************************************************
    function GetProductInfo() {
        let uri = 'https://yourapi.azurewebsites.net/nw/products/' + ProductId;
        fetch(uri)
            .then(response => response.json())
            .then((json: INWProductsResponse) => {
                setProductName(json.productName == null ? "invalid productname" : json.productName);
                setSupplierId((json.supplierId == null ? 1 : json.supplierId));
                setCategoryId((json.categoryId == null ? 1 : json.categoryId));
                setQuantityPerUnit(json.quantityPerUnit == null ? "1" : json.quantityPerUnit);
                setUnitPrice((json.unitPrice.toFixed(2) == null ? "0" : json.unitPrice.toFixed(2)));
                setUnitsInStock((json.unitsInStock == null ? '0' : json.unitsInStock).toString());
                setUnitsOnOrder((json.unitsOnOrder == null ? '0' : json.unitsOnOrder).toString());
                setReorderLevel((json.reorderLevel == null ? '0' : json.reorderLevel).toString());
                setDiscontinued((json.discontinued == null ? false : json.discontinued));
                setImageLink(json.imageLink) == null ? '' : json.imageLink;
            })
    }

    //**************************************************************************************
    //Shippers -dropwdown list fill from API
    //**************************************************************************************
    function GetSuppliers() {
        let uri = 'https://yourapi.azurewebsites.net/nw/suppliers/getsupp';
        fetch(uri)
            .then(response => response.json())
            .then((json: INWSuppliers) => {
                setSuppliers(json);
            })
    }

    //**************************************************************************************
    //Edit product button press
    //**************************************************************************************

    async function editProductOnPress(ProductName: string) {
        await PutToDB();
        alert('Product ' + ProductName + ' has been updated!');
        closeModalAndRefresh();
    }

    //*************************************************************
    //Send edited product to API
    //*************************************************************
    function PutToDB() {
        const product =
        {
            ProductName: ProductName,
            SupplierID: Number(SupplierId),
            CategoryID: Number(CategoryId),
            QuantityPerUnit: QuantityPerUnit,
            UnitPrice: parseFloat(Number(UnitPrice).toFixed(2)),
            UnitsInStock: Number(UnitsInStock),
            UnitsOnOrder: Number(UnitsOnOrder),
            ReorderLevel: Number(ReorderLevel),
            Discontinued: Boolean(Discontinued),
            ImageLink: ImageLink,
        };

        //Convert variable to .json
        const prodeditJson = JSON.stringify(product);
        //console.log(prodeditJson); //dev

        const apiUrl = "https://yourapi.azurewebsites.net/nw/products/" + ProductId;
        fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: prodeditJson //data to API
        })
            .then((response) => response.json())
            .then((json) => {
                const success = json;
                if (success) {
                    //console.log(success); //dev
                }
                else {
                    //console.log('Error updating' + ProductName) //dev
                }
            });
    }

    //*****************************************************
    //Close -button
    //*****************************************************
    function closeModal() {
        props.closeModal(true);
    }

    //*****************************************************
    //Close window and refresh list Inventory.tsx
    //*****************************************************
    function closeModalAndRefresh() {
        props.closeModal();
        props.refreshAfterEdit();
    }

    function deleteTheProduct() {
        if (Platform.OS === 'web') {
            if (confirm('Are you sure you want to delete product: ' + ProductName + ' ?')) {
                deleteProduct(ProductId);
                closeModalAndRefresh();
            }
            else {
                alert('You have canceled removal of the product: ' + ProductName);
            }

        }
        else {
            const title = 'Product delete';
            const message = '';
            const buttons = [
                {
                    text: 'Yes', onPress: () => { deleteProduct(ProductId), closeModalAndRefresh() }
                },
                {
                    text: 'No', onPress: () => alert('You have canceled removal of the product: ' + ProductName)
                }
            ];
            Alert.alert(title, message, buttons);
        }
    }

    //***************************************
    // Price validation helper
    //***************************************
    function validatePrice(val: any) {
        if (val === null) {
            return true;
        }
        else {
            var rgx = /^[0-9]*\.?[0-9]*$/;
            if (String(val).match(rgx) == null) {
                return false;
            }
            else {
                return true;
            }
        }
    }

    //***************************************
    // String validation (MAX 70 char)
    //***************************************
    function validateString(val: any) {
        if (val === "") {
            return true;
        }
        else {
                var rgx = /^.{1,70}$/;
            if (val.match(rgx) == null) {
                    return false;
                }
                else {
                    return true;
                }
        }
    }

    //**********************************************************************************************
    // URL validation. Can be empty, if there is some more input it has to be link
    //*********************************************************************************************
    function validateUrl(val: any) {
        if (val === null) {
            return true;
        }
        else {
            var rgx = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=_%.]+(?:png|jpg|jpeg|gif|svg)+$/;
            if (val.match(rgx)) {
                return true;
            }
            if (val == '') {
                return true;
            }
            else {
                return false;
            }
        }
    }

    //***************************************************************************************
    // Number -validation first number cannot be 0
    //***************************************************************************************
    function validateNumeric(val: any) {
        if (val === null) {
            return true;
        }
        else {
            var rgx = /^[1-9][0-9]*$/;
            if (String(val).match(rgx)) {
                return true;
            }
            if (val == '0') {
                return true;
            }
            else {
                return false;
            }
        }
    }


    function onEditSubmit() {
        if (!validateString(ProductName)) {
            alert("Check product name!");
        } else {
            //valid
            if (!validatePrice(UnitPrice)) {
                alert("Check product price!");
            } else {
                //valid
                if (!validateNumeric(UnitsInStock)) {
                    alert("Check units in stock");
                } else {
                    //valid
                    if (!validateNumeric(ReorderLevel)) {
                        alert("Check reorder level");
                    } else {
                        //valid
                        if (!validateNumeric(UnitsOnOrder)) {
                            alert("Check units on order");
                        } else {
                            //valid
                            if (!validateString(QuantityPerUnit)) {
                                alert("Check quantity per unit");
                            } else {
                                //valid
                                if (!validateUrl(ImageLink)) {
                                    alert("Check image link");
                                } else {
                                    //valid
                                    editProductOnPress(ProductName);
                                }
                            }
                        }
                    }
                }  
            }
        }
    }




    //********************************************************************************
    //Rendering page
    //********************************************************************************
    return (
        <View style={styles.inputContainer}>

            <ScrollView>
                <View key={ProductId}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable onPress={() => deleteTheProduct()}>
                            <View style={{ marginLeft: 15, }}><FontAwesome5 name="trash-alt" size={24} color="#FF4500" /></View>
                        </Pressable>
                        <Pressable onPress={() => closeModal()}>
                            <View style={{ marginRight: 15, }}><FontAwesome5 name="window-close" size={24} color="black" /></View>
                        </Pressable>
                    </View>

                    <Text style={styles.inputHeaderTitle}>Edit product:</Text>
                    <Text style={styles.inputTitle}>ID:</Text>
                    <TextInput style={styles.inputTitle}
                        underlineColorAndroid="transparent"
                        defaultValue={ProductId.toString()}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        editable={false}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.inputTitle}>Product name:</Text>
                        {validateString(ProductName) == false ? <Text style={styles.errorText}>{"Input a valid name (max. 70 char)!"}</Text> : null}
                    </View>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setProductName(val)}
                        value={(ProductName.toString() == null ? '0' : ProductName.toString())}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"

                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.inputTitle}>Unit price:</Text>
                        {validatePrice(UnitPrice.toString()) == false ? <Text style={styles.errorText}>{"Input a valid price!"}</Text> : null}
                    </View>
                    <TextInput style={[styles.editInput, validatePrice(UnitPrice) == false ? { borderColor: "red", borderWidth: 2 } : { borderColor: '#7a42f4', borderWidth: 1 }]}
                        underlineColorAndroid="transparent"
                        onChangeText={val => { setUnitPrice(val), validatePrice(val) }}
                        value={(UnitPrice == null ? '0' : UnitPrice)}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'


                    />


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.inputTitle}>Unit in stock:</Text>
                        {validateNumeric(UnitsInStock) == false ? <Text style={styles.errorText}>{"Numbers only!"}</Text> : null}
                    </View>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setUnitsInStock(val)}
                        value={(UnitsInStock.toString() == null ? '0' : UnitsInStock.toString())}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'

                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.inputTitle}>Reorder level:</Text>
                        {validateNumeric(ReorderLevel) == false ? <Text style={styles.errorText}>{"Numbers only!"}</Text> : null}
                    </View>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setReorderLevel(val)}
                        value={(ReorderLevel.toString() === null ? '0' : ReorderLevel.toString())}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"

                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.inputTitle}>Units on order:</Text>
                        {validateNumeric(UnitsOnOrder) == false ? <Text style={styles.errorText}>{"Numbers only!"}</Text> : null}
                    </View>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setUnitsOnOrder(val)}
                        value={(UnitsOnOrder.toString() == null ? '0' : UnitsOnOrder.toString())}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"

                    />

                    <Text style={styles.inputTitle}>Category:</Text>
                    <Picker
                        selectedValue={CategoryId}
                        onValueChange={(value) => { setCategoryId(Number(value)) }}
                        style={styles.dropDownList}
                    >
                        {categoriesList}
                    </Picker>
                    {/*<TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setCategoryId(val)}
                        value={CategoryId.toString()}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"

                    />*/}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.inputTitle}>Quantity per unit:</Text>
                        {validateString(QuantityPerUnit) == false ? <Text style={styles.errorText}>{"Input a valid name (max. 70 char)!"}</Text> : null}
                    </View>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setQuantityPerUnit(val)}
                        value={(QuantityPerUnit.toString() == null ? '0' : QuantityPerUnit.toString())}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"

                    />

                    <Picker
                        selectedValue={SupplierId}
                        onValueChange={(value) => { setSupplierId(Number(value)) }}
                        style={styles.dropDownList}
                    >
                        {suppliersList}
                    </Picker>
                    {/*
                    <Text style={styles.inputTitle}>Tavarantoimittaja:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setSupplierId(val)}
                        value={SupplierId.toString()}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"

                    />*/}

                    <Text style={styles.inputTitle}>Discontinued:</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 15, }}>
                        <Text style={{ marginRight: 4, }}>No</Text>
                        <Switch
                            value={Discontinued}
                            onValueChange={val => setDiscontinued(val)}
                        />
                        <Text style={{ marginLeft: 4, }}>Yes</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.inputTitle}>Image link:</Text>
                        {validateUrl(ImageLink) == false ? <Text style={styles.errorText}>{"Input a valid link"}</Text> : null}
                    </View>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setImageLink(val)}
                        value={(ImageLink == null ? '' : ImageLink.toString())}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"

                    />

                    <Pressable
                        style={styles.submitButton}
                        onPress={
                            () => onEditSubmit()
                        }
                    >
                        <Text style={styles.submitButtonText}>{' Edit Product '}</Text>
                    </Pressable>

                </View>
            </ScrollView>
        </View>
    );
}

export default EditProduct;