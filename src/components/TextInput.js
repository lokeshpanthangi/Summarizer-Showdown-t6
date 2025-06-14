import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

// Sample text for quick testing
const SAMPLE_TEXT = `Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to natural intelligence displayed by animals including humans. AI research has been defined as the field of study of intelligent agents, which refers to any system that perceives its environment and takes actions that maximize its chance of achieving its goals.

The term "artificial intelligence" had previously been used to describe machines that mimic and display "human" cognitive skills that are associated with the human mind, such as "learning" and "problem-solving". This definition has since been rejected by major AI researchers who now describe AI in terms of rationality and acting rationally, which does not limit how intelligence can be articulated.

AI applications include advanced web search engines (e.g., Google), recommendation systems (used by YouTube, Amazon, and Netflix), understanding human speech (such as Siri and Alexa), self-driving cars (e.g., Waymo), generative or creative tools (ChatGPT and AI art), automated decision-making, and competing at the highest level in strategic game systems (such as chess and Go).

As machines become increasingly capable, tasks considered to require "intelligence" are often removed from the definition of AI, a phenomenon known as the AI effect. For instance, optical character recognition is frequently excluded from things considered to be AI, having become a routine technology.`;

const TextInput = ({ inputText, onTextChange }) => {
  const [text, setText] = useState(inputText || '');

  const handleTextChange = (e) => {
    setText(e.target.value);
    onTextChange(e.target.value);
  };

  const handleUseSample = () => {
    setText(SAMPLE_TEXT);
    onTextChange(SAMPLE_TEXT);
  };

  const handleClear = () => {
    setText('');
    onTextChange('');
  };

  return (
    <Card className="mb-4">
      <Card.Header as="h5">Text Input</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Enter or paste text to summarize (500-1000 words recommended)</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={10} 
              value={text}
              onChange={handleTextChange}
              placeholder="Paste your article or long-form text here..."
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handleClear}>
              Clear
            </Button>
            <Button variant="primary" onClick={handleUseSample}>
              Use Sample Text
            </Button>
          </div>
          <div className="mt-3">
            <small className="text-muted">
              Word count: {text.split(/\s+/).filter(word => word.length > 0).length}
            </small>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TextInput;
