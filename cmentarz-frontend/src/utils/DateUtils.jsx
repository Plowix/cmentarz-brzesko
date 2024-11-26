export const formatDate = (date) => {
    let [year, month, day] = date.split('-');

    const formattedDay = (day === '00' ? '' : day + '.');
    const formattedMonth = (month === '00' ? '' : month + '.');

    if(year === '0') return '-';

    return formattedDay + formattedMonth + year + 'r.';
};