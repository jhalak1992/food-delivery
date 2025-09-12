import React from "react";
import {LOGO_URL} from "../utils/constants.js";
import {Link} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";

const Header = () => {
    const [ btnNameReact, setBtnNameReact] = React.useState("Login");
    const onlineStatus = useOnlineStatus();
    return (
        <div className='flex justify-between bg-pink-100 shadow-lg sm:bg-yellow-50'>
            <div className="logo-container">
                <img className="w-sm" src={LOGO_URL} />
            </div>
            <div className="nav-items flex items-center">
                <ul className="flex p-8 m-8">
                    <li className="px-4"> Online Status: { onlineStatus ? "✅" : "🔴" }</li>
                    <li className="px-4"><Link to="/">Home</Link></li>
                    <li className="px-4"><Link to="/about">About Us</Link></li>
                    <li className="px-4"><Link to="/contact">Contact</Link></li>
                    <li className="px-4"><Link to="/cart">Cart</Link></li>
                    <li className="px-4"><Link to="/grocery">Grocery</Link></li>
                    <button className="login" onClick={() => {
                        btnNameReact === "Login" ? setBtnNameReact("Log out") : setBtnNameReact("Login");
                    }}>{btnNameReact}</button>
                </ul>
            </div>
        </div>
    )
}

export default Header;