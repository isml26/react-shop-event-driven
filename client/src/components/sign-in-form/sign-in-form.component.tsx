import { useState, FormEvent, useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/user/userSlice";
import { RootState } from "../../store";

const defaultFormFields = {
  email: "",
  password: "",
};

function SignInForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();
  const { signin } = useSelector((state: RootState) => state.user.error);
  const { userInfo } = useSelector((state: RootState) => state.user);


  // async function logUser() {
  //   const res = await axios.post("http://localhost:3001/api/users/signout",{}, { withCredentials: true })
  //   console.log(res);
  // }

  const { doRequest, errors } = useRequest({
    url: "http://localhost:3001/api/users/signin",
    method: "POST",
    body: {
      email, password
    },
  })

  // useEffect(() => {
  //   logUser();
  // }, [])


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  };

  const HandleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }))
    console.log(userInfo)

    if (userInfo) {
      navigate("/")
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={HandleSubmit}>
        <FormInput key="2" label="Email" handleChange={handleChange} name={"email"} value={email} type="email" />
        <FormInput key="3" label="Password" handleChange={handleChange} name={"password"} value={password} type="password" />
        <Button type="submit">Sign In</Button>
      </form>

      {signin}

    </div>
  );
}

export default SignInForm;
