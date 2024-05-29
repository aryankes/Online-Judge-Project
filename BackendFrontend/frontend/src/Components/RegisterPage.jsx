import React,{useState} from 'react';
import Login from './Login';
import Register from './Register';
function RegisterPage(){
    const [showlogin,setshowlogin]=useState(false);
    const toggleform=()=>{
        setshowlogin(!showlogin);
    };

    return(
        <div>
            {showlogin ?(
                <>
                    <Login/>
                    <p>Don't have an account? <button onClick={toggleform}>Register </button></p>
                </>
            ):
            (
                <>
                    <Register/>
                    <p>Already have an account? <button onClick={toggleform}>Login </button></p>
                </>
            )
            }
        </div>
    )
}
export default RegisterPage;