import { useSelector } from "react-redux";
import AdminPanel from "../../components/Admin/AdminPanel";
import LoginForm from "../../components/Admin/forms/LoginForm";

export default function Admin() {
    const isAuth = useSelector(state => state.auth.isAuth)
    
    return isAuth ? <AdminPanel /> : <LoginForm/>
}