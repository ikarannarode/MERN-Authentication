import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            setLoading(true);
            setError(false);
            const response = await fetch("/api/auth/signup",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(formData),
                });
            const data = await response.json();

            setLoading(false);
            if (data.success === false) {
                setError(true);
                return;
            }
            setError(false);
        }
        catch (error) {
            setLoading(false);
            setError(true);
        }
    }






    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg outline-green-500' />
                <input type="email" onChange={handleChange} placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg outline-green-500' />
                <input type="password" onChange={handleChange} placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg outline-green-500' />

                <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-85'>{loading ? 'Loading...' : "Sign Up"}</button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Have an account?</p><Link to="/sign-in"><span className='text-blue-500'>Sign in</span></Link>
            </div>
            <p className='text-red-700 mt-5'>{error && "Something went wrong!"}</p>
        </div>
    )
}

export default SignUp