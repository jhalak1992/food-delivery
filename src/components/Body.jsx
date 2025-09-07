import React, {useEffect, useState} from "react";
import RestaurantCard from "./RestaurantCard.jsx";
import {resList} from '../utils/mockData.js';
import Shimmer from "./Shimmer.jsx";
import {Link} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";

const Body = () => {
    // Local State Variable - Super Powerful Variable
    const [listOfRestaurants, setListOfRestaurants] = useState([])
    const [filteredRestaurants, setFilteredRestaurants] = useState([])
    const [searchText, setSearchText] = useState("");

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.9380137&lng=75.78877&collection=80475&tags=&sortBy=&filters=&type=rcv2&offset=0&page_type=null");
        const response = await data.json();
        setListOfRestaurants(response.data.cards.slice(2));
        setFilteredRestaurants(response.data.cards.slice(2));
    }

    // UseEffect hook
    useEffect(() => {
        fetchData();
    }, [])

    const onlineStatus = useOnlineStatus();
    if(!onlineStatus) {
        return (<h1>Looks like you are offline</h1>);
    }

    return listOfRestaurants.length === 0 ? <Shimmer /> : (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input type="text" className="search-box" placeholder="Search Restaurants" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    <button className="search-button"
                    onClick={() => {
                        console.log(searchText);
                        setFilteredRestaurants(listOfRestaurants.filter((restaurant) => restaurant.card.card.info.name.toLowerCase().includes(searchText.toLowerCase())));
                    }}
                    >Search</button>
                </div>
                <button className="filter-btn" onClick={() => {
                    setFilteredRestaurants(listOfRestaurants.filter((restaurant) => restaurant.card.card.info.avgRating >= 4.0));
                }}>Top Rated Restaurant</button>
            </div>
            <div className="search">
                <div className="res-container">
                    {filteredRestaurants.map((restaurant) => (
                        <Link to={`/restaurants/${restaurant?.card?.card?.info?.id}`} key={restaurant?.card?.card?.info?.id}>
                            <RestaurantCard  resData={restaurant?.card?.card} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Body;