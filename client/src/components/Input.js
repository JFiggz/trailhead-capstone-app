import { forwardRef } from 'react';

export const Input = forwardRef(({ addClass, placeholder, name, type, handleChange, value, errClass }, ref) => {
    // Forward ref added to allow for useRef hook on parent component
    return (
        <input
            className={`input ${addClass ? addClass : ""}`}
            placeholder={placeholder}
            name={name}
            type={type ? type : "text"}
            minLength='1'
            onChange={handleChange && ((e) => handleChange(e.target, errClass))}
            value={value && value}
            ref={ref}
        />
    );
});