import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://doctors-portal-server-mocha.vercel.app/users");
      const data = await res.json();
      return data;
    },
  });
  const handleMakeAdmin = (id) => {
        fetch(`https://doctors-portal-server-mocha.vercel.app/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                toast.success('user admin success fully');
                refetch();
            }
        })
  }
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    {user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user?._id)} className="btn btn-primary btn-xs text-white">Make Admin</button>}
                </td>
                <td><button className="btn btn-error bg-rose-600 btn-xs text-white">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
