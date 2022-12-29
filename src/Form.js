import React from 'react';
import { useForm } from "react-hook-form";

const Form = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log('dsaf');
    return (
        <div className='max-w-[850px] mx-auto p-[25px] lg:p-[40px] rounded-[20px] bg-[#f2f2f2] border-[1px] border-[#6f6f6f]'>
            <p className='lg:text-[22px] text-black font-semibold'>Please enter your name and pick the Sectors you are currently involved in. </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full mt-[35px]">
                    <input type="text" placeholder="Your Name" className="input input-bordered input-info w-full max-w-full"   {...register("Name", { required: true })} />
                    {errors.Name && <span className='text-[14px] text-red-400 text-start'>Name is required</span>}
                    <select className="select select-info w-full max-w-full mt-[20px]" {...register("Involved", { required: true })}>
                        <option disabled>Select you Currently Involved</option>
                        <option>English</option>
                        <option>Japanese</option>
                        <option>Italian</option>
                    </select>
                    {errors.Involved && <span className='text-[14px] text-red-400 text-start'>Please select one</span>}
                    <div className="form-control max-w-[145px] mt-[15px]">
                        <label className="cursor-pointer label">
                            <input type="checkbox" className="checkbox checkbox-info"  {...register("Agree_Terms", { required: true })} /><span className="label-text"> Agree to terms </span>
                        </label>
                        {errors.Agree_Terms && <span className='text-[14px] text-red-400'>Please Agree to terms</span>}
                    </div>
                </div>
                <button className="btn btn-outline px-[100px]">Save Info</button>
            </form>
        </div>
    );
};

export default Form;