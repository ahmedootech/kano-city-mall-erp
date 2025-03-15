import * as yup from "yup";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "@/app/components/form-controls/input";
import SubmitButton from "@/app/components/form-controls/submit-button";
import { Dispatch, FC, SetStateAction } from "react";
import { EmployeeFormData, EmployeeFormSteps, EmployeeType } from "../../types";

const NextOfKin: FC<{
  employee?: EmployeeType | null;
  employeeData: EmployeeFormData;
  setEmployeeData: Dispatch<SetStateAction<EmployeeFormData>>;
  setStep: Dispatch<SetStateAction<EmployeeFormSteps>>;
}> = ({ employee, employeeData, setEmployeeData, setStep }) => {
  const nextOfKinSchema = yup.object().shape({
    nok_first_name: yup.string().required("First name required"),
    nok_last_name: yup.string().required("Last name required"),
    nok_phone: yup.string().required("Phone required"),
    nok_relationship: yup.string().required("Relationship required"),
    nok_address: yup.string().required("Address required"),
    nok_nin: yup.string(),
  });

  const methods = useForm<FieldValues | any>({
    defaultValues: employeeData.nextOfKin,
    resolver: yupResolver(nextOfKinSchema),
  });

  const handleSubmitPersonalInfo = (data: typeof employeeData.nextOfKin) => {
    setEmployeeData((prev) => ({ ...prev, nextOfKin: data }));
    setStep("departmentRole");
  };

  return (
    <section>
      <h4 className="fs-6 text-primary my-4">NEXT OF KIN INFORMATION</h4>
      <form onSubmit={methods.handleSubmit(handleSubmitPersonalInfo)}>
        <CustomInput
          name="nok_first_name"
          label="First Name"
          control={methods.control}
          type="string"
        />
        <CustomInput
          name="nok_last_name"
          label="Last Name"
          control={methods.control}
          type="string"
        />

        <CustomInput
          name="nok_phone"
          label="Phone"
          control={methods.control}
          type="string"
        />

        <CustomInput
          name="nok_address"
          label="Address"
          control={methods.control}
          type="string"
        />
        <CustomInput
          name="nok_relationship"
          label="Relationship"
          control={methods.control}
          type="string"
        />
        <CustomInput
          name="nok_nin"
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

        <SubmitButton
          type="button"
          title="Previous"
          action="back"
          className="btn-light border mb-4"
          onClick={() => setStep("personalInfo")}
        />
      </form>
    </section>
  );
};
export default NextOfKin;
