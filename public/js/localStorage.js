window.onload = () => {
    console.log('prueba');
    console.log(document);

    const products = Array.from(document.querySelectorAll('.articulos'));
    const productsTotal = products.length.toString();

    const cartImg = document.querySelector('.cart-img');
    console.log(cartImg);

    localStorage.setItem('products', productsTotal)

    const productsInStorage = Number(localStorage.getItem('products'))
    
    if(productsInStorage > 0){
        const div = document.createElement('div');
        div.classList.add('circle');

        const p = document.createElement('p')
        p.classList.add('cart-items')
        p.innerText = `${productsInStorage}`
        div.appendChild(p);

        cartImg.appendChild(div)
    }
}