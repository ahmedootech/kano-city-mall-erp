

export type VendorType = {
  vendor_guarantor: any;
  id: number;
  fullName: string;
  phoneNo: string;
  alternateNo: string;
  email: string;
  currentAddress: string;
  parmanentAddress: string;
  nationality: string;
  state_id: number;
  gender: string;
  meansOfId: string;
  IDNumber: string;
  status: number;
  created_at: string;
  updated_at: string;
  code: string;
  account_bal: number;
  guarantorInfo:{
  guarantorFullName: string;
  guarantorPhoneNo: string;
  guarantorAlternateNo: string;
  guarantorEmail: string;
  guarantorCurrentAddress: string;
  }

   state: {
    id: number;
    name: string;
    created_at: string | null;
    updated_at: string | null;
  };
 
};


export type VendorFormData = {
  vendorPersonalInfo: {
    fullName: string;
    phoneNo: string;
    alternateNo: string;
    email: string;
    currentAddress: string;
    parmanentAddress: string;
    nationality: string;
    state_id: number;
    gender: string;
    meansOfId: string;
    IDNumber?: string;
   
  };
  guarantorInfo:{
  guarantorFullName: string;
  guarantorPhoneNo: string;
  guarantorAlternateNo: string;
  guarantorEmail: string;
  guarantorCurrentAddress: string;
  }
};

export type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

export type PaginatedData<T> = {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[]; // This is now required
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};
export type GetVendorsResponse = {
  success: boolean;
  data: PaginatedData<VendorType>;
  message: string;
};

export type stateType = {
  id: number;
  name: string;
};


export type TenancyType = {
  id: number;
  vendor_id: number;
  shop_id: number;
  business_type_id: number;
  tenancy_type_id: number;
  business_description: string;
  commissionPercentage: number;
  code: string;
  noOfRenewal: number;
  comment: string | null;
  reg_date: string;
  user_id: number;
  status: string;
  current_status: number;
  created_at: string;
  updated_at: string;
  vendor: {
    id: number;
    fullName: string;
    phoneNo: string;
    alternateNo: string;
    email: string;
    currentAddress: string;
    parmanentAddress: string;
    nationality: string;
    state_id: number;
    gender: string;
    meansOfId: string;
    IDNumber: string;
    status: number;
    created_at: string;
    updated_at: string;
    code: string;
    account_bal: number;
  };
  shop: {
    id: number;
    shopNo: string;
    description: string;
    dimension: string | null;
    floor_id: number;
    shop_type_id: number;
    section_id: number;
    status: string;
    created_at: string;
    updated_at: string;
    code: string;
  };
  business_type: {
    id: number;
    name: string;
    description: string;
    status: number;
    created_at: string;
    updated_at: string;
  };
  tenancy_type: {
    id: number;
    name: string;
    description: string;
    status: number;
    created_at: string;
    updated_at: string;
  };
  user: {
    uuid: string;
    first_name: string;
    sur_name: string;
    email: string;
    phone_no: string;
    date_of_birth: string;
    role_id: number;
    email_verified_at: string | null;
    status: number;
    last_seen_at: string;
  };
};

export type GetTenancyResponse = {
  success: boolean;
  data: PaginatedData<TenancyType>;
  message: string;
};


export type VendorFormSteps = "vendorPersonalInfo" | "guarantorInfo";
