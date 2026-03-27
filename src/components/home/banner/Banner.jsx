import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './Banner.module.scss';

const Banner = () => {
  const [activeTab, setActiveTab] = useState('hombre');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // para pausar autoplay

  // defino banners según la pestaña activa
  const getBanners = () => {
    if (activeTab === 'hombre') {
      return [
        { 
          image: '/banners/hombre/sacos-banner.avif', 
          title: 'SACOS', 
          subtitle: 'Elegancia clásica',
          description: 'Descubrí nuestra colección de sacos para ocasiones especiales',
          link: '/hombre?categoria=abrigos&subcategoria=sacos'
        },
        { 
          image: '/banners/hombre/relojes-banner.avif', 
          title: 'RELOJES', 
          subtitle: 'Precisión y estilo',
          description: 'Los mejores diseños para cada momento',
          link: '/hombre?categoria=accesorios&subcategoria=relojes'
        }
      ];
    }
    // mujer
    return [
      { 
        image: '/banners/mujer/blazer-banner.avif', 
        title: 'BLAZERS', 
        subtitle: 'Sofisticación femenina',
        description: 'Elegancia y estilo para destacar en cualquier ocasión',
        link: '/mujer?categoria=blazers'
      },
      { 
        image: '/banners/mujer/vestidos-banner.avif', 
        title: 'VESTIDOS', 
        subtitle: 'Para cada ocasión',
        description: 'Encontrá el vestido perfecto para vos',
        link: '/mujer?categoria=vestidos-monos'
      }
    ];
  };

  const banners = getBanners();
  const currentBanner = banners[currentIndex];

  // reseteo índice al cambiar de pestaña
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  // autoplay (se pausa al hacer hover)
  useEffect(() => {
    if (banners.length <= 1 || isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [banners.length, activeTab, isHovered]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const handleButtonClick = () => {
    window.location.href = currentBanner.link;
  };

  if (banners.length === 0) return null;

  return (
    <section className={styles.bannerWrapper}>
      {/* pestañas para seleccionar Hombre/Mujer */}
      <div className={styles.bannerTabs}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'hombre' ? styles.active : ''}`}
          onClick={() => setActiveTab('hombre')}
        >
          Hombre
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'mujer' ? styles.active : ''}`}
          onClick={() => setActiveTab('mujer')}
        >
          Mujer
        </button>
      </div>

      <div 
        className={styles.banner} 
        style={{ backgroundImage: `url(${currentBanner.image})` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* botones de navegación */}
        {banners.length > 1 && (
          <>
            <button className={styles.prevButton} onClick={goToPrev}>
              <FiChevronLeft size={32} />
            </button>
            <button className={styles.nextButton} onClick={goToNext}>
              <FiChevronRight size={32} />
            </button>
            <div className={styles.dots}>
              {banners.map((_, idx) => (
                <span
                  key={idx}
                  className={`${styles.dot} ${idx === currentIndex ? styles.active : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          </>
        )}

        <div className={styles.bannerContent}>
          <h1 className={styles.bannerTitle}>{currentBanner.title}</h1>
          <p className={styles.bannerSubtitle}>{currentBanner.subtitle}</p>
          
          {/* descripción que aparece en desktop (hover) */}
          <div className={styles.bannerDescription}>
            <p>{currentBanner.description}</p>
          </div>
          
          <button className={styles.bannerButton} onClick={handleButtonClick}>
            Ver colección
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;