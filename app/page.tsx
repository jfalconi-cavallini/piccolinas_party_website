import Nav from "@/components/Nav";
import VideoBackground from "@/components/VideoBackground";
import VideoHero from "@/components/VideoHero";
import Marquee from "@/components/Marquee";
import Story from "@/components/Story";
import Services from "@/components/Services";
import Rentals from "@/components/Rentals";
import Gallery from "@/components/Gallery";
import Shop from "@/components/Shop";
import Testimonials from "@/components/Testimonials";
import Banner from "@/components/Banner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <VideoBackground />
      <Nav />
      <VideoHero />
      <Marquee />
      <Story />
      <Services />
      <Rentals />
      <Gallery />
      <Shop />
      <Testimonials />
      <Banner />
      <Contact />
      <Footer />
    </>
  );
}
