export type newUserInterface = {
  first_name: string;
  sur_name: string;
  email: string;
  phone_no: string;
  date_of_birth: string;
  role_id: number;
  permissions: number [],
}


export type SignupState = {
    newUser: newUserInterface | null;
    loading: boolean;
    error: string | null;
  };
  