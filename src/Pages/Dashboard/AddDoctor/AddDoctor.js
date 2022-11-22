import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const AddDoctor = () => {
    const { register,formState: { errors }, handleSubmit } = useForm();
     const imgHostKey = process.env.REACT_APP_IMGBB_key;
     const navigate = useNavigate();

    const {data: specialties, isLoading} = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('https://doctors-portal-server-mocha.vercel.app/appointmentSpecialty')
            const data = await res.json()
            return data;
        }
    })

    if(isLoading){
        return <Loading />
    }

    const handleDoctor = (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            console.log(imgData.data.url)
            if(imgData.success){
                const doctor ={
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    image: imgData.data.url
                }
                //save doctor inpormation form database
                fetch('https://doctors-portal-server-mocha.vercel.app/doctors', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    toast.success(`${data.name} is added successfully`);
                    navigate('/dashboard/manageDoctor');
                })
            }
        })

     
    };
  return (
    <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-xl mx-auto mt-16 mb-16">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        Add Doctor
      </h1>
      <form onSubmit={handleSubmit(handleDoctor)}>
        <div className="space-y-1 font-bold">
          <label htmlFor="name" className="block dark:text-gray-400">
            Name*
          </label>
          <input
            {...register("name", {
              required: "Name Is Required",
              minLength: {
                value: 4,
                message: "Name Must Be 4 Characters Or Long",
              },
            })}
            type="text"
            name="name"
            id="name"
            placeholder="Enter Your Name"
            className="w-full px-4 py-3 rounded-md border-2 border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-300"
          />
        </div>
        {errors.name && <p className="text-red-600">{errors.name?.message}</p>}
        <div className="space-y-1 font-bold mt-4">
          <label htmlFor="email" className="block dark:text-gray-400">
            Email*
          </label>
          <input
            {...register("email", { required: "Email is Required" })}
            type="email"
            name="email"
            id="email"
            placeholder="exmple@gmail.com"
            className="w-full px-4 py-3 rounded-md border-2 border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-300"
          />
        </div>
        {errors.email && (
          <p className="text-red-600">{errors.email?.message}</p>
        )}
        <div className="space-y-1 font-bold">
          <label htmlFor="specilty" className="block dark:text-gray-400 mt-6">
            Specialty*
          </label>
          <select
          {...register('specialty', {required: true})} 
          className="select select-bordered w-full">
            {
                specialties.map(specialty => <option
                key={specialty._id}
                value={specialty.name}
                >{specialty.name}</option>)
            }
          </select>
        </div>
        <div className="space-y-1 font-bold">
          <label htmlFor="img" className="block dark:text-gray-400">
            Doctor Image
          </label>
          <input
            {...register("image", {
              required: true})}
            type="file"
            name="image"
            id="img"
            placeholder="Enter Your img"
            className="w-full px-4 py-3 rounded-md border-2 border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-300"
          />
        </div>
        <input
          className="btn btn-secondary w-full rounded-none py-2 px-8 mt-6 text-gray-100"
          value="Add a Doctor"
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddDoctor;
