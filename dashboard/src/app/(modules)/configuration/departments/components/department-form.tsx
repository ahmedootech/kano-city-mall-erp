import * as yup from "yup";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CustomInput from "@/app/components/form-controls/input";
import { getApiClientInstance } from "@/utils/axios/axios-client";
import { Department } from "../types";
import { handleYupErrors } from "@/utils/yup-form-helpers";
import SubmitButton from "@/app/components/form-controls/submit-button";
const defaultValues = {
  name: "",
  max_employee_no: 0,
  description: "",
  hod: "",
};

const DepartmentForm: React.FC<{
  department?: Department | null;
  setRefetch: Dispatch<SetStateAction<boolean>>;
}> = ({ department = null, setRefetch }) => {
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [showConfirm, setShowConfrim] = useState(false);
  const [loading, setLoading] = useState(false);

  const api = getApiClientInstance();

  const departmentSchema = yup.object().shape({
    name: yup.string().required("Please enter department name"),
    max_employee_no: yup
      .number()
      .typeError("Only numbers")
      .required("Please enter number of employees"),
    description: yup.string().required("Enter description"),
    hod: yup.string(),
  });

  const methods = useForm<FieldValues | any>({
    defaultValues,
    resolver: yupResolver(departmentSchema),
  });

  useEffect(() => {
    if (department) {
      methods.reset({
        name: department.name,
        max_employee_no: department.max_employee_no,
        description: department.description,
        hod: department.department_head,
      });
    }
  }, [department, methods]);

  // const handlePermissionChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const permissionId = event.target.value;
  //   const isChecked = event.target.checked;

  //   // Update permissions in formData based on checkbox changes
  //   setModules((prevModules: any) => {
  //     const newModules = isChecked
  //       ? [...prevModules, permissionId]
  //       : prevModules.filter((id: any) => id !== permissionId);
  //     return newModules;
  //   });
  // };

  // const handleSelectAllChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const isChecked = event.target.checked;

  //   // Update permissions in formData based on "Select All" checkbox
  //   if (rolePermissions)
  //     setModules(() => {
  //       const newModules = isChecked
  //         ? rolePermissions.map((module) => String(module.id))
  //         : [];

  //       return newModules;
  //     });
  // };
  const handleSubmit = async (data: any) => {
    setShowConfrim(false);
    setLoading(true);
    setSuccessMessage(undefined);
    setErrorMessage(undefined);
    try {
      // const payload = {
      //   name: data.name,
      //   de: modules,
      // };

      if (department) {
        await api.put(`/departments/${department.uuid}`, data);
        setSuccessMessage("Department updated successfully");
      } else {
        await api.post("/departments", data);
        setSuccessMessage("Department created successfully");
        methods.reset(defaultValues);
      }
      setRefetch(true);
    } catch (err: any) {
      console.log(err);
      if (err.message) {
        setErrorMessage(err.message);
        return;
      }
      const errors = err.response.data.errors;
      if (typeof errors === "object") {
        handleYupErrors({
          formFields: data,
          serverError: errors,
          yupSetError: methods.setError,
        });
      } else {
        setErrorMessage(err.data.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="px-3">
        <form action="" onSubmit={methods.handleSubmit(handleSubmit)}>
          {showConfirm ? (
            <div className="pt-1 pb-3 text-center">
              <p className="">Are you Sure You Want to Update Department?</p>
              <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-primary px-5" type="submit">
                  Yes
                </button>
                <button
                  className="btn btn-secondary px-5"
                  type="button"
                  onClick={() => {
                    setShowConfrim(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          ) : (
            <div className="pb-5 mb-5">
              <CustomInput
                label="Department Name"
                name="name"
                control={methods.control}
                type="text"
                placeholder="Department Name"
              />
              <CustomInput
                label="No Of Staff"
                name="max_employee_no"
                control={methods.control}
                type="number"
                placeholder="No Of Staff"
              />
              <CustomInput
                label="Description"
                name="description"
                control={methods.control}
                type="text"
                placeholder="Description"
              />

              <SubmitButton
                type={department ? "button" : "submit"}
                title={department ? "Update Department" : "Create Department"}
                loading={loading}
                className={`btn-${
                  department ? "primary" : "danger"
                } w-100  my-3`}
                onClick={() => {
                  if (!department) return true;
                  setShowConfrim(true);
                }}
              />

              {/* <button
                type={department ? "button" : "submit"}
                className={`btn btn-${
                  department ? "primary" : "danger"
                } w-100  `}
              >
                {loading ? (
                  <CircularProgress className="text-white" size={14} />
                ) : department ? (
                  "Update Department"
                ) : (
                  "Create Department"
                )}
              </button> */}
              {successMessage && (
                <p className="text-success text-center">{successMessage}</p>
              )}
              {errorMessage && (
                <p className="text-danger text-center">{errorMessage}</p>
              )}
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default DepartmentForm;
