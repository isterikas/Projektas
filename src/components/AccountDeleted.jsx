import { useNavigate } from "react-router";

const AccountDeleted = () => {

 const  navigate = useNavigate()
    
    return (   <div className="flex flex-col justify-center items-center background-semidark-blue h-dvh">
        <h1 className="heading-l text-white">User deleted Succesfully</h1>
        <button
          className="btn body-m p-2 my-5 rounded"
          onClick={() => {
            navigate("/");
           
          }}
        >
          Go back to the homepage
        </button>
      </div> );
}
 
export default AccountDeleted;