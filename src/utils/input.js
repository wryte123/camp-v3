export const IllegalInputChecker = (inputStr) => {
    const invalidCharacters = /[!@#$%^&*(),.?":{}|<>]/;
    return invalidCharacters.test(value)
}

export const NotNullInputChecker = (inputStr) => {
    return inputStr.length === 0
}

export const InputLengthChecker = (inputStr) => {
    if (inputStr.length < 8 || inputStr.length > 16) {
        return true
    }
    return false
}
