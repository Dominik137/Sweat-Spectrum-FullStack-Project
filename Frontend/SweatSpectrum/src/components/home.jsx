import LogIn from "./login";

function Home(){
    return (
        // Initial landing page that contains the login form, create account form, and can be accessed by anyone.
        <div>
            <LogIn/>
        </div>
    )
}

export default Home;