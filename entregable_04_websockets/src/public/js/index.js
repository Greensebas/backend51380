// const socket = io();

const addProductForm = document.getElementById("product-form");
const addProductFormRealtime = document.getElementById("product-form-realtime");
const productsListContainer = document.getElementById("products_list");

try {
    // Creo una función para el botón submit para agregar productos desde el formulario
    addProductForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const formData = new FormData(addProductForm);
        const data = Object.fromEntries(formData.entries());

        // Acá tomo los datos del formulario y hago un fetch a /api/producst con un post y agrego un producto
        const response = await fetch("/api/products", {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
        });

        const product = data;

        if (response.ok) {
            const li = `<li>${product.title}</li>`;
            productsListContainer.innerHTML += li;
        }
    });
} catch (error) { }




// Creo una función para el botón submit para agregar productos desde el formulario
addProductFormRealtime.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(addProductFormRealtime);
    const data = Object.fromEntries(formData.entries());

    console.log(data)
});
