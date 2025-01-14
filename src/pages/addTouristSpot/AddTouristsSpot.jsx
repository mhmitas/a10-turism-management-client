import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { TouristSpotsContext } from '../../provider/TouristSpotsProveder';
import { AuthContext } from '../../provider/AuthProvider';
import auth from '../../firebase/firebase.config';
import toast from 'react-hot-toast';

const AddTouristsSpot = () => {
    const { serverLink } = useContext(TouristSpotsContext)
    const { user } = useContext(AuthContext)

    const {
        register,
        handleSubmit,
    } = useForm()

    const onSubmit = (data, event) => {
        const cost = data.average_cost
        const costNum = Number(cost)
        data.average_cost = costNum;
        data.email = user.email;
        data.user_name = user?.displayName
        fetch(`${serverLink}/tourist-spots`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.insertedId) {
                    toast.success('Tourist Spot added successfully')
                    event.target.reset()
                }
            })
    }

    return (
        <>
            <div className='lg:w-4/5 mx-auto my-20 bg-base-100 p-10 lg:p-20'>
                <h3 className='text-3xl font-bold text-center mb-8'>Add a Tourist Spot</h3>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className=''
                >
                    <div className='grid md:grid-cols-2 gap-4'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Tourist Spot Name</span>
                            </label>
                            <input
                                {...register("tourist_spot_name")}
                                type="text"
                                required
                                className="input input-bordered w-full" />
                        </div>

                        {/* <div className="form-control">
                            <label className="label">
                                <span className="label-text">Country Name</span>
                            </label>
                            <input
                                {...register("country_name")}
                                type="text"
                                required
                                className="input input-bordered w-full" />
                        </div> */}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Country Name</span>
                            </label>
                            <select {...register("country_name")} className="select select-bordered">
                                <option className='hidden'>Select a Country</option>
                                <option>Bangladesh</option>
                                <option>Thiland</option>
                                <option>Indonesia</option>
                                <option>Malaysia</option>
                                <option>Vietnam</option>
                                <option>Cambodia</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Loacation</span>
                            </label>
                            <input
                                {...register("location")}
                                type="text"
                                required
                                className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Average Cost</span>
                            </label>
                            <input
                                {...register("average_cost", {
                                    valueAsNumber: true,
                                })}
                                type="number"
                                required
                                className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Seasonality</span>
                            </label>
                            <input
                                {...register("seasonality")}
                                type="text"
                                required
                                className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Travel Time</span>
                            </label>
                            <input
                                {...register("travel_time")}
                                type="text"
                                required
                                className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Total Visitor Per Year</span>
                            </label>
                            <input
                                {...register("total_visitor_per_year")}
                                type="text"
                                required
                                className="input input-bordered w-full" />
                        </div>
                        {/* <div className="form-control">
                            <label className="label">
                                <span className="label-text">User Name</span>
                            </label>
                            <input
                                {...register("user_name")}
                                type="text"
                                required
                                className="input input-bordered w-full col-span-2" />
                        </div> */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image URL</span>
                            </label>
                            <input
                                {...register("image")}
                                type="text"
                                required
                                className="input input-bordered w-full col-span-2" />
                        </div>

                        <textarea {...register("short_description")} className="textarea textarea-bordered my-2 md:col-span-2" required placeholder="Short Description"></textarea>

                        <input
                            type="submit" value="Add" className='btn mt-2 btn-primary w-full md:col-span-2' />
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddTouristsSpot;