import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({

	//********************************************
	//Inventory.tsx
	//********************************************
	centerElement: {
			justifyContent: 'center',
			alignItems: 'center'
		},
		productsContainer: {
			flexDirection: 'row',
			marginBottom: 2,
			height: 120,
			borderTopWidth: 1,
			borderTopColor: '#ccc'
	},

	//*****************************************
	//EditProduct.tsx
	//*****************************************

	inputContainer: {
		flex: 1,
		backgroundColor: '#f6f6f6',
		width: '100%',
		paddingTop: 23,
		height: 'auto',
	},
	inputHeaderTitle: {
		margin: 15,
		fontWeight: 'bold',
		fontSize: 24,
	},
	inputTitle: {
		marginLeft: 15,
		fontWeight: 'bold',
	},
	editInput: {
		margin: 15,
		height: 40,
		borderColor: '#7a42f4',
		borderWidth: 1
	},
	submitButton: {
		backgroundColor: '#7a42f4',
		padding: 10,
		margin: 15,
		height: 40,
	},
	submitButtonText: {
		color: 'white'
	},
	errorText: {
		marginRight: 15,
		color: "red",
		marginLeft: 15,
	},
	dropDownList: {
		marginLeft: 15,
		marginRight: 15,
		height: 50,
	},


	//******************************************
	//MODAL
	//******************************************
	centeredView: {
		flex: 1,
		justifyContent: "space-between",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	openButton: {
		backgroundColor: "#F194FF",
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalContainer: {
		display: Platform.OS === 'web' ? undefined : 'none',
		position: Platform.OS === 'web' ? 'relative' : undefined,
		width: Platform.OS === 'web' ? '100%' : undefined,
		height: Platform.OS === 'web' ? '100%' : undefined,
		zIndex: Platform.OS === 'web' ? 1 : undefined,
		backgroundColor: 'transparent',
    },
	modalTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		padding: 8,
		textAlign: 'center',
    },
	modalText: {
		marginBottom: 15,
	},
	modalTextTitle: {
		marginBottom: 15,
		fontWeight: 'bold',
	},
	modalInfo: {
		flexDirection: 'row',
		justifyContent: "space-between",
    }


});

export default styles;