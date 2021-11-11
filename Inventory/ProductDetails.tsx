import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';
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

const ProductDetails = (props: { passProductId: number, closeModal: any }) => {
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

    useEffect(() => {
        GetProductInfo();
        //console.log('Haluat muokata tuotetta: ' + ProductId);
    }, [props.passProductId]); //ainakun productId -muuttuu päivitetään useEffect...

    //**************************************************************************************
    //Product details from API with productid
    //**************************************************************************************
    function GetProductInfo() {
            let uri = 'https://yourapi.azurewebsites.net/nw/products/' + ProductId;
        fetch(uri)
            .then(response => response.json())
            .then((json: INWProductsResponse) => {
                    /*35505 = error*/
                    setProductName(json.productName == null ? "invalid productname" : json.productName);
                    setSupplierId((json.supplierId == null ? 35505 : json.supplierId));
                    setCategoryId((json.categoryId == null ? 35505 : json.categoryId));
                    setQuantityPerUnit(json.quantityPerUnit == null ? "35505" : json.quantityPerUnit);
                    setUnitPrice((json.unitPrice.toFixed(2) == null ? "35505" : json.unitPrice.toFixed(2)));
                    setUnitsInStock((json.unitsInStock == null ? '35505' : json.unitsInStock).toString());
                    setUnitsOnOrder((json.unitsOnOrder == null ? '35505' : json.unitsOnOrder).toString());
                    setReorderLevel((json.reorderLevel == null ? '35505' : json.reorderLevel).toString());
                    setDiscontinued((json.discontinued == null ? false : json.discontinued));
                    setImageLink(json.imageLink) == null ? '' : json.imageLink;
                })
    }

    //*****************************************************
    //Close details -button
    //*****************************************************
    function closeModal() {
        props.closeModal(true);
    }


    //********************************************************************************
    //Rendering page
    //********************************************************************************
    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Product details</Text>
                <Text style={{ textAlign: "right", marginBottom: 12, fontStyle: "italic", color: 'orange' }}>*35505 is an error from database</Text>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalTextTitle}>{'Product Id: '}</Text>
                    <Text style={styles.modalText}>{ProductId.toString()}</Text>
                </View>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalTextTitle}>{'Product Name: '}</Text>
                    <Text style={styles.modalText}>{ProductName.toString()}</Text>
                </View>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalTextTitle}>{'Supplier Id: '}</Text>
                    <Text style={styles.modalText}>{SupplierId.toString()}</Text>
                </View>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalTextTitle}>{'Category Id: '}</Text>
                    <Text style={styles.modalText}>{CategoryId.toString()}</Text>
                </View>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalTextTitle}>{'Quantity Per Unit: '}</Text>
                    <Text style={styles.modalText}>{QuantityPerUnit.toString()}</Text>
                </View>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalTextTitle}>{'Unit Price: '}</Text>
                    <Text style={styles.modalText}>{UnitPrice.toString()}</Text>
                </View>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalTextTitle}>{'Units In Stock: '}</Text>
                    <Text style={styles.modalText}>{UnitsInStock.toString()}</Text>
                </View>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalTextTitle}>{'Units On Order: '}</Text>
                    <Text style={styles.modalText}>{UnitsOnOrder.toString()}</Text>
                </View>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalTextTitle}>{'Reorder Level: '}</Text>
                    <Text style={styles.modalText}>{ReorderLevel.toString()}</Text>
                </View>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalTextTitle}>{'Discontinued: '}</Text>
                    <Text style={styles.modalText}>{Discontinued == true ? 'Yes' : 'No'}</Text>
                </View>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalTextTitle}>{'Image: '}</Text>
                </View>
                <Image source={ImageLink ? { uri: ImageLink } : { uri: 'https://www.tibs.org.tw/images/default.jpg' }} style={[styles.centerElement, { height: 60, width: 60, backgroundColor: '#eee', margin: 6, alignSelf: 'center' }]} />

                <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                        closeModal();
                    }}
                >
                    <Text style={styles.textStyle}>Sulje</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
} 

export default ProductDetails;