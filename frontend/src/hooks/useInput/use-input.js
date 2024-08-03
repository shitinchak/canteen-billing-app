import { useState } from "react";
const useInput = (validate) => {
    const [value, setValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const isValueValid = validate(value);
    const hasError = !isValueValid && isTouched;

    const valueChangeHandler = event => {
        setValue(event.target.value);
    }

    const blurHandler = event => {
        setIsTouched(true);
    }

    const reset = () =>{
        setValue('');
        setIsTouched(false);
    }

    return {
        value,
        hasError,
        isValueValid,
        reset,
        valueChangeHandler,
        blurHandler,
    }
}

export default useInput;