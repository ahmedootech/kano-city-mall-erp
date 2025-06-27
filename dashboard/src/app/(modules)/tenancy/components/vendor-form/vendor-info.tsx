import * as yup from "yup";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "@/app/components/form-controls/input";
import SubmitButton from "@/app/components/form-controls/submit-button";
import { Dispatch, FC, SetStateAction } from "react";
import Select from "@/app/components/form-controls/select";
import {
  VendorType,
  VendorFormSteps,
  VendorFormData,
  stateType,
} from "../../../tenancy/vendor-list/types";
import { getApiClientInstance } from "@/utils/axios/axios-client";
import React from "react";
import { vendorDefaultData } from "../../data";

const VendorInfo: FC<{
  vendor?: VendorType | null;
  vendorData: VendorFormData;
  setVendorData: Dispatch<SetStateAction<VendorFormData>>;
  setStep: Dispatch<SetStateAction<VendorFormSteps>>;
}> = ({ vendor, vendorData, setVendorData, setStep }) => {
  const api = getApiClientInstance();
  const [states, setStates] = React.useState<stateType[]>([]);
  const personalInfoSchema = yup.object().shape({
    fullName: yup.string().required("Full name required"),
    phoneNo: yup.string().required("Phone required"),
    currentAddress: yup.string().required("Home address required"),
  });

  const methods = useForm<FieldValues | any>({
    defaultValues: vendorData.vendorPersonalInfo,
    resolver: yupResolver(personalInfoSchema),
  });

  React.useEffect(() => {
  methods.reset(vendorData.vendorPersonalInfo);
}, [vendorData.vendorPersonalInfo]);


  React.useEffect(() => {
    const getData = async () => {
      try {
        const stateRes = await api.get("/activities/get-all-states");
        setStates(stateRes.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  // const handleSubmitPersonalInfo = (
  //   data: typeof vendorData.vendorPersonalInfo
  // ) => {
  //   setVendorData((prev) => ({ ...prev, vendorPersonalInfo: data }));
  //   setStep("guarantorInfo");
  // };

  const handleSubmitPersonalInfo = (
  data: typeof vendorData.vendorPersonalInfo
) => {
  setVendorData((prev) => ({
    ...prev,
    vendorPersonalInfo: data,
    // Preserve guarantor info if it exists
    guarantorInfo: prev.guarantorInfo || vendorDefaultData.guarantorInfo
  }));
  setStep("guarantorInfo");
};

  return (
    <section>
      <h4 className="fs-6 text-primary my-4">PERSONAL INFOMATION</h4>
      <form onSubmit={methods.handleSubmit(handleSubmitPersonalInfo)}>
        <CustomInput
          name="fullName"
          label="Full Name"
          control={methods.control}
          type="string"
        />

        <CustomInput
          name="email"
          label="Email"
          control={methods.control}
          type="email"
        />
        <CustomInput
          name="phoneNo"
          label="Phone Number"
          control={methods.control}
          type="string"
        />

        <CustomInput
          name="alternateNo"
          label="Alternative Phone Number"
          control={methods.control}
          type="string"
        />
        <CustomInput
          name="currentAddress"
          label="Current Address"
          control={methods.control}
          type="string"
        />
        <CustomInput
          name="parmanentAddress"
          label="Permanent Address"
          control={methods.control}
          type="string"
        />
        <CustomInput
          name="nationality"
          label="Nationality"
          control={methods.control}
          type="string"
        />
        <CustomInput
          name="meansOfId"
          label="Means of ID"
          control={methods.control}
          type="string"
        />
        <Select name="state_id" label="State" control={methods.control}>
          <option value="">---Choose State---</option>
          {states?.map((state, i) => (
            <option key={i} value={state.id}>
              {state.name}
            </option>
          ))}
        </Select>

        <Select name="gender" label="Gender" control={methods.control}>
          <option value="">---Choose Gender---</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Select>

        <SubmitButton
          title={vendor ? "Next" : "Proceed"}
          className={`${vendor ? "btn-primary" : "btn-danger"} w-100 mt-4 mb-5`}
        />
      </form>
    </section>
  );
};
export default VendorInfo;
