"use client";
// import { MdAdd, MdDelete } from "react-icons/md";
import { Input } from "reactstrap";
import { FaRegEdit } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { Modal } from "react-bootstrap";
import PageHeader from "../../components/page-header";
import { useEffect, useState } from "react";
import { getApiClientInstance } from "@/utils/axios/axios-client";
import Loading from "../../components/ui/loading";
import { TenancyType } from "../vendor-list/types";

import { useRouter } from "next/navigation";
const Tenancy = () => {
  const router = useRouter();
  const [tenancy, setTenancy] = useState<TenancyType[]>([]);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddShopModal, setShowAddShopModal] = useState(false);
  // const [tenancy, setTenancy] = useState<TenancyType[]>([]);
  const [selectedTenancy] = useState<TenancyType | null>(null);

  const api = getApiClientInstance();
  const handleCloseShopModal = () => {
    setShowAddShopModal(false);
  };

  const handleReserveClick = () => {
    router.push("/shop/shop-list"); // Redirect to shop list page
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/tenancy/get-tenancy-list");

        setTenancy(res.data.data.data);
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
      <PageHeader title="Tenancy List">
        <div className="d-flex gap-2 align-items-center">
          <button className="btn d-flex align-items-center gap-2">
            <IoFilter /> Filter
          </button>
          <input
            type="search"
            className="form-control tw-text-sm"
            placeholder="Search shops"
          />
          {/* <button className="btn btn-outline-danger d-flex align-items-center gap-2">
            <MdDelete />
            Archieve
          </button> */}
          <button
            className="btn btn-warning d-flex align-items-center gap-2 text-nowrap"
            onClick={handleReserveClick}
          >
            {/* <MdAdd /> */}
            Reserve
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
                      onChange={() => console.log("selected")}
                    /> */}
                  </th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th className="!tw-text-green-500">Email</th>
                  <th className="!tw-text-green-500">Address</th>
                  <th className="!tw-text-green-500">Nationality</th>
                  <th className=" !tw-text-red-500">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {tenancy?.map((tenancy: TenancyType, i) => (
                  <tr key={i}>
                    <td>
                      <Input type="checkbox" />
                    </td>
                    <td>{tenancy.vendor_id}</td>
                    <td>{tenancy.vendor.fullName}</td>
                    {/* <td>{tenancy.business_type}</td> */}
                    <td>{tenancy.commissionPercentage}</td>
                    {/* <td>{}</td>
                     */}
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-primary d-flex align-items-center gap-2"
                          onClick={() => {
                            // setSelectedShop(shop);
                            setShowAddShopModal(true);
                          }}
                        >
                          <FaRegEdit />
                          Edit
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

      <Modal show={showAddShopModal} onHide={handleCloseShopModal} centered>
        <Modal.Header
          closeButton
          className="align-items-center border-bottom-0"
        >
          <Modal.Title
            className={`text-center text-${
              selectedTenancy ? "primary" : "danger"
            } w-100 !tw-text-base`}
          >
            {selectedTenancy ? "Edit Tenancy" : "Create New Tenancy"}
            {selectedTenancy ? (
              <p className="text-muted small mt-1"></p>
            ) : (
              <p className="text-muted small mt-1">
                Please fill the input below with appropriate info!
              </p>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
    </section>
  );
};

export default Tenancy;
