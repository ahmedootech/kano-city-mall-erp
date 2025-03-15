import * as yup from "yup";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Input } from "reactstrap";
import CustomInput from "@/app/components/form-controls/input";
import { getApiClientInstance } from "@/utils/axios/axios-client";
import { Role } from "../types";
import { handleYupErrors } from "@/utils/yup-form-helpers";

import { CircularProgress } from "@mui/material";
import SubmitButton from "@/app/components/form-controls/submit-button";
const defaultValues = {
  title: "",
};

const dummyRolesPermissions = [
  { id: 1, name: "Roles & Permissions" },
  { id: 2, name: "Users management Module" },
  { id: 3, name: "Departments management Module" },
  { id: 4, name: "Employees management Module" },
];

// const randomBg = () => {
//   const bgs = ["blue", "orange", "green"];

//   const bg = bgs[Math.floor(Math.random() * bgs.length)];
//   return `tw-bg-${bg}-500`;
// };

const RolesPermissionsForm: React.FC<{
  role?: Role | null;
  setRefetch: Dispatch<SetStateAction<boolean>>;
}> = ({ role = null, setRefetch }) => {
  const [modules, setModules] = useState<any[]>([]);
  const [rolePermissions] = useState<any[]>(dummyRolesPermissions);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [showConfirm, setShowConfrim] = useState(false);
  const [loading, setLoading] = useState(false);

  const api = getApiClientInstance();

  const rolesPermissionsSchema = yup.object().shape({
    title: yup.string().required("Please enter role title"),
  });

  const methods = useForm<FieldValues | any>({
    defaultValues,
    resolver: yupResolver(rolesPermissionsSchema),
  });

  useEffect(() => {
    if (role) {
      methods.reset({ title: role.title });

      const mods = role.modules.map((mod) => String(mod.id));
      console.log("mods", mods);
      setModules(mods);
    }
  }, [role, methods]);

  const handlePermissionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const permissionId = event.target.value;
    const isChecked = event.target.checked;

    // Update permissions in formData based on checkbox changes
    setModules((prevModules: any) => {
      const newModules = isChecked
        ? [...prevModules, permissionId]
        : prevModules.filter((id: any) => id !== permissionId);
      return newModules;
    });
  };

  const handleSelectAllChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    // Update permissions in formData based on "Select All" checkbox
    if (rolePermissions)
      setModules(() => {
        const newModules = isChecked
          ? rolePermissions.map((module) => String(module.id))
          : [];

        return newModules;
      });
  };
  const handleSubmit = async (data: any) => {
    setShowConfrim(false);
    setLoading(true);
    setSuccessMessage(undefined);
    setErrorMessage(undefined);
    try {
      const payload = {
        title: data.title,
        modules: modules,
      };

      if (role) {
        await api.post(`/permissions/edit-role/${role.id}`, payload);
        setSuccessMessage("Role updated successfully");
      } else {
        await api.post("/permissions/create-new-role", payload);
        setSuccessMessage("Role created successfully");
        methods.reset(defaultValues);
        setModules([]);
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
              <p className="">Are you Sure You Want to Update This Role?</p>
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
                label="Role"
                name="title"
                control={methods.control}
                type="text"
                placeholder="Role"
              />
              <div className="d-flex flex-column gap-3 mt-2">
                <div className="">
                  <h5 className="tw-text-base">Modules & Permissions </h5>
                  <label className="fs-6">
                    Select all{" "}
                    <Input type="checkbox" onChange={handleSelectAllChange} />
                  </label>
                </div>

                {rolePermissions.map((module, index) => {
                  return (
                    <label key={index} className="me-2 gap-1 tw-text-sm">
                      <Input
                        type="checkbox"
                        name="modules"
                        value={module.id}
                        checked={modules.includes(String(module.id))}
                        onChange={handlePermissionChange}
                      />{" "}
                      <span
                        className={`tw-bg-gray-300 py-0 px-1 tw-rounded-sm me-1`}
                      >
                        {module.name[0]}
                      </span>
                      {module.name}
                    </label>
                  );
                })}
              </div>

              <SubmitButton
                loading={loading}
                type={role ? "button" : "submit"}
                title={role ? "Update" : "Create Role"}
                className={`btn-${
                  role ? "primary" : "danger"
                } w-100 mt-5 mb-4 `}
                onClick={() => {
                  if (!role) return true;
                  setShowConfrim(true);
                }}
              />

              {/* <button
                type={role ? "button" : "submit"}
                className={`btn btn-${
                  role ? "primary" : "danger"
                } w-100 mt-5 mb-4 `}
                onClick={() => {
                  if (!role) return true;
                  setShowConfrim(true);
                }}
              >
                {loading ? (
                  <CircularProgress className="text-white" size={14} />
                ) : role ? (
                  "Update"
                ) : (
                  "Create Role"
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

export default RolesPermissionsForm;
