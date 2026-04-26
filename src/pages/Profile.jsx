import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Profile.css'

function Profile() {
    // Extraigo las funciones y datos que necesito del contexto de autenticación
    const { user, profile, logout, updateUserProfile } = useAuth()
    // Hook para navegar entre páginas
    const navigate = useNavigate()
    // Datos de usuario - se inicializan con los datos de Firestore (profile)
    const [fullName, setFullName] = useState(profile?.fullName || user?.displayName || "")
    const [phone, setPhone] = useState(profile?.phone || "")
    // Datos de dirección - vienen del objeto 'address' dentro de Firestore
    const [address, setAddress] = useState(
        {
            street: profile?.address?.street || "",
            city: profile?.address?.city || "",
            province: profile?.address?.province || "",
            zip: profile?.address?.zip || "",
            country: profile?.address?.country || ""
        }
    )

    //useEffect para actualizar los datos cuando el perfil cambia
    useEffect(() => {
        setFullName(profile?.fullName || user?.displayName || "")
        setPhone(profile?.phone || "")
        setAddress(
            {
                street: profile?.address?.street || "",
                city: profile?.address?.city || "",
                province: profile?.address?.province || "",
                zip: profile?.address?.zip || "",
                country: profile?.address?.country || ""
            }
        )
    }, [profile, user])

    //Cerrar sesion
    const handleLogout = async () => {
        await logout()
        navigate('/')
    }

    //Actualizar perfil
    const handleUpdateProfile = async () => {
        try {
            await updateUserProfile({ fullName, phone, address })
            alert("Perfil actualizado con éxito")
        } catch (error) {
            console.error("Error al actualizar:", error)
            alert("Hubo un error al actualizar el perfil")
        }
    }
    // Si entra en el perfil sin estar logueado, redirige al login
    if (!user) {
        navigate('/login')
        return null
    }
    return (
        <div className='container py-5'>
            <div className='row'>
                {/* SIDEBAR */}
                <div className='col-lg-3'>
                    <div className='profile-sidebar'>
                        <div className='text-center mb-3'>
                            <div className='avatar'>👤</div>
                            <h5>{user?.displayName}</h5>
                            <p className='text-muted small'>{user?.email}</p>
                        </div>
                        <button className='btn btn-outline-danger w-100 mt-3' onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    </div>
                </div>
                {/* CONTENIDO */}
                <div className='col-lg-9'>
                    {/* Datos personales */}
                    <div className='profile-content'>
                        <h3>Datos personales</h3>
                        <p className='text-muted small'>Actualiza tu información personal</p>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label>Nombre completo</label>
                                <input className='form-control mb-3' type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                            </div>
                            <div className='col-md-6'>
                                <label>Teléfono</label>
                                <input className='form-control mb-3' type="tel" minLength={9} maxLength={9} value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label>Correo electrónico</label>
                                <input
                                    className="form-control"
                                    value={user?.email}
                                    disabled
                                />
                                <small className="text-danger small">* No se puede modificar</small>
                            </div>
                        </div>
                    </div>
                    {/* Dirección */}
                    <div className='profile-content'>
                        <h3>Dirección</h3>
                        <p className='text-muted small'>Actualiza tu dirección</p>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label>Calle</label>
                                <input className='form-control mb-3' type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
                            </div>
                            <div className='col-md-6'>
                                <label>Ciudad</label>
                                <input className='form-control mb-3' type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                            </div>
                            <div className='col-md-6'>
                                <label>Provincia</label>
                                <input className='form-control mb-3' type="text" value={address.province} onChange={(e) => setAddress({ ...address, province: e.target.value })} />
                            </div>
                            <div className='col-md-6'>
                                <label>Código postal</label>
                                <input className='form-control mb-3' type="text" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} />
                            </div>
                            <div className='col-md-6'>
                                <label>País</label>
                                <input className='form-control mb-3' type="text" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    {/* Pedidos */}
                    <div className='profile-content'>
                        <h3>Pedidos</h3>
                        <p className='text-muted small'>Proximamente podrás ver tus pedidos</p>

                    </div>
                    {/* Boton guardar cambios */}
                    <div className='d-flex justify-content-center align-items-center'>
                        <button className='btn btn-dark' onClick={handleUpdateProfile}>Guardar cambios</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile

