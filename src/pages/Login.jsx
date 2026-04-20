import { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import '../pages/AuthLoginRegister.css'
import { Link, useNavigate } from "react-router-dom";

// Iniciar sesion
function Login() {
    /* Obtiene el contexto de autenticación
    const { login, register, loginWithGoogle } = useAuth()
*/
    // Estado del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    // Login con Email, handleLogin es una funcion asincrona que recibe el email y la contraseña
    const handleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            //try para capturar errores de inicio de sesion
            await signInWithEmailAndPassword(auth, email, password); // signInWithEmailAndPassword es una funcion asincrona que recibe el email y la contraseña
            console.log("Inicio de sesion exitoso");
            navigate('/profile');
        } catch (error) {
            //catch para capturar errores de inicio de sesion
            setError(fraseFirebaseError(error.code));
        } finally {
            //finally para finalizar el inicio de sesion
            setLoading(false);
        }
    }
    // Login con Google
    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            //try para capturar errores de inicio de sesion
            await signInWithPopup(auth, new GoogleAuthProvider()); // signInWithPopup es una funcion asincrona que recibe el email y la contraseña
            console.log("Inicio de sesion exitoso");
            navigate('/profile');
        } catch (error) {
            //catch para capturar errores de inicio de sesion
            setError(fraseFirebaseError(error.code));
        } finally {
            //finally para finalizar el inicio de sesion
            setLoading(false);
        }
    }
    // Frases para gestionar errores FIREBASE
    const fraseFirebaseError = (code) => {
        const map = {
            'auth/user-not-found': 'No existe una cuenta con ese email',
            'auth/wrong-password': 'Contraseña incorrecta',
            'auth/email-already-in-use': 'Ese email ya está registrado',
            'auth/invalid-email': 'El formato del email no es válido',
            'auth/too-many-requests': 'Demasiados intentos. Espera un momento',
            'auth/invalid-credential': 'Email o contraseña incorrectos',
        }
        return map[code] || 'Ha ocurrido un error. Inténtalo de nuevo'
    }


    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Bienvenido de nuevo</h2>
                {/* GOOGLE */}
                {/* disable para deshabilitar el boton si esta cargando */}
                <button className="btn btn-light w-100 mb-3" onClick={handleGoogleLogin} disabled={loading}>
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
                <form action="" >
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="usuario@gmail.com"
                        className="form-control mb-3"
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete='username'
                    />

                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        placeholder="········"
                        className="form-control mb-3"
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete='current-password'
                    />

                    <button className="btn btn-dark w-100" onClick={handleLogin} disabled={loading}>
                        {/* disable para deshabilitar el boton si esta cargando */}
                        {loading ? 'Cargando...' : 'Iniciar sesión'}
                    </button>
                    {/* si hay error mostrarlo */}
                    {error && <p className="text-danger text-center">{error}</p>}
                </form>

                {/* Toogle mode - Cambiar de estado entre iniciar sesion y registrarse */}
                <div className="login-toogle text-center mt-3">
                    <p>¿No tienes cuenta? <Link to="/register">Regístrate gratis</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login