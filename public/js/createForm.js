window.addEventListener('load', () => {
    console.log('Prueba');

    const addTicketBtn = document.querySelector('.agregar-tipo-entrada');
    const addTicket = document.querySelector('.addTicket');
    // const addTicketContainer = document.querySelector('.agregar-input-precio-evento');
    // console.log(addTicketContainer);

    const titleInp = document.querySelector('#nombre');
    const dateInp = document.querySelector('#fechaId');
    const placeInp = document.querySelector('#lugar');
    const address = document.querySelector('#direccion');
    const ticketTypeInp = document.querySelector('#tipo-entrada');
    const price = document.querySelector('#precio');
    const ticketAmount = document.querySelector('#cantidad-entradas');
    const category = document.querySelector('#categoriaSelect');
    const imgInp = document.querySelector('#imagenInput');
    const submitBtn = document.querySelector('#submit-button');
    const errorsList = document.querySelector('#errors')
    const allInps = Array.from(document.querySelectorAll('input'));
    const circleText = document.querySelector('.circle-inp');
    const textAreaDescription = document.querySelector('#description');
    const circleTextArea = document.querySelector('.circle-textarea');

    addTicketBtn.addEventListener('click', e => {
        e.preventDefault(); 
        console.log(addTicket);
    })

    // submitBtn.addEventListener('click', e => {
    //     e.preventDefault();
    // })

    // Función que chequea que todos los inputs tengan un valor. La función itera sobre todos los inputs y si encuentra al menos uno que esté vacío (input.value === '') devuelve false. El objetivo de esta función es establecer un estado de true o false para que luego checkErrors verifique el array de errores solo en caso de que todos los campos estén completos, esto permite que el botón para enviar los datos del formulario se habilite unicamente en caso de que no hayan errores en ninguno de los campos.
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
                console.log(error.innerHTML);
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

    titleInp.addEventListener('input', (e) => {
        let maxCharacters = 20;
        let midCharacters = maxCharacters / 2;
        console.log(titleInp);
        const length = e.target.value.length;

        if (length > maxCharacters){
            console.log(maxCharacters/2);
            circleText.style.border = '1px solid red';
            circleText.style.color = 'red'
            circleText.textContent = (maxCharacters - length);
            e.target.nextElementSibling.innerHTML = 'El título no puede tener más de 20 caracteres'
            titleInp.style.border = '1px solid red';
        }
        else if(length > midCharacters){
            circleText.style.border = '1px solid orange';
            circleText.textContent = (maxCharacters - length);
            circleText.style.color = 'orange'
            e.target.nextElementSibling.innerHTML = '';
            titleInp.style.border = '1px solid green';
        }  else if(length <= maxCharacters){
            circleText.style.border = '1px solid green';
            circleText.textContent = (maxCharacters - length);
            circleText.style.color = 'green'
            e.target.nextElementSibling.innerHTML = '';
            titleInp.style.border = '1px solid green';
        } 

        if (length === 0) {
            titleInp.style.border = '1px solid red';
            e.target.nextElementSibling.innerHTML = 'El título no puede estar vacío';
            circleText.textContent = '';
            circleText.style.border = 'none'
        } else {
            e.target.nextElementSibling.innerHTML = ''
            titleInp.style.border = '1px solid green';
        }

        checkErrors();
    })

    dateInp.addEventListener('change', (e) => {
        const date = e.target.value;
        const length = date.length;
        const [year, month, day] = date.split('T')[0].split('-');
        const inputDate = new Date(year, month - 1, day);
        const today = new Date();
        const isDateCorrect = inputDate > today;

        if (length === 0) {
            dateInp.style.border = '1px solid red';
            e.target.nextElementSibling.innerHTML = 'La fecha no puede estar vacía'
        } else if (!isDateCorrect) {
            e.target.nextElementSibling.innerHTML = 'La fecha es incorrecta'
            dateInp.style.border = '1px solid red';
        } else {
            e.target.nextElementSibling.innerHTML = '';
            dateInp.style.border = '1px solid green';
        }
        checkErrors();
    })

    placeInp.addEventListener('input', e => {
        const length = e.target.value.length;
        if (length === 0) {
            placeInp.style.border = '1px solid red';
            e.target.nextElementSibling.innerHTML = 'El lugar no puede estar vacío';
            console.log('error lugar');
        } else {
            e.target.nextElementSibling.innerHTML = '';
            placeInp.style.border = '1px solid green';
        }
        checkErrors();
    })

    address.addEventListener('input', e => {
        const length = e.target.value.length;
        if (length === 0) {
            e.target.nextElementSibling.innerHTML = 'La dirección del lugar no puede estar vacía'
            console.log('error direccion');
            address.style.border = '1px solid red';
        } else {
            e.target.nextElementSibling.innerHTML = ''
            address.style.border = '1px solid green';
        }
        checkErrors();
    })

    ticketTypeInp.addEventListener('input', e => {
        const length = e.target.value.length;
        if (length === 0) {
            e.target.nextElementSibling.innerHTML = 'No puede estar vacío'
            console.log('error tipo ticket');
            ticketTypeInp.style.border = '1px solid red';
        } else {
            e.target.nextElementSibling.innerHTML = ''
            ticketTypeInp.style.border = '1px solid green';
        };
        checkErrors();
    })

    price.addEventListener('input', e => {
        const length = e.target.value.length;
        if (length === 0) {
            e.target.nextElementSibling.innerHTML = 'No puede estar vacío'
            console.log('error precio');
            price.style.border = '1px solid red';
        } else {
            e.target.nextElementSibling.innerHTML = '';
            price.style.border = '1px solid green';
        };
        checkErrors();
    })

    ticketAmount.addEventListener('input', e => {
        const length = e.target.value.length;
        if (length === 0) {
            e.target.nextElementSibling.innerHTML = 'No puede estar vacío'
            console.log('error cantidad ticket');
            ticketAmount.style.border = '1px solid red';
        } else {
            e.target.nextElementSibling.innerHTML = '';
            ticketAmount.style.border = '1px solid green';
        };
        checkErrors();
    })

    category.addEventListener('input', e => {
        const length = e.target.value.length;
        if (length === 0) {
            e.target.nextElementSibling.innerHTML = 'No puede estar vacío'
            console.log('error categoria');
            category.style.border = '1px solid red';
        } else {
            e.target.nextElementSibling.innerHTML = '';
            category.style.border = '1px solid green';
        };
        checkErrors();
    })

    imgInp.addEventListener('input', e => {
        const length = e.target.value.length;
        if (length === 0) {
            e.target.nextElementSibling.innerHTML = 'No puede estar vacío'
            console.log('error imagen');
            imgInp.style.border = '1px solid red';
        } else {
            e.target.nextElementSibling.innerHTML = '';
            imgInp.style.border = '1px solid green';
        };
        checkErrors();
    })

    textAreaDescription.addEventListener('input', e => {
        const maxLength = 255;
        const midLength = maxLength / 2;
        const length = e.target.value.length;
        console.log(circleTextArea);

        if(length > maxLength){
            textAreaDescription.style.border = '1px solid red'
            circleTextArea.style.border = '1px solid red';
            e.target.nextElementSibling.innerHTML = 'La descripción no puede tener más de 255 caracteres'
            circleTextArea.style.color = 'red';
            circleTextArea.textContent = (maxLength - length);
        } else if (length > midLength){
            textAreaDescription.style.border = '1px solid green'
            circleTextArea.style.border = '1px solid orange';
            e.target.nextElementSibling.innerHTML = ''
            circleTextArea.style.color = 'orange';
            circleTextArea.textContent = (maxLength - length);
        } else {
            textAreaDescription.style.border = '1px solid green'
            circleTextArea.style.border = '1px solid green';
            e.target.nextElementSibling.innerHTML = ''
            circleTextArea.style.color = 'green';
            circleTextArea.textContent = (maxLength - length);
        }

        if (length === 0){
            textAreaDescription.style.border = '1px solid red';
            e.target.nextElementSibling.innerHTML = 'No puede estar vacío';
            circleTextArea.textContent = '';
            circleTextArea.style.border = 'none'
        } else {
            e.target.nextElementSibling.innerHTML = ''
            textAreaDescription.style.border = '1px solid green';
        };

        checkErrors();
    })
})