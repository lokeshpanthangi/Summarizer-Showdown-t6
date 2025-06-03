import React from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsDashboard = ({ analyticsData, openSourceModel, proprietaryModel }) => {
  // Get display names for models
  const getModelDisplayName = (modelId) => {
    if (modelId.includes('bart')) return 'BART';
    if (modelId.includes('pegasus')) return 'Pegasus';
    if (modelId.includes('Mixtral')) return 'Mixtral';
    if (modelId.includes('t5')) return 'T5';
    if (modelId.includes('distilbart')) return 'DistilBART';
    if (modelId === 'gpt-3.5-turbo') return 'GPT-3.5';
    if (modelId === 'gpt-4') return 'GPT-4';
    if (modelId.includes('claude')) return 'Claude';
    return modelId;
  };

  const openSourceDisplayName = getModelDisplayName(openSourceModel);
  const proprietaryDisplayName = getModelDisplayName(proprietaryModel);

  // Prepare data for the bar chart
  const barChartData = {
    labels: ['Clarity', 'Accuracy', 'Conciseness'],
    datasets: [
      {
        label: `${openSourceDisplayName} (Open Source)`,
        data: [
          analyticsData.averageRatings.openSource.clarity,
          analyticsData.averageRatings.openSource.accuracy,
          analyticsData.averageRatings.openSource.conciseness
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: `${proprietaryDisplayName} (Proprietary)`,
        data: [
          analyticsData.averageRatings.proprietary.clarity,
          analyticsData.averageRatings.proprietary.accuracy,
          analyticsData.averageRatings.proprietary.conciseness
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Model Performance Comparison',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        title: {
          display: true,
          text: 'Rating (1-5)'
        }
      }
    }
  };

  // Calculate average scores
  const openSourceAvg = (
    analyticsData.averageRatings.openSource.clarity +
    analyticsData.averageRatings.openSource.accuracy +
    analyticsData.averageRatings.openSource.conciseness
  ) / 3;

  const proprietaryAvg = (
    analyticsData.averageRatings.proprietary.clarity +
    analyticsData.averageRatings.proprietary.accuracy +
    analyticsData.averageRatings.proprietary.conciseness
  ) / 3;

  return (
    <div>
      <h4 className="mb-4 text-center">Analytics Dashboard</h4>
      
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Performance Comparison</h5>
            </Card.Header>
            <Card.Body>
              <Bar data={barChartData} options={barChartOptions} />
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">User Preferences</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-3">
                <h6>Preferred Model</h6>
                <div className="d-flex justify-content-around">
                  <div className="text-center">
                    <div className="h4">{analyticsData.modelPreferences.openSource}</div>
                    <div>{openSourceDisplayName}</div>
                  </div>
                  <div className="text-center">
                    <div className="h4">{analyticsData.modelPreferences.proprietary}</div>
                    <div>{proprietaryDisplayName}</div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Card>
        <Card.Header>
          <h5 className="mb-0">Detailed Ratings</h5>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Metric</th>
                <th>{openSourceDisplayName} (Open Source)</th>
                <th>{proprietaryDisplayName} (Proprietary)</th>
                <th>Difference</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Clarity</td>
                <td>{analyticsData.averageRatings.openSource.clarity.toFixed(1)}</td>
                <td>{analyticsData.averageRatings.proprietary.clarity.toFixed(1)}</td>
                <td>
                  {(analyticsData.averageRatings.proprietary.clarity - analyticsData.averageRatings.openSource.clarity).toFixed(1)}
                </td>
              </tr>
              <tr>
                <td>Accuracy</td>
                <td>{analyticsData.averageRatings.openSource.accuracy.toFixed(1)}</td>
                <td>{analyticsData.averageRatings.proprietary.accuracy.toFixed(1)}</td>
                <td>
                  {(analyticsData.averageRatings.proprietary.accuracy - analyticsData.averageRatings.openSource.accuracy).toFixed(1)}
                </td>
              </tr>
              <tr>
                <td>Conciseness</td>
                <td>{analyticsData.averageRatings.openSource.conciseness.toFixed(1)}</td>
                <td>{analyticsData.averageRatings.proprietary.conciseness.toFixed(1)}</td>
                <td>
                  {(analyticsData.averageRatings.proprietary.conciseness - analyticsData.averageRatings.openSource.conciseness).toFixed(1)}
                </td>
              </tr>
              <tr className="table-primary">
                <td><strong>Average</strong></td>
                <td><strong>{openSourceAvg.toFixed(1)}</strong></td>
                <td><strong>{proprietaryAvg.toFixed(1)}</strong></td>
                <td>
                  <strong>{(proprietaryAvg - openSourceAvg).toFixed(1)}</strong>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
