export const formatDate = (date) => {
    console.log(date);
    let [year, month, day] = date.split('-');

    // Sprawdzenie, czy miesiąc i dzień są różne od "00"
    const formattedDay = (day === '00' ? '' : day + '.');
    const formattedMonth = (month === '00' ? '' : month + '.');

    return formattedDay + formattedMonth + year + 'r.';
};