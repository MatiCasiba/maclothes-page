import { createContext, useContext, useEffect, useState } from 'react';

// creo el contexto
const CartContext = createContext()

//hook personalizado para usar el carrito
export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart debe usarse dentro de CartProvider')
    }
    return context
}

// Provider del carrito
export const CartProvider = ({ children }) => {
    // estado del carrito
    //const [cart, setCart] = useState([])
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart')
        return savedCart ? JSON.parse(savedCart) : []
    })
    const [isCartOpen, setIsCartOpen] = useState(false)

    // cargar carrito del localStorage al iniciar
    useEffect(() => {
        const savedCart = localStorage.getItem('cart')
        console.log('Cargando carrito al inciar: ', savedCart)
        if (savedCart) {
            setCart(JSON.parse(savedCart))
        }
    }, [])

    // guardar carrito en localStorage cuando cambie
    useEffect(() => {
        console.log('Guardando carrito: ', cart)
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    // agrego producto al carrito
    const addToCart = (product, quantity = 1, talle = '', color = '') => {
        console.log('Agegando al carrito', { product, quantity, talle, color });
        setCart(prevCart => {
            //verifico si el producto ya existe (mismo id, talle y color)
            const existingItemIndex = prevCart.findIndex(
                item => item.id === product.id &&
                    item.talle === talle &&
                    item.color === color
            )

            if (existingItemIndex >= 0) {
                //si existe, actualizo cantidad
                const updatedCart = [...prevCart]
                updatedCart[existingItemIndex].quantity += quantity
                return updatedCart
            } else {
                //si no existe, agrego nuevo item
                return [...prevCart, {
                    id: product.id,
                    name: product.name,
                    price: product.offerPrice || product.price,
                    originalPrice: product.price,
                    image: product.image || (product.images && product.images[0] || '/placeholder.jpg'),
                    talle,
                    color,
                    quantity,
                    category: product.category
                }]
            }
        })

        setIsCartOpen(true)
    }

    // elimino producto del carrito
    const removeFromCart = (itemId, talle, color) => {
        setCart(prevCart =>
            prevCart.filter(item =>
                !(item.id === itemId && item.talle === talle && item.color === color)
            )
        )
    }

    // actualizo cantidad
    const updateQuantity = (itemId, talle, color, newQuantity) => {
        if (newQuantity < 1) return;

        setCart(prevCart =>
            prevCart.map(item =>
                item.id === itemId && item.talle === talle && item.color === color
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    // vacio el carrito
    const clearCart = () => {
        setCart([])
    }

    // calculo del total de items
    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0)
    }

    // calculo del subtotal
    const getSubtotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // valor a exportar
    const value = {
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getSubtotal
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
} 