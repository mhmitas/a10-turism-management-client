import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import toast from 'react-hot-toast';
import ErrorMessageInsideForm from '../../components/common/ErrorMessage';

const SignIn = () => {
    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()
    const { register, handleSubmit } = useForm()
    const { signInUser, popUpSignIn } = useContext(AuthContext)
    const [loginError, setLoginError] = useState(null);


    const location = useLocation()
    // console.log(location);
    const navigate = useNavigate()


    function onSubmit(data, event) {
        signInUser(data.email, data.password)
            .then(result => {
                // console.log(result.user);
                event.target.reset();
                location.state ? navigate(location.state) : navigate("/");
                toast.success('Sign in Success')
            })
            .catch(error => {
                // console.log(error);
                setLoginError(error.message)
            })
    }
    function handlePopUpSignIn(provider) {
        popUpSignIn(provider)
            .then(result => {
                console.log(result.user);
                location.state ? navigate(location.state) : navigate("/");
                toast.success('Sign in Success')
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <>
            <div className=' max-w-md mx-auto p-14 my-20 bg-base-100 shadow-xl'>
                <h3 className='text-3xl font-semibold text-center mb-6'>Sign in</h3>
                {loginError && <ErrorMessageInsideForm text2="Invalid email or password"></ErrorMessageInsideForm>}
                <form onSubmit={handleSubmit(onSubmit)} className='w-full '>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            required
                            {...register("email")}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="text"
                            required
                            {...register("password")}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" className="btn btn-primary" value="Sign in" />
                    </div>
                </form>
                <p className="mt-6">
                    Don't have an account? Please
                    <Link to="/sign-up" className="link link-primary ml-2">
                        Sign up
                    </Link>
                </p>
                <div className="divider mt-6">Or continue with</div>
                <div className="form-control">
                    <div className="flex justify-center space-x-2 mt-4">
                        <button onClick={() => handlePopUpSignIn(googleProvider)} className="btn btn-outline btn-icon btn-google">
                            <FaGoogle className='text-xl' /> Google
                        </button>
                        <button
                            onClick={() => handlePopUpSignIn(githubProvider)}
                            className="btn btn-outline btn-icon btn-twitter">
                            <FaGithub className='text-xl' /> Github
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;