import { useState } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import SearchFilter from '../components/SearchFilter';
import './Dashboard.css';

export const Dashboard = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState('list');

  const handleEmployeeAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Employee Management Dashboard</h1>
        <p>Manage and analyze employee performance data</p>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          Employee List
        </button>
        <button
          className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          Add Employee
        </button>
        <button
          className={`tab-btn ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          Search & Filter
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'list' && <EmployeeList refresh={refreshTrigger} />}
        {activeTab === 'add' && (
          <EmployeeForm onSuccess={handleEmployeeAdded} />
        )}
        {activeTab === 'search' && <SearchFilter />}
      </div>
    </div>
  );
};

export default Dashboard;
