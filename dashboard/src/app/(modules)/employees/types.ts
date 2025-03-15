export type EmployeeType = {
  id: number;
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  dob: string;
  nin: string;
  home_address: string;
  current_address: string;
  nationality: string;
  state_id: number;
  department_id: number;
  job_description_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  next_of_kin: {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    relationship: string;
    nin: string;
    employee_id: number;
    created_at: string;
    updated_at: string;
  };
  department: {
    id: number;
    uuid: string;
    name: string;
    description: string;
    max_employee_no: number;
    status: number;
    created_at: string;
    updated_at: string;
  };
  state: {
    id: number;
    name: string;
    created_at: string | null;
    updated_at: string | null;
  };
  job_description: {
    id: number;
    name: string;
    description: string;
    status: number;
    created_at: string;
    updated_at: string;
  };
};

export type EmployeeFormData = {
  personalInfo: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    dob: string;
    home_address: string;
    nin?: string;
  };
  nextOfKin: {
    nok_first_name: string;
    nok_last_name: string;
    nok_relationship: string;
    nok_phone: string;
    nok_address: string;
    nok_nin?: string;
  };
  departmentRole: {
    department_id: string;
    job_description_id: string;
  };
};

export type EmployeeFormSteps = "personalInfo" | "nextOfKin" | "departmentRole";
