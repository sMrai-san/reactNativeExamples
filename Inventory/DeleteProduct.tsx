//**************************************************************************************
//PRODUCT DELETE FUNCTION
//**************************************************************************************
export function deleteProduct(deleteProductId: number) {
        let uridel = 'https://yourapi.azurewebsites.net/nw/products/' + deleteProductId;
        fetch(uridel, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: null
        }).then((response) => response.json())
            .then((json) => {
                //store data to variable
                const success = json;
                if (success) {
                    alert('Product:' + deleteProductId + ' deleted.');
                } else {
                    alert('Product ' + deleteProductId + ' could not be deleted.');
                }
        });
}
