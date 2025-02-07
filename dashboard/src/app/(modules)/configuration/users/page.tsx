"use client";
import { useEffect, useState, useCallback } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { Modal } from "react-bootstrap";
import { FormGroup, Input } from "reactstrap";
import PageHeader from "../../components/page-header";
import Loading from "../../components/ui/loading";
import { getApiClientInstance } from "@/utils/axios/axios-client";
import UserregistrationForm from "./components/user-form";
import React from "react";

interface User {
  uuid: string;
  first_name: string;
  sur_name: string;
  email: string;
  phone_no: string;
  date_of_birth: string;
  status: number;
  last_seen_at: string | null;
  role: string;
  role_id: number;
  modules: Record<string, any>;
}

const User = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const api = getApiClientInstance();

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleSelectUser = (uuid: string) => {
    setSelectedUsers((prev) => {
      if (prev.includes(uuid)) {
        return prev.filter((id) => id !== uuid);
      } else {
        return [...prev, uuid];
      }
    });
  };

  const handleStatusChange = async (uuid: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.uuid === uuid
          ? { ...user, status: user.status === 1 ? 0 : 1 }
          : user
      )
    );

    try {
      const res = await api.patch(`/users/toggle-user-status/${uuid}`);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const refreshUsers = useCallback(async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.data);
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await refreshUsers();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [refreshUsers]);

  return (
    <section>
      <PageHeader title="Users">
        <div className="d-flex gap-2 align-items-center">
          <button className="btn d-flex align-items-center gap-2">
            <IoFilter /> Filter
          </button>
          <input type="search" className="form-control tw-text-sm" />
          <button className="btn btn-outline-danger d-flex align-items-center gap-2">
            <MdDelete />
            Delete
          </button>
          <button
            className="btn btn-warning d-flex align-items-center gap-2 text-nowrap"
            onClick={() => setShowModal(true)}
          >
            <MdAdd />
            Add User
          </button>
        </div>
      </PageHeader>
      {loading ? (
        <Loading />
      ) : (
        <section className="pt-4">
          <div className="table-responsive mt-4">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th className="py-3 px-4 text-left">
                    {/* <Input
                      type="checkbox"
                      className="rounded border-gray-300"
                      // checked={selectedUsers.length === users.length}
                      onChange={() => console.log("selected")}
                    /> */}
                  </th>
                  <th>FIRST NAME</th>
                  <th>LAST NAME</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>

                  <th className="!tw-text-green-500">ROLE</th>
                  <th className=" !tw-text-red-500">ACTION</th>

                  <th className=" !tw-text-green-500">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.uuid} className="align-middle">
                    <td className="py-4 px-4">
                      <Input
                        type="checkbox"
                        checked={selectedUsers.includes(user.uuid)}
                        onChange={() => handleSelectUser(user.uuid)}
                      />
                    </td>
                    <td>{user.first_name}</td>
                    <td>{user.sur_name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone_no}</td>
                    <td className=" !tw-text-green-500">{user.role}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-primary d-flex align-items-center gap-2"
                          onClick={() => handleEdit(user)}
                        >
                          <FaRegEdit /> Edit
                        </button>
                      </div>
                    </td>
                    <td>
                      <FormGroup switch>
                        <span
                          className={
                            user.status === 1
                              ? "!tw-text-green-500"
                              : "!tw-text-red-500"
                          }
                        ></span>

                        <span
                          className={`text-sm ${
                            user.status === 1
                              ? "!tw-text-green-500"
                              : "!tw-text-red-500"
                          }`}
                        >
                          {user.status === 1 ? "Active" : "Inactive"}
                        </span>
                        <Input
                          type="switch"
                          role="switch"
                          title="status"
                          checked={user.status === 1}
                          onChange={() => handleStatusChange(user.uuid)}
                          className={`${
                            user.status === 1
                              ? "!tw-bg-green-500"
                              : "!tw-bg-red-500"
                          }`}
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header
          closeButton
          className="align-items-center border-bottom-0"
        >
          <Modal.Title
            className={`text-center text-${
              selectedUser ? "primary" : "danger"
            } w-100 !tw-text-base`}
          >
            {selectedUser ? "Edit User" : "Create User"}
            {selectedUser ? (
              <p className="text-muted small mt-1">Update user information.</p>
            ) : (
              <p className="text-muted small mt-1">
                Please fill the form below with appropriate info!
              </p>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserregistrationForm
            user={selectedUser}
            onSuccess={() => {
              handleCloseModal();
              refreshUsers();
            }}
          />
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default User;
