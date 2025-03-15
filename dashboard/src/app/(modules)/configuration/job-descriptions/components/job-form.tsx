import React, { useState, Dispatch, SetStateAction } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CircularProgress } from "@mui/material";
import { getApiClientInstance } from "@/utils/axios/axios-client";
import { handleYupErrors } from "@/utils/yup-form-helpers";
import CustomInput from "@/app/components/form-controls/input";
import { Job } from "../type"
const defaultValues = {
  name: "",
  description: "",
};

const JobForm: React.FC<{
  job?: Job | null;
  setRefetch: Dispatch<SetStateAction<boolean>>;
  
}> = ({ job = null, setRefetch }) => {
  const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [showConfirm, setShowConfrim] = useState(false);
  const [loading, setLoading] = useState(false);

  const api = getApiClientInstance();

  const jobSchema = yup.object().shape({
    name: yup.string().required("Please enter name"),
    description: yup.string().required("Please enter job description"),
  });

  const methods = useForm<FieldValues | any>({
    defaultValues,
    resolver: yupResolver(jobSchema),
  });

  React.useEffect(() => {
    if (job) {
      methods.reset({
        name: job.name,
        description: job.description
      });
    } else {
      methods.reset(defaultValues);
    }
  }, [job, methods]);

  const handleSubmit = async (data: any) => {
    setShowConfrim(false);
    setLoading(true);
    setSuccessMessage(undefined);
    setErrorMessage(undefined);
    try {
      const payload = { name: data.name, description: data.description };

      if (job) {
        await api.put(`/jobs/${job.id}`, payload);
        setSuccessMessage("Job updated successfully");
      } else {
        await api.post("/jobs", payload);
        setSuccessMessage("Job created successfully");
        methods.reset(defaultValues);
      }
     
      
      setRefetch(true);
   
      
    } catch (err: any) {
      console.log(err);
      if (err.message) {
        setErrorMessage(err.message);
        return;
      }
      const errors = err.response?.data?.errors;
      if (typeof errors === "object") {
        handleYupErrors({
          formFields: data,
          serverError: errors,
          yupSetError: methods.setError,
        });
      } else {
        setErrorMessage(err.response?.data?.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-3">
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        {showConfirm ? (
          <div className="pt-1 pb-3 text-center">
            <p>Are you sure you want to update this job?</p>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-primary px-5" type="submit">
                Yes
              </button>
              <button className="btn btn-secondary px-5" type="button" onClick={() => setShowConfrim(false)}>
                No
              </button>
            </div>
          </div>
        ) : (
          <div className="pb-5 mb-5">
            <CustomInput label="Job" name="name" control={methods.control} type="text" placeholder="Job" />
            <CustomInput label="Description" name="description" control={methods.control} type="textarea" placeholder="Description"  rows={4} />
              <div className="form-group">

</div>
            <button
              type={job ? "button" : "submit"}
              className={`btn btn-${job ? "primary" : "danger"} w-100 mt-5 mb-4`}
              onClick={() => {
                if (!job) return true;
                setShowConfrim(true);
              }}
            >
              {loading ? <CircularProgress className="text-white" size={14} /> : job ? "Update" : "Create Job"}
            </button>

            {successMessage && <p className="text-success text-center">{successMessage}</p>}
            {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
          </div>
        )}
      </form>
    </div>
  );
};

export default JobForm;
