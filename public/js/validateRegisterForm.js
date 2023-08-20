window.onload = () => {
    const firstName = document.querySelector('.firstNameRegister');
    const lastName = document.querySelector('.lastNameRegister');
    const email = document.querySelector('.emailRegister');
    const userCategory = document.querySelector('#userCategory');
    const password = document.querySelector('.passwordRegister');
    const passwordCheck = document.querySelector('.checkPasswordRegister');
    const passwordConditions = document.querySelector('.input-info');
    const pError = Array.from(document.querySelectorAll('.error'));
    const submitBtn = document.querySelector('.submitBtn');
    pError.forEach(error => {
        error.style.color = 'red';
    })

    const allInps = document.querySelectorAll('input');

    const haveValue = () => {
        let allHaveValue = true;
        allInps.forEach(input => {
            if (input.value === '') {
                allHaveValue = false
            }
        })
        return allHaveValue;
    }

    const checkErrors = () => {
        let errorsHTML = Array.from(document.querySelectorAll('.error'));
        let errors = []

        errorsHTML.forEach(error => {
            if (error.innerHTML !== '') {
                errors.push(error.innerHTML);
                // console.log(error.innerHTML);
            }
        });

        if (haveValue()) {
            if (errors.length > 0) {
                submitBtn.disabled = true;
            } else {
                submitBtn.disabled = false;
                console.log(submitBtn);
            }
        }
        allInps.forEach(input => {
            console.log(input.value);
        })
        console.log(errors);
    }
    // console.log(firstName, lastName, email, userCategory, password, passwordCheck);

    firstName.addEventListener('input', e => {
        let length = e.target.value.length;
        if(length === 0){
            firstName.style.border = '1px solid red';
            e.target.nextElementSibling.innerHTML = 'El nombre no puede estar vacío'
        } else {
            firstName.style.border = '1px solid green';
            e.target.nextElementSibling.innerHTML = ''
        }
        checkErrors();
    });

    
    lastName.addEventListener('input', e => {
        let length = e.target.value.length;
        if(length === 0){
            lastName.style.border = '1px solid red';
            e.target.nextElementSibling.innerHTML = 'El apellido no puede estar vacío'
        } else {
            lastName.style.border = '1px solid green';
            e.target.nextElementSibling.innerHTML = ''
        }
        checkErrors();
    })


    email.addEventListener('input', e => {
        let value = e.target.value;
        let isCorrect = value.includes('@') && value.includes('.');
        let length = value.length;

        if(length === 0){
            console.log(value);
            email.style.border = '1px solid red';
            e.target.nextElementSibling.innerHTML = 'El mail no puede estar vacío'
        } else if(!isCorrect){
            email.style.border = '1px solid red';
            e.target.nextElementSibling.innerHTML = 'Ingrese un mail valido'
        } else {
            email.style.border = '1px solid green';
            e.target.nextElementSibling.innerHTML = '';
        }
        checkErrors();
    });

    userCategory.addEventListener('input', e => {
        const length = e.target.value.length;
        if(length === 0){
            userCategory.style.border = '1px solid red';
            e.target.nextElementSibling.innerHTML = 'Elija una categoría'
        } else {
            userCategory.style.border = '1px solid green';
            e.target.nextElementSibling.innerHTML = ''
        }
        checkErrors();
    });

    password.addEventListener('input', e => {
        const value = e.target.value;
        const length = value.length;
        const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value);
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);

        if(length <= 8){
            password.style.border = '1px solid red';
            passwordConditions.style.display = 'none';
            e.target.nextElementSibling.innerHTML = 'La contraseña debe tener más de ocho caracteres';
        } else if (!hasSpecialChar || !hasUpperCase || !hasLowerCase || !hasNumber){
            passwordConditions.style.display = 'block';
            passwordConditions.style.color = 'red';
            e.target.nextElementSibling.innerHTML = ''
        } else {
            password.style.border = '1px solid green';
            passwordConditions.style.display = 'none';
            e.target.nextElementSibling.innerHTML = ''
        }
        checkErrors();
    });

    passwordCheck.addEventListener('input', e => {
        console.log(password.value);
        console.log(e.target.value);
        const checkPassword = password.value === e.target.value;
        if(!checkPassword){
            passwordCheck.style.border = '1px solid red';
            e.target.nextElementSibling.innerHTML = 'Las contraseñas no coinciden';
        } else {
            passwordCheck.style.border = '1px solid green';
            e.target.nextElementSibling.innerHTML = '';
        }
        checkErrors();
    })
}