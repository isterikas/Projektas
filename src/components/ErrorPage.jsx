import { useNavigate } from "react-router"
import { useErrorBoundary } from "react-error-boundary";


function ErrorPage (){
    const navigate = useNavigate()
    const { resetBoundary } = useErrorBoundary();

    return(<>
    <div className="flex flex-col items-center">
 <h1 className="heading-l text-black">Something went wrong</h1>
 <button className="bg-red-700" onClick={()=>{navigate("/"); resetBoundary()}}>Go back to the homepage</button>
 </div>
    
    </>)
}

export default ErrorPage