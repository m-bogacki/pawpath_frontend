import { Form, Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store/hooks";
import { login } from "../../../store/authSlice";
import { TCredentials, TRegister } from "../../../Types/Auth";

export default function AuthForm() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLogin = searchParams.get("mode") === "login";

  const { register, handleSubmit } = useForm<TCredentials | TRegister>();

  const onSubmit = async (data: any) => {
    if (isLogin) {
      const username = data.username;
      const password = data.password;
      const response: any = await dispatch(login({ username, password }));
      if (!response.error) {
        navigate("/");
      }
    }
  };

  return (
    <>
      <Form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        <p>
          <label htmlFor="username">Username</label>
          <input
            {...register("username")}
            type="username"
            name="username"
            id="username"
          />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            type="password"
            name="password"
            id="password"
          />
        </p>
        {!isLogin && (
          <>
            <p>
              <label htmlFor="password">Confirm password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
              />
            </p>
            <p>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" />
            </p>
            <p>
              <label htmlFor="firstName">First Name</label>
              <input type="firstName" name="firstName" id="firstName" />
            </p>
            <p>
              <label htmlFor="lastName">Last Name</label>
              <input type="lastName" name="lastName" id="lastName" />
            </p>
            <p>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="phoneNumber" name="phoneNumber" id="phoneNumber" />
            </p>
          </>
        )}
        <div>
          <button type="submit">Save</button>
        </div>
      </Form>
      <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
        {isLogin ? "Create new user" : "Login"}
      </Link>
    </>
  );
}
