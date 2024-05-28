export const isValidEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const isValidAll = (value: string, type: string, password?: string) => {
  let result = false;
  switch (type) {
    case "email":
      result = isValidEmail(value);
      break;
    case "password":
      result = value.length >= 6;
      break;
    case "username":
      result = value.length >= 2;
      break;
    case "confirm_password":
      result = value === password;
      break;
    case "otp":
      result = value.length === 6;
      break;
    default:
      result = false;
      break;
  }
  return result;
};

export const isValidCheck = (name: string, value: string, inputValue: any) => {
  let isValid = false;
  switch (name) {
    case "New Password":
      isValid = value.length < 6;
      break;
    case "Confirm Password":
      isValid = value !== inputValue["New Password"];
      break;
    default:
      isValid = false;
      break;
  }

  return isValid;
};
