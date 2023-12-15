import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, dispatch } = useAuthContext();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch({ type: 'logout' });
        localStorage.removeItem('user');
    }
    return (
    <div className="intro-section">
        <div>
            <h1>SmartCart</h1>
        </div>
        {user ? (
        <div>
            <button className="btn btn-sm custom-button-2" onClick={handleLogout}>Logout</button>
        </div>
        ):(
        <>
        <a className="custom-button-2 btn btn-sm signup-button" href='/signup'>Sign Up</a>
        <a className="custom-button-2 btn btn-sm" href='/login'>Login</a>
        </>
        )}
    </div>
    );
};

export default Navbar;
