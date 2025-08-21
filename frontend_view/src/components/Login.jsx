import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EcommerceScraper from "./EcommerceScraper.jsx";


function Login() {
    const token = localStorage.getItem('auth_token');
    const navigate = useNavigate();

    useEffect(()=>{
        if(token){
            navigate("/")
        }
    },[])
    
    const loginWithGoogle = () => {
        window.location.href = import.meta.env.VITE_GOOGLE_LINK;
    };

return (
    <>
    
    <div className="login-container">
        <EcommerceScraper loginWithGoogle={loginWithGoogle} />
    </div>
    </>
    );
}

export default Login