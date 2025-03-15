import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PersonalInfo from "./personal-info";
import { EmployeeFormData, EmployeeFormSteps, EmployeeType } from "../../types";
import { employeeDefaultData } from "../../data";
import NextOfKin from "./next-of-kin";
import DepartmentRole from "./department-role";

const EmployeeForm: React.FC<{
  employee?: EmployeeType | null;
  setRefetch: Dispatch<SetStateAction<boolean>>;
}> = ({ employee, setRefetch }) => {
  const [employeeData, setEmployeeData] =
    useState<EmployeeFormData>(employeeDefaultData);
  const [step, setStep] = useState<EmployeeFormSteps>("personalInfo");

  useEffect(() => {
    console.log(employeeData);
  }, [employeeData]);
  return (
    <section className="tw-text-md container">
      {employee ? (
        <div className="text-center mb-3">
          <h2 className="fs-6 text-primary my-0">Edit Employee</h2>
          <p className="tw-text-sm my-0">Update Employee Information</p>
        </div>
      ) : (
        <div className="text-center mb-3">
          <h2 className="fs-6 text-danger my-0">Create New Staff</h2>
          <p className="tw-text-sm my-0">
            Fill the Input below with the Appropriate Info!
          </p>
        </div>
      )}
      <div className="row">
        <div className="col-lg-8">
          {step === "personalInfo" && (
            <PersonalInfo
              employee={employee}
              employeeData={employeeData}
              setEmployeeData={setEmployeeData}
              setStep={setStep}
            />
          )}
          {step === "nextOfKin" && (
            <NextOfKin
              employee={employee}
              employeeData={employeeData}
              setEmployeeData={setEmployeeData}
              setStep={setStep}
            />
          )}

          {step === "departmentRole" && (
            <DepartmentRole
              employee={employee}
              employeeData={employeeData}
              setEmployeeData={setEmployeeData}
              setStep={setStep}
              setRefetch={setRefetch}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default EmployeeForm;
