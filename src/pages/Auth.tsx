import { useNavigate } from "react-router-dom";
import AuthForm from "../features/auth/componenets/AuthForm";
import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";

function Auth() {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    isAuthenticated && navigate("/");
  }, [isAuthenticated, navigate]);
  return (
    <>
      <section
        id="intro"
        className="w-full h-full flex justify-center items-center"
      >
        <AuthForm></AuthForm>
      </section>
    </>
  );
}

export default Auth;
