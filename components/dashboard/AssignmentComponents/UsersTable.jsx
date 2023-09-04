"use client";
const UsersTable = ({ users, familyUsers }) => {
  return (
    <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
      <div className="table-responsive text-center">
        <table className="table w-1/1 text-15">
          <thead>
            <tr>
              <th>Roles</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>National ID</th>
              <th>Birth Date</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Invitation Code</th>
            </tr>
          </thead>
          <tbody>
            {familyUsers.map((user, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
                <td>{user.ddElements.join(", ")}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.nationalId}</td>
                <td>{user.birthDate}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.invitationCode}</td>
              </tr>
            ))}
            {users.map((user, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
                <td>{user.ddElements.join(", ")}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.nationalId}</td>
                <td>{user.birthDate}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.invitationCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
