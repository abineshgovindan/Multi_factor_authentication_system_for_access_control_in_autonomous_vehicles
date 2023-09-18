import { useEffect, useState } from "react"
import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { Form, useActionData, useNavigate } from "react-router-dom";



export async function action({ request }) {
  try {
    let formData = await request.formData();
    const type = formData.get("type");
    const name = formData.get("name");
    const Number = formData.get("PhoneNumber");
    const email = formData.get("email");
    const password = formData.get("password");
    
    const url =
      type === "register"
        ? "https://multi-factor-authentication-system-for.onrender.com/api/v1/auth/register"
        : "https://multi-factor-authentication-system-for.onrender.com/api/v1/auth/login";
      
    

    const mobileNumber = '+' + Number;
    const { data } = await axios.post(url, {
      name,
      mobileNumber,
      email,
      password,
    });
    
    const { accessToken, refreshToken, userId} = data;
    console.log(userId);
    return { tokens: { accessToken, refreshToken, userId }, error: null };
  } catch (error) {
    return {
      error: error.response.data.message || error.message,
      tokens: null,
    };
  }
}


export function LoginPage() {
  const actionData = useActionData();
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
  const login = useAuthStore((state) => state.login);
  useEffect(() => {
    if (actionData?.tokens) {
      login(actionData.tokens);
      navigate("/");
    }
  }, [actionData]);

  if (isLoggedIn) {
    navigate("/");
  }

  const [visible, setVisible] = useState(false);
  const handleToggle = () => {
    setVisible((current) => !current);
    console.log(visible);
  };

  return (
    <div className="w-screen mt-8  flex items-center justify-center">
      <Form method="post">
        <h1 className="flex m-7 justify-center items-center ">Login</h1>
        {actionData?.error && <div className="alert">{actionData?.error}</div>}
        <div className="flex flex-col">
          <fieldset className="form-control w-52">
          <label htmlFor="login" > 
            <input
              type="radio"
              id="login"
              name="type"
              value="login"
              defaultChecked
              onChange={handleToggle}
              
            />
            Login
          </label>
          <label htmlFor="register">
            <input type="radio" 
            id="register" 
            name="type" 
            value="register"
            onChange={handleToggle}
             />
            Register
          </label>
        </fieldset>
        </div>
        { visible &&
        <div>
        <input
          type="text"
          name="name"
          placeholder="name"
          aria-label="name"
          required
          className="input input-bordered  mt-3 input-primary w-full  max-w-xs"
        />
        <br />
        <input
          type="text"
          name="PhoneNumber"
          placeholder="Phone Number"
          aria-label="Phone Number"
          required
          className="input input-bordered  mt-3 input-primary w-full  max-w-xs"
        />
        </div>

        }
        
        
        <input
          type="text"
          name="email"
          placeholder="Email"
          aria-label="Email"
          required
          className="input input-bordered input-primary w-full  mt-3 max-w-xs"
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          required
          className="input input-bordered input-primary w-full  mt-3 max-w-xs"
        />
        <br />

        <button type="submit" className="btn w-64 mt-10 rounded-full">
          Login
        </button>
      </Form>
    </div>
  );
}
  