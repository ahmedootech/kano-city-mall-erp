

import React, { ChangeEvent, useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "reactstrap";
import { toast } from "react-toastify";
import CustomInput from "@/app/components/form-controls/input";
import Select from "@/app/components/form-controls/select";
import { userRegistrationSchema } from "./fieldsValidation";
import { newUserInterface } from "../../../../../store/features/signup/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { signInActions } from "@/store/features/signup";
import { getApiClientInstance } from "@/utils/axios/axios-client";
import ConfirmationModal from "./confirmation-model";

interface Permission {
  id: number;
  name: string;
}

interface UserRegistrationFormProps {
  user?: {
    uuid: string;
    first_name: string;
    sur_name: string;
    email: string;
    phone_no: string;
    date_of_birth: string;
    role: string;
    role_id: number;
    modules: Record<string, Record<string, Permission[]>>;
  } | null;
  onSuccess?: () => void;
  onUpdate?: () => void;
}

const defaultValues = {
  first_name: "",
  sur_name: "",
  email: "",
  phone_no: "",
  date_of_birth: "",
  role_id: "",
};

const RolesPermissions = [
  { id: 1, name: "Create" },
  { id: 2, name: "View" },
  { id: 3, name: "Edit" },
  { id: 4, name: "Activated" },
];

export type Role = {
  title: string;
  id: number;
};

const UserregistrationForm: React.FC<UserRegistrationFormProps> = ({
  user,
  onSuccess,
}) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<number[]>(() => {
    if (user?.modules) {
      const userPermissions = new Set<number>();
      Object.values(user.modules).forEach((moduleData) => {
        Object.values(moduleData).forEach((subModulePermissions) => {
          if (Array.isArray(subModulePermissions)) {
            subModulePermissions.forEach((permission) => {
              userPermissions.add(permission.id);
            });
          }
        });
      });
      return Array.from(userPermissions);
    }
    return [];
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const api = getApiClientInstance();

  const methods = useForm<FieldValues | any>({
    defaultValues: user
      ? {
          first_name: user.first_name,
          sur_name: user.sur_name,
          email: user.email,
          phone_no: user.phone_no,
          date_of_birth: user.date_of_birth.split("T")[0],
          role_id: user.role_id || "",
        }
      : defaultValues,
    resolver: yupResolver(userRegistrationSchema),
  });

  useEffect(() => {
    const findRoleId = (roleTitle: string) => {
      const role = roles.find((r) => r.title === roleTitle);
      return role?.id;
    };

    if (user && roles.length > 0 && !user.role_id) {
      const roleId = findRoleId(user.role);
      if (roleId) {
        methods.setValue("role_id", roleId.toString());
      }
    }
  }, [roles, user, methods]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get("/permissions/get-all-roles");
        if (response.data.success) {
          const fetchedRoles = response.data.data.map((role: any) => ({
            id: role.id,
            title: role.title,
          }));
          setRoles(fetchedRoles);
        } else {
          toast.error("Failed to fetch roles");
        }
      } catch (error: any) {
        toast.error("Error fetching roles", error);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchRoles();
  }, []);

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    methods.setValue("role_id", value, { shouldValidate: true });
  };

  const handlePermissionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const permissionId = Number(event.target.value);
    const isChecked = event.target.checked;

    setPermissions((prev) =>
      isChecked
        ? [...prev, permissionId]
        : prev.filter((id) => id !== permissionId)
    );
  };

  const handleSubmit = async (data: any) => {
    try {
      if (!data.role_id) {
        toast.error("Please select a role");
        return;
      }

      const roleId = Number(data.role_id);
      const formattedDate = new Date(data.date_of_birth)
        .toISOString()
        .split("T")[0];

      const payload = {
        first_name: data.first_name,
        sur_name: data.sur_name,
        email: data.email,
        phone_no: data.phone_no,
        date_of_birth: formattedDate,
        role_id: roleId,
        permissions: permissions,
      };

      if (user) {
        await api.put(`/users/${user.uuid}`, payload);
        toast.success("User updated successfully");
      } else {
        await dispatch(
          signInActions.main.signup(payload as newUserInterface)
        ).unwrap();
        toast.success("User created successfully");
      }

      methods.reset(defaultValues);
      setPermissions([]);
      onSuccess?.();
    } catch (error: any) {
      toast.error(
        error.message || `Failed to ${user ? "update" : "create"} user`
      );
      if (error.errors) {
        Object.entries(error.errors).forEach(([key, message]) => {
          methods.setError(key, {
            type: "manual",
            message: message as string,
          });
        });
      }
    }
  };

  const handleUpdateClick = () => {
    if (user) {
      setShowConfirmationModal(true);
    } else {
      methods.handleSubmit(handleSubmit)(); 
    }
  };

  const handleConfirmUpdate = async () => {
    setShowConfirmationModal(false); 
    await methods.handleSubmit(handleSubmit)(); 
  };

  return (
    <div className="px-3 pb-5 mb-5">
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <CustomInput
          label="First Name"
          name="first_name"
          control={methods.control}
          type="text"
          placeholder="First Name"
        />
        <CustomInput
          label="Last Name"
          name="sur_name"
          control={methods.control}
          type="text"
          placeholder="Last Name"
        />
        <CustomInput
          label="Email"
          name="email"
          control={methods.control}
          type="email"
          placeholder="@email"
        />
        <CustomInput
          label="Phone"
          name="phone_no"
          control={methods.control}
          type="tel"
          placeholder="Phone"
        />
        <CustomInput
          label="DOB"
          name="date_of_birth"
          control={methods.control}
          type="date"
          placeholder="DOB"
        />

        <Select
          label="Role/Permissions"
          name="role_id"
          control={methods.control}
          onChange={handleRoleChange}
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.title}
            </option>
          ))}
        </Select>

        <div className="mt-4">
          <div className="d-flex flex-wrap gap-3">
            {RolesPermissions.map((permission) => (
              <label
                key={permission.id}
                className="d-flex align-items-center gap-2"
              >
                <Input
                  type="checkbox"
                  value={permission.id}
                  checked={permissions.includes(permission.id)}
                  onChange={handlePermissionChange}
                />
                <span>{permission.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          className={`btn btn-${user ? "primary" : "danger"} w-100 mt-5`}
          type="button" // Change to type="button" to prevent form submission
          onClick={handleUpdateClick} // Use handleUpdateClick for conditional logic
        >
          {user ? "Update User" : "Create User"}
        </button>
      </form>

      {user && ( // Only show ConfirmationModal during edit operations
        <ConfirmationModal
          show={showConfirmationModal}
          onHide={() => setShowConfirmationModal(false)}
          onConfirm={handleConfirmUpdate}
        />
      )}
    </div>
  );
};

export default UserregistrationForm;