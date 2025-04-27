import * as yup from "yup";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SubmitButton from "@/app/components/form-controls/submit-button";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { EmployeeFormData, EmployeeFormSteps, EmployeeType } from "../../types";
import Select from "@/app/components/form-controls/select";
import { Department } from "@/app/(modules)/configuration/departments/types";
import { getApiClientInstance } from "@/utils/axios/axios-client";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { employeeDefaultData } from "../../data";

const DepartmentRole: FC<{
  employee?: EmployeeType | null;
  employeeData: EmployeeFormData;
  setEmployeeData: Dispatch<SetStateAction<EmployeeFormData>>;
  setStep: Dispatch<SetStateAction<EmployeeFormSteps>>;
  setRefetch: Dispatch<SetStateAction<boolean>>;
}> = ({ employee, employeeData, setStep, setRefetch, setEmployeeData }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const api = getApiClientInstance();

  useEffect(() => {
    const getData = async () => {
      try {
        const departmentsRes = await api.get("/departments");
        const jobsRes = await api.get("/jobs");
        setDepartments(departmentsRes.data.data.data);
        setJobs(jobsRes.data.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  const nextOfKinSchema = yup.object().shape({
    department_id: yup.string().required("Employee department required"),
    job_description_id: yup.string().required("Last name required"),
  });

  const methods = useForm<FieldValues | any>({
    defaultValues: employeeData.departmentRole,
    resolver: yupResolver(nextOfKinSchema),
  });

  const handleSubmit = async (data: typeof employeeData.departmentRole) => {
    setErrorMessage(undefined);
    setSuccessMessage(undefined);
    try {
      setLoading(true);
      const payload = {
        first_name: employeeData.personalInfo.first_name,
        last_name: employeeData.personalInfo.last_name,
        email: employeeData.personalInfo.email,
        phone: employeeData.personalInfo.phone,
        dob: employeeData.personalInfo.dob,
        nin: employeeData.personalInfo.nin,
        home_address: employeeData.personalInfo.home_address,
        department_id: data.department_id,
        job_description_id: data.job_description_id,
        nok_first_name: employeeData.nextOfKin.nok_first_name,
        nok_last_name: employeeData.nextOfKin.nok_last_name,
        nok_phone: employeeData.nextOfKin.nok_phone,
        nok_relationship: employeeData.nextOfKin.nok_relationship,
        nok_address: employeeData.nextOfKin.nok_address,
        nok_nin: employeeData.nextOfKin.nok_nin,
        nationality: "Nigeria",
      };

      await api.post("/employees", payload);
      setRefetch(true);
      setEmployeeData(employeeDefaultData);
      methods.reset(employeeDefaultData.departmentRole);
      // setStep("personalInfo");wwwwwwwwww

      setSuccessMessage("New Employee Added Successfully.");
    } catch (err) {
      setErrorMessage("Error on Creating Employee!");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h4 className="fs-6 text-primary my-4">DEPARTMENT/ROLE</h4>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Select
          name="department_id"
          label="Department"
          control={methods.control}
        >
          <option value="">---Choose Department---</option>
          {departments.map((department, i) => (
            <option key={i} value={department.id}>
              {department.name}
            </option>
          ))}
        </Select>

        <Select
          name="job_description_id"
          label="Job Description"
          control={methods.control}
        >
          <option value="">---Choose Job Description---</option>
          {jobs.map((job, i) => (
            <option key={i} value={job.id}>
              {job.name}
            </option>
          ))}
        </Select>

        <SubmitButton
          loading={loading}
          title={employee ? "Update Staff" : "Create Employee"}
          className={`${
            employee ? "btn-primary" : "btn-danger"
          } w-100 mt-4 mb-5`}
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
          onClick={() => setStep("nextOfKin")}
        />
      </form>
    </section>
  );
};
export default DepartmentRole;
