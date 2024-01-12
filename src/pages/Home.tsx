export default function Home() {
  return (
    <>
      <section
        id="intro"
        className="w-full h-full bg-secondary flex flex-col lg:flex-row"
      >
        <div className="w-full lg:w-[50%] h-full bg-blue-600">
          <h1 className="text-">Dog caring</h1>
        </div>
        <div className="w-full lg:w-[50%] h-full bg-white"></div>
      </section>
    </>
  );
}
