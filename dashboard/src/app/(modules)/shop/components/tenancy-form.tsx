import React, {
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  useEffect,
} from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CircularProgress } from "@mui/material";
import { getApiClientInstance } from "@/utils/axios/axios-client";
import { handleYupErrors } from "@/utils/yup-form-helpers";
import CustomInput from "@/app/components/form-controls/input";
import Select from "@/app/components/form-controls/select";
import { toast } from "react-toastify";
import { TenancyFormData } from "../../tenancy/tenancy-list/types";
import { Shop } from "../shop-list/types";
import { debounce } from "lodash";

const defaultValues = {
  vendor_id: "",
  vendor_name: "",
  business_description: "",
  business_type_id: "",
  tenancy_type_id: "",
  shop_id: "",
  commissionPercentage: "",
  comment: "",
  // reg_date: new Date().toISOString().split("T")[0],
  reg_date: ""
};

const TenancyForm: React.FC<{
  shop?: Shop | null;
  setRefetch: Dispatch<SetStateAction<boolean>>;
}> = ({ shop = null, setRefetch }) => {
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [businessTypes, setBusinessTypes] = useState<any[]>([]);
  const [tenancyTypes, setTenancyTypes] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const api = getApiClientInstance();

  const shopSchema = yup.object().shape({
    business_type_id: yup.string().required("Please select business type"),
    business_description: yup
      .string()
      .required("Please enter business description"),
    tenancy_type_id: yup.string().required("Please select tenancy type"),
    vendor_id: yup
      .string()
      .required("Please enter a valid vendor code or phone number"),
  });

  const methods = useForm<FieldValues | any>({
    defaultValues,
    resolver: yupResolver(shopSchema),
  });

  const searchVendor = debounce(async (searchValue: string) => {
    if (!searchValue || searchValue.length < 3) {
      methods.setValue("vendor_id", "");
      methods.setValue("vendor_name", "");
      return;
    }

    setSearchLoading(true);
    try {
      const response = await api.get(`/tenancy/search-vendor/${searchValue}`);
      if (response.data.success && response.data.data.length > 0) {
        const vendor = response.data.data[0];
        methods.setValue("vendor_id", vendor.id);
        methods.setValue("vendor_name", vendor.fullName);
      } else {
        methods.setValue("vendor_id", "");
        methods.setValue("vendor_name", "");
        methods.setError("vendor_search", {
          type: "manual",
          message: "Vendor not found",
        });
      }
    } catch (error: any) {
      methods.setValue("vendor_id", "");
      methods.setValue("vendor_name", "");
      methods.setError("vendor_search", {
        type: "manual",
        message: error.response?.data?.message || "Error searching for vendor",
      });
    } finally {
      setSearchLoading(false);
    }
  }, 500);

  const handleVendorSearchChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    methods.setValue("vendor_search", value);
    searchVendor(value);
  };

  useEffect(() => {
    const fetchAllBusinessTypes = async () => {
      try {
        const response = await api.get("/tenancy/get-all-business-types");
        if (response.data.success) {
          setBusinessTypes(response.data.data);
        } else {
          toast.error("Failed to fetch business types");
        }
      } catch (error: any) {
        toast.error("Error fetching business types", error);
      }
    };

    const fetchAllTenancyTypes = async () => {
      try {
        const response = await api.get("/tenancy/get-all-tenancy-types");
        if (response.data.success) {
          setTenancyTypes(response.data.data);
        } else {
          toast.error("Failed to fetch tenancy types");
        }
      } catch (error: any) {
        toast.error("Error fetching tenancy types", error);
      }
    };

    fetchAllBusinessTypes();
    fetchAllTenancyTypes();
  }, []);

  const handleBusinessTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    methods.setValue("business_type_id", value, { shouldValidate: true });
  };

  const handleTenancyTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    methods.setValue("tenancy_type_id", value, { shouldValidate: true });
  };

  const handleSubmit = async (data: TenancyFormData) => {
    setLoading(true);
    setSuccessMessage(undefined);
    setErrorMessage(undefined);

    try {
       const vendorId = methods.getValues("vendor_id");
      const payload = {
        comment: data.comment,
        vendor_id: String(vendorId), 
        business_description: data.business_description,
        business_type_id: String(data.business_type_id),
        tenancy_type_id: String(data.tenancy_type_id),
        shop_id: shop?.id ? String(shop.id) : "", 
        commissionPercentage: String(data.commissionPercentage),
        reg_date: data.reg_date || new Date().toISOString().split("T")[0],
      };
      console.log("Payload:", payload);
      await api.post("/tenancy/add-new-tenancy", payload);
      setSuccessMessage("Tenancy created successfully");
      methods.reset(defaultValues);
      setRefetch(true);
    } catch (err: any) {
      console.log(err);
      if (err.message) {
        setErrorMessage(err.message);
        return;
      }
      const errors = err.response?.data?.errors;
      if (typeof errors === "object") {
        handleYupErrors({
          formFields: data,
          serverError: errors,
          yupSetError: methods.setError,
        });
      } else {
        setErrorMessage(err.response?.data?.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-3">
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <div className="pb-5 mb-5">
          <div className="mb-3">
            <CustomInput
              label="Enter Vendor Code or Phone number"
              name="vendor_search"
              control={methods.control}
              type="text"
              placeholder="Code or phone number"
              onChange={handleVendorSearchChange}
            />
            {searchLoading && (
              <div className="text-muted small">Searching for vendor...</div>
            )}

            {methods.watch("vendor_name") && (
              <div className="mt-2">
                <strong>Vendor:</strong> {methods.watch("vendor_name")}
              </div>
            )}
            {methods.formState.errors.vendor_search && (
              <div className="text-danger small">
                {
                  methods.formState.errors.vendor_search
                    .message as React.ReactNode
                }
              </div>
            )}
          </div>

          <Select
            label="Business Type"
            name="business_type_id"
            control={methods.control}
            onChange={handleBusinessTypeChange}
          >
            <option value="">Select Business Type</option>
            {businessTypes.map((businessType) => (
              <option key={businessType.id} value={businessType.id}>
                {businessType.name}
              </option>
            ))}
          </Select>

          <Select
            label="Tenancy Type"
            name="tenancy_type_id"
            control={methods.control}
            onChange={handleTenancyTypeChange}
          >
            <option value="">Select Tenancy Type</option>
            {tenancyTypes.map((tenancyType) => (
              <option key={tenancyType.id} value={tenancyType.id}>
                {tenancyType.name}
              </option>
            ))}
          </Select>

          <CustomInput
                        label="Date of Tenancy"
                        name="reg_date"
                        control={methods.control}
                        type="date"
                        placeholder="Date"
                      />

          <CustomInput
            label="Comment"
            name="comment"
            control={methods.control}
            type="textarea"
            placeholder="Comment"
            rows={2}
          />

          <CustomInput
            label="Business Description"
            name="business_description"
            control={methods.control}
            type="textarea"
            placeholder="Business Description"
            rows={4}
          />

          <button
            type="submit"
            className="btn btn-danger w-100 mt-5 mb-4"
            disabled={loading || searchLoading}
          >
            {loading ? (
              <CircularProgress className="text-white" size={14} />
            ) : (
              "Create Tenancy"
            )}
          </button>

          {successMessage && (
            <p className="text-success text-center">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-danger text-center">{errorMessage}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default TenancyForm;
