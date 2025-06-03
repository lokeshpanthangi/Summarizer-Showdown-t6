import React from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';

const SummaryComparison = ({
  openSourceModel,
  proprietaryModel,
  openSourceSummary,
  proprietarySummary,
  ratings,
  preference,
  onRatingChange,
  onPreferenceChange
}) => {
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

  // Handle rating change
  const handleRatingChange = (modelType, ratingType, value) => {
    onRatingChange(modelType, ratingType, parseInt(value));
  };

  return (
    <div>
      <h4 className="mb-4 text-center">Summary Comparison</h4>
      
      <Row>
        <Col md={6}>
          <Card className="mb-4 h-100">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Open Source: {openSourceDisplayName}</h5>
            </Card.Header>
            <Card.Body>
              <div className="summary-content mb-3" style={{ minHeight: '200px' }}>
                {openSourceSummary}
              </div>
              
              <h6>Rate this summary:</h6>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Clarity ✅</Form.Label>
                  <div className="d-flex">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Form.Check
                        key={value}
                        inline
                        type="radio"
                        id={`clarity-os-${value}`}
                        name="clarity-os"
                        label={value}
                        checked={ratings.openSource.clarity === value}
                        onChange={() => handleRatingChange('openSource', 'clarity', value)}
                      />
                    ))}
                  </div>
                </Form.Group>
                
                <Form.Group className="mb-2">
                  <Form.Label>Accuracy 🧠</Form.Label>
                  <div className="d-flex">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Form.Check
                        key={value}
                        inline
                        type="radio"
                        id={`accuracy-os-${value}`}
                        name="accuracy-os"
                        label={value}
                        checked={ratings.openSource.accuracy === value}
                        onChange={() => handleRatingChange('openSource', 'accuracy', value)}
                      />
                    ))}
                  </div>
                </Form.Group>
                
                <Form.Group className="mb-2">
                  <Form.Label>Conciseness ✂️</Form.Label>
                  <div className="d-flex">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Form.Check
                        key={value}
                        inline
                        type="radio"
                        id={`conciseness-os-${value}`}
                        name="conciseness-os"
                        label={value}
                        checked={ratings.openSource.conciseness === value}
                        onChange={() => handleRatingChange('openSource', 'conciseness', value)}
                      />
                    ))}
                  </div>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="mb-4 h-100">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">Proprietary: {proprietaryDisplayName}</h5>
            </Card.Header>
            <Card.Body>
              <div className="summary-content mb-3" style={{ minHeight: '200px' }}>
                {proprietarySummary}
              </div>
              
              <h6>Rate this summary:</h6>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Clarity ✅</Form.Label>
                  <div className="d-flex">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Form.Check
                        key={value}
                        inline
                        type="radio"
                        id={`clarity-prop-${value}`}
                        name="clarity-prop"
                        label={value}
                        checked={ratings.proprietary.clarity === value}
                        onChange={() => handleRatingChange('proprietary', 'clarity', value)}
                      />
                    ))}
                  </div>
                </Form.Group>
                
                <Form.Group className="mb-2">
                  <Form.Label>Accuracy 🧠</Form.Label>
                  <div className="d-flex">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Form.Check
                        key={value}
                        inline
                        type="radio"
                        id={`accuracy-prop-${value}`}
                        name="accuracy-prop"
                        label={value}
                        checked={ratings.proprietary.accuracy === value}
                        onChange={() => handleRatingChange('proprietary', 'accuracy', value)}
                      />
                    ))}
                  </div>
                </Form.Group>
                
                <Form.Group className="mb-2">
                  <Form.Label>Conciseness ✂️</Form.Label>
                  <div className="d-flex">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Form.Check
                        key={value}
                        inline
                        type="radio"
                        id={`conciseness-prop-${value}`}
                        name="conciseness-prop"
                        label={value}
                        checked={ratings.proprietary.conciseness === value}
                        onChange={() => handleRatingChange('proprietary', 'conciseness', value)}
                      />
                    ))}
                  </div>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Card className="mt-3">
        <Card.Header>
          <h5 className="mb-0">Which summary do you prefer?</h5>
        </Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-center">
            <Button
              variant={preference === 'openSource' ? 'primary' : 'outline-primary'}
              className="mx-2"
              onClick={() => onPreferenceChange('openSource')}
            >
              {openSourceDisplayName} (Open Source)
            </Button>
            <Button
              variant={preference === 'proprietary' ? 'success' : 'outline-success'}
              className="mx-2"
              onClick={() => onPreferenceChange('proprietary')}
            >
              {proprietaryDisplayName} (Proprietary)
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SummaryComparison;
