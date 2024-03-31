import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { logout } from "../store/actions/user.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { LoginSignup } from "./LoginSignup"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from "@mui/material"

export function AppHeader() {
    
    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('Logout Succesfully')
        }
        catch (err) {
            showErrorMsg('Oops try again later')
        }
        

    }

    // future dev

    function onToggleCart(ev) {
        ev.preventDefault()
        dispatch({ type: TOGGLE_CART_IS_SHOWN })
    }


    return (
        <header className="app-header flex space-between main-layout">
            <section className="header-container">
                <h1>Toy Store</h1>
                <nav className="app-nav">
                    <nav className="app-nav">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/toy">Collections</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/locations">Locations</NavLink>

                        {user ? (
                            <section className="user-nav">
                                <span style={{color: 'yellowgreen'}}> Hello {user.fullname}</span>
                                <NavLink to={`/user/${user._id}`}> <AccountCircleIcon /></NavLink>
                                <Button onClick={onLogout}>Logout</Button>
                                
                            </section>
                        ) : (
                            <section>
                                <LoginSignup />
                            </section>
                        )}
                    </nav>
                </nav>
            </section>
        </header>
    )
}