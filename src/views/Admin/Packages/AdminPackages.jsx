import "./admin-packages.css";
import {NoPermission} from "../../../components/Slave/NoPermission/NoPermission";
import {useAuth} from "../../../context/auth";

export const AdminPackages = () => {

    const { isLoggedIn } = useAuth();
    const access_level = parseInt(localStorage.getItem("access_level"));

    if (!isLoggedIn || access_level !== 3) {
        return <NoPermission />;
    }

    return (
        <div>
            <h1>Admin Packages</h1>
        </div>
    );
}