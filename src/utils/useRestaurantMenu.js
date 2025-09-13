import { MENU_API } from "./constants.js";
import {useEffect, useState} from "react";
const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState([]);
    const fetchMenu = async () => {
        const data = await fetch(MENU_API + resId);
        const json = await data.json();
        setResInfo(json.data);
    }
    useEffect(() => {
        fetchMenu();
    }, [])
    return resInfo;
}

export default useRestaurantMenu;