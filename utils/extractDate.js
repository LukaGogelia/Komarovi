export default function extractDate(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
    const dd = String(date.getDate()).padStart(2, '0');

    return `${dd}/${mm}/${yyyy}`;
}