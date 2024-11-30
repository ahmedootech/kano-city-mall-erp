import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

const BlogCard: React.FC<{
  image: string | StaticImport;
  date: string;
  title: string;
  description: string;
}> = ({ image, date, title, description }) => {
  return (
    <div className="row">
      <div className="col-5">
        <div
          className="position-relative"
          style={{ width: "100%", height: 300 }}
        >
          <Image
            src={image}
            fill
            alt=""
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </div>
      <div className="col-7">
        <div className="d-flex flex-column justify-content-between h-100 pb-3">
          <div className="">
            <p className="my-0">{date}</p>
            <p className="text-warning my-0">{title}</p>
          </div>
          <p>{description}</p>
          <Link
            href="/"
            className="btn btn-light text-warning border-warning px-4 py-2 rounded-5 align-self-center"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
