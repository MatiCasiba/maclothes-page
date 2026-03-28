import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import styles from './Login.module.scss'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const user = await login(email, password)
            navigate('/', {replace: true})
        } catch (error) {
            setError(error.message)
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginCard}>
                <h1>Iniciar sesión</h1>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" disabled={isLoading} className={styles.loginButton}>
                        {isLoading ? 'Iniciando sesión...' : 'Ingresar'}
                    </button>
                </form>

                <p className={styles.registerLink}>
                    ¿No tenés cuenta? <Link to="/register">Registrate</Link>
                </p>
            </div>
        </div>
    )
}

export default Login