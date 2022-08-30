import { Link } from "react-router-dom";
import "./navbar.styles.scss";
import { useContext } from "react";

import UserContext from "../../../contexts/userContext";

import { signOut } from "../../../utils/authHandler";

const Navbar = () => {
    const { userDetails, setUserDetails } = useContext(UserContext);

    const handleSignOut = async () => {
        if (userDetails !== null) {
            try {
                await signOut(userDetails.userToken);
                setUserDetails({
                    isAuthenticated: false,
                    userToken: "",
                    username: "",
                });
                localStorage.removeItem("user");
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <nav className="navbar">
            <h3>Logo</h3>
            {userDetails.isAuthenticated && (
                <Link to="/todos" className="navbar-link">
                    Todo List
                </Link>
            )}
            {!userDetails.isAuthenticated ? (
                <Link to="/auth" className="navbar-link">
                    Login
                </Link>
            ) : (
                <Link to="#" className="navbar-link" onClick={handleSignOut}>
                    Logout
                </Link>
            )}
        </nav>
    );
};

export default Navbar;
