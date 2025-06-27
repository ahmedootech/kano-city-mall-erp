import * as yup from "yup";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "@/app/components/form-controls/input";
import SubmitButton from "@/app/components/form-controls/submit-button";
import { Dispatch, FC, SetStateAction } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import {
  VendorType,
  VendorFormSteps,
  VendorFormData,
} from "../../../tenancy/vendor-list/types";
import React from "react";
import { getApiClientInstance } from "@/utils/axios/axios-client";
import { vendorDefaultData } from "../../data";
const GuarantoInfo: FC<{
  vendor?: VendorType | null;
  vendorData: VendorFormData;
  setVendorData: Dispatch<SetStateAction<VendorFormData>>;
  setRefetch: Dispatch<SetStateAction<boolean>>;
  setStep: Dispatch<SetStateAction<VendorFormSteps>>;
}> = ({ vendor, vendorData, setVendorData, setStep, setRefetch }) => {
  const api = getApiClientInstance();

  const [loading, setLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState<
    string | undefined
  >(undefined);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
    undefined
  );
  const personalInfoSchema = yup.object().shape({
    guarantorFullName: yup.string().required("Full name required"),
    guarantorPhoneNo: yup.string().required("Phone required"),
    guarantorCurrentAddress: yup.string().required("Home address required"),
  });

  const methods = useForm<FieldValues | any>({
    defaultValues: vendorData.guarantorInfo,
    resolver: yupResolver(personalInfoSchema),
  });

 React.useEffect(() => {
    if (vendorData.guarantorInfo) {
      methods.reset(vendorData.guarantorInfo);
    }
  }, [vendorData.guarantorInfo, methods]);

// const handleSubmit = async (data: typeof vendorData.guarantorInfo) => {
//   setErrorMessage(undefined);
//   setSuccessMessage(undefined);
//   try {
//     setLoading(true);

//     const payload = {
//       fullName: vendorData.vendorPersonalInfo.fullName,
//       phoneNo: vendorData.vendorPersonalInfo.phoneNo,
//       alternateNo: vendorData.vendorPersonalInfo.alternateNo,
//       email: vendorData.vendorPersonalInfo.email,
//       currentAddress: vendorData.vendorPersonalInfo.currentAddress,
//       parmanentAddress: vendorData.vendorPersonalInfo.parmanentAddress,
//       nationality: vendorData.vendorPersonalInfo.nationality,
//       state_id: vendorData.vendorPersonalInfo.state_id,
//       gender: vendorData.vendorPersonalInfo.gender,
//       meansOfId: vendorData.vendorPersonalInfo.meansOfId,
//       IDNumber: vendorData.vendorPersonalInfo.IDNumber,
//       guarantorInfo: {
//         guarantorFullName: data.guarantorFullName,
//         guarantorPhoneNo: data.guarantorPhoneNo,
//         guarantorAlternateNo: data.guarantorAlternateNo,
//         guarantorEmail: data.guarantorEmail,
//         guarantorCurrentAddress: data.guarantorCurrentAddress,
//       },
//     };

//     if (vendor && vendor.id) {
     
//       await api.put(`/tenancy/update-vendor/${vendor.id}`, payload);
//       setSuccessMessage("Vendor updated successfully.");
//     } else {
   
//       await api.post("/tenancy/add-new-vendor", {
//         ...payload,
//         ...payload.guarantorInfo,
//       });
//       setSuccessMessage("New Vendor Added Successfully.");
//     }

//     setRefetch(true);
//     setVendorData(vendorDefaultData);
//     methods.reset(vendorDefaultData.guarantorInfo);
//   } catch (err) {
//     setErrorMessage(vendor ? "Error updating vendor!" : "Error creating vendor!");
//     console.error(err);
//   } finally {
//     setLoading(false);
//   }
// };

const handleSubmit = async (data: typeof vendorData.guarantorInfo) => {
  setErrorMessage(undefined);
  setSuccessMessage(undefined);
  try {
    setLoading(true);

    const payload = {
      fullName: vendorData.vendorPersonalInfo.fullName,
      phoneNo: vendorData.vendorPersonalInfo.phoneNo,
      alternateNo: vendorData.vendorPersonalInfo.alternateNo,
      email: vendorData.vendorPersonalInfo.email,
      currentAddress: vendorData.vendorPersonalInfo.currentAddress,
      parmanentAddress: vendorData.vendorPersonalInfo.parmanentAddress,
      nationality: vendorData.vendorPersonalInfo.nationality,
      state_id: vendorData.vendorPersonalInfo.state_id,
      gender: vendorData.vendorPersonalInfo.gender,
      meansOfId: vendorData.vendorPersonalInfo.meansOfId,
      IDNumber: vendorData.vendorPersonalInfo.IDNumber,
      ...data, // ✅ flatten guarantor fields at top level
    };

    if (vendor && vendor.id) {
      await api.put(`/tenancy/update-vendor/${vendor.id}`, payload);
      setSuccessMessage("Vendor updated successfully.");
    } else {
      await api.post("/tenancy/add-new-vendor", payload);
      setSuccessMessage("New Vendor Added Successfully.");
    }

    setRefetch(true);
    setVendorData(vendorDefaultData);
    methods.reset(vendorDefaultData.guarantorInfo);
  } catch (err) {
    setErrorMessage(vendor ? "Error updating vendor!" : "Error creating vendor!");
    console.error(err);
  } finally {
    setLoading(false);
  }
};



  return (
    <section>
      <h4 className="fs-6 text-primary my-4">PERSONAL INFOMATION</h4>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <CustomInput
          name="guarantorFullName"
          label="Guarantor Full Name"
          control={methods.control}
          type="string"
        />

        <CustomInput
          name="guarantorEmail"
          label="Guarantor Email"
          control={methods.control}
          type="email"
        />
        <CustomInput
          name="guarantorPhoneNo"
          label="Guarantor Phone Number"
          control={methods.control}
          type="string"
        />

        <CustomInput
          name="guarantorAlternateNo"
          label="Guarantor Alternative Phone Number"
          control={methods.control}
          type="string"
        />
        <CustomInput
          name="guarantorCurrentAddress"
          label="Current Address"
          control={methods.control}
          type="string"
        />

        <SubmitButton
          loading={loading}
          title={vendor ? "Update Vendor" : "Create Vendor"}
          className={`${vendor ? "btn-primary" : "btn-danger"} w-100 mt-4 mb-5`}
        />

        {successMessage && (
          <div className="d-flex flex-column align-items-center">
            <IoCheckmarkCircleOutline className="text-success" size={48} />

            <p className="text-success text-center">{successMessage}</p>
          </div>
        )}
        {errorMessage && (
          <div className="d-flex flex-column align-items-center">
            <MdOutlineCancel className="text-danger" size={48} />
            <p className="text-danger text-center">{errorMessage}</p>
          </div>
        )}

        <SubmitButton
          type="button"
          title="Previous"
          action="back"
          className="btn-light border mb-4"
          onClick={() => setStep("vendorPersonalInfo")}
        />
      </form>
    </section>
  );
};

export default GuarantoInfo;
