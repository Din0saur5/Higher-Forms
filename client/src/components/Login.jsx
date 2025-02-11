import { useState } from "react";
import { LogIn } from "../../api";
import { useUserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

function Login({ setLogin }) {
  const { setUserData } = useUserContext();
  const navigate = useNavigate();

  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setLoginValue({
      ...loginValue,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const userData = await LogIn(loginValue.email, loginValue.password);

      if (!userData) {
        setErrorMessage("Invalid email or password. Please try again.");
      } else {
        setUserData(userData);
        navigate("/profile"); // Redirect to profile after login
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="card border rounded-xl p-4 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={login} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
  type="email"
  name="email"
  placeholder="email"
  className="input input-bordered"
  required
  value={loginValue.email}
  onChange={handleChange}
  autoComplete="email"  
/>

<input
  type="password"
  name="password"
  placeholder="password"
  className="input input-bordered"
  required
  value={loginValue.password}
  onChange={handleChange}
  autoComplete="current-password" 
/>
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          {/* Show error message if login fails */}
          {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        {/* Sign up link */}
        <p className="text-center mt-4">
          If you don't yet have an account,&nbsp;
          <span
            className="underline text-green-600 hover:text-green-700 cursor-pointer"
            onClick={() => setLogin(false)}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
