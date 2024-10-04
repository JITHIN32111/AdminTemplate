import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/mainLogo2.png";
import SidePortionInAuth from "./SidePortionInAuth";
import { useFormik } from "formik";
import { signinInitialValues, signInSchema } from "../schema";
import authAPI from "../apis/authApi";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { doLogin } = authAPI()
function SignUp() {
  const navigate=useNavigate()
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const [isLoading, setIsLoading] = useState(false);



  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: signinInitialValues,
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const data = {
        email: values.email,
        password: values.password,
      };
      console.log(data);

      resetForm();

      try {
        const res = await doLogin(data);
    
        
        if (res?.data?.statusCode === 200);
        {
          const accessToken = res?.data?.data?.token;
          const id = res?.data?.data?.id;
          const name = res?.data?.data?.admin;
          const email = res?.data?.data?.email;
          login(accessToken, id,name,email);
       
          toast.success("Login success", {
            autoClose: 1000,
            onClose: () => navigate("/admin"),
          });
         
        }


      } catch (err) {
        console.log(err);
        if (err.response) {

          if (err.response.status === 403) {
            toast.error("invalid credentials", {
              autoClose: 2000,
            });
          }
          if (err.response.status === 401) {
            toast.error("please check the credentials again ", {
              autoClose: 2000,
            });
            
          }



        }else{
          alert('network error')
        }
        
        // if (err.response) {
        //   if (err.response.data.message==='please complete the verification') {
        //     localStorage.setItem("mail", err.response?.data?.data.data);
        //     await resendOtp({ email: err.response?.data?.data.data   });

        //     // Display toast and stop further execution
        //     toast.error("Please verify your account", {
        //       autoClose: 2000,
        //       onClose: () => navigate("/otp-verification"),
        //     });
        //     return
        //   }
        //   const message = err?.response?.data?.message;
        //   toast.error(message);
        // }
      } finally {
        setIsLoading(false);
        // Stop loading
      }
    },
  });






  return (
    <div className="flex   flex-row bg-custom-blue xs:px-14 px-6 md:px-0 lg:px-14 pt-6 xs:pb-8 sm:pb-2 pb-0 h-screen">
      <ToastContainer/>
      <SidePortionInAuth />

      <div className="w-full md:w-1/2 px-0 sm:ml-14 lg:ml-0 sm:p-6 flex flex-col justify-evenly items-start mb-12 lg:mb-0">
        <span className="flex-row -ml-4 md:-mt-12 -mt-0 items-center gap-x-6 hidden lg:flex">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <span className="text-blue-700   text-2xl lg:text-2xl font-bold -ml-5">
            BlizerFI
          </span>
        </span>

        <form className="w-full max-w-sm text-blue-700 -mt-10" onSubmit={handleSubmit}>
          <h2 className="lg:text-3xl text-2xl font-semibold mb-6 text-blue-700 mt-4">
            Login
          </h2>

          {/* Email */}
          <div className="mb-4">
            <label className="block xs:text-sm text-[12px] font-medium text-blue-700 mb-2" htmlFor="email">
              EMAIL
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-3 bg-transparent border rounded-lg text-gray-800 border-gray-400 focus:outline-none focus:border-blue-400"
              placeholder="Enter Mail"
            />
            {touched.email && errors.email ? (
              <p className="form-error sm:text-red-600 text-red-400">
                {errors.email}
              </p>
            ) : null}
          </div>

          {/* Password */}
          <div className="mb-2 relative">
            <label
              className="block xs:text-sm text-[12px] text-blue-700 font-medium mb-2"
              htmlFor="password"
            >
              PASSWORD
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full text-gray-800 p-2 pr-10 bg-transparent border rounded-lg border-gray-400 focus:outline-none focus:border-blue-400"
                placeholder="********"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={togglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="min-h-[20px]">
              {touched.password && errors.password && (
                <p className="form-error  sm:text-red-600 text-red-400">{errors.password}</p>
              )}
            </div>
          </div>

          {/* Remember Me */}
          {/* <div className="mb-6">
            <label className="flex items-center text-[12px] sm:text-[10px] lg:text-sm">
              <input type="checkbox" className="mr-2 rounded-xl" />
              <span>
                <span className="font-semibold">Remember Me</span>
              </span>
            </label>
          </div> */}

          {/* Login Button */}
          <button
            disabled={isLoading}
            type="submit"
            className="w-full text-center mt-4 bg-blue-700 shadow-sm shadow-blue-600 font-semibold bg-button_color hover:scale-95 ease-in  py-3 rounded-lg hover:bg-blue-700 text-white transition duration-200 flex justify-center items-center"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Login"
            )}
          </button>

          {/* Signup and Forgot Password */}
          {/* <span className="flex flex-col items-start">
            <p className="mt-4 text-sm sm:text-[15px] text-center">
              Don't have an account?{" "}
              <span className="font-semibold hover:text-blue-950 cursor-pointer">
                Signup
              </span>
            </p>
            <p className="mt-4 cursor-pointer text-sm sm:text-[15px] text-center">
              <span className="font-semibold hover:text-blue-950">Forgot password?</span>
            </p>
          </span> */}
        </form>
      </div>

      {/* Right-side section */}
    </div>
  );
}

export default SignUp;
