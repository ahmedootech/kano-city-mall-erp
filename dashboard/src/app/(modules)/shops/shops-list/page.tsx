"use client";
import { MdAdd, MdDelete } from "react-icons/md";
import { Input } from "reactstrap";
import { FaRegEdit } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { Modal } from "react-bootstrap";
import PageHeader from "../../components/page-header";
import { useEffect, useState } from "react";
import { getApiClientInstance } from "@/utils/axios/axios-client";
import Loading from "../../components/ui/loading";
import { Shop } from "./types";
import ShopForm from "../components/shop-form";

const Shops = () => {
  const [shops, setShops] = useState<any[]>([]);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddShopModal, setShowAddShopModal] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  const api = getApiClientInstance();
  const handleCloseShopModal = () => {
    setShowAddShopModal(false);
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
                  <th>Shop No</th>
                  <th>Description</th>
                  <th>Shop Type</th>
                  <th className="!tw-text-green-500">Section</th>

                  <th className=" !tw-text-red-500">ACTION</th>
                 
                </tr>
              </thead>
              <tbody>
                
                {shops?.map((shop: Shop, i) => (
                  <tr key={i}>
                    <td >
                      <Input
                        type="checkbox"
                                              
                      />
                    </td>
                    <td>{shop.shopNo}</td>
                    <td>{shop.description}</td>
                    <td>{shop.shop_type.name}</td>
                    <td>{shop.floor.name}</td>
                    <td>{shop.section.name}</td>
                   
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
          <ShopForm shop={selectedShop} setRefetch={setRefetch}   />
        </Modal.Body>
      </Modal>
    </section>
  );
};

export  default Shops ;
