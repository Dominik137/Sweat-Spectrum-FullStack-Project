import LogIn from "./login";

function Home(){
    return (
        // Initial landing page that contains the login form, create account form, and can be accessed by anyone.
        
        <div className="">
            <div><h1>Welcome to Sweat Spectrum!</h1></div>
            <div><h3>Track your workouts and get motivated.</h3>

            <p>To get started, please either login with an existing account or create a new account:</p></div>
            <div>
                <div className="login-create-container">
                <div className="login-module">
                    <LogIn/>
                </div>
                <div className="create-module">
                   
                </div>
            </div>
        </div>
        </div>
    )
}

export default Home;