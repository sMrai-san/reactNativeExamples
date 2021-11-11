import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, Pressable, Modal, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'; //iconit käyttöön!
import styles from './styles/styles';
import EditProduct from './EditProduct';
import ProductDetails from './ProductDetails';
import CreateProduct from './CreateProduct';

import { Picker } from '@react-native-picker/picker'; //Lisätty dropdown https://reactnative.dev/docs/picker on deprecated, joten käytetään ohjeistuksen mukaista pickeriä

//****************************************************
//Original code from:
//https://carlofontanos.com/react-native-cart-system/
//****************************************************

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

export default function Inventory() {
    const [inventoryItems, setInventoryItems] = useState<any>([]);
    const [inventoryItemsCount, setInventoryItemsCount] = useState(0);
    const [productDetailsModal, setProductDetailsModal] = useState(false);
    const [productEditModal, setProductEditModal] = useState(false);
    const [productCreateModal, setProductCreateModal] = useState(false);
    const [ProductId, setProductId] = useState(0);
    const [refreshProducts, setRefreshProducts] = useState(false); {/*Product list variable*/ }
    const [refreshIndicator, setRefreshIndicator] = useState(false); {/*Product list refresh activity indicator variable*/ }
    const [categories, setCategories] = useState<any>([]);
    const [selectedCat, setSelectedCat] = useState<any>("All");


    const categoriesList = categories.map((cat: INWCategories, index: any) => {
        return (
            <Picker.Item label={cat.categoryName} value={cat.categoryId} key={index} />
        )
    });


    useEffect(() => {
        GetCategories();
        GetProducts();
    }, [refreshProducts]);
    {/* Calling useEffect once in start and everytime refreshProducts variable changes https://daveceddia.com/useeffect-hook-examples/#prevent-useeffect-from-running-every-render */ }


    //*******************************************************************
    //API get products
    //*******************************************************************
    function GetProducts() {
        let uri = 'https://yourapi.azurewebsites.net/nw/products/';
        fetch(uri)
            .then(response => response.json())
            .then((json: INWProductsResponse[]) => {
                if (selectedCat === "All") {
                    setInventoryItems(json); //All products will be saved in inventoryItems -array variable.
                }
                else {
                    const filtered = json.filter(x => x.categoryId === parseInt(selectedCat)); //Dropdown list categoryid products get
                    setInventoryItems(filtered); //writing to dropdown variable
                }
                const fetchCount = Object.keys(json).length; //Count all the products
                setInventoryItemsCount(fetchCount); //Write product count to variable
                //console.log(fetchCount); //dev
				/*for (var i = 0; i < json.length; i++) {
					var obj = json[i];

					console.log(obj.productId);
				}//dev*/
                })
        setRefreshIndicator(false);
    }

    function GetCategories() {
        let uri = 'https://yourapi.azurewebsites.net/nw/products/getcat';
        fetch(uri)
            .then(response => response.json())
            .then((json: INWCategories) => {
                setCategories(json);
            })
        setRefreshIndicator(false);
    }

    //**************************************************************************************
    //Show product details
    //**************************************************************************************
    function showDetails(id: number) {
            //console.log(id + name + suppid + catid + quantityp + price + instock + onorder + reorderlvl + disco + imglnk)
        setProductId(id);
        setProductDetailsModal(true);

    }

    //**************************************************************************************
    //Edit product
    //**************************************************************************************
    function editProduct(id: number) {
        //console.log(id + name + suppid + catid + quantityp + price + instock + onorder + reorderlvl + disco + imglnk)
        setProductId(id);

        setProductEditModal(true); //Show edit modal
    }

    //**************************************************************************************
    //Add product
    //**************************************************************************************
    function createProduct() {
        setProductCreateModal(true); //Show add modal
    }

     //******************************************
    //Refresh productlist function
    //******************************************
    function forceRefresh() {
        setRefreshProducts(!refreshProducts);
        setRefreshIndicator(true);
    }

    //******************************************
    //Modal close
    //******************************************
    function closeDetailsModal() {
        setProductDetailsModal(!productDetailsModal);
    }
    function closeEditModal() {
        setProductEditModal(!productEditModal);
    }
    function closeCreateModal() {
        setProductCreateModal(!productCreateModal);
    }

    //******************************************
    //Sorting from dropdown
    //******************************************
    function fetchSorted(value: any) {
        setSelectedCat(value);
        setRefreshProducts(!refreshProducts);
    }



    //********************************************************************************
    //Rendering page
    //********************************************************************************
    return (

        <View style={{ backgroundColor: '#f6f6f6' }}>

            {/* DetailsModal -component */}
            { productDetailsModal ? (
                <Modal
                    style={[styles.modalContainer]}
                    animationType="none"
                    transparent={true}
                    visible={true}
                >
                    <ProductDetails closeModal={closeDetailsModal} passProductId={ProductId} />
                </Modal>

            ) : null}

            {/* EditProduct -component */}
            { productEditModal ? (
                <Modal style={[styles.modalContainer]}
                    animationType="none"
                    transparent={true}
                    visible={true}
                >
                    <EditProduct closeModal={closeEditModal} refreshAfterEdit={forceRefresh} passProductId={ProductId} passCategories={categories} />
                </Modal>
            ) : null}

            {/* CreateProduct -component */}
            { productCreateModal ? (
                <Modal style={[styles.modalContainer]}
                    animationType="none"
                    transparent={true}
                    visible={true}
                >
                    <CreateProduct closeModal={closeCreateModal} refreshAfterEdit={forceRefresh} />
                </Modal>
            ) : null}




           
            {/* Inventory header */}
            <View style={{ flexDirection: 'row', backgroundColor: '#fff', marginBottom: 10 }}>
                <View style={[styles.centerElement, { width: 50, height: 50 }]}>
                    <FontAwesome5 name="boxes" size={25} color="#000" />
                </View>

                <View style={[styles.centerElement, { height: 50 }]}>
                    <Text style={{ fontSize: 18, color: '#000' }}>PRODUCTS</Text>
                    <Text style={{ fontSize: 10, color: '#000' }}>{'Products count: ' + inventoryItemsCount}</Text>
                </View>
                <View style={[styles.centerElement, { height: 50, marginLeft: 20 }]}>
                    <Picker
                        selectedValue={selectedCat}
                        onValueChange={(value) => { fetchSorted(value) }}
                        style={{ height: 25, width: 120 }}
                    >
                        <Picker.Item label="All" value="All" />
                        {categoriesList}
                    </Picker>
                </View>
                <View style={[styles.centerElement, { height: 50, marginLeft: 20 }]}>
                    <Pressable onPress={() => forceRefresh()}>
                        <View>
                            <MaterialCommunityIcons name="reload" size={24} color="#04BFBF" />
                        </View>
                    </Pressable>
                </View>
                <View style={[styles.centerElement, { height: 50, marginLeft: 10 }]}>
                    <ActivityIndicator size="small" color="#0000ff" animating={refreshIndicator} />{/* ActivityIndicator activated in forceRefresh() -function, wille be deactivated in GetProducts() -function */}
                </View>
                <View style={[styles.centerElement, { height: 50, right: Platform.OS === 'web' ? 20 : 10, position: 'absolute' }]}>{/* Updated styles for scrollbar */}
                    <Pressable onPress={() => createProduct()}>
                        <View>
                            <FontAwesome5 name="plus" size={24} color="#A0A603" />
                        </View>
                    </Pressable>
                </View>
            </View>


            <View style={{ height: 650 }}>
                <ScrollView>
                {/* Creating elements from every product */}
                {inventoryItems.map((item: INWProductsResponse) => (
                    <Pressable
                        key={item.productId}
                                onLongPress={() => {
                                    showDetails(item.productId)
                                }}
                                delayLongPress={1000} /* Onlongpress 1 second */
                                style={({ pressed }) => [{ backgroundColor: pressed ? 'rgba(49, 179, 192, 0.5)' : 'white' }]}
                                
                            >
                                <View style={styles.productsContainer}>
                                    {/* item.imageLink on undefined ->  default -image, else product image will be shown */}
                                    <Image source={item.imageLink ? { uri: item.imageLink } : { uri: 'https://www.tibs.org.tw/images/default.jpg' }} style={[styles.centerElement, { height: 60, width: 60, backgroundColor: '#eeeeee', margin: 6, }]} />

                                    <View style={{ flexGrow: 1, flexShrink: 1, alignSelf: 'center' }}>

                                        <Text style={{ fontSize: 15 }}>{item.productName}</Text>
                                        <Text style={{ color: '#8f8f8f' }}>{item.category ? 'Variation: ' + item.category : ''}</Text>
                                        <Text style={{ color: '#333333', marginBottom: 10 }}>{'\u00E1 ' + (item.unitPrice == null ? 'price is missing ?' : item.unitPrice.toFixed(2)) + '\u20AC'}</Text>
                                        {/* Euro -char '\u20AC' */}
                                        {/* á -char '\u00E1'*/}

                                    </View>

                                    <TouchableOpacity style={[{ width: 32, height: 32 }]} onPress={() => editProduct(item.productId)}>
                                        <FontAwesome5 name="edit" size={25} color="#8B0000" />
                                    </TouchableOpacity>
                                </View>
                            </Pressable>
                        ))}
                   
                </ScrollView>
                </View>
         
        </View>
    );
} 