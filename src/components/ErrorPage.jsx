import { useNavigate } from "react-router";
import { useErrorBoundary } from "react-error-boundary";

function ErrorPage() {
  const navigate = useNavigate();
  const { resetBoundary } = useErrorBoundary();

  return (
    <>
      <div className="flex flex-col justify-center items-center background-semidark-blue h-dvh">
        <h1 className="heading-l text-white">Something went wrong</h1>
        <button
          className="btn body-m p-2 my-5 rounded"
          onClick={() => {
            navigate("/");
            resetBoundary();
          }}
        >
          Go back to the homepage
        </button>
      </div>
    </>
  );
}

export default ErrorPage;
