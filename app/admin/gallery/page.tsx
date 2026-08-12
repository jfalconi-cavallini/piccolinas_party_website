import { createClient } from "@/lib/supabase/server";
import GalleryManager from "@/components/admin/GalleryManager";

export default async function AdminGalleryPage() {
  const supabase = await createClient();
  const { data: images } = await supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order");

  return <GalleryManager initialData={images ?? []} />;
}
