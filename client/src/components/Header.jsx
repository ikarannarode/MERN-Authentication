import React from 'react';
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className='bg-slate-200'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to="/">
                    <h1 className='font-bold text-xl'>Auth App</h1>
                </Link>
                <ul className='flex gap-4'>
                    <Link to="/">
                        <li >Home</li>
                    </Link><Link to="/about">
                        <li>About</li>
                    </Link><Link to="/profile">
                        <li>Profile</li>
                    </Link><Link to="/sign-in">
                        <li><span className='bg-blue-300 py-2.5 px-2.5 rounded-md mx-3'>SignIn</span></li>
                    </Link>

                </ul>
            </div>
        </div>
    )
}

export default Header