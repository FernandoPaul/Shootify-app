// Validar Email (regex)
export const validateEmail = (email) => {
    const rex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return rex.test(email)
}

// Validar Password - Minimo 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial
export const validatePassword = (password) => {
    return {
        minLength: password.length >= 8,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }
}

// Validar que todos los requisitos de la contraseña se cumplan
export const isPasswordValid = (password) => {
    const rules = validatePassword(password)
    return Object.values(rules).every(Boolean)
}