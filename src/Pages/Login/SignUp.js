import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../hooks/useToken";

const SignUp = () => {
    const { register,formState: { errors }, handleSubmit } = useForm();
    const {createUser, updateUseProfile, signWithGoogle} = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();

    if(token){
      navigate('/')
    }

    const handleSignUp = data => {
      setSignUpError('');
        createUser(data.email, data.password)
        .then(result => {
          const user = result.user;
          console.log('createUser:', user);
          handleUpdateUserProfile(data.name)
          saveUser(data.name, data.email);
        })
        .catch(error => {
          const errorMessage = error.message;
          setSignUpError(errorMessage);
        })
    }

    //update user profile
    const handleUpdateUserProfile = (name) => {
      const userInfo = {
        displayName: name
      }
      updateUseProfile(userInfo)
          .then(() => {})
          .catch(error => console.log('updateuser:', error))
    }

    //saved user collection
    const saveUser = (name, email) => {
      const user = {name, email}
      fetch('https://doctors-portal-server-mocha.vercel.app/users', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data => {
        setCreatedUserEmail(email)
        console.log(email);
      })
    }

    //sign with google
    const handleGoogleSignUp = () => {
      signWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log('googlesignup:', user);
        navigate('/');
      })
      .catch((error) => {
          const errorMessage = error.message;
          console.log("Google Sign Up error:", errorMessage);
      })
    }

  return (
    <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-xl mx-auto mt-16 mb-16">
      <h1 className="text-2xl font-bold text-gray-800 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <div className="space-y-1 font-bold">
          <label htmlFor="name" className="block dark:text-gray-400">
            Name*
          </label>
          <input
            {...register("name", {required: "Name Is Required",
            minLength: {value: 4, message: "Name Must Be 4 Characters Or Long"}
            })} 
            type="text"
            name="name"
            id="name"
            placeholder="Enter Your Name"
            className="w-full px-4 py-3 rounded-md border-2 border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-300"
          />
        </div>
        {errors.name && <p className="text-red-600">{errors.name?.message}</p>}
        <div className="space-y-1 font-bold mt-4">
          <label htmlFor="email" className="block dark:text-gray-400">
            Email*
          </label>
          <input
          {...register("email", {required: "Email is Required"})}
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
            {...register("password", {required: "password is Required",
            pattern: {value: /(?=.*[A-Z].*[A-Z])/, message: "Password Must be 2 Upper Case"},
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
        {signUpError && <p className="text-red-600">{signUpError}</p>}
        <input
          className="btn btn-secondary w-full rounded-none py-2 px-8 mt-6 text-gray-100"
          value="Sign Up"
          type="submit"
        />
      </form>
      <p className=" font-bold text-center sm:px-6 dark:text-gray-400">
        Have an account?
        <Link
          rel="noopener noreferrer"
          to="/login"
          className="underline dark:text-primary"
        >
          Log In
        </Link>
      </p>
      <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        <p className="px-3 dark:text-gray-400">OR</p>
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
      </div>
      <div className="flex justify-center space-x-4">
        <button onClick={handleGoogleSignUp} className="border-2 border-primary py-2 px8 w-full">
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default SignUp;
