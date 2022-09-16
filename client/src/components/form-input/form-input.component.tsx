import React from "react";
import "./form-input-styles.scss"
// React.HTMLProps<HTMLAnchorElement>
type FormInputInterface = {
    label: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    name:string;
    value: string;
    type:string;
}
function FormInput({ label, handleChange,name, value,type }: FormInputInterface) {

    return (
        <div className="group">
            <label htmlFor="">{label}</label>
            <input className="form-input"
                type={type}
                required
                onChange={handleChange}
                name={name}
                value={value}
                autoComplete={"off"}
            />

        </div>
    )
}

export default FormInput