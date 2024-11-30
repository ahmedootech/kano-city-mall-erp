import Link from "next/link";

const ServiceCard: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  return (
    <div className="bg-black px-3 py-5 rounded-4 h-100 text-center">
      <div>
        <h4 className="text-white fw-bold">{title}</h4>
        <p className="text-warning text-start my-4">{description}</p>
        <Link
          href="/"
          className="btn btn-outline-light px-4 py-2 rounded-5 align-self-start"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
