import { useState, FormEvent } from "react";
import useRequest from "../../hooks/useRequest";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { useDispatch,useSelector } from "react-redux";
import { loginUser } from "../../features/user/userSlice";
import { RootState } from "../../store";

const defaultFormFields = {
  email: "",
  password: "",
};

function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.user);

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(loginUser({ email, password })).then(() => {
      // navigate("/");
      // window.location.reload()
    })
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput key="2" label="Email" handleChange={handleChange} name={"email"} value={email} type="email" />
        <FormInput key="3" label="Password" handleChange={handleChange} name={"password"} value={password} type="password" />
        <Button type="submit">Sign In</Button>
      </form>

      {error}

    </div>
  );
}

export default SignInForm;
