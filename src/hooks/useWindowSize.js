import { useEffect, useState } from "react"

const useWindowSize = () => {
    // inicializo con undefined para manejar server-side rendering
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    })

    useEffect(() => {
        // función para actualizar el tamaño
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // ejecuto
        handleResize();

        // agrego event listener
        window.addEventListener('resize', handleResize)

        // limpio el event listener
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return windowSize
}

export default useWindowSize;