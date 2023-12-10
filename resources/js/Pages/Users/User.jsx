import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserItem from "../../Components/Users/UserItem";
import { Link } from "react-router-dom";

const User = () => {
    const [users, setUsers] = useState([]); // users data store
    const getUsers = () => {
        try {
            axios
                .get("/api/V1/users")
                .then((response) => {
                    let result = response.data;
                    if (result.success) {
                        setUsers(result.data);
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        toast.error(error.response.data.data);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
        console.log("object");
    }, []);

    return (
        <>
            <div className="container">
                <h2>Users Management</h2>
                <p>users</p>
                <div className="clearfix">
                    <Link to="/user" className="btn btn-primary float-end">Add User</Link>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Profile Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Role</th>
                            <th>Description</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.length > 0 ? (
                            users.map((item, index) => (
                                <UserItem key={index} item={item} />
                            ))
                        ) : (
                            <td colSpan={5}>
                                <div className="pt-5 pb-5 text-center">
                                    No user found at the moment.
                                </div>
                            </td>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default User;
