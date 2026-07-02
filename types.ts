export interface Service {
  id: string;
  name: string;
  category: "hair" | "skin" | "makeup" | "nails" | "grooming";
  price: string;
  description: string;
  icon: string; // Key of LucideIcon or FontAwesome class
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  snippet: string;
  date: string;
  avatar: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}
