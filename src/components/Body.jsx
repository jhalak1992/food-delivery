import React, {useEffect, useState, useContext} from "react";
import RestaurantCard, {withPromotedLabel} from "./RestaurantCard.jsx";
import {resList} from '../utils/mockData.js';
import Shimmer from "./Shimmer.jsx";
import {Link} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import UserContext from "../utils/UserContext.js";

const Body = () => {
    // Local State Variable - Super Powerful Variable
    const [listOfRestaurants, setListOfRestaurants] = useState([])
    const [filteredRestaurants, setFilteredRestaurants] = useState([])
    const [searchText, setSearchText] = useState("");

    // Calling Higher Order Component
    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

    const { setUserName, loggedInUser } = useContext(UserContext);
    console.log('set userName', setUserName);

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
            <div className="filter flex">
                <div className="search">
                    <input type="text" className="search-box border border-solid border-black" placeholder="Search Restaurants" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    <button className="search-button px-4 py-2 bg-green-100 m-4 rounded-lg"
                    onClick={() => {
                        console.log(searchText);
                        setFilteredRestaurants(listOfRestaurants.filter((restaurant) => restaurant.card.card.info.name.toLowerCase().includes(searchText.toLowerCase())));
                    }}
                    >Search</button>
                </div>
                <button className="filter-btn px-4 py-2 bg-gray-100 m-4 rounded-lg" onClick={() => {
                    setFilteredRestaurants(listOfRestaurants.filter((restaurant) => restaurant.card.card.info.avgRating >= 4.0));
                }}>Top Rated Restaurant</button>
                <div className="uname px-4 py-2 m-4">
                    <label>User Name: </label>
                    <input
                        className="border border-solid border-black"
                        value={loggedInUser}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
            </div>
            <div className="search">
                <div className="res-container flex wrap">
                    {filteredRestaurants.map((restaurant) => (
                        <Link to={`/restaurants/${restaurant?.card?.card?.info?.id}`} key={restaurant?.card?.card?.info?.id}>
                            {/** If a restaurant is promoted, add a promoted label to it **/
                                restaurant?.card?.card?.info?.promoted ? <RestaurantCardPromoted resData={restaurant.card?.card} /> : <RestaurantCard  resData={restaurant?.card?.card} />
                            }
                            {/*<RestaurantCard  resData={restaurant?.card?.card} />*/}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Body;