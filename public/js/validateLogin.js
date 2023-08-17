window.onload = () => {
    const mail = document.querySelector('#mailLogin');
    const password = document.querySelector('#passwordLogin');
    const pError = Array.from(document.querySelectorAll('.error'));
    pError.forEach(error => {
        error.style.color = 'red';
        error.style.fontSize = '15px'
    })
    
    mail.addEventListener('input', e => {
        const value = e.target.value;
        const length = e.target.value.length;
        const isCorrect = value.includes('@') && value.includes('.');

        if(length === 0){
            e.target.nextElementSibling.innerHTML = 'El mail no puede estar vacío'
        } else if(!isCorrect){
            mail.style.border = '1px solid red'
            e.target.nextElementSibling.innerHTML = 'El mail es inválido'
        } else {
            mail.style.border = '1px solid green'
            e.target.nextElementSibling.innerHTML = ''
        }
    })
    password.addEventListener('input', e => {
        const length = e.target.value.length;
        if(length <= 8){
            password.style.border = 'red';
            e.target.nextElementSibling.innerHTML = 'La contraseña debe tener al menos 8 caracteres'
        } else {
            password.style.border = 'green';
            e.target.nextElementSibling.innerHTMLT = ''
        }
    })
}