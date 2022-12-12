import { Link, useNavigate } from "react-router-dom"
import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {
    const localFlowerUser = localStorage.getItem("flower_user")
	const flowerUserObject = JSON.parse(localFlowerUser)

	if (flowerUserObject.staff) {
		return <EmployeeNav/>
	}
	else {
		return <CustomerNav/>
	}
}

