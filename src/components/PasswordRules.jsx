// Componente para mostrar las reglas de la contraseña
function PasswordRules({ password }) {
    const rules = [
        { key: 'minLength', label: 'Mínimo 8 caracteres', test: password.length >= 8 },
        { key: 'hasUppercase', label: '1 letra mayúscula', test: /[A-Z]/.test(password) },
        { key: 'hasLowercase', label: '1 letra minúscula', test: /[a-z]/.test(password) },
        { key: 'hasNumber', label: '1 número', test: /[0-9]/.test(password) },
        { key: 'hasSpecial', label: '1 carácter especial', test: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    ]

    if (!password) return null // no muestra nada si el campo está vacío

    return (
        <ul className="list-unstyled mb-3 small">
            {rules.map(({ key, label, test }) => (
                <li key={key} className={test ? 'text-success' : 'text-danger'}>
                    {test ? '✓' : '✗'} {label}
                </li>
            ))}
        </ul>
    )
}

export default PasswordRules