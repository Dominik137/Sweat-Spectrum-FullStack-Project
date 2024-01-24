import LogIn from "./login";
import Dashboard from "./dashboard";

function Home({ setUser, user }) {
  return (
    // Initial landing page that contains the login form, create account form, and can be accessed by anyone.
    <div>
      {user ? (
        <Dashboard user={user}/>
      ) : (
        <div className="">
          <div>
            <h1>Welcome to Sweat Spectrum!</h1>
          </div>
          <div>
            <h3>Track your workouts and get motivated.</h3>
          </div>
          <div>
            {/* Additional content goes here if needed */}
          </div>
      
          <div className="login-create-container">
            <div className="login-module">
              <LogIn setUser={setUser} user={user} />
            </div>
            <div className="create-module"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
