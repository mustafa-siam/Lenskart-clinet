import useAxiosSecure from "../../Hooks/useAxiossecure";
import { FaTrashAlt, FaUserShield, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAllusers from "../../Hooks/useAllusers";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, refetch] = useAllusers();

  const handleToggleRole = (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    axiosSecure.patch(`/users/role/${user._id}`, { role: newRole })
    .then((res) => {
      if (res.data.modifiedCount > 0) {
        toast.success(`${user.name} is now ${newRole}`);
        refetch(); 
      }
    });
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: `Delete ${user.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            toast.success("User deleted successfully");
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-fuchsia-700 mb-6 text-center">
        Manage Users
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-fuchsia-100">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="flex items-center gap-3 justify-center">
                  <button
                    onClick={() => handleToggleRole(user)}
                    className={`btn btn-sm ${
                      user.role === "admin"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                  >
                    {user.role === "admin" ? <FaUser /> : <FaUserShield />}
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
