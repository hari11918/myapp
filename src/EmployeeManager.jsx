import React, { useState } from 'react';

const EmployeeManager = () => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
      name: '',
      dob: '',
      address: '',
      yearsOfExperience: '',
      email: '',
      department: '',
      status: '',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSave = () => {
      setEmployees([...employees, formData]);
      setFormData({
        name: '',
        dob: '',
        address: '',
        yearsOfExperience: '',
        email: '',
        department: '',
        status: '',
      });
    };
  
    
    const filteredEmployees = employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.yearsOfExperience.toString().includes(searchTerm)
    );
  
    
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentEmployees = filteredEmployees.slice(firstIndex, lastIndex);
    const paginate = pageNumber => setCurrentPage(pageNumber);
  
    return (
      <div>
        {/* Employee form */}
        <div className="form-container">
          {/* Form fields */}
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} placeholder="Date of Birth" />
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
          <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} placeholder="Years of Experience" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Department" />
          <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder="Status" />
          <button onClick={handleSave}>Save</button>
        </div>
        
        {/* Employee List and Search */}
        <div className="employee-list">
          <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search..." />
          {currentEmployees.map((employee, index) => (
            <div key={index}>
              {employee.name} - {employee.dob} - {employee.address} - {employee.yearsOfExperience}
            </div>
          ))}
        </div>
  
        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredEmployees.length / itemsPerPage) }, (_, i) => (
            <button key={i} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default EmployeeManager;