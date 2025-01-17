export type LoginCredentials = {
  email: string;
  password: string;
};

export type UserType = {
  uuid: string;
  first_name: string;
  sur_name: string;
  email: string;
  phone_no: string;
  date_of_birth: string; // Consider using Date if you plan to manipulate dates
  status: number; // Use an enum if statuses have specific meanings
  last_seen_at: string; // Consider using Date if you plan to manipulate dates
  role: string;
  modules: {
    [moduleName: string]: {
      [subModuleName: string]: string[]; // Array of permissions for each sub-module
    };
  };
};

export type AuthType = {
  isAuthenticated: boolean;
  user: UserType | null;
  loading: boolean;
  error: string | null;
};
