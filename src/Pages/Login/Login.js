import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../hooks/useToken";

const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const {signIn, signWithGoogle} = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');
  const [loginUserEmail, setLoginUserEmail] = useState('');
  const [token] = useToken(loginUserEmail);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  if(token){
    navigate(from, {replace: true});
  }
  
  const handleLogin = data => {
    setLoginError('');
    signIn(data.email, data.password)
    .then(result => {
      const user = result.user;
      setLoginUserEmail(data.email)
      console.log('Login:', user);
    })
    .catch(error => {
      const errorMessage = error.message;
      setLoginError(errorMessage);
      console.log('logIn error:', errorMessage)
    })
  }

  //sign with google
  const handleGoogleSignIn = () => {
    signWithGoogle()
    .then((result) => {
      const user = result.user;
      navigate(from, {replace: true});
    })
    .catch((error) => {
        const errorMessage = error.message;
        console.log("Google Sign In error:", errorMessage);
    })
  }

  return (
    <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-xl mx-auto mt-16 mb-16">
      <h1 className="text-2xl font-bold text-gray-800 text-center">Login</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="space-y-1 font-bold">
          <label htmlFor="email" className="block dark:text-gray-400">
            Email*
          </label>
          <input
            {...register("email", {required: "Email Address is Required"})}
            type="email"
            name="email"
            id="email"
            placeholder="exmple@gmail.com"
            className="w-full px-4 py-3 rounded-md border-2 border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-300"
          />
        </div>
        {errors.email && <p className="text-red-600">{errors.email?.message}</p>}
        <div className="space-y-1 font-bold">
          <label htmlFor="password" className="block dark:text-gray-400 mt-6">
            Password*
          </label>
          <input
            {...register("password", { required: "Password is required", 
            minLength: {value: 6, message: "password must be 6 characters or Longer"}
          })}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            className="w-full px-4 py-3 rounded-md border-2 border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-300"
          />
        </div>
        {errors.password && <p className="text-red-600">{errors.password?.message}</p>}
        <div className="flex justify-end font-bold dark:text-gray-400">
          <Link rel="noopener noreferrer" href="#">
            Forgot Password?
          </Link>
        </div>
        {loginError && <p className="text-red-600 font-semibold">{loginError}</p>}
        <input
          className="btn btn-secondary w-full rounded-none py-2 px-8 mt-10 text-gray-100"
          value="Log In"
          type="submit"
        />
      </form>
      <p className=" font-bold text-center sm:px-6 dark:text-gray-400">
        New to Doctors Portal?
        <Link
          rel="noopener noreferrer"
          to="/signup"
          className="underline dark:text-primary"
        >
          Sign up
        </Link>
      </p>
      <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        <p className="px-3 dark:text-gray-400">OR</p>
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
      </div>
      <div className="flex justify-center space-x-4">
        <button onClick={handleGoogleSignIn} className="border-2 border-primary py-2 px8 w-full">
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Login;
