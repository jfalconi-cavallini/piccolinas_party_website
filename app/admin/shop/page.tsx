import { createClient } from "@/lib/supabase/server";
import ShopManager from "@/components/admin/ShopManager";

export default async function AdminShopPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("shop_items")
    .select("*")
    .order("sort_order");

  return <ShopManager initialData={items ?? []} />;
}
