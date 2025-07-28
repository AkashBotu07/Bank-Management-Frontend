import { useEffect, useState } from 'react';
import API from '../api/axios';
import Navbar from '../components/NavbarUser';


export default function AdminDashboard() {
  const [accounts, setAccounts] = useState([]);
  const [filters, setFilters] = useState({ username: '', bankName: '', ifscCode: '' });

  const fetchAccounts = async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await API.get(`/admin?${query}`);
    setAccounts(res.data);
    console.log(res.data)
  };

  useEffect(() => {
    fetchAccounts();
  }, [filters]);

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <div className="dashboard">
      <Navbar/>
      <h2>Admin Dashboard</h2>

      {/* Filter Inputs */}
      <div className="filters">
        <input name="username" placeholder="Filter by Username" value={filters.username} onChange={handleChange} />
        <input name="bankName" placeholder="Filter by Bank" value={filters.bankName} onChange={handleChange} />
        <input name="ifscCode" placeholder="Filter by IFSC" value={filters.ifscCode} onChange={handleChange} />
      </div>

      {/* Accounts Table */}
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Bank</th>
            <th>Branch</th>
            <th>IFSC</th>
            <th>Account No</th>
            <th>Holder</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc) => (
            <tr key={acc._id}>
              <td>{acc.user.username}</td>
              <td>{acc.user.email}</td>
              <td>{acc.bankName}</td>
              <td>{acc.branchName}</td>
              <td>{acc.ifscCode}</td>
              <td>{acc.accountNumber}</td>
              <td>{acc.accountHolderName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
