import { Routes, Route} from "react-router-dom";
import User from "../Pages/Users/User";
import CreateUser from "../Components/Users/CreateUser";


const AppRoutes = () => {
  return (
    <>
    <Routes>
         {/* defult Route User Components set */}
        <Route exact path="/" element={<User />} />
        <Route exact path="/user" element={<CreateUser />} />
    </Routes>
    </>
  )
}

export default AppRoutes
