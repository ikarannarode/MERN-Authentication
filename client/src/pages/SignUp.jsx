import React from 'react'

function SignUp() {
    return (
        <div>
            <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
            <form className='text-center flex column'>
                <input type="text" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg ' />
                <input type="text" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' />
                <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' />


            </form>
        </div>
    )
}

export default SignUp