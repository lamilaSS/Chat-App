// export const numberWithCommas = (number) => {
//     return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

// If there are more than 3 digits after the decimal point.
export const numberWithCommas = (number) => {
    let parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
export const validateEmail = (email) => {
    const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const validateUsername = (username) => {
    const re = /^[a-zA-Z0-9_-]{6,30}$/;
    return re.test(String(username).toLowerCase());
}

export const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,30}$/;
    return re.test(String(password));
}

export const confirmPassword = (password, confirm) => {
    return password.trim() === confirm.trim()
}