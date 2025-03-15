import {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Department } from "../types";
import { getApiClientInstance } from "@/utils/axios/axios-client";
import { CircularProgress } from "@mui/material";
import SubmitButton from "@/app/components/form-controls/submit-button";

const AssignHODForm: React.FC<{
  department?: Department | null;
  setRefetch: Dispatch<SetStateAction<boolean>>;
}> = () =>
  // { department = null, setRefetch }
  {
    const [
      successMessage,
      // setSuccessMessage
    ] = useState<string | undefined>(undefined);
    const [
      errorMessage,
      // setErrorMessage
    ] = useState<string | undefined>(undefined);
    const [
      loading,
      // setLoading
    ] = useState(false);
    const [employees, setEmployees] = useState<any[]>([]);
    const api = getApiClientInstance();

    useEffect(() => {
      const getEmployees = async () => {
        try {
          const res = await api.get("/employees");
          console.log(res);
          setEmployees(res.data.data.data);
        } catch (err) {
          console.log(err);
        }
      };

      getEmployees();
    }, []);

    const handleAssignHOD: FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      console.log("Form submittted");
    };
    return (
      <section className="tw-text-md">
        <form action="" onSubmit={handleAssignHOD}>
          <div className="form-group">
            <label htmlFor="" className="text-primary fw-semibold mb-1">
              Search Employee
            </label>
            <input
              type="search"
              className="form-control p-2 rounded-3"
              placeholder="Search by name"
            />
          </div>
          <h4 className="fs-6 my-3">All Department Employees</h4>
          <div className="">
            {employees.map((employee, i) => (
              <label className="form-check-label d-flex gap-2" key={i}>
                <input type="radio" name="hod" className="form-check-input" />
                {employee.first_name} {employee.last_name}
              </label>
            ))}
          </div>
          <SubmitButton
            title="Assign"
            loading={loading}
            className="btn-danger w-100 mt-5 mb-4"
          />
          {successMessage && (
            <p className="text-success text-center">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-danger text-center">{errorMessage}</p>
          )}
        </form>
      </section>
    );
  };

export default AssignHODForm;
