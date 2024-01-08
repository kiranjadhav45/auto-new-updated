// validationUtils.js

export const validateText = (name) => {
    // Example regex for mobile number validation (adjust as needed)
    const nameRegex = /^.+.{2,}$/;
    return name?.length > 0 ? nameRegex.test(name) : true;
};

export const validateMobileNumber = (mobileNumber) => {
    // console.log(mobileNumber, "from validation")
    // Example regex for mobile number validation (adjust as needed)
    const mobileNumberRegex = /^\d{10}$/;
    return mobileNumber?.length > 0 ? mobileNumberRegex.test(mobileNumber) : true;
};

export const validateEmail = (email) => {
    // Example regex for email validation (adjust as needed)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email?.length > 0 ? emailRegex.test(email) : true;
};

export const validatePassword = (password) => {
    // Example password validation (you can add more complex rules)
    const passwordRegex = /^.{8,16}$/
    return password?.length > 0 ? passwordRegex.test(password) : true;
    // return password?.length > 0 ? password.length >= 8 : true;
};

export const validateConfirmPassword = (password, confirmPassword) => {
    console.log("hello", confirmPassword, password);
    // Example password validation (you can add more complex rules)
    return (
        password?.length > 7 &&
        confirmPassword?.length > 7 &&
        confirmPassword === password
    );
};

export const validateNumber = (number) => {
    const numberRegex = /^(?:\d|[1-9]\d+)$/;
    return number?.length > 0 ? numberRegex.test(number) : true;
};

export const validateCheckbox = (value) => {
    return value === true;
};

export const validateRadio = (value) => {
    return !!value; // Assuming value can't be falsy for a valid selection
};

export const validateDropdown = (value) => {
    return value !== ""; // Assuming an empty string is not a valid selection
};
