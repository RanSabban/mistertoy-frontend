
import { userService } from "../services/user.service"

import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export function UserProfile() {
    const [user,setUser] = useState(null)
    const {userId} = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        if (userId) loadUser()
    },[])

    async function loadUser() {
        try {
            const currUser = await userService.getById(userId)   
            setUser(currUser)
        }
        catch (err) {
            console.log('Had issues in user details', err)
            navigate('/user')
        }
    }


    if (!user) return <div className="loader"><span>III</span></div>

    const loggedInUser = userService.getLoggedinUser()
    const isMyProfile = loggedInUser._id === userId


    return (
        <section className="user-details">
            <h1>Full name: {user.fullname}</h1>
            {isMyProfile && (
                <section className="profile">
                    <h1>USER PROFILE !</h1>
                </section>
            )}
        </section>
    )

}