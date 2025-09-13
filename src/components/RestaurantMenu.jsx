import Shimmer from "./Shimmer.jsx";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu.js";
import RestaurantCategory from "./RestaurantCategory.js";
import {useState} from "react";

const RestaurantMenu = () => {
    const { resId } = useParams();
    const resInfo = useRestaurantMenu(resId);

    const [showIndex, setShowIndex] = useState(null);

    if(resInfo.length === 0) {
     return <Shimmer />;
    }
    const { name, cuisines } = resInfo?.cards[2]?.card?.card?.info;
    const categories =  resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c => c.card?.card?.['@type'] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")

    return (
        <div className="text-center p-5">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">{cuisines.join(', ')}</p>
            {categories.map((category, index) =>
                // controlled component
                <RestaurantCategory
                    key={category?.card?.card?.categoryId}
                    data={category?.card?.card}
                    showItems={index === showIndex && true}
                    setShowIndex={(flag) => flag ? setShowIndex(index) : setShowIndex(null) }
                />
            )}
        </div>
    )
}

export default RestaurantMenu;