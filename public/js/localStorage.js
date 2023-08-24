// Este es un archivo que está en todos los ejs porque el objetivo es lograr que el numero del carrito cambie y aparezca en todas las vistas.

window.onload = () => {
    // Estas dos variables funcionan para contener elementos del DOM que más adelante se usarán para controlar la ejecución de las funciones.
    const headerBtn = document.querySelector('a.nav-registro-a'); // Este elemento está en el header cuando el usuario NO está logueado.
    const products = Array.from(document.querySelectorAll('.articulos')); // Este array de elementos está únicamente en el carrito.

    const buyBtn = document.querySelector('.finalizar-compra');
    const eraseBtn = document.querySelector('.eliminar-productos');
    console.log(buyBtn, eraseBtn);

    // Esta función sirve para setear en localStorage una variable 'products' que contenga el total de los products.
    const productsToLocalStorage = () => {
        const productsTotal = products.length.toString();
        localStorage.setItem('products', productsTotal);
    }

    // Esta función trae los productos que hay en Local Storage.
    const findProducts = () => {
        const productsTotalInLs = localStorage.getItem('products');
        return productsTotalInLs ? parseInt(productsTotalInLs) : 0;
    }

    let productsInLs = 0;

    // Estos dos condicionales controlan la ejecución de las funciones. 
    
    // Si NO existe headerBtn (que unicamente existe en el header cuando el usuario NO está logueado) entonces se ejecuta la función que analiza cuantos productos hay en localStorage.
    if (!headerBtn) {
        // findProducts();
        productsInLs = findProducts();
    } 
    // Como este código se ejecuta en todas las vistas, products (que está en la línea 6) siempre va a tener un valor 0 salvo cuando se esté en la vista del carrito. Si no no existe products. Entonces si products es mayor a 0 mandale al localStorage un nuevo valor.
    if (products.length > 0) {
        productsToLocalStorage();
        console.log('Carrito con valor');
    }
    
    if (products.length == 0){
        // localStorage.setItem('products', 0);
        console.log('products == 0');
    }
    
    // if(headerBtn && products.length == 0){
    //     localStorage.setItem('products', 0);
    // }

    const cartImg = document.querySelector('.cart-img');

    if (productsInLs > 0) {
        const div = document.createElement('div');
        div.classList.add('circle');

        const p = document.createElement('p')
        p.classList.add('cart-items')
        p.innerText = `${productsInLs}`
        div.appendChild(p);

        cartImg.appendChild(div)
    }

    buyBtn.addEventListener('click', e => {
        localStorage.setItem('products', 0);
        alert('Compra realizada con éxito');
    })
}