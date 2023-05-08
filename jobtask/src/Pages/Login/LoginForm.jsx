import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; 
import { toast } from 'react-hot-toast';
import { useForm } from "react-hook-form";    
import { AuthContext } from '../../Context/AuthContext';

const LoginForm = () => {
    const [loader, setLoader] = useState(false)
    const { signInUserPassword, googleSignIn } = useContext(AuthContext) 
    const [passwordToggle, setPasswordToggle] = useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm(); 
    const location = useLocation()
    const Navigate = useNavigate() 

    const from = location?.state?.from || '/';

    

    const onSubmit = (data) => {

        setLoader(true)
        
        //Sign in user password
        signInUserPassword(data.email, data.password)
            .then((result) => {

                Navigate(from, { replace: true })
                toast.success('Login success full');
                setLoader(false);



            }).catch((error) => {

                const errorMessage = error.message;
                toast.error(errorMessage)
                setLoader(false)


            });


    }


    //google login
    const handelToGoogleLogin = () => {

        setLoader(true)

        googleSignIn()
            .then((result) => {
                Navigate(from, { replace: true })
                toast.success('Login success full');
                setLoader(false);

            }).catch((error) => {

                const errorMessage = error.message;
                toast.error(errorMessage)
                setLoader(false)


            });


    }
    return (
        <div className='my-5'>
            <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email </span>
                            </label>
                            <input type="email" placeholder="email" {...register("email", {
                                required: "Please enter a valid email address (the data you entered is not in the right format) ",
                                maxLength: { value: 20, message: "you enter value is up to 20 characters" }

                            })} className={errors.email ? "input input-bordered input-error" : "input input-bordered border border-accent"} />
                            {
                                errors.email && <p className=' text-red-600 mt-3'>{errors.email.message}</p>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password </span>
                            </label>
                            <input type={passwordToggle ? 'text' : 'password'} placeholder="password" {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "At last provide 6 characters" },
                                pattern: {
                                    value: /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]/,
                                    message: "must include lower, upper, number, and special chars"
                                }
                            })} className={errors.password ? "input input-bordered input-error" : "input input-bordered border border-accent"} />
                        </div>
                        <div className=' flex justify-end mr-5 -mt-10 z-0'>
                            {
                                passwordToggle ? <AiFillEyeInvisible onClick={() => setPasswordToggle(!passwordToggle)} className='text-3xl text-accent cursor-pointer' />
                                    : <AiFillEye onClick={() => setPasswordToggle(!passwordToggle)} className='text-3xl text-accent cursor-pointer' />
                            }
                        </div>
                        {
                            errors.password && <p className=' text-red-600 mt-3'>{errors.password.message}</p>
                        }
                        <label className="label mt-2">
                            <Link href="#" className="label-text-alt text-sm link link-hover text-accent">Forgot password?</Link>
                        </label>
                        <div className="form-control mt-6">
                            <button type='submit' className={`${loader ? 'loading' : 'text-white'} 
                                                            btn btn-accent text-white hover:bg-white hover:text-accent 
                                                            transition-all duration-500`}>
                                {loader ? 'Loading...' : 'Login'}
                            </button>
                        </div>
                    </form>
                    <div className="flex my-5">
                        <div className="w-32 h-[2px] bg-accent flex-2"></div>
                        <p className='text-lg mt-[-15px] flex-1 text-center text-accent'>OR</p>
                        <div className="w-32 h-[2px] flex-2 bg-accent"></div>
                    </div>

                    <div className="form-control">
                        <button className="btn bg-white text-accent 
                                           border border-accent hover:border-accent 
                                           transition-all duration-500
                                           hover:bg-accent  hover:text-white" onClick={handelToGoogleLogin} >
                            CONTINUE WITH GOOGLE
                        </button>
                    </div>

                    {/*Login info */}
                    <div className='mt-5'>
                        <h3 className="text-sm text-red-400">Admin Login</h3>
                        <p className='text-sm'><span className='text-red-200'> user:</span>emajon@admin.com  <span className='ml-2 text-red-200'>Password:</span> Admin@2</p> <br />
                       
                    </div>
        </div>
    );
};

export default LoginForm;