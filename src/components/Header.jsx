import React from "react";
import {LOGO_URL} from "../utils/constants.js";
import {Link} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";

const Header = () => {
    const [ btnNameReact, setBtnNameReact] = React.useState("Login");
    const onlineStatus = useOnlineStatus();
    return (
        <div className='header'>
            <div className="logo-container">
                <img src={LOGO_URL} />
            </div>
            <div className="nav-items">
                <ul>
                    <li> Online Status: { onlineStatus ? "✅" : "🔴" }</li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/grocery">Grocery</Link></li>
                    <button className="login" onClick={() => {
                        btnNameReact === "Login" ? setBtnNameReact("Log out") : setBtnNameReact("Login");
                    }}>{btnNameReact}</button>
                </ul>
            </div>
        </div>
    )
}

export default Header;