
const addToCartButtons = document.querySelectorAll(".add-to-cart-button");



// console.log(cartId)


const addToCart = ( productId ) => {
    let cartId = document.getElementsByClassName('user-cartId')[0];
    cartId = cartId.textContent
    
    console.log( cartId, 'cartID' )
    console.log( productId, 'productID' )
    fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            alert("Added to cart:", data);
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
};
