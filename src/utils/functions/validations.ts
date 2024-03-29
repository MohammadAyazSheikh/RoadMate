export const required = (val: any) => val ? true : false;
export const maxLength = (len: number) => (val: string) => !(val) || (val.length <= len);
export const minLength = (len: number) => (val: string) => val && (val.length >= len);
export const isNumber = (val: number) => !isNaN(Number(val));
export const validEmail = (val: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
export function validatePhoneNumber(input_str: string) {

    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

    return re.test(input_str);
}

export function numberWithCommas(num: string | number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export function validateName(name: string) {
    // Regular expression pattern for validating the first name (allows only alphabetic characters)
    var namePattern = /^[A-Za-z]+$/;


    // Check if the first name matches the name pattern
    if (namePattern.test(name)) {
        return true; // First name is valid
    } else {
        return false; // First name contains invalid characters
    }

}
