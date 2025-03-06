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
import { Department } from "./types";
import DepartmentForm from "./components/department-form";

const Departments = () => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddDepartmentModal, setShowAddDepartmentModal] = useState(false);
  const [selectedDepartment, setSelectedDepartemt] =
    useState<Department | null>(null);

  const api = getApiClientInstance();
  const handleCloseRoleModal = () => {
    setShowAddDepartmentModal(false);
  };
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/departments");
        setDepartments(res.data.data.data);
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
      <PageHeader title="Departments">
        <div className="d-flex gap-2 align-items-center">
          <button className="btn d-flex align-items-center gap-2">
            <IoFilter /> Filter
          </button>
          <input
            type="search"
            className="form-control tw-text-sm"
            placeholder="Search Departments"
          />
          <button className="btn btn-outline-danger d-flex align-items-center gap-2">
            <MdDelete />
            Delete
          </button>
          <button
            className="btn btn-warning d-flex align-items-center gap-2 text-nowrap"
            onClick={() => {
              setSelectedDepartemt(null);
              setShowAddDepartmentModal(true);
            }}
          >
            <MdAdd />
            Add Department
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
                  <th>DEPARTMENT</th>
                  <th>NO OF STAFF</th>
                  <th>DESCRIPTION</th>
                  <th>HEAD OF DEPARTMENT</th>
                  <th>ACTION</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((department: Department, i) => (
                  <tr key={i}>
                    <td>{department.name}</td>
                    <td>{department.max_employee_no}</td>
                    <td>{department.description}</td>
                    <td>N/A</td>

                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-primary d-flex align-items-center gap-2"
                          onClick={() => {
                            setSelectedDepartemt(department);
                            setShowAddDepartmentModal(true);
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
                      <div className="d-flex align-items-center">
                        <FormGroup switch>
                          {department.status == 1 ? "Active" : "Inactive"}
                          <Input
                            type="switch"
                            role="switch"
                            title="status"
                            checked={Number(department.status) === 1}
                            onChange={async () => {
                              try {
                                const response = await api.patch(
                                  `/departments/toggle-department-status/${department.uuid}`
                                );

                                const updatedDepartment = response.data.data;
                                const updatedDepartments: any[] =
                                  departments.map((department) =>
                                    department.id === updatedDepartment.id
                                      ? {
                                          ...department,
                                          status: updatedDepartment.status,
                                        }
                                      : department
                                  );
                                setDepartments(updatedDepartments);
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

                        <button className="btn">View</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <Modal show={showAddDepartmentModal} onHide={handleCloseRoleModal} centered>
        <Modal.Header
          closeButton
          className="align-items-center border-bottom-0"
        >
          <Modal.Title
            className={`text-center text-${
              selectedDepartment ? "primary" : "danger"
            } w-100 !tw-text-base`}
          >
            {selectedDepartment
              ? "Edit Department"
              : "Create New Department"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DepartmentForm department={selectedDepartment} setRefetch={setRefetch} />
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Departments;
