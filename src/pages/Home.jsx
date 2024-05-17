import Profile from "../components/Profile";

export default function Home() {
  return (
    <>
   <Profile />
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="text-3xl font-semibold"><a href="https://www.printful.com/" className="text-[#9d105e] font-bold">Printful</a> Junior Software Tester</h1>
        <p className="text-md font-normal text-gray-500 text-center px-3">
          2023 - pašlaik
        </p>
      </div>
    </>
  );
}
