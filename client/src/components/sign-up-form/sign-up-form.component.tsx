import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-up-form.styles.scss";

const defaultFormFields = {
  name: "",
  email: "",
  password: "",
};

function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, password } = formFields;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up</span>
      <form onSubmit={() => { }}>
        <FormInput key="1" label="Name" handleChange={handleChange} name={"name"} value={name} type="text" />
        <FormInput key="2" label="Email" handleChange={handleChange} name={"email"} value={email} type="email" />
        <FormInput key="3" label="Password" handleChange={handleChange} name={"password"} value={password} type="password" />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default SignUpForm;
