import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Modal } from "react-bootstrap";

const HallShopCard: React.FC<{
  title: string;
  code: string;
  image: string;
  type: string;
}> = ({ title, code, image, type }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="d-flex flex-column justify-content-end h-100">
      <article
        className="py-3 py-lg-5 px-3 px-lg-5 h-100 rounded-4 position-relative mb-3"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-black position-absolute bottom-0 text-white opacity-75 start-0 w-100 p-4 py-3 text-center rounded-bottom-4 rounded-start-0 d-flex justify-content-between align-items-center">
          <h5>{type == "hall" ? title : code}</h5>
          <Link
            href="/"
            className="btn btn-warning px-4 py-2 rounded-5 align-self-start"
          >
            Book {type == "hall" ? "Hall" : "Shop"} Now
          </Link>
        </div>
      </article>
      <button
        className="btn btn-warning px-4 py-2 rounded-5 align-self-center"
        onClick={handleShow}
      >
        View Info
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body className="pb-5">
          <div className="d-flex justify-content-center">
            <Image
              src={"/images/logo.png"}
              alt=""
              width={153}
              height={40}
              style={{ objectFit: "contain" }}
            />
          </div>
          <Image
            src={image}
            alt=""
            width={400}
            height={200}
            style={{ objectFit: "cover" }}
            className="rounded-3"
          />
          <div className="my-4">
            <p className="my-0">
              <span className="fw-bold text-capitalize">{type}</span>: {title}
            </p>
            <p className="my-0">
              <span className="fw-bold text-capitalize">Capacity</span>: 5000
            </p>
            <p className="my-0">
              <span className="fw-bold text-capitalize">Status</span>: Available
            </p>
            <p className="my-0">
              <span className="fw-bold text-capitalize">Price/day</span>: $2000
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <Link
              href="/"
              className="btn btn-warning px-4 py-2 rounded-5 align-self-start"
            >
              Book {type == "hall" ? "Hall" : "Shop"} Now
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HallShopCard;
