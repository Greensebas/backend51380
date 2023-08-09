
const addToCartButtons = document.querySelectorAll(".add-to-cart-button");

let cartId = localStorage.getItem("cartId") || null;

if (cartId === null) {
    console.log(cartId, "linea 7");
    fetch(`/api/carts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const newCartId = data.result._id;
            localStorage.setItem("cartId", newCartId);
            console.log(`New cart created whith ID ${newCartId}`);
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
};

cartId = localStorage.getItem("cartId");

const addToCart = (productId) => {
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
