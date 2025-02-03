
import * as yup from "yup";

export const userRegistrationSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("First name is required")
    .trim()
    .min(3, "First name must be at least 3 characters")
    .max(50, "First name cannot exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces")
    .test(
      'no-leading-trailing-spaces',
      'First name cannot start or end with spaces',
      value => !value?.startsWith(' ') && !value?.endsWith(' ')
    ),

  sur_name: yup
    .string()
    .required("Last name is required")
    .trim()
    .min(3, "Last name must be at least 3 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces")
    .test(
      'no-leading-trailing-spaces',
      'Last name cannot start or end with spaces',
      value => !value?.startsWith(' ') && !value?.endsWith(' ')
    ),

  email: yup
    .string()
    .required("Email is required")
    .trim()
    .email("Invalid email format")
    .max(100, "Email cannot exceed 100 characters")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    ),

  phone_no: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number can only contain digits")
    .length(11, "Phone number must be exactly 11 digits")
    .test(
      'valid-prefix',
      'Phone number must start with a valid prefix',
      value => value ? /^(070|080|090|081|091)/.test(value) : true
    ),

  date_of_birth: yup
    .date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future")
    .test(
      'age-validation', 
      'You must be at least 18 years old', 
      (value) => {
        if (!value) return false;
        const today = new Date();
        const birthDate = new Date(value);
        
    
        if (isNaN(birthDate.getTime())) return false;
        
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        
        return age >= 18;
      }
    )
    .test(
      'reasonable-date',
      'Date of birth seems unreasonable',
      (value) => {
        if (!value) return false;
        const date = new Date(value);
        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 100); 
        return date >= minDate;
      }
    ),

  role_id: yup
    .string()
    .required("Role is required")
    
});