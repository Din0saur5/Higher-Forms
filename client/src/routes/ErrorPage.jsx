import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center px-6">
      <h1 className="text-6xl font-bold text-red-500">Oops!</h1>
      <p className="text-xl mt-4 text-white">Sorry, an unexpected error has occurred.</p>
      <p className="text-gray-400 italic mt-2">
        {error.statusText || error.message}
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-white text-black rounded-lg text-lg font-semibold hover:bg-gray-300 transition duration-300"
      >
        Return to Home
      </Link>
    </div>
  );
}
