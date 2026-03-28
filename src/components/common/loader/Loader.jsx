import { useEffect, useState } from "react"
import styles from "./Loader.module.scss"

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    //oculto el loader después de que la página cargue
    const timer = setTimeout(() => {
        setIsVisible(false)
    }, 1500) // 1.5 segundos

    return () => clearTimeout(timer)
  }, [])

  if(!isVisible) return null

  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.loaderContainer}>
        <div className={styles.logoLoader}>MACLOTHES</div>
        <div className={styles.spinner}></div>
      </div>
    </div>
  )
}

export default Loader