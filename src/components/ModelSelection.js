import React, { useState } from 'react';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { HfInference } from '@huggingface/inference';

const ModelSelection = ({ 
  openSourceModel, 
  proprietaryModel, 
  huggingFaceKey, 
  openAIKey, 
  onModelChange, 
  onApiKeyChange, 
  inputText, 
  setOpenSourceSummary, 
  setProprietarySummary, 
  isLoading, 
  setIsLoading 
}) => {
  const [error, setError] = useState('');

  // Open-source model options
  const openSourceOptions = [
    { value: 'facebook/bart-large-cnn', label: 'BART (Facebook)' },
    { value: 'google/pegasus-xsum', label: 'Pegasus (Google)' },
    { value: 'mistralai/Mixtral-8x7B-Instruct-v0.1', label: 'Mixtral 8x7B' },
    { value: 't5-base', label: 'T5 Base' },
    { value: 'sshleifer/distilbart-cnn-12-6', label: 'DistilBART CNN' }
  ];

  // Proprietary model options
  const proprietaryOptions = [
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo (OpenAI)' },
    { value: 'gpt-4', label: 'GPT-4 (OpenAI)' },
    { value: 'claude-2', label: 'Claude 2 (Anthropic)' }
  ];

  const handleOpenSourceModelChange = (e) => {
    onModelChange('openSource', e.target.value);
  };

  const handleProprietaryModelChange = (e) => {
    onModelChange('proprietary', e.target.value);
  };

  const handleHuggingFaceKeyChange = (e) => {
    onApiKeyChange('huggingFace', e.target.value);
  };

  const handleOpenAIKeyChange = (e) => {
    onApiKeyChange('openAI', e.target.value);
  };

  const generateSummaries = async () => {
    if (!inputText || inputText.trim() === '') {
      setError('Please enter text to summarize');
      return;
    }

    if (!huggingFaceKey || !openAIKey) {
      setError('Please enter both API keys');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Generate summaries in parallel
      await Promise.all([
        generateOpenSourceSummary(),
        generateProprietarySummary()
      ]);
    } catch (err) {
      console.error('Error generating summaries:', err);
      setError('Error generating summaries. Please check your API keys and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateOpenSourceSummary = async () => {
    try {
      const hf = new HfInference(huggingFaceKey);
      
      // Different models require different approaches
      if (openSourceModel.includes('bart') || openSourceModel.includes('pegasus') || openSourceModel.includes('t5')) {
        const response = await hf.summarization({
          model: openSourceModel,
          inputs: inputText,
          parameters: {
            max_length: 150,
            min_length: 30,
          }
        });
        setOpenSourceSummary(response.summary_text);
      } else if (openSourceModel.includes('Mixtral')) {
        // For Mixtral and other instruction-tuned models
        const response = await hf.textGeneration({
          model: openSourceModel,
          inputs: `Summarize the following text in a concise way:\n\n${inputText}`,
          parameters: {
            max_new_tokens: 150,
            temperature: 0.7,
          }
        });
        setOpenSourceSummary(response.generated_text.replace(`Summarize the following text in a concise way:\n\n${inputText}`, '').trim());
      }
    } catch (error) {
      console.error('Error with Hugging Face API:', error);
      throw error;
    }
  };

  const generateProprietarySummary = async () => {
    try {
      if (proprietaryModel.includes('gpt')) {
        // OpenAI API
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: proprietaryModel,
            messages: [
              {
                role: 'system',
                content: 'You are a helpful assistant that summarizes text concisely and accurately.'
              },
              {
                role: 'user',
                content: `Please summarize the following text in about 100 words:\n\n${inputText}`
              }
            ],
            max_tokens: 150,
            temperature: 0.5,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${openAIKey}`
            }
          }
        );
        
        setProprietarySummary(response.data.choices[0].message.content.trim());
      } else if (proprietaryModel.includes('claude')) {
        // Placeholder for Claude API
        // In a real implementation, you would use Anthropic's API
        setProprietarySummary("Claude API integration would go here. This is a placeholder summary.");
      }
    } catch (error) {
      console.error('Error with proprietary API:', error);
      throw error;
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header as="h5">Model Selection</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form>
          <h6>Open-Source Model (Hugging Face)</h6>
          <Form.Group className="mb-3">
            <Form.Select 
              value={openSourceModel}
              onChange={handleOpenSourceModelChange}
            >
              {openSourceOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Hugging Face API Key</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Enter your Hugging Face API key"
              value={huggingFaceKey}
              onChange={handleHuggingFaceKeyChange}
            />
            <Form.Text className="text-muted">
              Get your key at <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer">huggingface.co</a>
            </Form.Text>
          </Form.Group>
          
          <hr />
          
          <h6>Proprietary Model</h6>
          <Form.Group className="mb-3">
            <Form.Select 
              value={proprietaryModel}
              onChange={handleProprietaryModelChange}
            >
              {proprietaryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>OpenAI API Key</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Enter your OpenAI API key"
              value={openAIKey}
              onChange={handleOpenAIKeyChange}
            />
            <Form.Text className="text-muted">
              Get your key at <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">platform.openai.com</a>
            </Form.Text>
          </Form.Group>
          
          <Button 
            variant="primary" 
            onClick={generateSummaries}
            disabled={isLoading || !inputText}
            className="w-100"
          >
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Generating Summaries...
              </>
            ) : (
              'Generate Summaries'
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ModelSelection;
