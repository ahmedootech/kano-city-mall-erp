import Link from "next/link";

const HallShopCard: React.FC<{
  title: string;
  code: string;
  image: string;
  type: string;
}> = ({ title, code, image, type }) => {
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
      <button className="btn btn-warning px-4 py-2 rounded-5 align-self-center">
        View Info
      </button>
    </div>
  );
};

export default HallShopCard;
