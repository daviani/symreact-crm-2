import React from "react";

const Field = ({
                   name,
                   label,
                   value,
                   onChange,
                   placeholder,
                   type = "text",
                   error = ""
               }) => (
    <div className="form-group col-6 mt-3">
        <label htmlFor={name}>{label}</label>
        <input value={value}
               onChange={onChange}
               type={type}
               className={"form-control" + (error && " is-invalid")}
               id={name}
               aria-describedby="emailHelp"
               placeholder={placeholder}
               name={name}
        />
        {error && <p className="invalid-feedback">
            {error}
        </p>}
    </div>
);

export default Field;