import Shimmer from "./Shimmer.jsx";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu.js";

const RestaurantMenu = () => {
    const { resId } = useParams();
    const resInfo = useRestaurantMenu(resId);

    if(resInfo.length === 0) {
     return <Shimmer />;
    }

    const { name, cuisines, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info;
    const { itemCards } = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card; // .itemCards[0]?.card?.info

    console.log(itemCards);;
    return (
        <div className="menu">
            <h1>{name}</h1>
            <h2>{cuisines.join(', ')}</h2>
            <ul>
                {
                    itemCards?.map((item) => (
                            <li key={item?.card?.info?.id}>
                                {item?.card?.info?.name} - {"Rs."}
                                {item?.card?.info?.price / 100 || item?.card?.info?.defaultPrice / 100}
                            </li>

                    ))
                }
            </ul>
        </div>
    )
}

export default RestaurantMenu;