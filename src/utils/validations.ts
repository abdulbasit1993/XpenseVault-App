const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export const validateEmail = email => {
  const sanitizedEmail = email.trim();

  if (sanitizedEmail.length === 0) {
    return 'Email cannot be empty';
  }

  return emailRegex.test(sanitizedEmail) ? '' : 'Invalid Email Format';
};

export const validatePassword = password => {
  const sanitizedPassword = password.trim();
  if (sanitizedPassword.length === 0) {
    return 'Password cannot be empty';
  }
  if (sanitizedPassword.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  return '';
};

export const validateName = name => {
  const sanitizedName = name.trim();
  if (!sanitizedName || sanitizedName.length === 0) {
    return 'Name cannot be empty';
  }
  return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword ? '' : 'Passwords do not match';
};

export const validateTitle = title => {
  const sanitizedTitle = title.trim();
  if (!sanitizedTitle || sanitizedTitle.length === 0) {
    return 'Title cannot be empty';
  }
  return '';
};

export const validateDate = date => {
  if (!date) {
    return 'Date is Required';
  }
  return '';
};

export const validateAmount = amount => {
  if (!amount) {
    return 'Total Amount is Required';
  }
  return '';
};

export const validateExpenseCategory = cat => {
  if (!cat) {
    return 'Expense Category is Required';
  }
  return '';
};

export const validateIncomeCategory = cat => {
  if (!cat) {
    return 'Income Category is Required';
  }
  return '';
};
