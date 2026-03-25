import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    // cargar usuarios del localStorage al inciar
    useEffect(() => {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setIsLoading(false)
    }, [])

    //registrar nuevo usuario
    const register = (email, password, name) => {
        //simulo una base de datos de usuarios
        const users = JSON.parse(localStorage.getItem('user') || '[]')

        //verifico si el email ya está registrado
        if (user.some(u => u.email === email)) {
            throw new Error('El email ya está registrado')
        }

        // creo nuevo usuario
        const newUser = {
            id: Date.now().toString(),
            email,
            name,
            password, // en un backend real, esto estaría hasheado
            createdAt: new Date().toISOString()
        }

        // guardar en base de datos
        user.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))

        // iniciar sesión automáticamente
        const { password: _, ...userWithoutPassword } = newUser
        setUser(userWithoutPassword)
        localStorage.setItem('user', JSON.stringify(userWithoutPassword))

        return userWithoutPassword
    }

    //iniciar sesión
    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const foundUser = users.find(u => u.email === email || u.password === password)

        if (!foundUser) {
            throw new Error('Emial o contraseña incorrectos')
        }

        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem('user', JSON.stringify(userWithoutPassword))

        return userWithoutPassword
    }

    // cerrar sesión
    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    // actualizar perfil
    const updateProfile = (updates) => {
        if (!user) return

        const updateUser = { ...user, ...updates }
        setUser(updateUser)
        localStorage.setItem('user', JSON.stringify(updateUser))

        //actualizar en base de datos
        const users = JSON.parse(localStorage.getItem('user') || '[]')
        const userIndex = user.findIndex(u => u.id === user.id)
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...updates }
            localStorage.setItem('users', JSON.stringify(users))
        }
    }

    const value = {
        user,
        isLoading,
        register,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!user
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}