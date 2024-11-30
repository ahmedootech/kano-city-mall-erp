import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { servicesList } from "./data";
import ServiceCard from "./service-card";

const Services = () => {
  return (
    <section id="services" className="px-2 px-lg-5">
      <div className="container-fluid py-5 px-lg-5 bg-warning rounded-4">
        <h2 className="fw-bold text-center">Our Services</h2>

        <div className="d-lg-none">
          <div className="" style={{ height: "360px" }}>
            <Swiper
              slidesPerView={1.1}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              //   scrollbar={{ draggable: true }}
              //   autoplay={{
              //     delay: 3000,
              //     disableOnInteraction: false,
              //   }}
              breakpoints={{
                768: {
                  slidesPerView: 4, // Show 2 slides per view on tablets
                },
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mt-4 mySwiper position-relative h-100 pb-5"
            >
              {servicesList.map((service, i) => (
                <SwiperSlide key={i}>
                  <ServiceCard
                    title={service.title}
                    description={service.description}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="d-none d-lg-flex row g-3">
          {servicesList.map((service, i) => (
            <div className="col-lg-3" key={i}>
              <ServiceCard
                title={service.title}
                description={service.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
