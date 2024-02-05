import React, { useEffect, useState } from 'react'
import { storage } from './firebase';
import { getDownloadURL, ref } from 'firebase/storage';

function ImageSlide({ image }) {

    const [vehicleImage, setVehicleImage] = useState();

    useEffect(() => {
        getDownloadURL(ref(storage, `vehicles_images/${image}`))
            .then((url) => {
                setVehicleImage(url);
            })
    }, [])

    return (
        <img src={vehicleImage} className='slide__car' />
    )
}

export default ImageSlide;
