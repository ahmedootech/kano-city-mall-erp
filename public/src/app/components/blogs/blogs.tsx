import Link from "next/link";
import BlogCard from "./blog-card";
import { blogs } from "./data";

const Blogs = () => {
  return (
    <section id="blog" className="bg-dark py-5 px-3 px-lg-5 text-white">
      <div className="text-center">
        <h2 className="fw-bold text-center text-warning my-0">
          Update On Our Blog
        </h2>
        <p className="my-0">Latest Update On Our Blog</p>
      </div>

      <h5 className="border-bottom pb-3 mb-5">Latest News</h5>
      <div className="container-fluid pt-3">
        <div className="row g-3 gy-5 py-5 pt-4">
          {blogs.map((blog, i) => (
            <div className="col-lg-4" key={i}>
              <BlogCard
                image={blog.image}
                title={blog.title}
                date={blog.date}
                description={blog.description}
              />
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center mt-5">
          <Link
            href="/"
            className="btn btn-warning  px-4 py-2 rounded-5 align-self-center"
          >
            Load More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
