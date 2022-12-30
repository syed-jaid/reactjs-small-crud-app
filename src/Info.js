import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Info = () => {
    const [selectdata, setSelectData] = useState([])
    const [userdata, setuserData] = useState({})
    const [update, setupdate] = useState(false)

    useEffect(() => {
        const id = sessionStorage.getItem("Id")
        // console.log(id)
        fetch(`http://localhost:5000/userinfo/${id}`)
            .then((res) => res.json())
            .then((data) => setuserData(data[0]));
    }, []);

    useEffect(() => {
        fetch("http://localhost:5000/selectingdata")
            .then((res) => res.json())
            .then((data) => setSelectData(data[0].data));
    }, []);

    // console.log(selectdata)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        const id = sessionStorage.getItem("Id")
        fetch(`http://localhost:5000/userinfo/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.result)
                if (data.result.acknowledged) {
                    toast.success('Your Info is updated')
                }
            });
    };
    return (
        <div className='max-w-[850px] mx-auto p-[25px] lg:p-[40px] rounded-[20px] bg-[#f2f2f2] border-[1px] border-[#6f6f6f]'>
            <p className='lg:text-[22px] text-black font-semibold text-start'>This is your name and you are currently involved in.</p>
            <div className='md:flex text-start'>
                <p className='lg:text-[19px] text-[#00684a] font-semibold my-2 mr-3'><span className='text-black'>Name</span> : {userdata?.Name}</p>
                <p className='lg:text-[19px] text-[#00684a] font-semibold my-2 mr-2'><span className='text-black'>Involved</span> : {userdata?.Involved}</p>
            </div>
            <p className='lg:text-[22px] text-black font-semibold text-start mt-[25px]'>Do you want to update your name and you are currently involved in. </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full mt-[35px]">
                    <span className='text-[15px] mb-[2px] font-semibold text-start'>Name</span>
                    <input type="text" placeholder="Your Name" className="input input-bordered input-info w-full max-w-full" defaultValue={userdata?.Name}  {...register("Name", { required: true })} />
                    {errors.Name && <span className='text-[14px] text-red-400 mt-[2px] text-start'>Name is required</span>}

                    <span className='text-[15px] mt-[18px] mb-[-15px] font-semibold text-start'>Selected currently involved</span>
                    <select className="select select-info w-full max-w-full mt-[20px]" {...register("Involved", { required: true })}>
                        <option selected>{userdata?.Involved} </option>
                        {
                            selectdata?.map((data, index) => <option key={index}>{data?.value}</option>)
                        }

                    </select>
                    {errors.Involved && <span className='text-[14px] text-red-400 text-start'>Please select your currently involved</span>}
                    <div className="form-control max-w-[195px] mt-[15px]">
                        <label className="cursor-pointer label">
                            {update ?
                                <> <input type="checkbox" className="checkbox checkbox-info" checked onClick={() => setupdate(false)} /><span className="label-text text-start"> You can update info </span></>
                                :
                                <> <input type="checkbox" className="checkbox checkbox-info" onClick={() => setupdate(true)} /><span className="label-text text-start"> You want to update info </span></>

                            }
                        </label>
                        {errors.Agree_Terms && <span className='text-[14px] mt-[-10px] text-red-400 text-start'>Check it</span>}
                    </div>
                </div>
                {update ? <button className="btn btn-outline px-[90px] mt-[10px]">Update Info</button> : <button className="btn btn-outline px-[90px] mt-[10px]" disabled>Update Info</button>}
            </form>
            <ToastContainer />
        </div>
    );
};

export default Info;