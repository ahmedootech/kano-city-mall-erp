export type ShopTypes = {
  id?: number;
  shopNo: string;
  description: string;
  floor_id: string;
  shop_type_id: string;
  section_id: string;
  status?: number | string;
}

export type Floor = {
  id: number;
  name: string;
  description: string;
  noOfShops: number;
  status: number;
  created_at: string;
  updated_at: string;
}

export type ShopType = {
  id: number;
  name: string;
  description: string;
  maintenanceFee: number;
  tenancyFee: number;
  status: number;
  created_at: string;
  updated_at: string;
}


export type Section = {
  id: number;
  name: string;
  description: string;
  status: number;
  created_at: string;
  updated_at: string;
}


export type Shop = {
  id: number;
  shopNo: string;
  description: string;
  floor_id: number;
  shop_type_id: number;
  section_id: number;
  status: string;
  created_at: string;
  updated_at: string;
  floor: Floor;
  shop_type: ShopType;
  section: Section;
}