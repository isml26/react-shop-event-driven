import SignUpForm from "../../components/sign-up-form/sign-up-component";
import SignInForm from "../../components/sign-in-form/sign-in-component";
import './authentication.styles.scss';

function Authentication() {
  // useEffect(() => {
  //   async function myFun() {
  //     const response = await getRedirectResult(auth);
  //     if (response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   }
  //   myFun();
  // }, []);

  return (
    <div className="auth-container">
      <SignInForm/>
      <SignUpForm/>
    </div>
  );
}

export default Authentication;
