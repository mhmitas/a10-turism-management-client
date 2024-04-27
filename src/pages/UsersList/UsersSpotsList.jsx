import React, { useContext, useEffect, useState } from 'react';
import { TouristSpotsContext } from '../../provider/TouristSpotsProveder';
import UsersSpotCard from './UsersSpotCard';


const UsersSpotsList = () => {
    const { serverLink, authLoading, user } = useContext(TouristSpotsContext)
    const [mySpotsList, setMySpotsList] = useState([])
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        setLoading(true)
        fetch(`${serverLink}/tourist-spots`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setMySpotsList(data)
                setLoading(false)
            })
    }, [])

    return (
        <div className='relative min-h-96'>
            {loading && <div className=' absolute left-1/2 top-1/2'><span className="loading loading-spinner text-primary loading-lg"></span></div>}
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-3 my-16'>
                {
                    mySpotsList.map(spot => <UsersSpotCard key={spot._id} usersSpot={spot}></UsersSpotCard>)
                }
            </div>
        </div>
    );
};

export default UsersSpotsList;