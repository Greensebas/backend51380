const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
const cartId = localStorage.getItem("cartId");

addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const productId = button.id;
        addToCart(cartId, productId)
    });
});

const addToCart = async (cartId, productId) => {
    if (cartId != undefined) {
        await fetch(`/api/carts/${cartId}/product/${productId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Added to cart:", data);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    } else {
        await fetch(`/api/carts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                const newCartId = data.result._id;
                localStorage.setItem('cartId', newCartId);
                console.log(`New cart created whith ID ${newCartId}`);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });

    }
};
