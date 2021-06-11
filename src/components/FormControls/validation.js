export let validateEmail = (value) => {
    let error;
    if (!value) {
        error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address';
    }
    return error;
}

export let validateText = (value) => {
    let error;
    if (!value) {
        error = 'Required';
    } else if (value.length >= 20) {
        error = 'Too long';
    }
    return error;
}
export let required = (value) => {
    let error;
    if (!value) {
        error = 'Required';
    }
    return error;
}
