import { hallsBookings } from "./data";
import HallShopCard from "./hall-shop";
import { useState } from "react";

const HallsBookings = () => {
  const [type, setType] = useState("all");

  const filteredBookings =
    type === "all"
      ? hallsBookings
      : hallsBookings.filter((item) => item.type === type);

  return (
    <section id="#halls-booking" className="px-2 px-lg-5 pt-4 bg-dark my-4">
      <div id="businesses" className="container-fluid py-5  rounded-4">
        <h2 className="fw-bold text-center text-warning">Halls And Booking</h2>
        <p className="text-center text-white">
          Explore Available Shop and Halls and their Capacity
        </p>

        <div className="d-flex flex-column align-items-center mb-4">
          <p className="text-white">Select from the Category</p>
          <div className="w-25">
            <select
              className="form-select border-warning py-3 bg-dark text-white"
              name=""
              id=""
              onChange={(e) => setType(e.target.value)}
              style={{
                appearance: "none",
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 4 4%27 fill=%27white%27%3E%3Cpath d=%27M2 3L0 0h4z%27/%3E%3C/svg%3E")',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1rem center",
                backgroundSize: "1em",
              }}
            >
              <option value="all">All</option>
              <option value="hall">Halls</option>
              <option value="shop">Shops</option>
            </select>
          </div>
        </div>
        <div className="row g-4">
          {filteredBookings.map((shopBusiness, i) => (
            <div className="col-lg-6" key={i} style={{ height: "500px" }}>
              <HallShopCard
                title={shopBusiness.title}
                code={shopBusiness.code}
                image={shopBusiness.image}
                type={shopBusiness.type}
              />
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center mt-5">
          <button className="btn btn-warning px-5 py-2 rounded-3 ">
            Load More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HallsBookings;
