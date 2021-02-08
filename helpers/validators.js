export const registerValidator = (user) => {
  const errors = {};
  if(user.username.length < 3) {
    errors.username = 'Username is at least 3 characters'
  }
  if(user.password !== user.password2) {
    errors.password = 'Passwords do not match'
  
  }
  return errors
}
