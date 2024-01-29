import NavigationBar from "../components/navigation/NavigationBar";

export default function ErrorPage() {
  return (
    <>
      <NavigationBar />
      <div className="flex flex-col wrapper h-screen w-screen items-center justify-center">
        <h1 className="text-5xl">Error Ocurred</h1>
        <br />
        <h1>Could not find this page</h1>
      </div>
    </>
  );
}
