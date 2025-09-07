import React from "react";
import { CDN_URL } from "../utils/constants.js";


const styleCard = {
    backgroundColor: "#f0f0f0",
}

const RestaurantCard = ({resData}) => {
    const {
        name, cuisines, avgRating, cloudinaryImageId
    } = resData.info
    return (
        <div className="res-card" style={styleCard}>
            <img src={CDN_URL + cloudinaryImageId} alt="" className="res-logo"/>
            <h3>{name}</h3>
            <h4>{cuisines.join(',')}</h4>
            <h4>{avgRating}</h4>
            <h4>38 mins</h4>
        </div>
    )
}

export default RestaurantCard;