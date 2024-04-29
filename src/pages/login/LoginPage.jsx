import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context.jsx";
import { login } from "./service";

export function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { onLogin } = useAuth();
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleChange = (event) => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsFetching(true);
      await login(formValues);
      setIsFetching(false);
      onLogin();
      const to = location.state?.from || "/";
      navigate(to, { replace: true });
    } catch (error) {
      setIsFetching(false);
      setError(error);
    }
  };

  const resetError = () => setError(null);

  const { email, password } = formValues;
  const buttonDisabled = !email || !password || isFetching;
  return (
    <>
      <h2>Login</h2>
      <form id="login-form" onSubmit={handleSubmit}>
        <p>
          <label className="form__label" htmlFor="email">
            Email
          </label>
          <input className="form__inputfield" type="text" id="email" name="email" value={email} onChange={handleChange} required />
        </p>
        <p>
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input className="form__inputfield" type="password" id="password" name="password" value={password} onChange={handleChange} required />
        </p>
        <button className="form__button" type="submit" disabled={buttonDisabled}>
          Log in
        </button>
      </form>
      {error && (
        <div className="loginPage-error" onClick={resetError}>
          {error.message}
        </div>
      )}
    </>
  );
}
