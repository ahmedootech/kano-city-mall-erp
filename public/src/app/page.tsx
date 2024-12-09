"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import Services from "./components/services/services";
import ShopsBusinesses from "./components/shop-business/shops-businesses";
import Blogs from "./components/blogs/blogs";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import HallsBookings from "./components/halls-bookings/halls-bookings";

export default function Home() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    handleShow();
  }, []);
  return (
    <main>
      <section id="home" style={{ height: "550px" }}>
        <Swiper
          spaceBetween={20}
          navigation={true}
          modules={[Navigation, Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay
          loop
          className="mySwiper position-relative h-100 w-100 text-white"
        >
          <SwiperSlide>
            <article
              className="py-3 py-lg-5 px-3 px-lg-5 h-100"
              style={{
                backgroundImage: `url('/images/carousel-1.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="container h-100 pb-5">
                <div className="row h-100 align-items-end">
                  <div className="col-lg-6 ">
                    <h2 className="display-5 fw-bold mb-3">
                      WELCOME <br />
                      TO KANO <span className="text-warning">CITY MALL</span>
                    </h2>
                    {/* <Link
                      href="/"
                      className="btn btn-warning px-5 py-2 fw-bold rounded-5"
                    >
                      BOOK RESERVATION NOW
                    </Link> */}
                  </div>
                </div>
              </div>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article
              className="py-3 py-lg-5 px-3 px-lg-5 h-100"
              style={{
                backgroundImage: `url('/images/carousel-2.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="container h-100 pb-5">
                <div className="row h-100 align-items-end">
                  <div className="col-lg-6 ">
                    <h2 className="display-5 fw-bold mb-3">
                      GET YOUR HALL TODAY AND EXPLORE YOUR BUSINESS.
                    </h2>
                    {/* <Link
                      href="/"
                      className="btn btn-warning px-5 py-2 fw-bold rounded-5"
                    >
                      BOOK RESERVATION NOW
                    </Link> */}
                  </div>
                </div>
              </div>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article
              className="py-3 py-lg-5 px-3 px-lg-5 h-100"
              style={{
                backgroundImage: `url('/images/carousel-3.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {" "}
              <div className="container h-100 pb-5">
                <div className="row h-100 align-items-end">
                  <div className="col-lg-6 ">
                    <h2 className="display-5 fw-bold mb-3">
                      EXPLORE YOUR BUSINESS
                    </h2>
                    {/* <Link
                      href="/"
                      className="btn btn-warning px-5 py-2 fw-bold rounded-5"
                    >
                      BOOK RESERVATION NOW
                    </Link> */}
                  </div>
                </div>
              </div>
            </article>
          </SwiperSlide>
        </Swiper>
      </section>
      <section id="about" className="py-5 px-2 px-lg-5 bg-white">
        <div className="container-fluid">
          <div className="row gx-4 gy-4">
            <div className="col-lg-5">
              <div className="d-flex flex-column h-100 justify-content-center lh-lg">
                <h2 className="fw-bold">About The Mall</h2>
                <p>
                  Kano City Mall is more than just a shopping destination,
                  it&apos;s a hub of lifestyle and culture. Located in the heart
                  of Kano, we offer an unmatched blend of retail, dining, and
                  entertainment experiences for individuals and families alike.
                </p>
                <p>
                  With a wide range of stores featuring global and local brands,
                  diverse dining options, and vibrant event spaces, we aim to
                  provide every visitor with a unique and memorable experience.
                </p>
                <Link
                  href="/"
                  className="btn btn-outline-warning px-4 py-2 fw-bold rounded-5 align-self-start"
                >
                  Read More
                </Link>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="">
                <Image
                  src={"/images/carousel-1.jpg"}
                  alt=""
                  layout="responsive"
                  width={818}
                  height={500}
                  className="rounded-4 w-100"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Services />
      <HallsBookings />
      <ShopsBusinesses />
      <Blogs />
      <section className="bg-warning py-5 px-3 px-lg-5">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-4">
              <h5 className="text-center mb-4 mb-lg-0">
                Subscribe to Newsletters
              </h5>
            </div>
            <div className="col-lg-6">
              <form action="">
                <div className="d-flex gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="form-control bg-transparent border-secondary rounded-5 px-4"
                  />
                  <input
                    type="submit"
                    value="Subscribe"
                    className="btn btn-light px-3 rounded-5"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="bg-danger">
          <Modal.Title className="text-white">Hello, welcome to</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-3 px-lg-5 py-4">
          <div className="d-flex justify-content-center mb-1">
            <Image
              src={"/images/logo.png"}
              alt=""
              width={153}
              height={40}
              style={{ objectFit: "contain", objectPosition: "left" }}
            />
          </div>
          <p className="text-center mb-4">
            Subscribe to our Newsletter for more Updates!{" "}
          </p>
          <form action="">
            <div className="d-flex flex-column gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="form-control bg-transparent border-secondary rounded-5 px-4"
              />
              <input
                type="submit"
                value="Subscribe"
                className="btn btn-danger px-3 rounded-5 align-self-end"
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </main>
  );
}
