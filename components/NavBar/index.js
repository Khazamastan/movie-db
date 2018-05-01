import React from "react";
import { Link } from 'react-router-dom'
import Wrapper from "./Wrapper";

const NavBar = () => {
    return( 
        <Wrapper>
          <ul>
            <li><Link to={"/"}>Search</Link></li>
            <li><Link to={"/library"}>View Library</Link></li>
          </ul>
        </Wrapper>
    );
}

export default NavBar