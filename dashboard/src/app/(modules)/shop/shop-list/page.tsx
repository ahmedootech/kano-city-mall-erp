"use client";
import { MdAdd, MdDelete } from "react-icons/md";
import { Input, FormGroup } from "reactstrap";
import { FaRegEdit } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { Modal } from "react-bootstrap";
import PageHeader from "../../components/page-header";
import { useEffect, useState } from "react";
import { getApiClientInstance } from "@/utils/axios/axios-client";
import Loading from "../../components/ui/loading";
import { Shop } from "./types";
import ShopForm from "../components/shop-form";
import TenancyForm from "../components/tenancy-form";

const Shops = () => {
  const [shops, setShops] = useState<any[]>([]);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddShopModal, setShowAddShopModal] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [showTenancyModal, setShowTenancyModal] = useState(false);
  const [selectedShopForTenancy, setSelectedShopForTenancy] =
    useState<Shop | null>(null);
  const [tenancyToUnreserve, setTenancyToUnreserve] = useState<number | null>(
    null
  );

  const [showConfirm, setShowConfrim] = useState(false);
  const api = getApiClientInstance();
  const handleCloseShopModal = () => {
    setShowAddShopModal(false);
  };

  const handleCloseTenancyModal = () => {
    setShowTenancyModal(false);
  };

  const handleUnreserveTenancy = async (tenancyId: number) => {
    try {
      setLoading(true);
      await api.delete(`/tenancy/unreserve-tenancy/${tenancyId}`);
      setRefetch(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setTenancyToUnreserve(null);
    }
  };

  const handleToggleShopStatus = async (shopId: number) => {
    try {
      setLoading(true);
      const response = await api.patch(`/shops/toggle-shop-status/${shopId}`);
      const updatedShop = response.data.data;

      setShops((prevShops) =>
        prevShops.map((shop) =>
          shop.id === updatedShop.id ? updatedShop : shop
        )
      );
    } catch (error) {
      console.error("Error toggling shop status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/shops/get-all-shops");

        setShops(res.data.data.data);
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
      <PageHeader title="Shops">
        <div className="d-flex gap-2 align-items-center">
          <button className="btn d-flex align-items-center gap-2">
            <IoFilter /> Filter
          </button>
          <input
            type="search"
            className="form-control tw-text-sm"
            placeholder="Search shops"
          />
          <button className="btn btn-outline-danger d-flex align-items-center gap-2">
            <MdDelete />
            Archieve
          </button>
          <button
            className="btn btn-warning d-flex align-items-center gap-2 text-nowrap"
            onClick={() => {
              setSelectedShop(null);
              setShowAddShopModal(true);
            }}
          >
            <MdAdd />
            Shop
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
                  <th>Shop ID</th>
                  <th>Shop No</th>

                  <th>Shop Type</th>
                  <th>Floor</th>
                  <th className="!tw-text-green-500">Section</th>
                  <th className="!tw-text-green-500">Shop Action</th>
                  <th className=" !tw-text-red-500">ACTION</th>
                  <th className="text-success">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {shops?.map((shop: Shop, i) => (
                  <tr key={i}>
                    <td>
                      <Input type="checkbox" />
                    </td>
                    <td>{shop.code}</td>
                    <td>{shop.shopNo}</td>

                    <td>{shop.shop_type.name}</td>
                    <td>{shop.floor.name}</td>
                    <td>{shop.section.name}</td>

                    <td>
                      {shop.status === "Allocated" ||
                      shop.status === "Inactive" ? (
                        <span
                          className={
                            shop.status === "Allocated"
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {shop.status}
                        </span>
                      ) : shop.reserved_tenancy ? (
                        <button
                          className="btn btn-danger d-flex align-items-center gap-2"
                          onClick={() => {
                            setTenancyToUnreserve(shop.reserved_tenancy!.id);
                            setShowConfrim(true);
                          }}
                        >
                          Unreserve
                        </button>
                      ) : (
                        <button
                          className="btn btn-success d-flex align-items-center gap-2"
                          onClick={() => {
                            setSelectedShopForTenancy(shop);
                            setShowTenancyModal(true);
                          }}
                        >
                          Reserve
                        </button>
                      )}
                    </td>

                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-primary d-flex align-items-center gap-2"
                          onClick={() => {
                            setSelectedShop(shop);
                            setShowAddShopModal(true);
                          }}
                        >
                          <FaRegEdit />
                          Edit
                        </button>
                      </div>
                    </td>

                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span
                          className={
                            shop.status === "Available" ||
                            shop.status === "Allocated" ||
                            shop.status === "Reserved"
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {shop.status}
                        </span>
                        {(shop.status === "Available" ||
                          shop.status === "Inactive") && (
                          <FormGroup switch>
                            <Input
                              type="switch"
                              role="switch"
                              title="status"
                              className={
                                shop.status === "Available"
                                  ? "custom-switch-active"
                                  : "custom-switch-inactive"
                              }
                              checked={shop.status === "Available"}
                              onChange={async () => {
                                await handleToggleShopStatus(shop.id);
                              }}
                            />
                          </FormGroup>
                        )}
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
              selectedShop ? "primary" : "danger"
            } w-100 !tw-text-base`}
          >
            {selectedShop ? "Edit Shop" : "Create New Shop"}
            {selectedShop ? (
              <p className="text-muted small mt-1"></p>
            ) : (
              <p className="text-muted small mt-1">
                Please fill the input below with appropriate info!
              </p>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShopForm shop={selectedShop} setRefetch={setRefetch} />
        </Modal.Body>
      </Modal>

      <Modal show={showTenancyModal} onHide={handleCloseTenancyModal} centered>
        <Modal.Header
          closeButton
          className="align-items-center border-bottom-0"
        >
          <Modal.Title className="text-center text-primary w-100 !tw-text-base">
            Create New Tenancy
            <p className="text-muted small mt-1">
              Please fill the input below with appropriate info!
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TenancyForm setRefetch={setRefetch} shop={selectedShopForTenancy} />
        </Modal.Body>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfrim(false)} centered>
        <Modal.Header closeButton className="border-bottom-0">
          <Modal.Title className="text-center w-100">
            Confirm Unreserve
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="pt-1 pb-3 text-center">
            <p>Are you sure you want to unreserve this shop?</p>
            <div className="d-flex justify-content-center gap-3">
              <button
                className="btn btn-primary px-5"
                onClick={async () => {
                  if (tenancyToUnreserve) {
                    await handleUnreserveTenancy(tenancyToUnreserve);
                    setShowConfrim(false);
                  }
                }}
                disabled={loading}
              >
                {loading ? "Processing..." : "Yes, unreserve"}
              </button>
              <button
                className="btn btn-secondary px-5"
                onClick={() => {
                  setShowConfrim(false);
                  setTenancyToUnreserve(null);
                }}
              >
                No
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Shops;
