import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { shopsBusinesses } from "./data";
import ShopBusinessCard from "./shop-business-card";

const ShopsBusinesses = () => {
  return (
    <section id="shops" className="px-2 px-lg-5 pt-4">
      <div id="businesses" className="container-fluid py-5 bg-white rounded-4">
        <h2 className="fw-bold text-center">Shops And Businesses</h2>
        <p className="text-center">Explore Shops and their Businesses</p>

        <div className="" style={{ height: "500px" }}>
          <Swiper
            spaceBetween={20}
            navigation={true}
            modules={[Navigation, Autoplay, Pagination]}
            pagination={{ clickable: true }}
            autoplay
            loop
            className="mySwiper position-relative h-100 w-100 text-white"
          >
            {shopsBusinesses.map((shopBusiness, i) => (
              <SwiperSlide key={i}>
                <ShopBusinessCard
                  title={shopBusiness.title}
                  code={shopBusiness.code}
                  image={shopBusiness.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ShopsBusinesses;
