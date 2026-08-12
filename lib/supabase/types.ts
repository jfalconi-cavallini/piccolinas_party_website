export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      gallery_images: {
        Row: {
          id: string;
          storage_path: string;
          public_url: string;
          alt: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          storage_path: string;
          public_url: string;
          alt: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          storage_path?: string;
          public_url?: string;
          alt?: string;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      services: {
        Row: {
          id: string;
          title: string;
          subtitle: string;
          description: string;
          image_url: string;
          is_featured: boolean;
          sort_order: number;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          subtitle: string;
          description: string;
          image_url: string;
          is_featured?: boolean;
          sort_order?: number;
          active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          subtitle?: string;
          description?: string;
          image_url?: string;
          is_featured?: boolean;
          sort_order?: number;
          active?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      shop_items: {
        Row: {
          id: string;
          name: string;
          category: "decorations" | "foamcutouts" | "pinatas";
          image_url: string;
          badge: string | null;
          sort_order: number;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: "decorations" | "foamcutouts" | "pinatas";
          image_url: string;
          badge?: string | null;
          sort_order?: number;
          active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: "decorations" | "foamcutouts" | "pinatas";
          image_url?: string;
          badge?: string | null;
          sort_order?: number;
          active?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          quote: string;
          author: string;
          event_type: string;
          sort_order: number;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          quote: string;
          author: string;
          event_type: string;
          sort_order?: number;
          active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          quote?: string;
          author?: string;
          event_type?: string;
          sort_order?: number;
          active?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export type GalleryImage  = Database["public"]["Tables"]["gallery_images"]["Row"];
export type Service       = Database["public"]["Tables"]["services"]["Row"];
export type ShopItem      = Database["public"]["Tables"]["shop_items"]["Row"];
export type Testimonial   = Database["public"]["Tables"]["testimonials"]["Row"];
