import { useState, FormEvent } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-up-form.styles.scss";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

const defaultFormFields = {
  name: "",
  email: "",
  password: "",
};

function SignUpForm() {

  const dispatch = useDispatch<AppDispatch>();
  const { signup } = useSelector((state: RootState) => state.user.error);
  const { userInfo } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, password } = formFields;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(signupUser({ name, email, password }))

    if (userInfo) {
      navigate("/")
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up</span>
      <form onSubmit={handleSubmit}>
        <FormInput key="1" label="Name" handleChange={handleChange} name={"name"} value={name} type="text" />
        <FormInput key="2" label="Email" handleChange={handleChange} name={"email"} value={email} type="email" />
        <FormInput key="3" label="Password" handleChange={handleChange} name={"password"} value={password} type="password" />
        <Button type="submit">Sign Up</Button>
      </form>

      {signup}
    
    </div>
  );
}

export default SignUpForm;
