
import { useOutletContext } from "react-router";

const UserAccount = () => {
const {loggedUser} = useOutletContext()
    
    const {userName} = loggedUser


    return ( 
        <div>
            <p className="text-4xl">{userName}</p>
        </div>
     );
}
 
export default UserAccount;

