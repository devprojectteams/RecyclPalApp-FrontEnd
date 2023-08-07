export const validatePhoneNumber = (value) => {
  // Regular expression for phone number validation
  const phoneRegExp = /^\+234\d{10}$/;
  return phoneRegExp.test(value);
};
