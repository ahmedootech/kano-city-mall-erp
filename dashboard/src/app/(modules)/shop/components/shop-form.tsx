import React, { useState, Dispatch, SetStateAction, ChangeEvent } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CircularProgress } from "@mui/material";
import { getApiClientInstance } from "@/utils/axios/axios-client";
import { handleYupErrors } from "@/utils/yup-form-helpers";
import CustomInput from "@/app/components/form-controls/input";
import { Section, Floor, ShopType, Shop } from "../shop-list/types";
import Select from "@/app/components/form-controls/select";
import { toast } from "react-toastify";
const defaultValues = {
  floor_id: "",
  description: "",
  shop_type_id: "",
  section_id: "",
  shopNo: "",
};

const ShopForm: React.FC<{
  shop?: Shop | null;
  setRefetch: Dispatch<SetStateAction<boolean>>;
}> = ({ shop = null, setRefetch }) => {
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [showConfirm, setShowConfrim] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [floors, setFloors] = useState<Floor[]>([]);
  const [shopTypes, setShopTypes] = useState<ShopType[]>([]);
  const api = getApiClientInstance();

  const shopSchema = yup.object().shape({
    floor_id: yup.string().required("Please select floor"),
    description: yup.string().required("Please enter job description"),
    shop_type_id: yup.string().required("Please select shop type"),
    shopNo: yup.string().required("Please enter shop number"),
  });

  const methods = useForm<FieldValues | any>({
    defaultValues,
    resolver: yupResolver(shopSchema),
  });

  React.useEffect(() => {
    const fetchAllSection = async () => {
      try {
        const response = await api.get("/shops/get-all-sections");
        if (response.data.success) {
          const paginatedData = response.data.data;
          const sectionsData = paginatedData.data;

          const fetchedSections = sectionsData.map((section: any) => ({
            id: section.id,
            name: section.name,
          }));
          setSections(fetchedSections);
        } else {
          toast.error("Failed to fetch sections");
        }
      } catch (error: any) {
        toast.error("Error fetching sections", error);
      }
    };

    const fetchAllFloors = async () => {
      try {
        const response = await api.get("/shops/get-all-floors");
        if (response.data.success) {
          const paginatedData = response.data.data;
          const floorsData = paginatedData.data;

          const fetchedFloors = floorsData.map((floor: any) => ({
            id: floor.id,
            name: floor.name,
          }));
          setFloors(fetchedFloors);
        } else {
          toast.error("Failed to fetch floors");
        }
      } catch (error: any) {
        toast.error("Error fetching floors", error);
      }
    };

    const fetchAllShopTypes = async () => {
      try {
        const response = await api.get("/shops/get-all-shop-types");
        if (response.data.success) {
          const paginatedData = response.data.data;
          const shopTypesData = paginatedData.data;
          const fetchedShopTypes = shopTypesData.map((shoptype: any) => ({
            id: shoptype.id,
            name: shoptype.name,
          }));
          setShopTypes(fetchedShopTypes);
        } else {
          toast.error("Failed to fetch shop types");
        }
      } catch (error: any) {
        toast.error("Error fetching shop types", error);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchAllSection();
    fetchAllFloors();
    fetchAllShopTypes();
  }, []);

  const handleSctionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    methods.setValue("section_id", value, { shouldValidate: true });
  };

  const handleFloorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    methods.setValue("floor_id", value, { shouldValidate: true });
  };

  const handleShoptypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    methods.setValue("shop_type_id", value, { shouldValidate: true });
  };

  React.useEffect(() => {
    if (shop) {
      methods.reset({
        shopNo: shop.shopNo,
        description: shop.description,
        section_id: shop.section.id, 
        floor_id: shop.floor.id, 
        shop_type_id: shop.shop_type.id, 
      });
    } else {
      methods.reset(defaultValues);
    }
  }, [shop, methods]);

  const handleSubmit = async (data: any) => {
    setShowConfrim(false);
    setLoading(true);
    setSuccessMessage(undefined);
    setErrorMessage(undefined);
    try {
      const payload = {
        shopNo: data.shopNo,
        description: data.description,
        shop_type_id: String(data.shop_type_id), 
        section_id: String(data.section_id), 
        floor_id: String(data.floor_id), 
      };

      if (shop) {
        await api.put(`/shops/update-shop/${shop.id}`, payload);
        setSuccessMessage("Shop updated successfully");
      } else {
        await api.post("/shops/create-shop", payload);
        setSuccessMessage("Shop created successfully");
        methods.reset(defaultValues);
      }

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
        {showConfirm ? (
          <div className="pt-1 pb-3 text-center">
            <p>Are you sure you want to update this shop?</p>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-primary px-5" type="submit">
                Yes
              </button>
              <button
                className="btn btn-secondary px-5"
                type="button"
                onClick={() => setShowConfrim(false)}
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <div className="pb-5 mb-5">
            <CustomInput
              label="Shop Number"
              name="shopNo"
              control={methods.control}
              type="text"
              placeholder="Shop number"
            />

            <Select
              label="Floor"
              name="floor_id"
              control={methods.control}
              onChange={handleFloorChange}
            >
              <option value="">Floor</option>
              {floors.map((floor) => (
                <option key={floor.id} value={floor.id}>
                  {floor.name}
                </option>
              ))}
            </Select>
            <Select
              label="Section "
              name="section_id"
              control={methods.control}
              onChange={handleSctionChange}
            >
              <option value="">Section</option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </Select>
            <Select
              label="Shop"
              name="shop_type_id"
              control={methods.control}
              onChange={handleShoptypeChange}
            >
              <option value="">Select Shop type</option>
              {shopTypes.map((shoptype) => (
                <option key={shoptype.id} value={shoptype.id}>
                  {shoptype.name}
                </option>
              ))}
            </Select>
            <CustomInput
              label="Description"
              name="description"
              control={methods.control}
              type="textarea"
              placeholder="Description"
              rows={4}
            />
            <div className="form-group"></div>
            <button
              type={shop ? "button" : "submit"}
              className={`btn btn-${
                shop ? "primary" : "danger"
              } w-100 mt-5 mb-4`}
              onClick={() => {
                if (!shop) return true;
                setShowConfrim(true);
              }}
            >
              {loading ? (
                <CircularProgress className="text-white" size={14} />
              ) : shop ? (
                "Update"
              ) : (
                "Create Shop"
              )}
            </button>

            {successMessage && (
              <p className="text-success text-center">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-danger text-center">{errorMessage}</p>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default ShopForm;
