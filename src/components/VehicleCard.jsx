import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings'
import { storage } from './firebase';

function VehicleCard({ id, model, make, price, rating, image }) {

    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        getDownloadURL(ref(storage, `vehicles_images/${image}`))
            .then((url) => {
                setImageUrl(url);
            })
    }, [])

    return (
        <div className="product__item" id={id} key={id}>
            <img src={imageUrl} />
            <h6 className="product__brand">{`${make}`.toUpperCase()}</h6>
            <h5 className='product__name'>{`${make} ${model}`.toUpperCase()}</h5>
            <div className="product__ratings">
                <StarRatings
                    rating={Number(rating)}
                    starDimension="15px"
                    starSpacing="2px"
                    starRatedColor='#fbff00'
                />
            </div>
            <span className='product__price'>US$ <NumericFormat value={price} thousandSeparator="," displayType='text' /></span>
            <Link to={`/product/${id}`} className='button--blue product__button'>See More...</Link>
        </div>
    )
}

export default VehicleCard
