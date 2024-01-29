import { useNavigate } from "react-router-dom";
import AuthForm from "../features/auth/componenets/AuthForm";
import { useAppSelector } from "../store/hooks";
import { useEffect } from "react";

function Auth() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    isAuthenticated && navigate("/");
  }, [navigate, isAuthenticated]);

  return (
    <>
      <section
        id="intro"
        className="w-full h-full bg-secondary flex justify-center items-center"
      >
        <AuthForm></AuthForm>
      </section>
    </>
  );
}

export default Auth;
