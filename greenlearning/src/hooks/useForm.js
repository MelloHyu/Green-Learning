import { useState } from "react";

// Custom hook for form state + validation
export function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" }); // type: "success" | "error"

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleSubmit(onSubmit) {
    return function (e) {
      e.preventDefault();
      const validationErrors = validate ? validate(values) : {};
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      onSubmit(values, setMessage, setErrors);
    };
  }

  function reset() {
    setValues(initialValues);
    setErrors({});
    setMessage({ text: "", type: "" });
  }

  return { values, errors, message, handleChange, handleSubmit, reset, setMessage };
}
