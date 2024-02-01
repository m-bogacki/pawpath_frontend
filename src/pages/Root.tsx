import NavigationBar from "../components/navigation/NavigationBar";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavigationBar />
      <main>
        <div className="flex wrapper w-screen justify-center">
          <div className="flex flex-col w-full min-h-screen pt-[80px] max-w-[2560px]">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
