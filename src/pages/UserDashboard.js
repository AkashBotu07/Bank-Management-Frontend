import { useEffect, useState } from 'react';
import API from '../api/axios';
import NavbarUser from '../components/NavbarUser';

export default function UserDashboard() {
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({
    ifscCode: '',
    branchName: '',
    bankName: '',
    accountNumber: '',
    accountHolderName: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch bank accounts
  const fetchAccounts = async () => {
    const res = await API.get('/bank');
    setAccounts(res.data);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Handle input change
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Add or update account
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await API.put(`/bank/${editingId}`, form);
      setEditingId(null);
    } else {
      await API.post('/bank', form);
    }
    setForm({ ifscCode: '', branchName: '', bankName: '', accountNumber: '', accountHolderName: '' });
    fetchAccounts();
  };

  // Edit account
  const handleEdit = (account) => {
    setForm(account);
    setEditingId(account._id);
  };

  // Delete account
  const handleDelete = async (id) => {
    if (window.confirm('Delete this account?')) {
      await API.delete(`/bank/${id}`);
      fetchAccounts();
    }
  };

  return (
    <div className="dashboard">
      <NavbarUser />
      <h2>User Dashboard</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="form">
        <input name="ifscCode" placeholder="IFSC Code" value={form.ifscCode} onChange={handleChange} required/>
        <input name="branchName" placeholder="Branch Name" value={form.branchName} onChange={handleChange} required/>
        <input name="bankName" placeholder="Bank Name" value={form.bankName} onChange={handleChange} required/>
        <input name="accountNumber" placeholder="Account Number" value={form.accountNumber} onChange={handleChange} required/>
        <input name="accountHolderName" placeholder="Account Holder Name" value={form.accountHolderName} onChange={handleChange} required/>
        <button type="submit">{editingId ? 'Update Account' : 'Add Account'}</button>
      </form>

      {/* Accounts Table */}
      <table>
        <thead>
          <tr>
            <th>Bank</th>
            <th>Branch</th>
            <th>IFSC</th>
            <th>Account No</th>
            <th>Holder</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc) => (
            <tr key={acc._id}>
              <td>{acc.bankName}</td>
              <td>{acc.branchName}</td>
              <td>{acc.ifscCode}</td>
              <td>{acc.accountNumber}</td>
              <td>{acc.accountHolderName}</td>
              <td>
                <button onClick={() => handleEdit(acc)}>Edit</button>
                <button onClick={() => handleDelete(acc._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
