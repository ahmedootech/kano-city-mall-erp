import { EmployeeFormData } from "./types";

export const employeeDefaultData: EmployeeFormData = {
  personalInfo: {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
    home_address: "",
    nin: "",
  },
  nextOfKin: {
    nok_first_name: "",
    nok_last_name: "",
    nok_address: "",
    nok_phone: "",
    nok_relationship: "",
    nok_nin: "",
  },
  departmentRole: {
    department_id: "",
    job_description_id: "",
  },
};
