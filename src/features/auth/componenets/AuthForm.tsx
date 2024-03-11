import { Form, Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store/hooks";
import { login, signup } from "../../../store/authSlice";
import { TRegister } from "../../../Types/Auth";
import FormInput from "../../../components/forms/FormInput";
import { setLoggedUser } from "../../../store/authSlice";

type FormData = TRegister;

type errorFields =
  | "email"
  | "first_name"
  | "last_name"
  | "username"
  | "phone_number"
  | "password"
  | `root.${string}`
  | "root";

type errorResponse = {
  field: string;
  value: [];
};

export default function AuthForm() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLogin = searchParams.get("mode") === "login";

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onSubmit",
    errors: undefined,
  });

  const onSuccess = async (data: FormData) => {
    if (isLogin) {
      const response: any = await dispatch(login(data));
      if (!response.error) {
        navigate("/");
      }
    }
    if (!isLogin) {
      const response: any = await dispatch(signup(data as TRegister));
      setLoggedUser(response.payload);
      if (!response.error) {
        navigate("/");
      } else {
        for (const [field, value] of Object.entries(
          response.payload as errorResponse
        )) {
          console.log(field);
          setError(field as errorFields, {
            message: value[0],
          });
        }
      }
    }
  };

  return (
    <>
      <Form
        method="POST"
        onSubmit={handleSubmit(onSuccess)}
        onFocus={(e) => {
          clearErrors(e.target.id as errorFields);
        }}
        className="max-w-md mx-auto"
      >
        <h1 className="text-2xl">{isLogin ? "Log in" : "Create a new user"}</h1>
        <FormInput
          register={register}
          identifier="username"
          placeholder="Username"
          type="text"
          error={errors["username"]?.message}
        />
        {}
        <FormInput
          register={register}
          identifier="password"
          placeholder="Password"
          type="password"
          error={errors["password"]?.message}
        />
        {!isLogin && (
          <>
            <FormInput
              register={register}
              identifier="confirmPassword"
              placeholder="Confirm Password"
              type="password"
            />
            <FormInput
              register={register}
              identifier="email"
              placeholder="Email"
              type="email"
              error={errors["email"]?.message}
            />
            <FormInput
              register={register}
              identifier="first_name"
              placeholder="First Name"
              type="text"
              error={errors["first_name"]?.message}
            />
            <FormInput
              register={register}
              identifier="last_name"
              placeholder="Last Name"
              type="text"
              error={errors["last_name"]?.message}
            />
            <FormInput
              register={register}
              identifier="phone_number"
              placeholder="Phone Number"
              type="text"
              error={errors["phone_number"]?.message}
            />
          </>
        )}
        <div className="flex justify-between mt-4 ">
          <button
            className="btn px-12 border-none text-neutral bg-secondary hover:bg-accent"
            type="submit"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
          <Link
            className="bg-transparent px-8 flex justify-center items-center hover:text-accent"
            to={`?mode=${isLogin ? "signup" : "login"}`}
          >
            {isLogin ? "Want to Sign Up?" : "Want to Login?"}
          </Link>
        </div>
      </Form>
    </>
  );
}
