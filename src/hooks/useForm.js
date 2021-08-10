import { useState } from "react";

// Custom hook para obtener datos de los imput

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  //Reinicia al initialState 
  const reset = () => {
    setValues(initialState);
  };

  //Toma el valor del input
  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  //Cambia los valores directamente al state
  const handleCustomValues = (value) => {
    setValues(value);
  };

  return [values, handleInputChange, reset, handleCustomValues];
};
