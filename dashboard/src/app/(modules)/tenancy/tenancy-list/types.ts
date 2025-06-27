export type TenancyFormData = {
  vendor_id: string | number;
  floor_id: string | number;
  business_description: string;
  business_type_id: string | number;
  tenancy_type_id: string | number;
  shop_id: string | number;
  commissionPercentage: string | number;
  comment: string;
  id?: number | null;
  reg_date: string;
};