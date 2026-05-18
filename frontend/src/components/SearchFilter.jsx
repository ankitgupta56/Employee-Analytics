import { useState } from 'react';
import { employeeService } from '../services/apiService';
import './SearchFilter.css';

export const SearchFilter = ({ onResults }) => {
  const [filters, setFilters] = useState({
    department: '',
    skill: '',
    name: '',
  });

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const departments = [
    '',
    'Development',
    'HR',
    'Sales',
    'Marketing',
    'Finance',
    'Operations',
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    if (!filters.department && !filters.skill && !filters.name) {
      setError('Please enter at least one search criteria');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await employeeService.searchEmployees(filters);
      setSearchResults(response.data.data);

      if (response.data.data.length === 0) {
        setError('No employees found matching your criteria');
      }

      if (onResults) onResults(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFilters({
      department: '',
      skill: '',
      name: '',
    });
    setSearchResults([]);
    setError('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-filter-container">
      <h2>Search & Filter Employees</h2>

      <div className="filter-inputs">
        <div className="filter-group">
          <label>Department:</label>
          <select
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
            onKeyPress={handleKeyPress}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept || 'All Departments'}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Skill:</label>
          <input
            type="text"
            name="skill"
            value={filters.skill}
            onChange={handleFilterChange}
            placeholder="e.g., React, Python"
            onKeyPress={handleKeyPress}
          />
        </div>

        <div className="filter-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            placeholder="Employee name"
            onKeyPress={handleKeyPress}
          />
        </div>

        <div className="filter-actions">
          <button onClick={handleSearch} disabled={loading} className="search-btn">
            {loading ? 'Searching...' : 'Search'}
          </button>
          <button onClick={handleReset} className="reset-btn">
            Reset
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {searchResults.length > 0 && (
        <div className="results-section">
          <h3>Results ({searchResults.length} found)</h3>
          <div className="results-grid">
            {searchResults.map((employee) => (
              <div key={employee._id} className="result-card">
                <div className="card-header">
                  <h4>{employee.name}</h4>
                  <span className="department-badge">{employee.department}</span>
                </div>
                <div className="card-content">
                  <p>
                    <strong>Email:</strong> {employee.email}
                  </p>
                  <p>
                    <strong>Performance:</strong> {employee.performanceScore}/100
                  </p>
                  <p>
                    <strong>Experience:</strong> {employee.experience} years
                  </p>
                  <p>
                    <strong>Skills:</strong> {employee.skills.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
