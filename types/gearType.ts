export interface GearCategory {
  id: string;
  category_name: string;
  image: string | null;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface GearProvider {
  id: string,
  name: string,
  email: string,
  role: string,
  status: string,
  created_at: string,
  updated_at: string
}

export interface GearItem {
  id: string;
  provider_id: string;
  category_id: string;
  name: string;
  product_image: string;
  description: string;
  brand: string;
  is_available: boolean;
  condition: string;
  daily_price: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  category: GearCategory;
}

export interface GearItemDetails {
  id: string;
  provider_id: string;
  category_id: string;
  name: string;
  product_image: string;
  description: string;
  brand: string;
  is_available: boolean;
  condition: string;
  daily_price: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  category: GearCategory;
  provider: GearProvider
}

type ListingGear = {
  id: string;
  provider_id: string;
  category_id: string;
  name: string;
  product_image: string;
  description: string;
  brand: string;
  is_available: boolean;
  condition: string;
  daily_price: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  category_name: string;
}

export type ListingGearProps = [
  ListingGear
]

