"use client";
import { MdAdd } from "react-icons/md";
import { Input } from "reactstrap";
import { FaRegEdit } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { Modal } from "react-bootstrap";
import PageHeader from "../../components/page-header";
import { useEffect, useState } from "react";
import { getApiClientInstance } from "@/utils/axios/axios-client";
import Loading from "../../components/ui/loading";
import { PaginatedData, VendorType } from "./types";
import VendorForm from "../components/vendor-form";
import ViewVendor from "../components/view-vendor";

const Vendors = () => {
  const [vendor, setVendor] = useState<any[]>([]);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<VendorType | null>(null);
  const [pagination, setPagination] =
    useState<PaginatedData<VendorType> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showViewVendorModal, setShowViewVendorModal] = useState(false);
  const api = getApiClientInstance();
  const handleCloseVendorModal = () => {
    setShowAddVendorModal(false);
  };

  const handleCloseViewVendorModal = () => {
    setShowViewVendorModal(false);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/tenancy/get-all-vendors");

        setVendor(res.data.data.data);
        setPagination(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
        setRefetch(false);
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, currentPage]);
  return (
    <section>
      <PageHeader title="Vendors">
        <div className="d-flex gap-2 align-items-center">
          <button className="btn d-flex align-items-center gap-2">
            <IoFilter /> Filter
          </button>
          <input
            type="search"
            className="form-control tw-text-sm"
            placeholder="Search vendors by code,phone."
          />
          {/* <button className="btn btn-outline-danger d-flex align-items-center gap-2">
            <MdDelete />
            Archieve
          </button> */}
          <button
            className="btn btn-warning d-flex align-items-center gap-2 text-nowrap"
            onClick={() => {
              setSelectedVendor(null);
              setShowAddVendorModal(true);
            }}
          >
            <MdAdd />
            Add Vendor
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
                  <th className="py-3 px-4 text-left">
                    {/* <Input
                      type="checkbox"
                      className="rounded border-gray-300"
                      // checked={selectedUsers.length === users.length}
                      // onChange={() => console.log("selected")}
                    />  */}
                  </th>

                  <th>Full Name</th>
                  <th>code</th>
                  <th>Phone</th>
                  <th>Email</th>

                  <th className="!tw-text-green-500">Current Address</th>
                  <th className="!tw-text-green-500">Nationality</th>
                  <th className=" !tw-text-red-500">ACTION</th>
                  <th className=" !tw-text-green-500">DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {vendor?.map((vendor: VendorType, i) => (
                  <tr key={i}>
                    <td>
                      <Input type="checkbox" />
                    </td>
                    <td>{vendor.fullName}</td>
                    <td>{vendor.code}</td>
                    <td>{vendor.email}</td>
                    <td>{vendor.phoneNo}</td>
                    <td>{vendor.currentAddress}</td>
                    <td>{vendor.nationality}</td>

                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-primary d-flex align-items-center gap-2"
                          onClick={() => {
                            setSelectedVendor(vendor);
                            setShowAddVendorModal(true);
                          }}
                        >
                          <FaRegEdit />
                          Edit
                        </button>
                      </div>
                    </td>
                    <td>
                      <div
                        className="!tw-text-green-500 cursor-pointer"
                        onClick={() => {
                          setSelectedVendor(vendor);
                          setShowViewVendorModal(true);
                        }}
                      >
                        DETAILS
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {pagination && pagination.links.length > 0 && (
              <nav className="mt-4 d-flex justify-content-center">
                <ul className="pagination">
                  {pagination.links.map((link, index) => (
                    <li
                      key={index}
                      className={`page-item ${link.active ? "active" : ""} ${
                        !link.url ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        onClick={() => {
                          if (link.url) {
                            const pageMatch = link.url.match(/page=(\d+)/);
                            if (pageMatch) {
                              setCurrentPage(Number(pageMatch[1]));
                            }
                          }
                        }}
                        disabled={!link.url}
                      />
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </section>
      )}

      <Modal
        show={showAddVendorModal}
        onHide={handleCloseVendorModal}
        centered
        size="lg"
      >
        <Modal.Header
          closeButton
          // className="align-items-center border-bottom-0"
          className="my-0 py-0 pt-3 border-bottom-0"
        ></Modal.Header>
        <Modal.Body>
          <VendorForm vendor={selectedVendor} setRefetch={setRefetch} />
        </Modal.Body>
      </Modal>

      <Modal
        show={showViewVendorModal}
        onHide={handleCloseViewVendorModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="my-0 py-0 pt-3 border-bottom-0">
          <Modal.Title className="text-primary text-center w-100 !tw-text-md">
            Vendor Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVendor && <ViewVendor vendor={selectedVendor} />}
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Vendors;
