import { useEffect, useState } from 'react'
import './App.css'
import api from './services/api'

function App() {
  const [users, setUsers] = useState([])
  const [updateId, setUpdateId] = useState(null)
  const [data, setData] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', role: '' })

  // Fetch all users
  async function getUsers() {
    try {
      const res = await api.get('/users')
      setUsers(res.data.users)
    } catch (err) {
      console.error('Error fetching users:', err)
    }
  }

  async function getdata() {
    try {
      const res = await api.get('/')
      setData(res.data.a)
    } catch (err) {
      console.error('Error fetching users:', err)
    }
  }
  useEffect(() => {
    getUsers()
    getdata()
  }, [])

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Add new user
  const handleAdd = async () => {
    if (!formData.name || !formData.email) return
    try {
      await api.post('/users', formData)
      setFormData({ name: '', email: '', role: '' })
      getUsers()
    } catch (err) {
      console.error('Error adding user:', err)
    }
  }

  // Update existing user
  const handleUpdate = async (id) => {
    try {
      await api.put(`/users/${id}`, formData)
      setUpdateId(null)
      setFormData({ name: '', email: '', role: '' })
      getUsers()
    } catch (err) {
      console.error('Error updating user:', err)
    }
  }

  // Delete user
  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`)
      getUsers()
    } catch (err) {
      console.error('Error deleting user:', err)
    }
  }

  // Start editing
  const handleEditClick = (user) => {
    setUpdateId(user._id)
    setFormData({ name: user.name, email: user.email, role: user.role })
  }

  return (
    <div className='flex flex-col space-y-6'>
      <h1 className='text-red-500 font-bold text-center mt-10'>CRUD USING RESTFUL API</h1>
      <span className='text-center text-4xl'>{!data ? 'No data from backend' : data}</span>
      {/* {data && <span className='text-center text-4xl'>{data}</span>}
      {!data && <span className='text-center text-4xl'>No data from backend</span>} */}
      {/* Form for Add / Update */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm w-200 mx-auto p-4 flex space-x-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        {updateId ? (
          <button
            onClick={() => handleUpdate(updateId)}
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            Add
          </button>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm w-200 mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.length > 0 ? users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-blue-50/30 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-2 text-sm text-gray-600">{user.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{user.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{user.role}</td>
                  <td className="py-2 px-2 flex justify-end items-center text-right">
                    <div className='space-x-2 font-semibold text-gray-600 text-xs'>
                      <button className='hover:text-blue-500' onClick={() => handleEditClick(user)}>Edit</button>
                      <button className='hover:text-red-500' onClick={() => handleDelete(user._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-600" colSpan="4">Users not found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
