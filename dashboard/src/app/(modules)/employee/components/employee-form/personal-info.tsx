import * as yup from "yup";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "@/app/components/form-controls/input";
import SubmitButton from "@/app/components/form-controls/submit-button";
import { Dispatch, FC, SetStateAction } from "react";
import { EmployeeFormData, EmployeeFormSteps, EmployeeType } from "../../types";

const PersonalInfo: FC<{
  employee?: EmployeeType | null;
  employeeData: EmployeeFormData;
  setEmployeeData: Dispatch<SetStateAction<EmployeeFormData>>;
  setStep: Dispatch<SetStateAction<EmployeeFormSteps>>;
}> = ({ employee, employeeData, setEmployeeData, setStep }) => {
  const personalInfoSchema = yup.object().shape({
    first_name: yup.string().required("First name required"),
    last_name: yup.string().required("Last name required"),
    email: yup.string().required("Email address required"),
    phone: yup.string().required("Phone required"),
    home_address: yup.string().required("Home address required"),
    dob: yup.string(),
    nin: yup.string(),
  });

  const methods = useForm<FieldValues | any>({
    defaultValues: employeeData.personalInfo,
    resolver: yupResolver(personalInfoSchema),
  });

  const handleSubmitPersonalInfo = (data: typeof employeeData.personalInfo) => {
    setEmployeeData((prev) => ({ ...prev, personalInfo: data }));
    setStep("nextOfKin");
  };

  return (
    <section>
      <h4 className="fs-6 text-primary my-4">PERSONAL INFOMATION</h4>
      <form onSubmit={methods.handleSubmit(handleSubmitPersonalInfo)}>
        <CustomInput
          name="first_name"
          label="First Name"
          control={methods.control}
          type="string"
        />
        <CustomInput
          name="last_name"
          label="Last Name"
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
          name="phone"
          label="Phone"
          control={methods.control}
          type="string"
        />
        <CustomInput
          name="dob"
          label="DOB"
          control={methods.control}
          type="date"
        />
        <CustomInput
          name="home_address"
          label="Home Address"
          control={methods.control}
          type="string"
        />
        <CustomInput
          name="nin"
          label="NIN"
          control={methods.control}
          type="string"
        />

        <SubmitButton
          title={employee ? "Next" : "Proceed"}
          className={`${
            employee ? "btn-primary" : "btn-danger"
          } w-100 mt-4 mb-5`}
        />
      </form>
    </section>
  );
};
export default PersonalInfo;
