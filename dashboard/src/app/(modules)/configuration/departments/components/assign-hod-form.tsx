import {
  ChangeEvent,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Department } from "../types";
import { getApiClientInstance } from "@/utils/axios/axios-client";
import SubmitButton from "@/app/components/form-controls/submit-button";
import Loading from "@/app/(modules)/components/ui/loading";

const AssignHODForm: React.FC<{
  department?: Department | null;
  setRefetch: Dispatch<SetStateAction<boolean>>;
}> = ({ department, setRefetch }) =>
  // { department = null, setRefetch }
  {
    const [successMessage, setSuccessMessage] = useState<string | undefined>(
      undefined
    );
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
      undefined
    );
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [employees, setEmployees] = useState<any[]>([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
      null
    );
    const api = getApiClientInstance();

    useEffect(() => {
      const getEmployees = async () => {
        setLoading(true);
        try {
          const res = await api.get("/employees");
          setEmployees(res.data.data.data);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };

      getEmployees();
    }, [api]);

    const handleAssignHOD: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();
      if (!selectedEmployeeId || !department) {
        setErrorMessage(
          "Please select an employee and ensure department is loaded."
        );
        return;
      }

      setSubmitLoading(true);
      setSuccessMessage(undefined);
      setErrorMessage(undefined);
      console.log(department);
      // return;
      try {
        await api.post(`/departments/assign-department-head`, {
          department_id: department.id + "",
          employee_id: selectedEmployeeId,
        });

        setSuccessMessage("HOD assigned successfully!");
        setRefetch((prev) => !prev); // trigger refetch outside
      } catch (err: any) {
        console.log(err);
        setErrorMessage(
          err?.response?.data?.message ||
            "Failed to assign HOD. Please try again."
        );
      } finally {
        setSubmitLoading(false);
      }
    };

    const handleEmployeeSearch = async (e: ChangeEvent<HTMLInputElement>) => {
      const searchVal = e.target.value;
      if (searchVal.length > 3) {
        try {
          const res = await api.get(`/employees/search/${searchVal}`);
          setEmployees(res.data.data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    const handleEmployeeSelect = (e: ChangeEvent<HTMLInputElement>) => {
      setSelectedEmployeeId(e.target.value);
    };

    return (
      <section className="tw-text-md">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="" className="text-primary fw-semibold mb-1">
                Search Employee
              </label>
              <input
                type="search"
                className="form-control p-2 rounded-3"
                placeholder="Search by name"
                onChange={handleEmployeeSearch}
              />
            </div>
            <form action="" onSubmit={handleAssignHOD}>
              <h4 className="fs-6 my-3 text-primary">
                All Department Employees
              </h4>
              <div className="">
                {employees.map((employee, i) => (
                  <label className="form-check-label d-flex gap-2" key={i}>
                    <input
                      type="radio"
                      name="hod"
                      className="form-check-input"
                      value={employee.id}
                      onChange={handleEmployeeSelect}
                    />
                    {employee.first_name} {employee.last_name}
                  </label>
                ))}
              </div>
              <SubmitButton
                title="Assign"
                loading={submitLoading}
                className="btn-danger w-100 mt-5 mb-4"
              />
              {successMessage && (
                <p className="text-success text-center">{successMessage}</p>
              )}
              {errorMessage && (
                <p className="text-danger text-center">{errorMessage}</p>
              )}
            </form>
          </>
        )}
      </section>
    );
  };

export default AssignHODForm;
