import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext()

export const useWishList = () => {
    const context = useContext(WishlistContext)
    if (!context) {
        throw new Error('useWishlist debe usarse dentro del WishlistProvider')
    }
    return context
}

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([])

    //cargar wishlist del localStorage al iniciar
    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist')
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist))
        }
    }, [])

    // guadar wishlist en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }, [wishlist])

    // agrego producto a wishlist
    const addToWishlist = (product) => {
        setWishlist(prev => {
            //verifico si ya existe
            const exist = prev.some(item => item.id === product.id)
            if (exist) {
                return prev // no hago nada si ya existe
            }

            //agrego solo los datos necesarios
            return [...prev, {
                id: product.id,
                name: product.name,
                price: product.price,
                offerPrice: product.offerPrice,
                image: product.images[0],
                category: product.category
            }];
        })
    }

    // elimino producto de wishlist
    const removeFromWishlist = (productId) => {
        setWishlist(prev => prev.filter(item => item.id === productId))
    }

    // verifico si un pproducto está en wishlist
    const isInWishlist = (productId) => {
        return wishlist.some(item => item.id === productId)
    }

    // vacio wishlist
    const clearWishlist = () => {
        setWishlist([])
    }

    // obtengo cantidad total
    const getTotalItems = () => {
        return wishlist.length
    }

    const value = {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        getTotalItems
    }

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
}