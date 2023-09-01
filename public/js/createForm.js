window.onload = () => {
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

    addTicketBtn.addEventListener('click', e => {
        e.preventDefault();
        console.log(addTicket);
    })

    submitBtn.addEventListener('click', e => {
        // e.preventDefault();
    })

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
        const length = e.target.value.length;
        if (length === 0) {
            e.target.nextElementSibling.innerHTML = 'El título no puede estar vacío';
        } else {
            e.target.nextElementSibling.innerHTML = ''
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
            e.target.nextElementSibling.innerHTML = 'La fecha no puede estar vacía'
        } else if (!isDateCorrect) {
            e.target.nextElementSibling.innerHTML = 'La fecha es incorrecta'
        } else {
            e.target.nextElementSibling.innerHTML = '';
        }
        checkErrors();
    })

    placeInp.addEventListener('input', e => {
        const length = e.target.value.length;
        if (length === 0) {
            e.target.nextElementSibling.innerHTML = 'El lugar no puede estar vacío';
            console.log('error lugar');
        } else {
            e.target.nextElementSibling.innerHTML = '';
        }
        checkErrors();
    })

    address.addEventListener('input', e => {
        const length = e.target.value.length;
        if (length === 0) {
            e.target.nextElementSibling.innerHTML = 'La dirección del lugar no puede estar vacía'
            console.log('error direccion');
        } else {
            e.target.nextElementSibling.innerHTML = ''
        }
        checkErrors();
    })

    ticketTypeInp.addEventListener('input', e => {
        const length = e.target.value.length;
        if (length === 0) {
            e.target.nextElementSibling.innerHTML = 'No puede estar vacío'
            console.log('error tipo ticket');
        } else {
            e.target.nextElementSibling.innerHTML = ''
        };
        checkErrors();
    })

    price.addEventListener('input', e => {
        const length = e.target.value.length;
        if (length === 0) {
            e.target.nextElementSibling.innerHTML = 'No puede estar vacío'
            console.log('error precio');
        } else {
            e.target.nextElementSibling.innerHTML = '';
        };
        checkErrors();
    })

    ticketAmount.addEventListener('input', e => {
        const length = e.target.value.length;
        if (length === 0) {
            e.target.nextElementSibling.innerHTML = 'No puede estar vacío'
            console.log('error cantidad ticket');
        } else {
            e.target.nextElementSibling.innerHTML = '';
        };
        checkErrors();
    })

    category.addEventListener('input', e => {
        const length = e.target.value.length;
        if (length === 0) {
            e.target.nextElementSibling.innerHTML = 'No puede estar vacío'
            console.log('error categoria');
        } else {
            e.target.nextElementSibling.innerHTML = '';
        };
        checkErrors();
    })

    imgInp.addEventListener('input', e => {
        const length = e.target.value.length;
        if (length === 0) {
            e.target.nextElementSibling.innerHTML = 'No puede estar vacío'
            console.log('error imagen');
        } else {
            e.target.nextElementSibling.innerHTML = '';
        };
        checkErrors();
    })
}