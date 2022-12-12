import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const EmployeeNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/home">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/FlowerForm">Add Flower</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/users">Users</Link>
            </li>
                      {
                localStorage.getItem("flower_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("flower_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}
