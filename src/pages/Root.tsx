import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

export default function RootLayout() {
  return (
    <>
      <NavigationBar />
      <main>
        <div className="flex wrapper w-screen justify-center">
          <div className="flex flex-col w-full min-h-screen pt-[80px] max-w-[2560px]">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}
