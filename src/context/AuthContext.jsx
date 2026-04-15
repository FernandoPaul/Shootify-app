import { createContext, useContext, useState, useEffect } from 'react'
import {
    onAuthStateChanged,
    GoogleAuthProvider,
    signOut,
    updateProfile,
} from 'firebase/auth'
import { doc, getDoc, updateDoc, } from 'firebase/firestore'
import { auth, db } from '../firebase/config'

// Los imports son librerias que nos ayudan a obtener el perfil del usuario

const AuthContext = createContext()
const googleProvider = new GoogleAuthProvider()

// Funciona para obtener el perfil del usuario
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    // Escucha cambios en el estado de autenticación
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
            // Si el usuario está autenticado, se establece el usuario y se obtiene su perfil
            if (firebaseUser) {
                setUser(firebaseUser)
                await fetchProfile(firebaseUser.uid)
            } else {
                setUser(null)
                setProfile(null)
            }
            setLoading(false)
        })
        return unsub
    }, [])

    // Fetch para obtener el perfil del usuario
    const fetchProfile = async (uid) => {
        const ref = doc(db, 'users', uid)
        const snap = await getDoc(ref)
        if (snap.exists()) setProfile(snap.data())
    }

    // Cerrar sesión
    const logout = async () => {
        await signOut(auth)
        setUser(null)
        setProfile(null)
    }

    // Actualizar perfil en Firestore
    const updateUserProfile = async (data) => {
        if (!user) return
        const ref = doc(db, 'users', user.uid)
        await updateDoc(ref, data)
        setProfile(prev => ({ ...prev, ...data }))
        if (data.fullName) await updateProfile(user, { displayName: data.fullName })
    }

    // Proporciona el contexto de autenticación a los componentes hijos
    return (
        <AuthContext.Provider value={{
            user, profile, loading,
            logout, updateUserProfile
        }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
// Exporta el contexto de autenticación
export const useAuth = () => useContext(AuthContext)
