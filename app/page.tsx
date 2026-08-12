import { createClient } from "@/lib/supabase/server";
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

export default async function Home() {
  let galleryImages: { src: string; alt: string }[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("gallery_images")
      .select("public_url, alt")
      .order("sort_order");
    if (data && data.length > 0) {
      galleryImages = data.map((img) => ({ src: img.public_url, alt: img.alt }));
    }
  } catch {
    // Supabase not configured — falls back to local images in Gallery
  }

  return (
    <>
      <VideoBackground />
      <Nav />
      <VideoHero />
      <Marquee />
      <Story />
      <Services />
      <Rentals />
      <Gallery supabaseImages={galleryImages} />
      <Shop />
      <Testimonials />
      <Banner />
      <Contact />
      <Footer />
    </>
  );
}
