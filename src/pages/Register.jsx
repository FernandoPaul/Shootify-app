import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import '../components/Auth.css';

function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        setLoading(true);
        setError('');
        // Validacion básica
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }
        try {
            //Crea el usuario en Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            // Actualiza el perfil del usuario con el nombre
            await updateProfile(user, { displayName: fullName })
            await createProfile(user.uid, { fullName, email })
            // Crea el documento del usuario en Firestore
            await setDoc(doc(db, 'users', user.uid), {
                fullName,
                email,
                createdAt: new Date(),
            })
            console.log("Registro exitoso");
            // Usamos window.location.href en vez de navigate para forzar a 
            // la aplicación a recargarse y leer el displayName correcto desde Firebase Auth
            window.location.href = '/profile';

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    //Registro con Google
    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            //try para capturar errores de inicio de sesion
            await signInWithPopup(auth, new GoogleAuthProvider()); // signInWithPopup es una funcion asincrona que recibe el email y la contraseña
            console.log("Registro con Google exitoso");
            navigate('/profile');
        } catch (error) {
            //catch para capturar errores de inicio de sesion
            setError(fraseFirebaseError(error.code));
        } finally {
            //finally para finalizar el inicio de sesion
            setLoading(false);
        }
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
        setProfile(profileData)
    }

    return (

        <div className="auth-container">
            <div className="auth-card">
                <h2>Crear una cuenta</h2>
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
                <form action="" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="fullname">Nombre</label>
                    <input
                        type="text"
                        placeholder="Tu nombre"
                        className="form-control mb-3"
                        onChange={(e) => setFullName(e.target.value)} required
                        autoComplete="fullname"
                    />
                    {/* onChange es una funcion que se ejecuta cuando el valor del input cambia para guardar el valor en la variable name */}

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="usuario@gmail.com"
                        className="form-control mb-3"
                        onChange={(e) => setEmail(e.target.value)} required
                        autoComplete="email"
                    />

                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        placeholder="Minimo 6 caracteres"
                        className="form-control mb-3"
                        onChange={(e) => setPassword(e.target.value)} required
                        autoComplete="new-password"
                    />

                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <input
                        type="password"
                        placeholder="Repite la contraseña"
                        className="form-control mb-3"
                        onChange={(e) => setConfirmPassword(e.target.value)} required
                        autoComplete="new-password"
                    />

                    <button type="button" className="btn btn-dark w-100" onClick={handleRegister} disabled={loading}>
                        {/* disable para deshabilitar el boton si esta cargando */}
                        {loading ? 'Cargando...' : 'Registrarse'}
                    </button>
                    {/* si hay error mostrarlo */}
                    {error && <p className="text-danger text-center">{error}</p>}
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