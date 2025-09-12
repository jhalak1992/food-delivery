import Shimmer from "./Shimmer.jsx";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu.js";
import RestaurantCategory from "./RestaurantCategory.js";

const RestaurantMenu = () => {
    const { resId } = useParams();
    const resInfo = useRestaurantMenu(resId);

    if(resInfo.length === 0) {
     return <Shimmer />;
    }
    console.log(resInfo);
    const { name, cuisines, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info;
    const { itemCards } = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card; // .itemCards[0]?.card?.info

    const categories =  resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c => c.card?.card?.['@type'] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")

    return (
        <div className="text-center p-5">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">{cuisines.join(', ')}</p>
            {categories.map((category) => <RestaurantCategory key={category?.card?.card?.categoryId} data={category?.card?.card} />)}
            {/*<ul>*/}
            {/*    {*/}
            {/*        itemCards?.map((item) => (*/}
            {/*                <li key={item?.card?.info?.id}>*/}
            {/*                    {item?.card?.info?.name} - {"Rs."}*/}
            {/*                    {item?.card?.info?.price / 100 || item?.card?.info?.defaultPrice / 100}*/}
            {/*                </li>*/}

            {/*        ))*/}
            {/*    }*/}
            {/*</ul>*/}
        </div>
    )
}

export default RestaurantMenu;