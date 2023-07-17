formateDate = function (date) {
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const month = months[formattedDate.getMonth()];
    const hour = formattedDate.getHours().toString();
    if (hour.length === 1) {
        return `${day} de ${month} - ${hour.split('')[1]} horas`;
    } else {
        return `${day} de ${month} - ${hour} horas`;
    }
}
module.exports = formateDate;
