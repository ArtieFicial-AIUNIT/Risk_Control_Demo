import { useState, useEffect, useRef } from 'react';
import { Box } from '@ag.ds-next/react/box';
import { Text } from '@ag.ds-next/react/text';
import { TextInput } from '@ag.ds-next/react/text-input';
import { Button } from '@ag.ds-next/react/button';
import { keyframes } from '@emotion/react';

// Animations
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

type Mood = 'happy' | 'thinking' | 'excited' | 'confused';

interface Message {
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface GuardrailInfo {
  name: string;
  risks: string[];
  controls: string[];
  principles: string[];
}

interface AssistantResponse {
  text: string;
  mood: Mood;
  followUp?: string[];
}

interface ContextProps {
  guardrails: {
    name: string;
    riskLevel: string;
    risks: string[];
    controls: string[];
    principles: string[];
  }[];
  stageColor: string;
}

export const VirtualAssistant = ({ guardrails, stageColor }: ContextProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [mood, setMood] = useState<Mood>('happy');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([
    "What are the main risks in the Design stage?",
    "How do I identify stakeholders?",
    "Tell me about user experience controls",
    "What ethical principles should I consider?",
  ]);
  const [size, setSize] = useState({ width: 350, height: 500 });
  const resizingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const startSizeRef = useRef({ width: 350, height: 500 });

  const assistantMoods = {
    happy: '😊',
    thinking: '🤔',
    excited: '😃',
    confused: '😅'
  };

  // Add welcome message
  useEffect(() => {
    const timer = setTimeout(() => {
      if (messages.length === 0) {
        setMessages([{
          text: "Hello! I'm your AI Assistant. I can help you understand the guardrails, risks, controls, and principles specific to this stage. What would you like to know?",
          sender: 'assistant',
          timestamp: new Date()
        }]);
      }
    }, 300); // Small delay for smooth animation

    return () => clearTimeout(timer);
  }, [messages.length]);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, sender: 'user', timestamp: new Date() }]);
    setInput('');
    setMood('thinking');
    setIsTyping(true);

    // Get response with improved context
    setTimeout(() => {
      const response = getAssistantResponse(input);
      setMessages(prev => [...prev, { 
        text: response.text, 
        sender: 'assistant', 
        timestamp: new Date() 
      }]);
      setMood(response.mood);
      setIsTyping(false);
      
      // Update suggested questions based on context
      if (response.followUp) {
        setSuggestedQuestions(response.followUp);
      }
    }, 1500);
  };

  const findRelevantGuardrail = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return guardrails.find(guardrail => 
      guardrail.name.toLowerCase().includes(lowerQuery) ||
      guardrail.risks.some(risk => risk.toLowerCase().includes(lowerQuery)) ||
      guardrail.controls.some(control => control.toLowerCase().includes(lowerQuery)) ||
      guardrail.principles.some(principle => principle.toLowerCase().includes(lowerQuery))
    );
  };

  const getAssistantResponse = (query: string): AssistantResponse => {
    const lowerQuery = query.toLowerCase();
    const relevantGuardrail = findRelevantGuardrail(query);

    // Search for specific guardrail content
    if (relevantGuardrail) {
      return {
        text: `Regarding "${relevantGuardrail.name}" (${relevantGuardrail.riskLevel} Risk):\n\n` +
          `🎯 Key Risks:\n${relevantGuardrail.risks.map(risk => `• ${risk}`).join('\n')}\n\n` +
          `🛡️ Control Measures:\n${relevantGuardrail.controls.map(control => `• ${control}`).join('\n')}\n\n` +
          `✨ Principles Applied:\n${relevantGuardrail.principles.map(principle => `• ${principle}`).join('\n')}`,
        mood: 'excited',
        followUp: [
          `What are the controls for ${relevantGuardrail.name}?`,
          `Explain the risks in ${relevantGuardrail.name}`,
          `How to implement ${relevantGuardrail.name}?`
        ]
      };
    }

    // Risk level specific queries
    if (lowerQuery.includes('high risk') || lowerQuery.includes('medium risk')) {
      const riskLevel = lowerQuery.includes('high') ? 'High' : 'Medium';
      const relevantGuardrails = guardrails.filter(g => g.riskLevel === riskLevel);
      
      return {
        text: `${riskLevel} Risk areas in the Design stage include:\n\n` +
          relevantGuardrails.map(g => 
            `📌 ${g.name}:\n${g.risks.map(risk => `• ${risk}`).join('\n')}`
          ).join('\n\n'),
        mood: 'thinking',
        followUp: relevantGuardrails.map(g => `Tell me more about ${g.name}`)
      };
    }

    // Search for principles
    if (lowerQuery.includes('principle')) {
      const allPrinciples = Array.from(new Set(
        guardrails.flatMap(g => g.principles)
      ));
      
      return {
        text: "Key AI Principles in the Design stage include:\n\n" +
          allPrinciples.map(principle => `• ${principle}`).join('\n'),
        mood: 'happy',
        followUp: ["How are these principles applied?", "Show me related controls", "Which guardrails use these principles?"]
      };
    }

    // Default context-aware response
    return {
      text: "I can help you understand the Design stage guardrails:\n\n" +
        guardrails.map(g => `• ${g.name} (${g.riskLevel} Risk)`).join('\n') +
        "\n\nWhat would you like to know more about?",
      mood: 'happy',
      followUp: [
        "Show me high risk areas",
        "What are the key principles?",
        "List all control measures"
      ]
    };
  };

  const handleClearChat = () => {
    setMessages([]); // Clear all messages
    setSuggestedQuestions([ // Reset to initial suggested questions
      "What are the main risks in the Design stage?",
      "How do I identify stakeholders?",
      "Tell me about user experience controls",
      "What ethical principles should I consider?",
    ]);
    setMood('happy');
    // The welcome message will be automatically added by the useEffect
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    resizingRef.current = true;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    startSizeRef.current = { ...size };
    
    // Add temporary event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!resizingRef.current) return;

    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;

    setSize({
      width: Math.max(300, Math.min(800, startSizeRef.current.width + deltaX)),
      height: Math.max(400, Math.min(800, startSizeRef.current.height + deltaY))
    });
  };

  const handleMouseUp = () => {
    resizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Clean up event listeners
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Assistant Button */}
      <Box
        css={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 1000,
        }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          css={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            padding: 0,
            animation: `${bounce} 2s ease-in-out infinite`,
            '&:hover': {
              animation: `${pulse} 1s ease-in-out infinite`,
            }
          }}
        >
          {assistantMoods[mood]}
        </Button>
      </Box>

      {/* Chat Interface */}
      {isOpen && (
        <Box
          css={{
            position: 'fixed',
            bottom: '5rem',
            right: '2rem',
            width: `${size.width}px`,
            height: `${size.height}px`,
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            zIndex: 1000,
            animation: `${fadeIn} 0.3s ease-out`,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            resize: 'both',
            minWidth: '300px',
            minHeight: '400px',
            maxWidth: '800px',
            maxHeight: '800px'
          }}
        >
          {/* Enhanced Chat Header */}
          <Box
            css={{
              padding: '1rem',
              background: stageColor,
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'move',
              userSelect: 'none'
            }}
          >
            <Box css={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Text css={{ fontSize: '1.2rem' }}>AI Assistant</Text>
              {isTyping && <Text css={{ fontSize: '0.8rem' }}>typing...</Text>}
            </Box>
            <Button
              variant="text"
              onClick={handleClearChat}
              css={{
                color: 'white',
                '&:hover': {
                  background: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Clear Chat
            </Button>
          </Box>

          {/* Messages Container */}
          <Box
            css={{
              padding: '1rem',
              flexGrow: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              height: '100%'
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                css={{
                  alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  animation: `${fadeIn} 0.3s ease-out`,
                }}
              >
                <Box
                  css={{
                    background: message.sender === 'user' ? '#4299E1' : '#F7FAFC',
                    color: message.sender === 'user' ? 'white' : 'black',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    borderBottomRightRadius: message.sender === 'user' ? '4px' : '12px',
                    borderBottomLeftRadius: message.sender === 'assistant' ? '4px' : '12px',
                  }}
                >
                  {message.text}
                </Box>
                <Text
                  css={{
                    fontSize: '0.7rem',
                    color: '#718096',
                    marginTop: '0.25rem',
                    textAlign: message.sender === 'user' ? 'right' : 'left',
                  }}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </Box>
            ))}
          </Box>

          {/* Resize Handle */}
          <Box
            css={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '15px',
              height: '15px',
              cursor: 'nwse-resize',
              '&::before': {
                content: '""',
                position: 'absolute',
                right: '3px',
                bottom: '3px',
                width: '8px',
                height: '8px',
                borderRight: `2px solid ${stageColor}`,
                borderBottom: `2px solid ${stageColor}`,
                opacity: 0.5
              }
            }}
            onMouseDown={handleMouseDown}
          />

          {/* Suggested Questions */}
          {suggestedQuestions.length > 0 && (
            <Box css={{
              padding: '0.5rem 1rem',
              borderTop: '1px solid #E2E8F0',
            }}>
              <Text css={{ fontSize: '0.8rem', color: '#718096', marginBottom: '0.5rem' }}>
                Suggested questions:
              </Text>
              <Box css={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}>
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="text"
                    size="sm"
                    onClick={() => {
                      setInput(question);
                      handleSend();
                    }}
                    css={{
                      fontSize: '0.8rem',
                      color: '#4299E1',
                      padding: '0.25rem 0.5rem',
                      '&:hover': {
                        background: '#EBF8FF'
                      }
                    }}
                  >
                    {question}
                  </Button>
                ))}
              </Box>
            </Box>
          )}

          {/* Input Area */}
          <Box
            css={{
              padding: '1rem',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              gap: '0.5rem',
            }}
          >
            <TextInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about design stage"
              css={{ flexGrow: 1 }}
            />
            <Button onClick={handleSend}>Send</Button>
          </Box>
        </Box>
      )}
    </>
  );
};
