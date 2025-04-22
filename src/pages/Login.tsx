import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const { loggedin, handleLogin, formState, errorState, formDispatch } =
    useAuth();

  if (loggedin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>TaskMaster</h1>
        <form onSubmit={handleLogin} className="login-form">
          <h2>Sign in to manage your tasks</h2>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={formState.email}
              onChange={(e) =>
                formDispatch({
                  type: "CHANGE",
                  field: "email",
                  value: e.target.value,
                })
              }
            />
            {errorState.emailError && <p>{errorState.emailError}</p>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={formState.password}
              onChange={(e) =>
                formDispatch({
                  type: "CHANGE",
                  field: "password",
                  value: e.target.value,
                })
              }
            />
            {errorState.passwordError && <p>{errorState.passwordError}</p>}
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                className="checkbox"
                checked={formState.rememberMe}
                onChange={(e) =>
                  formDispatch({
                    type: "CHANGE",
                    field: "rememberMe",
                    value: e.target.checked,
                  })
                }
              />
              Remember me
            </label>
          </div>
          <a href="">Forgot Password?</a>
          <button type="submit">Log In</button>
          {errorState.formError && <p>{errorState.formError}</p>}
        </form>
        <a href="">Create Account</a>
      </div>
      <div className="card card--green tag">
        <div className="">
          <h1>Plan Your Day with Ease</h1>
          <h1>Stay Organized!</h1>
          <p>Track all your tasks in one place and never miss a deadline!</p>
        </div>
        <div className="card card--white">
          <h2>Add, edit, and complete tasks effortlessly</h2>
          <p>Create multiple lists, set priorities, and crush your goals.</p>
          <div className="avatars">
            <a href="#" className="avatars__item">
              <img
                className="avatar"
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt=""
              />
            </a>
            <a href="#" className="avatars__item">
              <img
                className="avatar"
                src="https://randomuser.me/api/portraits/men/25.jpg"
                alt=""
              />
            </a>
            <a href="#" className="avatars__item">
              <img
                className="avatar"
                src="https://randomuser.me/api/portraits/women/25.jpg"
                alt=""
              />
            </a>
            <a href="#" className="avatars__item">
              <img
                className="avatar"
                src="https://randomuser.me/api/portraits/men/55.jpg"
                alt=""
              />
            </a>
            <a href="#" className="avatars__item">
              <img
                className="avatar"
                src="https://via.placeholder.com/300/09f/fff.png"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
      <div className="glow"></div>
    </div>
  );
};

export default Login;
