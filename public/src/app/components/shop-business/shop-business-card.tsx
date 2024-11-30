import Link from "next/link";

const ShopBusinessCard: React.FC<{
  title: string;
  code: string;
  image: string;
}> = ({ title, code, image }) => {
  return (
    <article
      className="py-3 py-lg-5 px-3 px-lg-5 h-100 rounded-4 position-relative"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-black position-absolute bottom-0 end-0 p-4 text-center rounded-bottom-4 rounded-start-0">
        <h4>{title}</h4>
        <h5 className="text-warning mt-0 mb-3">{code}</h5>
        <Link
          href="/"
          className="btn btn-warning px-4 py-2 rounded-5 align-self-start"
        >
          Get in touch
        </Link>
      </div>
    </article>
  );
};

export default ShopBusinessCard;
