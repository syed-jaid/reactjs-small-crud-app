import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Info = () => {
    const [selectdata, setSelectData] = useState([])
    const [userdata, setuserData] = useState({})

    useEffect(() => {
        const id = sessionStorage.getItem("Id")
        // console.log(id)
        fetch(`http://localhost:5000/userinfo/${id}`)
            .then((res) => res.json())
            .then((data) => setuserData(data[0]));
    }, []);
    console.log(userdata)
    useEffect(() => {
        fetch("http://localhost:5000/selectingdata")
            .then((res) => res.json())
            .then((data) => setSelectData(data[0].data));
    }, []);

    // console.log(selectdata)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {

    };
    return (
        <div className='max-w-[850px] mx-auto p-[25px] lg:p-[40px] rounded-[20px] bg-[#f2f2f2] border-[1px] border-[#6f6f6f]'>
            <p className='lg:text-[22px] text-black font-semibold'>Please enter your name and pick the Sectors you are currently involved in. </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full mt-[35px]">
                    <span className='text-[15px] mb-[2px] font-semibold text-start'>Enter your Name</span>
                    <input type="text" placeholder="Your Name" className="input input-bordered input-info w-full max-w-full"   {...register("Name", { required: true })} />
                    {errors.Name && <span className='text-[14px] text-red-400 mt-[2px] text-start'>Name is required</span>}

                    <span className='text-[15px] mt-[18px] mb-[-15px] font-semibold text-start'>Select you currently involved</span>
                    <select className="select select-info w-full max-w-full mt-[20px]" {...register("Involved", { required: true })}>
                        <option disabled selected></option>
                        {
                            selectdata?.map((data, index) => <option key={index}>{data?.value}</option>)
                        }

                    </select>
                    {errors.Involved && <span className='text-[14px] text-red-400 text-start'>Please select your currently involved</span>}
                    <div className="form-control max-w-[145px] mt-[15px]">
                        <label className="cursor-pointer label">
                            <input type="checkbox" className="checkbox checkbox-info"  {...register("Agree_Terms", { required: true })} /><span className="label-text"> Agree to terms </span>
                        </label>
                        {errors.Agree_Terms && <span className='text-[14px] mt-[-10px] text-red-400'>Please Agree to terms</span>}
                    </div>
                </div>
                <button className="btn btn-outline px-[100px] mt-[10px]">Save Info</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Info;