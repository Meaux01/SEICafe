import React from 'react'
import { Link } from 'react-router-dom';
import * as userService from '../utilities/users-service'


const NavBar = ({user, setUser}) => {

  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }

  return (
    <nav className='nav'>
        <Link to="/orders">Order History</Link>{" "}
        &nbsp; | &nbsp;
        <Link to="/orders/new">New Order</Link> {" "}
        &nbsp;&nbsp;
        {user ? <Link to="" onClick={handleLogOut}>Log Out</Link> : ``}
        <br/>
        {user ? <span> Welcome, {user.name}</span> : ``}
    </nav>
  )
}

export default NavBar