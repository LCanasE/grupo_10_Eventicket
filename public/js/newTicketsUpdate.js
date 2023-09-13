window.addEventListener('load', () => {
    console.log('prueba');
    const addTicketBtn = document.querySelector('.agregar-tipo-entrada');
    const addTicket = [...document.querySelectorAll('.ticket')];
    const addTicketDiv = document.querySelector('.agregar-input-precio-evento');
    let ticketTypeInp = [...document.querySelectorAll('.tipo-entrada-evento')];
    let price = [...document.querySelectorAll('.precio-crear-evento')];
    let ticketAmount = [...document.querySelectorAll('.precio-cantidad-evento')];
    console.log('ADDTICKET ', addTicket);
    console.log(ticketTypeInp);
    console.log(price);
    console.log(ticketAmount);


    addTicketBtn.addEventListener('click', e => {
        e.preventDefault();

        const cloneNode = addTicket[addTicket.length - 1].cloneNode(true);
        cloneNode.style.width = '100%'
        addTicketDiv.appendChild(cloneNode);
        cloneNode.style.marginBottom = '25px';

        ticketTypeInp = [...document.querySelectorAll('.tipo-entrada-evento')]
        price = [...document.querySelectorAll('.precio-evento')];
        ticketAmount = [...document.querySelectorAll('.cantidad-evento')];
        // console.log('TIPO DE ENTRADA', ticketTypeInp);
        // console.log('PRECIO', price);
        // console.log('CANTIDAD', ticketAmount);

        ticketTypeInp.forEach(ticket => {

            ticket.addEventListener('input', e => {
                
                console.log(e.target.value);
                let length = e.target.value.length;
                if (length === 0) {
                    ticket.style.border = '1px solid red';
                    ticket.style.color = 'black';
                    e.target.nextElementSibling.textContent = 'No puede estar vacío';
                    e.target.nextElementSibling.style.margin = '2px';
                } else {
                    ticket.style.border = '1px solid green';
                    ticket.style.color = 'black';
                    e.target.nextElementSibling.textContent = ''
                }
                // checkErrors();
            })
        })

        price.forEach(ticket => {
            ticket.addEventListener('input', e => {
                let length = e.target.value.length;
                if (length === 0) {
                    ticket.style.border = '1px solid red';
                    ticket.style.color = 'black';
                    e.target.nextElementSibling.textContent = 'No puede estar vacío';
                    e.target.nextElementSibling.style.margin = '2px';
                } else {
                    ticket.style.border = '1px solid green';
                    ticket.style.color = 'black';
                    e.target.nextElementSibling.textContent = ''
                }
                // checkErrors();
            })
        })

        ticketAmount.forEach(ticket => {
            ticket.addEventListener('input', e => {
                let length = e.target.value.length;
                if (length === 0) {
                    ticket.style.border = '1px solid red';
                    ticket.style.color = 'black';
                    e.target.nextElementSibling.textContent = 'No puede estar vacío';
                    e.target.nextElementSibling.style.margin = '2px';
                } else {
                    ticket.style.border = '1px solid green';
                    ticket.style.color = 'black';
                    e.target.nextElementSibling.textContent = ''
                }
                // checkErrors();
            })
        })
    })



})