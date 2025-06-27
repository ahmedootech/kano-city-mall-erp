import { FC } from "react";
import { EmployeeType } from "../types";

const ViewEmployee: FC<{ employee: EmployeeType }> = ({ employee }) => {
  return (
    <section className="container tw-text-sm">
      <div className="row">
        <div className="col-lg-8">
          <h5 className="tw-text-sm text-primary border-bottom pb-1 mb-3">
            PERSONAL INFORMATION
          </h5>
          <div className="mb-3">
            <p className="my-1">First Name : {employee.first_name} </p>
            <p className="my-1">Last Name : {employee.last_name} </p>
            <p className="my-1">Email : {employee.email} </p>
            <p className="my-1">Phone : {employee.phone} </p>
            <p className="my-1">
              DOB : {new Date(employee.dob).toLocaleDateString()}{" "}
            </p>
            <p className="my-1">Address : {employee.home_address} </p>
            <p className="my-1">NIN : {employee.nin || "N/A"} </p>
          </div>

          <h5 className="tw-text-sm text-primary border-bottom pb-1 mb-3">
            NEXT OF KIN INFORMATION
          </h5>
          <div className="mb-3">
            <p className="my-1">
              First Name : {employee.next_of_kin.first_name}{" "}
            </p>
            <p className="my-1">
              Last Name : {employee.next_of_kin.last_name}{" "}
            </p>
            <p className="my-1">
              Next Of Kin Phone : {employee.next_of_kin.phone}{" "}
            </p>
            <p className="my-1">Address : {employee.next_of_kin.address} </p>
            <p className="my-1">
              Relationship : {employee.next_of_kin.relationship}{" "}
            </p>
            <p className="my-1">NIN : {employee.next_of_kin.nin || "N/A"} </p>
          </div>

          <h5 className="tw-text-sm text-primary border-bottom pb-1 mb-3">
            DEPARTMENT/ROLE
          </h5>
          <div className="mb-3">
            <p className="my-1">Department : {employee.department.name} </p>
            <p className="my-1">Job : {employee.job_description.name} </p>
          </div>

          <h5 className="tw-text-sm text-primary border-bottom pb-1 mb-3">
            STATUS
          </h5>
          <div className="mb-3">
            <p className="my-1 ">
              <span
                className={`
                  ${
                    employee.status == 1 ? "text-success" : "text-danger"
                  } fw-semibold
                `}
              >
                {employee.status == 1 ? "Active" : "Deactivated"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewEmployee;
