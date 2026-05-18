import { useState, useEffect } from 'react';
import { employeeService } from '../services/apiService';
import './EmployeeList.css';

export const EmployeeList = ({ refresh }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, [refresh]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeeService.getAllEmployees();
      setEmployees(response.data.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeService.deleteEmployee(id);
        fetchEmployees();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete employee');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading employees...</div>;
  }

  return (
    <div className="employee-list-container">
      <h2>Employee List</h2>

      {error && <div className="error-message">{error}</div>}

      {employees.length === 0 ? (
        <div className="no-data">No employees found</div>
      ) : (
        <div className="table-responsive">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Performance</th>
                <th>Experience</th>
                <th>Skills</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>
                    <div className="performance-bar">
                      <div
                        className="performance-fill"
                        style={{
                          width: `${employee.performanceScore}%`,
                          backgroundColor:
                            employee.performanceScore > 75
                              ? '#28a745'
                              : employee.performanceScore > 50
                              ? '#ffc107'
                              : '#dc3545',
                        }}
                      ></div>
                      <span>{employee.performanceScore}/100</span>
                    </div>
                  </td>
                  <td>{employee.experience} years</td>
                  <td>
                    <div className="skills-cell">
                      {employee.skills.map((skill, idx) => (
                        <span key={idx} className="skill-badge">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() =>
                          alert(
                            'Edit feature coming soon - ID: ' + employee._id
                          )
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(employee._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
