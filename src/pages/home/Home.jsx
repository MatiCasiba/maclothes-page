
import Banner from '../../components/home/banner/Banner';
import BrandSlider from '../../components/home/brandsSlider/BrandSlider';
import FeaturedSection from '../../components/home/featuredSection/FeaturedSection';
import OfferSection from '../../components/home/offerSection/OfferSection';
import Testimonials from '../../components/home/testimonials/Testimonials';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.home}>
      <Banner />
      <BrandSlider />
      <FeaturedSection />
      <OfferSection />
      <Testimonials />
    </div>
  );
};

export default Home;