import { mujerProducts } from "./mujer/mujer";
import { hombreProducts } from "./hombre/hombre"

export const products = {
    mujer: mujerProducts,
    hombre: hombreProducts,
    all: [...mujerProducts, ...hombreProducts]
} 

// helpper para filtrar por categoría
export const getProductsByCategory = (category, subcategoria = null, tipo = null) => {
    let filtered = products.all.filter(p => p.category === category)
    if(subcategoria) {
        filtered = filtered.filter(p => p.subcategoria === subcategoria)
    }
    if(tipo){
        filtered = filtered.filter(p => p.tipo === tipo)
    }
    return filtered
}

// helper para productos en oferta
export const getOfferProducts = () => {
    return products.all.filter(p => p.offerPrice !== null)
}

// helper para productos destacados
export const getFeaturedProducts = () => {
    return products.all.filter(p => p.destacado)
}

// helper para productos por categoría específica de hombre
export const getHombreByProductsByTipo = (tipo) => {
    return hombreProducts.filter(p => p.tipo === tipo)
}

// helper para productos por categoría específica de mujer
export const getMujerByProductsByTipo = (tipo) => {
    return mujerProducts.filter(p => p.tipo === tipo)
}