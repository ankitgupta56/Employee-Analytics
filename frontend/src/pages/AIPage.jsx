import AIRecommendations from '../components/AIRecommendations';
import './AIPage.css';

export const AIPage = () => {
  return (
    <div className="ai-page">
      <div className="ai-header">
        <h1>AI-Powered Analytics & Recommendations</h1>
        <p>
          Get intelligent insights and recommendations for employee performance
          and career growth
        </p>
      </div>

      <AIRecommendations />
    </div>
  );
};

export default AIPage;
