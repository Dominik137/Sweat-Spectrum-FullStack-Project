import { useState, useEffect } from "react";
function LogIn(){

useEffect(()=>{
    fetch('/api/login')
},[])

return(
    <>
        <div>
                <button>
                    login
                </button>
        </div>
    </>
)


}

export default LogIn