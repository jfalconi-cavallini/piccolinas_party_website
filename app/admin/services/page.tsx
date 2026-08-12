import { createClient } from "@/lib/supabase/server";
import ServicesManager from "@/components/admin/ServicesManager";

export default async function AdminServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("sort_order");

  return <ServicesManager initialData={services ?? []} />;
}
