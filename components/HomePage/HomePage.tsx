import { PageContent } from '@ag.ds-next/react/content';
import { Stack } from '@ag.ds-next/react/stack';
import { Card } from '@ag.ds-next/react/card';
import { Text } from '@ag.ds-next/react/text';
import { H1 } from '@ag.ds-next/react/heading';
import { Columns } from '@ag.ds-next/react/columns';
import { Checkbox } from '@ag.ds-next/react/checkbox';
import { DirectionLink } from '@ag.ds-next/react/direction-link';
import { Divider } from '@ag.ds-next/react/divider';
import { Fragment } from 'react';
import { useState } from 'react';
import { AppLayout } from '../AppLayout';

type RiskLevel = 'High' | 'Medium' | 'Low';

interface GuardrailItem {
  title: string;
  description: string;
  riskLevel: RiskLevel;
}

interface RiskControl {
  stage: string;
  guardrails: GuardrailItem[];
  risks: string[];
  riskLevel: RiskLevel;
  controls: string[];
  ethicsPrinciples: string[];
}

interface GuardrailStatus {
  [key: string]: {
    [key: string]: boolean;
  };
}

const stageColors = {
  Design: '#6366f1', // Indigo
  Data: '#06b6d4', // Cyan
  Training: '#8b5cf6', // Purple
  Test: '#10b981', // Emerald
  Integrate: '#f59e0b', // Amber
  Deploy: '#ef4444', // Red
  Monitor: '#3b82f6', // Blue
  Decommission: '#64748b', // Slate
};

const stages: RiskControl[] = [
  {
    stage: 'Design',
    guardrails: [
      {
        title: 'Identifying Affected Stakeholders',
        description: 'Comprehensive stakeholder mapping and impact assessment to understand system effects on all user groups',
        riskLevel: 'High'
      },
      {
        title: 'Measures of Intended Outcome',
        description: 'Clear definition and measurement framework for desired system outcomes and success criteria',
        riskLevel: 'Medium'
      },
      {
        title: 'User Experience',
        description: 'Design principles and requirements focused on user-centric interaction and accessibility standards',
        riskLevel: 'Low'
      }
    ],
    risks: ['Unclear requirements', 'Poor design choices', 'Stakeholder misalignment'],
    riskLevel: 'High',
    controls: ['Design reviews', 'Stakeholder sign-off', 'Impact validation'],
    ethicsPrinciples: ['Fairness', 'Transparency', 'Human-centered design']
  },
  {
    stage: 'Data',
    guardrails: [
      {
        title: 'Bias Detection and Mitigation',
        description: 'Systematic approach to identify and address potential biases in data collection and processing',
        riskLevel: 'High'
      },
      {
        title: 'Data Orchestration and Management',
        description: 'Framework for data governance, quality control, and lifecycle management',
        riskLevel: 'Medium'
      },
      {
        title: 'Indigenous Data Considerations',
        description: 'Specific protocols for handling indigenous data with cultural sensitivity and appropriate governance',
        riskLevel: 'Low'
      }
    ],
    risks: ['Biased data', 'Data privacy breaches', 'Poor data quality'],
    riskLevel: 'High',
    controls: ['Data validation', 'Privacy controls', 'Quality monitoring'],
    ethicsPrinciples: ['Privacy', 'Security', 'Fairness']
  },
  {
    stage: 'Training',
    guardrails: [
      {
        title: 'Training Methodology and Human-in-the-Loop',
        description: 'Integration of human oversight and intervention in model training processes',
        riskLevel: 'High'
      },
      {
        title: 'Bias Detection During Training',
        description: 'Continuous monitoring and correction of biases emerging during model training',
        riskLevel: 'Medium'
      },
      {
        title: 'Techniques and Learning Types',
        description: 'Selection and validation of appropriate learning approaches and model architectures',
        riskLevel: 'Low'
      }
    ],
    risks: ['Overfitting', 'Model bias', 'Poor convergence'],
    riskLevel: 'High',
    controls: ['Cross-validation', 'Regular model evaluation'],
    ethicsPrinciples: ['Fairness', 'Accountability']
  },
  {
    stage: 'Test',
    guardrails: [
      {
        title: 'Usability Testing and Stakeholder Engagement',
        description: 'Comprehensive testing with actual users and stakeholders for feedback',
        riskLevel: 'High'
      },
      {
        title: 'Performance Against Intended Impact',
        description: 'Evaluation of system effectiveness in achieving intended outcomes',
        riskLevel: 'Medium'
      },
      {
        title: 'Measuring Effectiveness and Unintended Consequences',
        description: 'Assessment of both positive and negative system impacts',
        riskLevel: 'Low'
      }
    ],
    risks: ['Insufficient testing', 'Edge case failures'],
    riskLevel: 'Medium',
    controls: ['Automated testing', 'Manual validation'],
    ethicsPrinciples: ['Reliability', 'Safety']
  },
  {
    stage: 'Integrate',
    guardrails: [
      {
        title: 'API Development',
        description: 'Design and implementation of secure, scalable API interfaces',
        riskLevel: 'High'
      },
      {
        title: 'Integration Testing',
        description: 'Comprehensive testing of system interactions and dependencies',
        riskLevel: 'Medium'
      },
      {
        title: 'Performance Testing',
        description: 'Evaluation of system performance under various load conditions',
        riskLevel: 'Low'
      }
    ],
    risks: ['Integration failures', 'System conflicts'],
    riskLevel: 'Medium',
    controls: ['Integration testing', 'System monitoring'],
    ethicsPrinciples: ['Reliability', 'Interoperability']
  },
  {
    stage: 'Deploy',
    guardrails: [
      {
        title: 'MLOps/LLMOps Practices',
        description: 'Implementation of operational best practices for model deployment',
        riskLevel: 'High'
      },
      {
        title: 'Rollouts',
        description: 'Controlled deployment process with monitoring and fallback mechanisms',
        riskLevel: 'Medium'
      },
      {
        title: 'Staging',
        description: 'Progressive deployment through development, staging, and production environments',
        riskLevel: 'Low'
      }
    ],
    risks: ['Service disruption', 'Performance issues'],
    riskLevel: 'High',
    controls: ['Staged rollout', 'Performance monitoring'],
    ethicsPrinciples: ['Reliability', 'Safety']
  },
  {
    stage: 'Monitor',
    guardrails: [
      {
        title: 'Capturing Staff and User Feedback',
        description: 'Systematic collection and analysis of feedback from all system users',
        riskLevel: 'High'
      },
      {
        title: 'Automated and Manual Feedback Loops',
        description: 'Implementation of monitoring systems with human oversight',
        riskLevel: 'Medium'
      },
      {
        title: 'Model Drift and Trigger Interventions',
        description: 'Detection and response to changes in model performance',
        riskLevel: 'Low'
      }
    ],
    risks: ['Performance degradation', 'Undetected issues'],
    riskLevel: 'Medium',
    controls: ['Continuous monitoring', 'Incident response'],
    ethicsPrinciples: ['Accountability', 'Transparency']
  },
  {
    stage: 'Decommission',
    guardrails: [
      {
        title: 'Secure Decommissioning',
        description: 'Implementation of secure shutdown procedures and data handling protocols to ensure sensitive information is properly protected',
        riskLevel: 'High'
      },
      {
        title: 'Documentation and Handover',
        description: 'Complete transfer of system documentation, operational history, and knowledge to relevant stakeholders',
        riskLevel: 'Medium'
      },
      {
        title: 'Final Compliance Review',
        description: 'Comprehensive verification of regulatory compliance and completion of all decommissioning requirements',
        riskLevel: 'High'
      }
    ],
    risks: ['Data loss', 'Service interruption'],
    riskLevel: 'Medium',
    controls: ['Backup procedures', 'Transition plan'],
    ethicsPrinciples: ['Security', 'Privacy']
  }
];

const fadeIn = {
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(10px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  }
};

const pulse = {
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(1)' }
  }
};

const shimmer = {
  '@keyframes shimmer': {
    '0%': { backgroundPosition: '-1000px 0' },
    '100%': { backgroundPosition: '1000px 0' }
  }
};

const slideIn = {
  '@keyframes slideIn': {
    from: { transform: 'translateX(-20px)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 }
  }
};

const progressLine = {
  '@keyframes progressLine': {
    from: { width: 0 },
    to: { width: '100%' }
  }
};

interface RiskJourneyMapProps {
  stages: RiskControl[];
  getStageColor: (stage: string) => string;
  getRiskColor: (level: RiskLevel) => string;
}

const RiskJourneyMap: React.FC<RiskJourneyMapProps> = ({ stages, getStageColor, getRiskColor }) => (
  <Card shadow padding={3} css={{ 
    backgroundColor: 'rgba(255,255,255,0.95)',
    marginBottom: '2rem',
    overflow: 'hidden'
  }}>
    <Text as="h2" fontSize="xl" fontWeight="bold" css={{ marginBottom: '2rem' }}>
      Risk Journey Map
    </Text>
    <div css={{
      position: 'relative',
      padding: '2rem 0',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: '2px',
        backgroundColor: '#e5e7eb',
        animation: 'progressLine 2s ease-out forwards',
        ...progressLine
      }
    }}>
      <div css={{
        display: 'grid',
        gridTemplateColumns: `repeat(${stages.length}, 1fr)`,
        gap: '1rem',
        position: 'relative',
        zIndex: 1
      }}>
        {stages.map((stage, index) => (
          <div key={stage.stage} css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
            ...slideIn
          }}>
            {/* Stage Node */}
            <div css={{
              width: '3rem',
              height: '3rem',
              borderRadius: '50%',
              backgroundColor: 'white',
              border: `3px solid ${getStageColor(stage.stage)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }
            }}>
              <Text fontSize="sm" fontWeight="bold" css={{ color: getStageColor(stage.stage) }}>
                {index + 1}
              </Text>
              
              {/* Hover Card */}
              <div css={{
                position: 'absolute',
                top: '120%',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                width: '200px',
                opacity: 0,
                visibility: 'hidden',
                transition: 'all 0.3s ease',
                zIndex: 10,
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  border: '8px solid transparent',
                  borderBottomColor: 'white'
                },
                '&:hover': {
                  opacity: 1,
                  visibility: 'visible',
                  transform: 'translateX(-50%) translateY(0)'
                }
              }}>
                <Stack gap={1}>
                  <Text fontWeight="bold" css={{ color: getStageColor(stage.stage) }}>
                    {stage.stage}
                  </Text>
                  <Divider />
                  <Text fontSize="xs">Risks: {stage.risks.join(', ')}</Text>
                  <Text fontSize="xs">Ethics: {stage.ethicsPrinciples.join(', ')}</Text>
                </Stack>
              </div>
            </div>
            
            {/* Stage Label */}
            <Text fontSize="sm" fontWeight="bold" css={{ 
              color: getStageColor(stage.stage),
              textAlign: 'center'
            }}>
              {stage.stage}
            </Text>
          </div>
        ))}
      </div>
    </div>
  </Card>
);

export const HomePage = () => {
  const [guardrailStatus, setGuardrailStatus] = useState<GuardrailStatus>(() => {
    // Initialize all guardrails as unchecked
    const status: GuardrailStatus = {};
    stages.forEach(stage => {
      status[stage.stage] = {};
      stage.guardrails.forEach(guard => {
        status[stage.stage][guard.title] = false;
      });
    });
    return status;
  });

  const getStageColor = (stage: string) => stageColors[stage] || '#000';
  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'High':
        return '#ef4444'; // Red
      case 'Medium':
        return '#f59e0b'; // Amber
      case 'Low':
        return '#10b981'; // Green
      default:
        return '#000';
    }
  };

  const handleGuardrailToggle = (stage: string, guard: GuardrailItem) => {
    setGuardrailStatus(prevStatus => ({
      ...prevStatus,
      [stage]: {
        ...prevStatus[stage],
        [guard.title]: !prevStatus[stage][guard.title]
      }
    }));
  };

  const getStageCompletion = (stage: string) => {
    const guardrails = stages.find(s => s.stage === stage)?.guardrails || [];
    const completed = guardrails.filter(guard => guardrailStatus[stage][guard.title]).length;
    return (completed / guardrails.length) * 100;
  };

  return (
    <AppLayout>
      <PageContent css={{
        background: 'linear-gradient(135deg, #f6f8ff 0%, #ffffff 100%)',
        animation: 'fadeIn 0.6s ease-out',
        ...fadeIn
      }}>
        <Stack gap={3}>
          {/* Existing header section */}
          
          {/* Add Journey Map here */}
          <RiskJourneyMap 
            stages={stages}
            getStageColor={getStageColor}
            getRiskColor={getRiskColor}
          />
          
          {/* Enhanced Header Section */}
          <Stack gap={1.5} css={{ 
            maxWidth: '800px', 
            margin: '0 auto 2rem',
            animation: 'fadeIn 0.8s ease-out',
            textAlign: 'center'
          }}>
            <H1 css={{ 
              backgroundImage: 'linear-gradient(45deg, #2563eb, #7c3aed)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: '2.5rem'
            }}>
              AI Risk Management Dashboard
            </H1>
            <Text as="p" color="muted" css={{ 
              fontSize: '1.1rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Track and manage AI system guardrails across different development stages
            </Text>
          </Stack>
          
          {/* Enhanced Risk Overview Section */}
          <Card shadow padding={3} css={{ 
            backgroundColor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            animation: 'fadeIn 1s ease-out',
          }}>
            <Stack gap={2}>
              <Text as="h2" fontSize="xl" fontWeight="bold" css={{ marginBottom: '1rem' }}>Overall Risk Status</Text>
              <Columns cols={{ xs: 1, sm: 2, md: 4 }} gap={2}>
                {stages.map((stage) => (
                  <Card 
                    key={stage.stage} 
                    shadow 
                    background="shade"
                    css={{
                      borderLeft: `4px solid ${getStageColor(stage.stage)}`,
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    <Stack gap={1} padding={1}>
                      <Text fontWeight="bold">{stage.stage}</Text>
                      <Stack gap={0.5}>
                        <progress 
                          value={getStageCompletion(stage.stage)}
                          max="100"
                          css={{
                            width: '100%',
                            height: '8px',
                            '::-webkit-progress-bar': {
                              backgroundColor: '#e0e0e0',
                              borderRadius: '4px',
                            },
                            '::-webkit-progress-value': {
                              backgroundColor: getStageColor(stage.stage),
                              borderRadius: '4px',
                              transition: 'width 0.3s ease-in-out',
                            }
                          }}
                        />
                        <Text fontSize="sm" color="muted">
                          {Math.round(getStageCompletion(stage.stage))}% Complete
                        </Text>
                      </Stack>
                    </Stack>
                  </Card>
                ))}
              </Columns>
            </Stack>
          </Card>

          {/* Enhanced Detailed Stage Cards */}
          <Columns cols={{ xs: 1, sm: 2, md: 3 }} gap={3} css={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            alignItems: 'start',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr'
            }
          }}>
            {stages.map((stage) => (
              <Card 
                key={stage.stage} 
                shadow 
                padding={2}
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  borderTop: `4px solid ${getStageColor(stage.stage)}`,
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <Stack gap={2} css={{ height: '100%', justifyContent: 'space-between' }}>
                  {/* Enhanced Stage Header */}
                  <Stack gap={1}>
                    <Text as="h2" fontSize="xl" fontWeight="bold" 
                      css={{ 
                        color: getStageColor(stage.stage),
                        fontSize: '1.4rem',
                        marginBottom: '0.5rem'
                      }}
                    >
                      {stage.stage}
                    </Text>
                  </Stack>

                  <Divider css={{ margin: '0.5rem 0' }} />

                  {/* Enhanced Guardrails Section with better spacing */}
                  <Stack gap={1.5} css={{ flex: 1 }}>
                    <Text fontWeight="bold" color="muted" css={{ marginBottom: '0.5rem' }}>
                      Guardrails
                    </Text>
                    <Card background="shade" padding={2} css={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem'
                    }}>
                      <Stack gap={2}>
                        {stage.guardrails.map((guard, idx) => (
                          <Fragment key={guard.title}>
                            {idx > 0 && <Divider css={{ margin: '0.75rem 0' }} />}
                            <Stack gap={1} css={{ 
                              padding: '0.5rem',
                              borderRadius: '4px',
                              transition: 'background-color 0.2s ease',
                              '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.02)'
                              }
                            }}>
                              <Stack gap={0.5} css={{ marginBottom: '0.5rem' }}>
                                <div css={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}>
                                  <Text css={{ 
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    color: getStageColor(stage.stage),
                                  }}>
                                    {guard.title}
                                  </Text>
                                  <div css={{
                                    padding: '0.15rem 0.5rem',
                                    borderRadius: '1rem',
                                    backgroundColor: getRiskColor(guard.riskLevel),
                                    color: 'white',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    animation: 'pulse 2s infinite',
                                    ...pulse
                                  }}>
                                    {guard.riskLevel}
                                  </div>
                                </div>
                                <Text css={{ 
                                  fontSize: '0.875rem',
                                  color: '#666',
                                  lineHeight: '1.5',
                                  letterSpacing: '0.01em'
                                }}>
                                  {guard.description}
                                </Text>
                              </Stack>
                              <Checkbox
                                checked={guardrailStatus[stage.stage][guard.title]}
                                onChange={() => handleGuardrailToggle(stage.stage, guard)}
                                label="Mark as complete"
                                css={{
                                  '& label': {
                                    fontSize: '0.875rem',
                                    color: '#666'
                                  },
                                  transition: 'all 0.2s ease',
                                  '&:checked + label': {
                                    transform: 'scale(1.05)',
                                    fontWeight: 'bold'
                                  }
                                }}
                              />
                            </Stack>
                          </Fragment>
                        ))}
                      </Stack>
                    </Card>
                    <Text fontSize="sm" color="muted" css={{ 
                      textAlign: 'right',
                      fontWeight: 'bold',
                      marginTop: '0.5rem'
                    }}>
                      {Object.values(guardrailStatus[stage.stage]).filter(Boolean).length} of {stage.guardrails.length} complete
                    </Text>
                  </Stack>

                  <Divider css={{ margin: '1rem 0' }} />

                  {/* Enhanced Controls and Ethics with better spacing */}
                  <Stack gap={2} css={{ marginTop: 'auto' }}>
                    <Stack gap={1}>
                      <Text fontWeight="bold" color="muted" css={{ marginBottom: '0.25rem' }}>
                        Controls
                      </Text>
                      <Card background="shade" padding={1.5} css={{ 
                        borderRadius: '8px',
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        gap: '0.5rem'
                      }}>
                        {stage.controls.map((control) => (
                          <Text key={control} fontSize="sm" css={{ 
                            padding: '0.3rem 0',
                            '&:before': {
                              content: '"•"',
                              color: getStageColor(stage.stage),
                              marginRight: '0.5rem',
                              fontWeight: 'bold'
                            }
                          }}>
                            {control}
                          </Text>
                        ))}
                      </Card>
                    </Stack>

                    <Stack gap={1}>
                      <Text fontWeight="bold" color="muted" css={{ marginBottom: '0.25rem' }}>
                        Ethics Principles
                      </Text>
                      <Card background="shade" padding={1.5} css={{ 
                        borderRadius: '8px',
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        gap: '0.5rem'
                      }}>
                        {stage.ethicsPrinciples.map((principle) => (
                          <Text key={principle} fontSize="sm" css={{ 
                            padding: '0.3rem 0',
                            '&:before': {
                              content: '"•"',
                              color: getStageColor(stage.stage),
                              marginRight: '0.5rem',
                              fontWeight: 'bold'
                            }
                          }}>
                            {principle}
                          </Text>
                        ))}
                      </Card>
                    </Stack>
                  </Stack>

                  {/* Enhanced Link positioning */}
                  <DirectionLink 
                    direction="right"
                    href="#"
                    onClick={(e) => { e.preventDefault(); }}
                    css={{
                      marginTop: '1rem',
                      alignSelf: 'flex-end',
                      color: getStageColor(stage.stage),
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                      position: 'relative',
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        width: '0',
                        height: '2px',
                        bottom: '-2px',
                        left: '0',
                        background: getStageColor(stage.stage),
                        transition: 'width 0.3s ease'
                      },
                      '&:hover:after': {
                        width: '100%'
                      }
                    }}
                  >
                    View Details
                  </DirectionLink>
                </Stack>
              </Card>
            ))}
          </Columns>
        </Stack>
      </PageContent>
    </AppLayout>
  );
};
