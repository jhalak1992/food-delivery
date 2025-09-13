import React, {useContext} from "react";
import { CDN_URL } from "../utils/constants.js";
import UserContext from "../utils/UserContext.js";


const styleCard = {
    backgroundColor: "#f0f0f0",
}

const RestaurantCard = ({resData}) => {
    const {
        name, cuisines, avgRating, cloudinaryImageId
    } = resData.info
    const {loggedInUser} = useContext(UserContext);
    return (
        <div className="res-card m-4 p-4 w-[250px] font-light flex-wrap" style={styleCard}>
            <img src={CDN_URL + cloudinaryImageId} alt="" className="res-logo rounded-lg"/>
            <h3 className="font-bold py-4">{name}</h3>
            <h4>{cuisines.join(',')}</h4>
            <h4>{avgRating}</h4>
            <h4>38 mins</h4>
            <h4>{loggedInUser}</h4>
        </div>
    )
}

// Higher ORDER COMPONENT
// input -> Restaurant =>> RestaurantCardPromoted

export const withPromotedLabel = (RestaurantCard) => {
    return (props) => {
        return (
            <div>
                <label className="absolute bg-black text-white m-2 p-2 rounded-b-lg">promoted</label>
                <RestaurantCard {...props}/>
            </div>
        )
    }
}

export default RestaurantCard;