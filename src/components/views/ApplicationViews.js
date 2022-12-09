import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"

export const ApplicationViews = () => {

	const localFlowerUser = localStorage.getItem("flower_user")
	const flowerUserObject = JSON.parse(localFlowerUser)

	if (flowerUserObject.staff) {
		return <EmployeeViews/>
	}
	else {
		return <CustomerViews/>
	}
}