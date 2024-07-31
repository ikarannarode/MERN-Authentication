import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from 'react-redux';
import {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserFailure,
    deleteUserSuccess,
    signOut
} from '../redux/user/userSlice';


function Profile() {
    const dispatch = useDispatch();

    const [image, setimage] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0)
    const [imageError, setImageError] = useState(false)
    const [formData, setFormData] = useState({})
    const [updateSucess, setUpdateSuccess] = useState(false)
    const { currentUser, loading, error } = useSelector(state => state.user);

    useEffect(() => {
        if (image) {
            handleFileUpload(image);
        }
    }, [image])
    const fileRef = useRef(null);

    const handleFileUpload = async (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePercent(Math.round(progress))
            },

            (error) => {
                setImageError(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
                    setFormData({
                        ...formData, profilePicture: downloadURL

                    }))
            }

        );
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data));
                return;
            }
            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
        } catch (error) {
            dispatch(updateUserFailure(error));
        }
    };

    const handleDeleteAccount = async (req, res) => {
        try {
            dispatch(deleteUserStart())
            const res = await fetch(`/api/user/delete/${currentUser.id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data));
                return;
            }
            dispatch(deleteUserSuccess);

        } catch (error) {
            dispatch(deleteUserFailure(error));
        }
    }


    const handleSignOut = async () => {
        try {
            await fetch('/api/auth/signout');
            dispatch(signOut());


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='my-7 text-center font-semibold text-3xl'> Profile</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e) => setimage(e.target.files[0])} />
                <img src={formData.profilePicture || currentUser.profilePicture} alt="Profile" className='h-24 w-24 rounded-full self-center cursor-pointer object-cover mt-2' onClick={() => fileRef.current.click()} />
                <p className='text-sm self-center'>
                    {imageError ?
                        (<span className='text-red-700'>Error uploading image (file size must be less then 2 MB)</span>) :
                        imagePercent > 0 && imagePercent < 100 ? (<span className='text-slate-700'>{`Uploading:  ${imagePercent}%`}</span>) : imagePercent === 100 ? (<span className='text-green-700'>Image upload successfully</span>) : ''}
                </p>

                <input type="text" name="username" id="username" placeholder='Username' defaultValue={currentUser.username} className='bg-slate-100 lg-3 p-3 rounded-lg' onChange={handleChange} />
                <input type="email" name="email" id="email" placeholder='Email' defaultValue={currentUser.email} className='bg-slate-100 lg-3 p-3 rounded-lg' onChange={handleChange} />
                <input type="password" name="password" id="password" placeholder='Password' className='bg-slate-100 lg-3 p-3 rounded-lg' onChange={handleChange} />
                <button type="button" onClick={handleSubmit} className='uppercase bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-95'>{loading ? "Loading..." : "Update"}</button>
            </form>
            <div className='flex justify-between mt-5'>
                <span
                    onClick={handleDeleteAccount}
                    className='text-red-700 cursor-pointer'
                >
                    Delete Account
                </span>
                <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
            </div>
            <p className='text-red-700 mt-5'>{error && "Something went wrong!"}</p>
            <p className='text-green-700 mt-5'>{updateSucess && "User updated successfully"}</p>
        </div>
    )
}

export default Profile