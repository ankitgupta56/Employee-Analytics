import { useState, useEffect } from 'react';
import { employeeService, aiService } from '../services/apiService';
import './AIRecommendations.css';

export const AIRecommendations = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedEmployeeData, setSelectedEmployeeData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [batchRecommendations, setBatchRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('single');
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await employeeService.getAllEmployees();
      setEmployees(response.data.data);
      setLoadingEmployees(false);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError('Failed to fetch employees. Please try again.');
      setLoadingEmployees(false);
    }
  };

  const handleGetRecommendation = async () => {
    if (!selectedEmployee) {
      setError('Please select an employee');
      return;
    }

    setLoading(true);
    setError('');
    setRecommendations(null);

    try {
      const empData = employees.find(e => e._id === selectedEmployee);
      setSelectedEmployeeData(empData);

      const response = await aiService.getRecommendation(selectedEmployee);
      console.log('AI Response:', response.data);
      
      if (response.data?.data) {
        setRecommendations(response.data.data);
      } else if (response.data?.success) {
        setRecommendations({
          employeeName: empData?.name || 'Employee',
          performanceScore: empData?.performanceScore || 0,
          department: empData?.department || 'N/A',
          aiRecommendation: response.data.data?.aiRecommendation || 'Recommendation received',
        });
      } else {
        setError('Received empty response. Please try again.');
      }
    } catch (err) {
      console.error('AI Error:', err);
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to get AI recommendation. Please check your API key and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGetBatchRecommendations = async () => {
    if (selectedEmployees.length === 0) {
      setError('Please select at least one employee');
      return;
    }

    setLoading(true);
    setError('');
    setBatchRecommendations([]);

    try {
      const response = await aiService.getBatchRecommendations(selectedEmployees);
      console.log('Batch Response:', response.data);
      
      if (response.data?.data && Array.isArray(response.data.data)) {
        setBatchRecommendations(response.data.data);
      } else if (Array.isArray(response.data)) {
        setBatchRecommendations(response.data);
      } else {
        setError('Received invalid response format.');
      }
    } catch (err) {
      console.error('Batch Error:', err);
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to get AI recommendations. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleEmployeeSelection = (employeeId) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const selectAllEmployees = () => {
    setSelectedEmployees(
      selectedEmployees.length === employees.length
        ? []
        : employees.map((emp) => emp._id)
    );
  };

  if (loadingEmployees) {
    return <div className="ai-recommendations-container"><div className="loading">Loading employees...</div></div>;
  }

  return (
    <div className="ai-recommendations-container">
      <div className="ai-header">
        <h2>🤖 AI-Powered Recommendations</h2>
        <p className="subtitle">Get intelligent HR recommendations powered by AI</p>
      </div>

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'single' ? 'active' : ''}`}
          onClick={() => setActiveTab('single')}
        >
          📋 Single Employee
        </button>
        <button
          className={`tab-btn ${activeTab === 'batch' ? 'active' : ''}`}
          onClick={() => setActiveTab('batch')}
        >
          📊 Batch Analysis
        </button>
      </div>

      {activeTab === 'single' && (
        <div className="tab-content">
          <div className="recommendation-form">
            <div className="form-group">
              <label>Select Employee:</label>
              <select
                value={selectedEmployee}
                onChange={(e) => {
                  setSelectedEmployee(e.target.value);
                  setRecommendations(null);
                  setError('');
                }}
                className="employee-select"
              >
                <option value="">-- Select an employee --</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name} • {emp.department} • Score: {emp.performanceScore}/100
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGetRecommendation}
              disabled={loading || !selectedEmployee}
              className={`get-recommendation-btn ${loading ? 'loading' : ''}`}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Analyzing...
                </>
              ) : (
                '✨ Get AI Recommendation'
              )}
            </button>
          </div>

          {recommendations && (
            <div className="recommendation-card">
              <div className="recommendation-header">
                <div className="header-content">
                  <h3>{recommendations.employeeName}</h3>
                  <div className="header-meta">
                    <span className="department">📍 {recommendations.department}</span>
                    <span className="performance-badge">
                      ⭐ {recommendations.performanceScore}/100
                    </span>
                  </div>
                </div>
              </div>
              <div className="recommendation-content">
                <div className="recommendation-text">
                  {recommendations.aiRecommendation}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'single' && (
        <div className="tab-content">
          <div className="recommendation-form">
            <div className="form-group">
              <label>Select Employee:</label>
              <select
                value={selectedEmployee}
                onChange={(e) => {
                  setSelectedEmployee(e.target.value);
                  setRecommendations(null);
                  setError('');
                }}
                className="employee-select"
              >
                <option value="">-- Select an employee --</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name} • {emp.department} • Score: {emp.performanceScore}/100
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGetRecommendation}
              disabled={loading || !selectedEmployee}
              className={`get-recommendation-btn ${loading ? 'loading' : ''}`}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Analyzing...
                </>
              ) : (
                '✨ Get AI Recommendation'
              )}
            </button>
          </div>

          {recommendations && (
            <div className="recommendation-card">
              <div className="recommendation-header">
                <div className="header-content">
                  <h3>{recommendations.employeeName}</h3>
                  <div className="header-meta">
                    <span className="department">📍 {recommendations.department}</span>
                    <span className="performance-badge">
                      ⭐ {recommendations.performanceScore}/100
                    </span>
                  </div>
                </div>
              </div>
              <div className="recommendation-content">
                <div className="recommendation-text">
                  {recommendations.aiRecommendation}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'batch' && (
        <div className="tab-content">
          <div className="batch-selection">
            <div className="select-all">
              <label className="select-all-label">
                <input
                  type="checkbox"
                  checked={selectedEmployees.length === employees.length && employees.length > 0}
                  onChange={selectAllEmployees}
                  className="checkbox-input"
                />
                <span>Select All Employees</span>
              </label>
              <span className="selection-count">
                {selectedEmployees.length} of {employees.length} selected
              </span>
            </div>

            <div className="employee-checkboxes">
              {employees.map((emp) => (
                <div key={emp._id} className="employee-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(emp._id)}
                      onChange={() => toggleEmployeeSelection(emp._id)}
                      className="checkbox-input"
                    />
                    <div className="employee-info">
                      <strong>{emp.name}</strong>
                      <div className="emp-details">
                        <span className="department">{emp.department}</span>
                        <span className="performance">
                          {emp.performanceScore}/100
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </div>

            <button
              onClick={handleGetBatchRecommendations}
              disabled={loading || selectedEmployees.length === 0}
              className={`get-recommendation-btn batch-btn ${loading ? 'loading' : ''}`}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Analyzing {selectedEmployees.length} Employee{selectedEmployees.length !== 1 ? 's' : ''}...
                </>
              ) : (
                `📈 Get Batch Recommendations (${selectedEmployees.length})`
              )}
            </button>
          </div>

          {batchRecommendations.length > 0 && (
            <div className="batch-results">
              <h3>Rankings & Recommendations</h3>
              <div className="ranking-list">
                {batchRecommendations.map((rec) => (
                  <div key={rec.employeeId} className="ranking-item">
                    <div className="ranking-number">#{rec.ranking}</div>
                    <div className="ranking-details">
                      <div className="ranking-header">
                        <h4>{rec.employeeName}</h4>
                        <span className="performance-score">
                          {rec.performanceScore}/100
                        </span>
                      </div>
                      <p className="department-tag">{rec.department}</p>
                      <p className="recommendation-text">
                        {rec.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;
