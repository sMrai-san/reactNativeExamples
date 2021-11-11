import React, { useState } from 'react';
import { Text, View, ScrollView, Pressable, Platform, TextInput, Switch } from 'react-native';
import { FontAwesome5} from '@expo/vector-icons';
import styles from './styles/styles';

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

const CreateProduct = (props: { closeModal: any, refreshAfterEdit: any }) => {
    const [ProductName, setProductName] = useState('');
    const [SupplierId, setSupplierId] = useState('');
    const [CategoryId, setCategoryId] = useState('');
    const [QuantityPerUnit, setQuantityPerUnit] = useState('');
    const [UnitPrice, setUnitPrice] = useState('');
    const [UnitsInStock, setUnitsInStock] = useState('');
    const [UnitsOnOrder, setUnitsOnOrder] = useState('');
    const [ReorderLevel, setReorderLevel] = useState('');
    const [Discontinued, setDiscontinued] = useState(false);
    const [ImageLink, setImageLink] = useState('');


    //**************************************************************************************
    //Tuotteen lisäys
    //**************************************************************************************

    async function createProductOnPress() {
        if (Platform.OS === 'web') {
            await CreateProduct();
            alert('Tuote ' + ProductName + ' added successfully');
            closeModalAndRefresh();
        }
        else {
            await CreateProduct();
            alert('Tuote ' + ProductName + ' added successfully!');
            closeModalAndRefresh();
        }
    }

    //*************************************************************
    //Funktio for passing data to db
    //*************************************************************
    function CreateProduct() {
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

        //Converting variable to JSON-string -type
        const prodeditJson = JSON.stringify(product);
        //console.log(prodeditJson); //dev

        const apiUrl = "https://yourapi.azurewebsites.net/nw/products/";
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: prodeditJson //data here
            })
                .then((response) => response.json())
                .then((json) => {
                    const success = json;
                    if (success) {
                        console.log(success);
                    }
                    else {
                        console.log('Error creating' + ProductName)
                    }
                });
    }

    //*****************************************************
    //Sulje create -button
    //*****************************************************
    function closeModal() {
        props.closeModal(true);
    }
    //*****************************************************
    //Suljetaan ikkuna ja päivitetään lista
    //*****************************************************
    function closeModalAndRefresh() {
        props.closeModal();
        props.refreshAfterEdit();
    }

    //********************************************************************************
    //Tulostetaan sivu
    //********************************************************************************
    return (
        <View style={styles.inputContainer}>

            <ScrollView>
                <View>
                    <Pressable onPress={() => closeModal()}>
                        <View style={{ alignSelf: 'flex-end', marginRight: 15, }}><FontAwesome5 name="window-close" size={24} color="black" /></View>
                        </Pressable>

                    <Text style={styles.inputHeaderTitle}>Add product:</Text>

                    <Text style={styles.inputTitle}>Product name:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setProductName(val)}
                        placeholder={'Product name'}
                        autoCapitalize="none"

                    />
                    <Text style={styles.inputTitle}>Unit price:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setUnitPrice(val)}
                        defaultValue={'0'}
                        autoCapitalize="none"
                        keyboardType='numeric'

                    />
                    <Text style={styles.inputTitle}>Units in stock:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setUnitsInStock((val))}
                        defaultValue={'0'}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'

                    />

                    <Text style={styles.inputTitle}>Reorder level:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setReorderLevel(val)}
                        defaultValue={'0'}
                        autoCapitalize="none"

                    />

                    <Text style={styles.inputTitle}>Units on order:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setUnitsOnOrder(val)}
                        defaultValue={'0'}
                        autoCapitalize="none"

                    />

                    <Text style={styles.inputTitle}>Category:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setCategoryId(val)}
                        defaultValue={'0'}
                        autoCapitalize="none"

                    />

                    <Text style={styles.inputTitle}>Quantity per unit:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setQuantityPerUnit(val)}
                        defaultValue={'Quantity Per Unit'}
                        autoCapitalize="none"

                    />

                    <Text style={styles.inputTitle}>Supplier:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setSupplierId(val)}
                        defaultValue={'0'}
                        autoCapitalize="none"

                    />

                    <Text style={styles.inputTitle}>Discontinued:</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 15, }}>
                        <Text style={{ marginRight: 4, }}>No</Text>
                        <Switch
                            value={Discontinued}
                            onValueChange={val => setDiscontinued(val)}
                        />
                        <Text style={{ marginLeft: 4, }}>Yes</Text>
                    </View>

                    <Text style={styles.inputTitle}>Image link:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setImageLink(val)}
                        defaultValue={'Link to image'}
                        autoCapitalize="none"

                    />

                    <Pressable
                        style={styles.submitButton}
                        onPress={
                            () => createProductOnPress()
                        }
                    >
                        <Text style={styles.submitButtonText}>{' Add Product '}</Text>
                    </Pressable>

                    </View>
            </ScrollView>
        </View>
    );
} 

export default CreateProduct;