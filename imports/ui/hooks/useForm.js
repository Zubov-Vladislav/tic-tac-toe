import { useState, useEffect } from 'react';

const useForm = (initialValues, callback, validate) => {
  
  const [ values, setValues ] = useState(initialValues);
  const [ errors, setErrors ] = useState({});
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(values);
    }
  }, [ errors, isSubmitting, values ]);
  
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    if (validate) setErrors(validate(values))
    setIsSubmitting(true);
  };
  
  const handleChange = (event) => {
    event.persist();
    setIsSubmitting(false);
    setValues(values => ( { ...values, [event.target.name]: event.target.value } ));
  };
  
  const clearErrors = () => {
    setErrors({});
    setIsSubmitting(false);
  };
  
  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    clearErrors
  }
};

export default useForm;
