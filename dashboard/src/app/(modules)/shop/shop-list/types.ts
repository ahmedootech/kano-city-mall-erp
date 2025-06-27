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

export type Tenancy = {
  id: number;
  vendor_id: number;
  shop_id: number;
  business_type_id: number;
  tenancy_type_id: number;
  business_description: string;
  commissionPercentage: number | null;
  code: string;
  noOfRenewal: number;
  comment: string | null;
  reg_date: string;
  user_id: number;
  status: string;
  current_status: number;
  created_at: string;
  updated_at: string;
};


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
  code: string;
  reserved_tenancy: Tenancy | null;  
  active_tenancy: Tenancy | null;   
}


export type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

export type PaginationMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type PaginatedShops = {
  data: Shop[];
} & PaginationMeta;
