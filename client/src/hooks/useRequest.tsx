import axios from "axios";
import { useState } from "react";

export default ({ url, method, body }: any) => {
  const [errors, setErrors] = useState<any>(null);

  const doRequest = async () => {
    try {
      const response = await axios.request({
        withCredentials: true,
        url,
        method,
        data: body,
      })
      // console.log(response)
      return response.data;
    } catch (err: any) {
      console.log(err)
      setErrors(<div className="alert">
        <h4>Ooops...</h4>
        <ul className="list-alert">
          {
            //@ts-ignore
            err.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)
          }
        </ul>
      </div>)
    }
  };

  return { doRequest, errors };
};










/**
 * 
 * 
 * 
 * 
 * import { useState, FormEvent } from "react";
import axios from "axios";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";

interface Type {
  message: string;
}

interface Error {
  errors: Array<Type>;
}

const defaultFormFields = {
  email: "",
  password: "",
};

function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [errors, setErrors] = useState<Error>();
  const { email, password } = formFields;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/users/signin", {
        email, password
      });
      console.log(response.data)
    } catch (err: any) {
      const errors_data = err.response.data;
      setErrors(errors_data);

      // setErrors((err.response.data.errors)=>[errors?.data,...err.response.data.errors]);
      console.log('user sign in failed', err.response.data);
      console.log("here", errors?.errors.map(err => err.message))
    }
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

      {errors!?.errors.length > 0 &&

        (<div className="alert">
          <h4>Ooops...</h4>
          <ul className="list-alert">
            {
              errors?.errors.map(err => <li key={err.message}>{err.message}</li>)
            }
          </ul>
        </div>)

      }

    </div>
  );
}

export default SignInForm;
 */