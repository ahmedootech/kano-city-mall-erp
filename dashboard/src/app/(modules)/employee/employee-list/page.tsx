"use client";
import { MdAdd, MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { Modal } from "react-bootstrap";

import PageHeader from "../../components/page-header";
import { useEffect, useState } from "react";
import { getApiClientInstance } from "@/utils/axios/axios-client";

import { FormGroup, Input } from "reactstrap";
import Loading from "../../components/ui/loading";
import { toast } from "react-toastify";
import { EmployeeType } from "../types";
import EmployeeForm from "../components/employee-form";
import ViewEmployee from "../components/view-employee";

const ListOfEmployees = () => {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showViewEmployeeModal, setShowViewEmployeeModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType | null>(
    null
  );

  const api = getApiClientInstance();
  const handleCloseEmployeementModal = () => {
    setShowAddEmployeeModal(false);
  };

  const handleCloseViewEmployeementModal = () => {
    setShowViewEmployeeModal(false);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/employees");
        console.log(res);
        setEmployees(res.data.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
        setRefetch(false);
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);
  return (
    <section>
      <PageHeader title="Employee Management">
        <div className="d-flex gap-2 align-items-center">
          <button className="btn d-flex align-items-center gap-2">
            <IoFilter /> Filter
          </button>
          <input
            type="search"
            className="form-control tw-text-sm"
            placeholder="Search Employees"
          />
          <button className="btn btn-outline-danger d-flex align-items-center gap-2">
            <MdDelete />
            Delete
          </button>
          <button
            className="btn btn-warning d-flex align-items-center gap-2 text-nowrap"
            onClick={() => {
              setSelectedEmployee(null);
              setShowAddEmployeeModal(true);
            }}
          >
            <MdAdd />
            Add Employee
          </button>
        </div>
      </PageHeader>

      {loading ? (
        <Loading />
      ) : (
        <section className="pt-4">
          <div className="table-responsive mt-4">
            <table className="table table-sm align-middle">
              <thead>
                <tr>
                  <th>FIRSTNAME</th>
                  <th>LASTNAME</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>
                  <th className="text-success">ROLE</th>
                  <th className="text-danger">ACTION</th>
                  <th className="text-success">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee: EmployeeType, i) => (
                  <tr key={i}>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.job_description.name}</td>

                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-primary d-flex align-items-center gap-2 py-0"
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setShowAddEmployeeModal(true);
                          }}
                        >
                          <FaRegEdit />
                          Edit
                        </button>
                        {/* <button className="btn btn-danger d-flex align-items-center gap-2">
                          <MdDelete /> Delete
                        </button> */}
                      </div>
                    </td>

                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span
                          className={
                            employee.status == 1
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {employee.status == 1 ? "Active" : "Deactivated"}
                        </span>
                        <FormGroup switch>
                          <Input
                            type="switch"
                            role="switch"
                            title="status"
                            className={
                              employee.status == 1
                                ? "custom-switch-active"
                                : "custom-switch-inactive"
                            }
                            checked={Number(employee.status) === 1}
                            onChange={async () => {
                              try {
                                const response = await api.patch(
                                  `/employees/toggle-employee-status/${employee.uuid}`
                                );

                                const updatedEmployee = response.data.data;
                                const updatedEmployees: EmployeeType[] =
                                  employees.map((employee) =>
                                    employee.id === updatedEmployee.id
                                      ? {
                                          ...employee,
                                          status: updatedEmployee.status,
                                        }
                                      : employee
                                  );
                                setEmployees(updatedEmployees);
                                toast.success(response.data.message);
                              } catch (error) {
                                console.error(
                                  "Error updating market status:",
                                  error
                                );
                              }
                            }}
                          />
                        </FormGroup>

                        <button
                          className="btn text-success px-0"
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setShowViewEmployeeModal(true);
                          }}
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <Modal
        show={showAddEmployeeModal}
        onHide={handleCloseEmployeementModal}
        centered
        size="lg"
      >
        <Modal.Header
          closeButton
          className="my-0 py-0 pt-3 border-bottom-0"
        ></Modal.Header>
        <Modal.Body>
          <EmployeeForm employee={selectedEmployee} setRefetch={setRefetch} />
        </Modal.Body>
      </Modal>

      <Modal
        show={showViewEmployeeModal}
        onHide={handleCloseViewEmployeementModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="my-0 py-0 pt-3 border-bottom-0">
          <Modal.Title className="text-primary text-center w-100 !tw-text-md">
            Employees Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee && <ViewEmployee employee={selectedEmployee} />}
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default ListOfEmployees;
