import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import styles from './Profile.module.scss'

const Profile = () => {
    const { user, updateProfile, logout } = useAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateProfile(formData)
        setIsEditing(false)
    }

    return (
        <div className={styles.profilePage}>
            <div className={styles.profileContainer}>
                <h1>Mi perfil</h1>

                <div className={styles.profileCard}>
                    {!isEditing ? (
                        <div className={styles.profileInfo}>
                            <div className={styles.avatar}>
                                <span>{user?.name?.charAt(0).toUpperCase()}</span>
                            </div>

                            <div className={styles.infoRow}>
                                <span className={styles.label}>Nombre:</span>
                                <span>{user?.name}</span>
                            </div>

                            <div className={styles.infoRow}>
                                <span className={styles.label}>Email:</span>
                                <span>{user?.email}</span>
                            </div>

                            <div className={styles.infoRow}>
                                <span className={styles.label}>Miembro desde:</span>
                                <span>{new Date(user?.createdAt).toLocaleDateString('es-AR')}</span>
                            </div>

                            <div className={styles.actions}>
                                <button onClick={() => setIsEditing(true)} className={styles.editButton}>
                                    Editar perfil
                                </button>
                                <button onClick={logout} className={styles.logoutButton}>
                                    Cerrar sesión
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className={styles.editForm}>
                            <div className={styles.formGroup}>
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formActions}>
                                <button type="submit" className={styles.saveButton}>
                                    Guardar cambios
                                </button>
                                <button type="button" onClick={() => setIsEditing(false)} className={styles.cancelButton}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile