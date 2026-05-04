import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { validateEmail, isPasswordValid } from "../utils/validations";
import PasswordRules from "../components/PasswordRules";
import '../pages/AuthLoginRegister.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";


function Register() {
    // Variables para guardar los datos del usuario
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Estado para mostrar/ocultar contraseñas
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Validaciones
    const emailValid = email === '' || validateEmail(email)
    const passwordValid = password === '' || isPasswordValid(password)
    const confirmPasswordValid = confirmPassword === '' || password === confirmPassword
    const formValid = fullName.trim() !== '' && validateEmail(email) && isPasswordValid(password) && password === confirmPassword && acceptTerms

    // Manejador del Registro Manual
    const handleRegister = async () => {
        //Si el formulario no es valido, no hacer nada
        if (!formValid) return
        setLoading(true)
        setError('')
        setSuccess('')
        try {
            // Crea el usuario en Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            // Actualiza el perfil del usuario con el nombre
            await updateProfile(user, { displayName: fullName })
            // Crea el documento del usuario en Firestore
            await createProfile(user.uid, { fullName, email })

            setSuccess("¡Cuenta creada con exito! Redirigiendo...")
            console.log("¡Registro exitoso!");
            setTimeout(() => navigate('/profile'), 1500) // Ejecuta la redireccion 1.5 segundos despues de que se crea la cuenta
        } catch (error) {
            setError(fraseFirebaseError(error.code))
        } finally {
            setLoading(false)
        }
    }
    // Manejador del Registro con Google
    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            //try para capturar errores de inicio de sesion
            await signInWithPopup(auth, new GoogleAuthProvider()) // signInWithPopup es una funcion asincrona que recibe el email y la contraseña
            setSuccess("¡Registro con Google exitoso! Redirigiendo...")
            console.log("Registro con Google exitoso")
            setTimeout(() => navigate('/profile'), 1500)
        } catch (error) {
            //catch para capturar errores de inicio de sesion
            setError(fraseFirebaseError(error.code))
        } finally {
            //finally para finalizar el inicio de sesion
            setLoading(false)
        }
    }

    // Frases para gestionar errores FIREBASE
    const fraseFirebaseError = (code) => {
        const map = {
            'auth/email-already-in-use': 'Ese email ya está registrado',
            'auth/invalid-email': 'El formato del email no es válido',
            'auth/too-many-requests': 'Demasiados intentos. Espera un momento',
        }
        return map[code] || 'Ha ocurrido un error. Inténtalo de nuevo'
    }
    // Crear direccion en Firebase con datos vacios
    const createProfile = async (uid, data) => {
        const ref = doc(db, 'users', uid)
        const profileData = {
            fullName: data.fullName || '',
            email: data.email || '',
            phone: '',
            address: { street: '', city: '', province: '', zip: '', country: 'España' },
            createdAt: serverTimestamp(),
        }
        await setDoc(ref, profileData)
    }

    return (

        <div className="auth-container">
            <div className="auth-card">
                <h2>Crear una cuenta</h2>
                {/* GOOGLE */}
                {/* disable para deshabilitar el boton si esta cargando */}
                <button className="btn btn-light w-100 mb-3 d-flex justify-content-center align-items-center gap-2" onClick={handleGoogleLogin} disabled={loading}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
                        <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
                        <path d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05" />
                        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
                    </svg>
                    Continuar con Google
                </button>
                <hr />
                {/* FORMULARIO */}
                <form action="" onSubmit={(e) => e.preventDefault()}>
                    {/* NOMBRE */}
                    <label>Nombre</label>
                    <input
                        type="text"
                        placeholder="Tu nombre"
                        className="form-control mb-1"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)} required
                        autoComplete="name"
                    />
                    {/* onChange es una funcion que se ejecuta cuando el valor del input cambia para guardar el valor en la variable name */}
                    {/* EMAIL */}
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="usuario@gmail.com"
                        className={`form-control mb-1 ${email && (emailValid ? 'is-valid' : 'is-invalid')}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} required
                        autoComplete="email"
                    />
                    {/* Feedback email */}
                    {email && !emailValid && (
                        <div className="text-danger small mb-2">Email no válido</div>
                    )}
                    {email && emailValid && (
                        <div className="text-success small mb-2">✓ Email válido</div>
                    )}
                    {/* CONTRASEÑA */}
                    <label>Contraseña</label>
                    <div className="position-relative mb-1">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Minimo 8 caracteres"
                            className={`form-control password-input pe-5 ${password && (passwordValid ? 'is-valid' : 'is-invalid')}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} required
                            autoComplete="new-password"
                        />
                        {/* El pe-5 en el input deja espacio para que el icono no tape el texto,
                        y position-absolute con end-0 lo coloca siempre a la derecha dentro del input. */}
                        <span
                            className="position-absolute top-50 translate-middle-y d-flex align-items-center pb-2"
                            style={{ cursor: 'pointer', zIndex: 5, right: '2rem' }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {/* Reglas de la contraseña */}
                    <PasswordRules password={password} />

                    {/* CONFIRMAR CONTRASEÑA */}
                    <label>Confirmar Contraseña</label>
                    <div className="position-relative mb-1 ">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Repite la contraseña"
                            className={`form-control password-input pe-5 ${confirmPassword && (confirmPasswordValid ? 'is-valid' : 'is-invalid')}`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} required
                            autoComplete="new-password"
                        />
                        <span
                            className="position-absolute top-50 translate-middle-y d-flex align-items-center pb-2"
                            style={{ cursor: 'pointer', zIndex: 5, right: '2rem' }}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {/* Feedback contraseñas */}
                    {confirmPassword && !confirmPasswordValid && (
                        <div className="text-danger small mb-2">Las contraseñas no coinciden</div>
                    )}
                    {confirmPassword && confirmPasswordValid && (
                        <div className="text-success small mb-2">✓ Las contraseñas coinciden</div>
                    )}
                    {/* Términos y Condiciones */}
                    <div className="form-check mb-3 mt-2">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="acceptTerms"
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                        />
                        <label className="form-check-label small" htmlFor="acceptTerms">
                            Acepto los <a href="#" target="_blank">términos y condiciones</a>
                        </label>
                    </div>


                    {/* BOTÓN - deshabilidato si el form no es valido */}
                    <button
                        type="button"
                        className="btn btn-dark w-100"
                        onClick={handleRegister}
                        disabled={loading || !formValid}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" />
                                Creando cuenta...
                            </>
                        ) : 'Registrarse'}
                    </button>

                    {/* FEEDBACK */}
                    {error && <p className="text-danger text-center mt-2">{error}</p>}
                    {success && <p className="text-success text-center mt-2">{success}</p>}
                </form>

                {/* Toogle mode - Cambiar de estado entre iniciar sesion y registrarse */}
                <div className="login-toogle text-center mt-3">
                    <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
                </div>
            </div>
        </div>
    )


}
export default Register