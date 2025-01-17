import { MdAdd, MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";

import PageHeader from "../../components/page-header";

const RolesPermissions = () => {
  return (
    <section>
      <PageHeader title="Roles & Permissions">
        <div className="d-flex gap-2 align-items-center">
          <button className="btn d-flex align-items-center gap-2">
            <IoFilter /> Filter
          </button>
          <input type="search" className="form-control tw-text-sm" />
          <button className="btn btn-outline-danger d-flex align-items-center gap-2">
            <MdDelete />
            Delete
          </button>
          <button className="btn btn-warning d-flex align-items-center gap-2 text-nowrap">
            <MdAdd />
            Add Role
          </button>
        </div>
      </PageHeader>

      <section className="pt-4">
        <div className="table-responsive mt-4">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>ROLE NAME</th>
                <th>MODULES</th>
                <th>PERMISSION</th>
                <th>ACTION</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-middle">
                <td>IT Head</td>
                <td>Reviewer</td>
                <td>View, Add, Edit, Activate</td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary d-flex align-items-center gap-2">
                      <FaRegEdit />
                      Edit
                    </button>
                    <button className="btn btn-danger d-flex align-items-center gap-2">
                      <MdDelete /> Delete
                    </button>
                  </div>
                </td>
                <td>Active</td>
              </tr>
              <tr className="align-middle">
                <td>HR</td>
                <td>Initiator</td>
                <td>View, Add, Edit, Activate</td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary d-flex align-items-center gap-2">
                      <FaRegEdit />
                      Edit
                    </button>
                    <button className="btn btn-danger d-flex align-items-center gap-2">
                      <MdDelete /> Delete
                    </button>
                  </div>
                </td>
                <td>Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};

export default RolesPermissions;
