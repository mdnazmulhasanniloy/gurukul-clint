import React, { useContext, useState } from 'react';  
import { useForm } from 'react-hook-form'; 
import { useNavigate, useLocation } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';   
import { toast } from 'react-hot-toast';
import { AuthContext } from './../../Context/AuthContext';


const Register = () => {
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext)
    const [loader, setLoader] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [createdUserEmail, setCreatedUserEmail] = useState('') 
    const Navigate = useNavigate();
    const location = useLocation();
    const [passwordToggle, setPasswordToggle] = useState(false)
    const [inputImg, setInputImg]=useState(null) 


    const from = location?.state?.from || '/';


    const onSubmit = (data) => {
        setLoader(true)
        const imgHostKey = `1ac619d1289137be2fe6cbaa52f2b8f9`

        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);

        fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {

                    const userInfo = {
                        displayName: data.name,
                        photoURL: imgData.data.url,

                    }

                    // create user
                    createUser(data.email, data.password)
                        .then((result) => {

                            // update user profile
                            updateUserProfile(userInfo)
                                .then(() => {
                                    
                                    Navigate(from, { replace: true })
                                    setLoader(false)
                                    toast.success('Register success full');


                                })
                                .catch(err => {
                                    toast.error(err.message)
                                    setLoader(false)
                                });

                        }).catch((error) => {

                            const errorMessage = error.message;
                            toast.error(errorMessage)
                            setLoader(false)


                        });

                }
            });



    }


    //google login

    const HandelToGoogleLogin = () => {

        setLoader(true)
        googleSignIn()
            .then((result) => {
                Navigate(from, { replace: true })
                setLoader(false)
                toast.success('Register success full');


            }).catch((error) => {

                const errorMessage = error.message;
                toast.error(errorMessage)
                setLoader(false)

            });
    }






    const handelChange = e =>{
        const image = e.target.value;
        setInputImg(image) 

    }

    return (
        <div className='mt-5'>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="grid lg:grid-cols-2 md:grid-2 sm:grid-1 gap-3">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="name" placeholder="Enter Your Name" {...register("name", {
                                    required: "This field is required (You can't leave this field blank) ",
                                    maxLength: { value: 20, message: "Please Provide" }

                                })} className={errors.name ? "input input-bordered input-error" : "input input-bordered border border-accent"} />
                                {
                                    errors.name && <p className=' text-red-600'>{errors.name.message}</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" {...register("email", {
                                    required: "Please enter a valid email address (the data you entered is not in the right format) ",
                                    maxLength: { value: 20, message: "you enter value is up to 20 characters" }

                                })} className={errors.email ? "input input-bordered input-error" : "input input-bordered border border-accent"} />
                                {
                                    errors.email && <p className=' text-red-600 mt-3'>{errors.email.message}</p>
                                }
                            </div>

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
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

                        <div className='w-100 flex justify-end mr-5 -mt-10 z-0'>
                            {
                                passwordToggle ? <AiFillEyeInvisible onClick={() => setPasswordToggle(!passwordToggle)} className='text-3xl text-accent cursor-pointer' />
                                    : <AiFillEye onClick={() => setPasswordToggle(!passwordToggle)} className='text-3xl text-accent cursor-pointer' />
                            }
                        </div>
                        {
                            errors.password && <p className=' text-red-600 mt-3'>{errors.password.message}</p>
                        }

                        <div className="form-control mt-5">
                            <label htmlFor="dropzone-file" className={errors.img ? "flex flex-col items-center justify-center w-full border-2 border-red-600 border-dashed rounded-lg cursor-pointer bg-gray-50 group"
                                : "flex flex-col items-center justify-center w-full border-2 border-accent border-dashed rounded-lg cursor-pointer bg-gray-50 group"}>
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-accent group-hover:scale-110 transition-all duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-sm text-accent group-hover:scale-110 transition-all duration-700">{inputImg? 'Image Uploading' : <><span className="font-semibold">Click to upload</span> User Images</>}</p>
                                </div>
                                <input id="dropzone-file" name='image' onInput={handelChange} {...register("img", {
                                    required: "img is required",
                                })} type="file" className="hidden" accept=".png, .jpg, .jpeg" />
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className={`${loader ? 'loading' : 'text-white'} 
                                                            btn btn-accent text-white hover:bg-white hover:text-accent 
                                                            transition-all duration-500`}>
                                {loader ? 'Loading...' : 'Register'}
                            </button>
                        </div>
                    </form>
                    <div className="flex my-5">
                        <div className="w-32 h-[2px] bg-accent flex-2"></div>
                        <p className='text-lg mt-[-15px] flex-1 text-center  text-accent'>OR</p>
                        <div className="w-32 h-[2px] flex-2 bg-accent"></div>
                    </div>

                    <div className="form-control">
                        <button className="btn bg-white text-accent 
                                           border border-accent hover:border-accent 
                                           transition-all duration-500
                                           hover:bg-accent  hover:text-white" onClick={HandelToGoogleLogin}>CONTINUE WITH GOOGLE</button>
                    </div>
                </div>
    );
};

export default Register;