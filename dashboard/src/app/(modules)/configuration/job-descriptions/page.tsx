"use client";
import { MdAdd, MdDelete } from "react-icons/md";
import { Input } from "reactstrap";
import { FaRegEdit } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { Modal } from "react-bootstrap";
import PageHeader from "../../components/page-header";
import { useEffect, useState } from "react";
import { getApiClientInstance } from "@/utils/axios/axios-client";
import Loading from "../../components/ui/loading";
import { Job } from "./type";
import JobForm from "./components/job-form";
const Jobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const api = getApiClientInstance();
  const handleCloseJobModal = () => {
    setShowAddJobModal(false);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/jobs");
        
        setJobs(res.data.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
        setRefetch(false);
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);
  return (
    <section>
      <PageHeader title="Jobs">
        <div className="d-flex gap-2 align-items-center">
          <button className="btn d-flex align-items-center gap-2">
            <IoFilter /> Filter
          </button>
          <input
            type="search"
            className="form-control tw-text-sm"
            placeholder="Search jobs"
          />
          <button className="btn btn-outline-danger d-flex align-items-center gap-2">
            <MdDelete />
            Archieve
          </button>
          <button
            className="btn btn-warning d-flex align-items-center gap-2 text-nowrap"
            onClick={() => {
              setSelectedJob(null);
              setShowAddJobModal(true);
            }}
          >
            <MdAdd />
            Job
          </button>
        </div>
      </PageHeader>

      {loading ? (
        <Loading />
      ) : (
        <section className="pt-4">
          <div className="table-responsive mt-4">
            <table className="table table-sm align-middle">
              <thead>
                <tr>
                  <th className="py-3 px-4 text-left">
                    {/* <Input
                      type="checkbox"
                      className="rounded border-gray-300"
                      // checked={selectedUsers.length === users.length}
                      onChange={() => console.log("selected")}
                    /> */}
                  </th>
                  <th>JOB NAME</th>
                  <th>DESCRIPTION</th>

                  <th className=" !tw-text-red-500">ACTION</th>
                 
                </tr>
              </thead>
              <tbody>
                
                {jobs?.map((job: Job, i) => (
                  <tr key={i}>
                    <td >
                      <Input
                        type="checkbox"
                                              
                      />
                    </td>
                    <td>{job.name}</td>
                    <td>{job.description}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-primary d-flex align-items-center gap-2"
                          onClick={() => {
                            setSelectedJob(job);
                            setShowAddJobModal(true);
                          }}
                        >
                          <FaRegEdit />
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <Modal show={showAddJobModal} onHide={handleCloseJobModal} centered>
        <Modal.Header
          closeButton
          className="align-items-center border-bottom-0"
        >
          <Modal.Title
            className={`text-center text-${
              selectedJob ? "primary" : "danger"
            } w-100 !tw-text-base`}
          >
            {selectedJob ? "Edit Job" : "Create Job"}
            {selectedJob ? (
              <p className="text-muted small mt-1"></p>
            ) : (
              <p className="text-muted small mt-1">
                Please fill the input below with appropriate info!
              </p>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <JobForm job={selectedJob} setRefetch={setRefetch}   />
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Jobs;
