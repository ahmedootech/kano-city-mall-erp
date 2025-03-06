"use client";
import { MdAdd, MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { Modal } from "react-bootstrap";

import PageHeader from "../../components/page-header";
import { useEffect, useState } from "react";
import RolesPermissionsForm from "./components/role-permission-form";
import { getApiClientInstance } from "@/utils/axios/axios-client";
import { Role } from "./types";
import { FormGroup, Input } from "reactstrap";
import Loading from "../../components/ui/loading";
import { toast } from "react-toastify";

const RolesPermissions = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
 

  const api = getApiClientInstance();
  const handleCloseRoleModal = () => {
    setShowAddRoleModal(false);
  };
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/permissions/get-all-roles");
        setRoles(res.data.data);
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
      <PageHeader title="Roles & Permissions">
        <div className="d-flex gap-2 align-items-center">
          <button className="btn d-flex align-items-center gap-2">
            <IoFilter /> Filter
          </button>
          <input
            type="search"
            className="form-control tw-text-sm"
            placeholder="Search roles"
          />
          <button className="btn btn-outline-danger d-flex align-items-center gap-2">
            <MdDelete />
            Delete
          </button>
          <button
            className="btn btn-warning d-flex align-items-center gap-2 text-nowrap"
            onClick={() => {
              setSelectedRole(null);
              setShowAddRoleModal(true);
            }}
          >
            <MdAdd />
            Add Role
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
                  <th>ROLE NAME</th>
                  {/* <th>MODULES</th> */}
                  {/* <th>PERMISSION</th> */}
                  <th>ACTION</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role: Role, i) => (
                  <tr key={i}>
                    <td>{role.title}</td>
                    {/* <td>
                      {role.modules.length
                        ? role.modules.map((module) => module.name).join(", ")
                        : "Not Set"}
                    </td> */}
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-primary d-flex align-items-center gap-2"
                          onClick={() => {
                            setSelectedRole(role);
                            setShowAddRoleModal(true);
                          }}
                        >
                          <FaRegEdit />
                          Edit
                        </button>
                        <button className="btn btn-danger d-flex align-items-center gap-2">
                          <MdDelete /> Delete
                        </button>
                      </div>
                    </td>

                    <td>
                      <FormGroup switch>
                        {role.status == 1 ? "Active" : "Inactive"}
                        <Input
                          type="switch"
                          role="switch"
                          title="status"
                          checked={Number(role.status) === 1}
                          onChange={async () => {
                            // const newStatus = e.target.checked ? 1 : 0;
                            // return;
                            try {
                              const response = await api.get(
                                `/permissions/toggle-role-status/${role.id}`
                              );
                              const updatedRole = response.data.data;
                              console.log(response);
                              const updatedRoles: any[] = roles.map((role) =>
                                role.id === updatedRole.id
                                  ? { ...role, status: updatedRole.status }
                                  : role
                              );
                              setRoles(updatedRoles);
                              toast.success(response.data.message);

                              // if (response.data.success) {
                              //   const updatedUsers = users.map((user: User) =>
                              //     user.uuid === row.uuid
                              //       ? { ...user, status: newStatus }
                              //       : user
                              //   );
                              //   setUsers(updatedUsers);
                              // } else {
                              //   console.error("Failed to update status");
                              // }
                            } catch (error) {
                              console.error(
                                "Error updating market status:",
                                error
                              );
                            }
                          }}
                        />
                      </FormGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <Modal show={showAddRoleModal} onHide={handleCloseRoleModal} centered>
        <Modal.Header
          closeButton
          className="align-items-center border-bottom-0"
        >
          <Modal.Title
            className={`text-center text-${
              selectedRole ? "primary" : "danger"
            } w-100 !tw-text-base`}
          >
            {selectedRole
              ? "Edit Roles & Permissions"
              : "Create Roles and Permissions"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RolesPermissionsForm role={selectedRole} setRefetch={setRefetch} setShowParentModal={setShowAddRoleModal} />
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default RolesPermissions;
