import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"
//import background from "../video/background.mp4"
export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("flower_user", JSON.stringify({
                        id: user.id,
                        staff: user.isStaff
                    }))

                    navigate("/home")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        
        <main className="container--login">
            {/* <video autoPlay loop muted
            style={{
                position: "absolute",
                width:"100%",
                left:"50%",
                top:"50%",
                height: "100%",
                objectFit:"cover",
                transform:"translate(-50%, -50%",
                zIndex: "-1"

            }}>
                <source src={background} type="video/mp4"/>
            </video> */}
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Flower Power</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"></label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}

