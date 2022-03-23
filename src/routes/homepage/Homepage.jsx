import Directory from "../../components/directory/Directory";
import { Outlet } from "react-router-dom";

const Homepage = () => {
    return(
        <div>
            <Outlet />
            <Directory />
        </div>
    )
}

export default Homepage;