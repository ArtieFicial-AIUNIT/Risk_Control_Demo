import { useRouter } from 'next/router';
import { useState } from 'react';
import { AppLayout } from '../../components/AppLayout';
import { PageContent } from '@ag.ds-next/react/content';
import { H1, H2 } from '@ag.ds-next/react/heading';
import { Box } from '@ag.ds-next/react/box';
import { Text } from '@ag.ds-next/react/text';
import { Card } from '@ag.ds-next/react/card';
import { Breadcrumbs } from '@ag.ds-next/react/breadcrumbs';
import { DocumentTitle } from '../../components/DocumentTitle';
import { guardrailData } from '../../data/guardrails';
import { Tag } from '@ag.ds-next/react/tags';
import { keyframes } from '@emotion/react';
import { Button } from '@ag.ds-next/react/button';
import { VirtualAssistant } from '../../components/VirtualAssistant/VirtualAssistant';

// Add helper function for risk level color
const getRiskLevelColor = (level: string) => {
  switch (level) {
    case 'High':
      return '#E53E3E';
    case 'Medium':
      return '#ED8936';
    case 'Low':
      return '#48BB78';
    default:
      return '#718096';
  }
};

// Add animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const StagePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const stageInfo = guardrailData[id as keyof typeof guardrailData];
  
  // State to track expanded guardrails
  const [expandedGuardrails, setExpandedGuardrails] = useState<number[]>([]);
  
  // Function to toggle expansion
  const toggleGuardrail = (index: number) => {
    setExpandedGuardrails(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Function to expand/collapse all
  const toggleAll = () => {
    if (expandedGuardrails.length === stageInfo.guardrails.length) {
      setExpandedGuardrails([]);
    } else {
      setExpandedGuardrails([...Array(stageInfo.guardrails.length).keys()]);
    }
  };

  const handleDashboardClick = () => {
    // You can replace this with your actual dashboard URL
    window.open('/dashboard', '_blank');
  };

  if (!stageInfo) {
    return (
      <AppLayout>
        <PageContent>
          <Box padding={2}>
            <Text>Stage not found</Text>
          </Box>
        </PageContent>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <DocumentTitle title={`${stageInfo.title} Stage`} />
      <Box css={{
        background: 'linear-gradient(135deg, #f6f8fa 0%, #ffffff 100%)',
        padding: '2rem',
        minHeight: '100vh',
        animation: `${fadeIn} 0.5s ease-out`
      }}>
        <PageContent>
          <Breadcrumbs
            links={[
              { href: '/', label: 'Home' },
              { label: stageInfo.title },
            ]}
          />
          <Box css={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '2rem',
            marginBottom: '2rem'
          }}>
            <H1 css={{
              color: stageInfo.color , // Changed from using stageInfo.color to using a fixed orange color
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: 0,
                width: '60px',
                height: '4px',
                background: stageInfo.color,
                borderRadius: '2px'
              }
            }}>
              {stageInfo.title} Stage
            </H1>
            <Button 
              onClick={toggleAll}
              css={{
                background: stageInfo.color,
                '&:hover': {
                  background: `${stageInfo.color}dd`
                }
              }}
            >
              {expandedGuardrails.length === stageInfo.guardrails.length ? 'Collapse All' : 'Expand All'}
            </Button>
          </Box>

          <Box css={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {stageInfo.guardrails.map((guardrail, index) => (
              <Card 
                key={index}
                id={`guardrail-${index}`}
                shadow 
                css={{ 
                  padding: '2rem',
                  border: `1px solid ${stageInfo.color}20`,
                  transition: 'all 0.3s ease',
                  animation: `${fadeIn} 0.5s ease-out forwards`,
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                  '&:hover': {
                    borderColor: stageInfo.color,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 12px 24px ${stageInfo.color}20`
                  }
                }}
              >
                <Box 
                  css={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => toggleGuardrail(index)}
                >
                  <Box css={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <H2 css={{ 
                      color: stageInfo.color,
                      margin: 0
                    }}>
                      {guardrail.name}
                    </H2>
                    <Tag 
                      css={{
                        background: `${getRiskLevelColor(guardrail.riskLevel)}20`,
                        color: getRiskLevelColor(guardrail.riskLevel),
                        border: `1px solid ${getRiskLevelColor(guardrail.riskLevel)}40`,
                        fontWeight: 600
                      }}
                    >
                      {guardrail.riskLevel} Risk
                    </Tag>
                  </Box>
                  <Button 
                    variant="text"
                    iconAfter={expandedGuardrails.includes(index) ? 'chevronUp' : 'chevronDown'}
                    css={{
                      color: stageInfo.color
                    }}
                  >
                    {expandedGuardrails.includes(index) ? 'Collapse' : 'Expand'}
                  </Button>
                </Box>
                
                {expandedGuardrails.includes(index) && (
                  // ... rest of the guardrail content ...
                  // Keep the existing content structure for risks, controls, and principles
                  <Box css={{ 
                    marginTop: '1rem',
                    animation: `${fadeIn} 0.3s ease-out`
                  }}>
                    <Box css={{ 
                      marginTop: '1rem',
                      '& > *': {
                        animation: `${slideIn} 0.5s ease-out forwards`,
                        opacity: 0
                      }
                    }}>
                      <Text 
                        weight="bold"
                        css={{ 
                          color: '#4A5568',
                          marginBottom: '0.5rem'
                        }}
                      >
                        Associated Risks:
                      </Text>
                      <Box 
                        as="ul" 
                        css={{ 
                          listStyleType: 'none',
                          padding: 0,
                          margin: 0,
                          marginBottom: '2rem',
                          '& > li': {
                            animationDelay: '0.2s',
                            '&:hover': {
                              animation: `${pulse} 1s ease-in-out infinite`
                            }
                          }
                        }}
                      >
                        {guardrail.risks.map((risk, riskIndex) => (
                          <Box
                            key={riskIndex}
                            as="li"
                            css={{
                              padding: '0.75rem',
                              marginBottom: '0.5rem',
                              background: `${stageInfo.color}10`,
                              borderLeft: `3px solid ${stageInfo.color}`,
                              borderRadius: '4px',
                              fontSize: '0.95rem',
                              lineHeight: '1.5',
                              color: '#4A5568',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                background: `${stageInfo.color}20`,
                                transform: 'translateX(5px)'
                              }
                            }}
                          >
                            {risk}
                          </Box>
                        ))}
                      </Box>

                      <Text 
                        weight="bold"
                        css={{ 
                          color: '#4A5568',
                          marginBottom: '1rem'
                        }}
                      >
                        Control Measures:
                      </Text>
                      <Box 
                        as="ul" 
                        css={{ 
                          listStyleType: 'none',
                          padding: 0,
                          margin: 0
                        }}
                      >
                        {guardrail.controls.map((control, controlIndex) => (
                          <Box
                            key={controlIndex}
                            as="li"
                            css={{
                              padding: '0.75rem',
                              marginBottom: '0.5rem',
                              background: '#F7FAFC',
                              borderLeft: `3px solid ${stageInfo.color}`,
                              borderRadius: '4px',
                              fontSize: '0.95rem',
                              lineHeight: '1.5',
                              color: '#4A5568',
                              cursor: control.toLowerCase().includes('dashboard') ? 'pointer' : 'default',
                              transition: 'all 0.3s ease',
                              '&:hover': control.toLowerCase().includes('dashboard') ? {
                                background: '#EDF2F7',
                                transform: 'translateX(5px)'
                              } : {}
                            }}
                            onClick={() => {
                              if (control.toLowerCase().includes('dashboard')) {
                                handleDashboardClick();
                              }
                            }}
                          >
                            {control}
                            {control.toLowerCase().includes('dashboard') && (
                              <span css={{ 
                                marginLeft: '0.5rem',
                                color: stageInfo.color,
                                fontSize: '0.8rem'
                              }}>
                                (Click to view dashboard)
                              </span>
                            )}
                          </Box>
                        ))}
                      </Box>

                      <Text 
                        weight="bold"
                        css={{ 
                          color: '#4A5568',
                          marginBottom: '1rem',
                          marginTop: '2rem'
                        }}
                      >
                        AI Principles Applied:
                      </Text>
                      <Box 
                        css={{ 
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                          '& > *': {
                            animationDelay: '0.4s',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.05)'
                            }
                          }
                        }}
                      >
                        {guardrail.principles.map((principle, principleIndex) => (
                          <Tag
                            key={principleIndex}
                            css={{
                              background: `${stageInfo.color}15`,
                              color: stageInfo.color,
                              border: `1px solid ${stageInfo.color}30`,
                              fontWeight: 500,
                              padding: '0.5rem 1rem',
                              borderRadius: '1rem'
                            }}
                          >
                            {principle}
                          </Tag>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                )}
              </Card>
            ))}
          </Box>
        </PageContent>
      </Box>
      {id === 'design' && (
        <VirtualAssistant 
          guardrails={stageInfo.guardrails}
          stageColor={stageInfo.color}
        />
      )}
    </AppLayout>
  );
};

export default StagePage;
