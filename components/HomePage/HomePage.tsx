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

interface RiskControl {
  stage: string;
  guardrails: string[];
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
      'Identifying affected stakeholders',
      'Measures of intended outcomes',
      'User experience requirements',
      'Ethics assessment',
      'Design principles documentation',
      'Impact assessment',
      'Technical feasibility analysis'
    ],
    risks: ['Unclear requirements', 'Poor design choices', 'Stakeholder misalignment'],
    riskLevel: 'High',
    controls: ['Design reviews', 'Stakeholder sign-off', 'Impact validation'],
    ethicsPrinciples: ['Fairness', 'Transparency', 'Human-centered design']
  },
  {
    stage: 'Data',
    guardrails: [
      'Data quality metrics',
      'Privacy impact assessment',
      'Data lineage tracking',
      'Bias detection methods',
      'Data governance framework',
      'Data security standards',
      'Consent management'
    ],
    risks: ['Biased data', 'Data privacy breaches', 'Poor data quality'],
    riskLevel: 'High',
    controls: ['Data validation', 'Privacy controls', 'Quality monitoring'],
    ethicsPrinciples: ['Privacy', 'Security', 'Fairness']
  },
  {
    stage: 'Training',
    guardrails: [
      'Model performance metrics',
      'Training validation criteria',
      'Resource utilization limits',
      'Bias monitoring tools',
      'Version control requirements',
      'Training data verification',
      'Model explainability measures'
    ],
    risks: ['Overfitting', 'Model bias', 'Poor convergence'],
    riskLevel: 'High',
    controls: ['Cross-validation', 'Regular model evaluation'],
    ethicsPrinciples: ['Fairness', 'Accountability']
  },
  {
    stage: 'Test',
    guardrails: [
      'Test coverage requirements',
      'Performance benchmarks',
      'Edge case identification',
      'Security testing criteria',
      'User acceptance testing',
      'Integration test specs',
      'Load testing thresholds'
    ],
    risks: ['Insufficient testing', 'Edge case failures'],
    riskLevel: 'Medium',
    controls: ['Automated testing', 'Manual validation'],
    ethicsPrinciples: ['Reliability', 'Safety']
  },
  {
    stage: 'Integrate',
    guardrails: [
      'System compatibility checks',
      'API compliance standards',
      'Performance requirements',
      'Error handling protocols',
      'Data flow validation',
      'Security integration checks',
      'Scalability assessment'
    ],
    risks: ['Integration failures', 'System conflicts'],
    riskLevel: 'Medium',
    controls: ['Integration testing', 'System monitoring'],
    ethicsPrinciples: ['Reliability', 'Interoperability']
  },
  {
    stage: 'Deploy',
    guardrails: [
      'Deployment checklist',
      'Rollback procedures',
      'Performance monitoring setup',
      'Security configurations',
      'High availability requirements',
      'Disaster recovery plan',
      'Documentation requirements'
    ],
    risks: ['Service disruption', 'Performance issues'],
    riskLevel: 'High',
    controls: ['Staged rollout', 'Performance monitoring'],
    ethicsPrinciples: ['Reliability', 'Safety']
  },
  {
    stage: 'Monitor',
    guardrails: [
      'Performance SLAs',
      'Alert thresholds',
      'Monitoring coverage',
      'Incident response procedures',
      'Regular audits schedule',
      'Feedback collection',
      'Compliance monitoring'
    ],
    risks: ['Performance degradation', 'Undetected issues'],
    riskLevel: 'Medium',
    controls: ['Continuous monitoring', 'Incident response'],
    ethicsPrinciples: ['Accountability', 'Transparency']
  },
  {
    stage: 'Decommission',
    guardrails: [
      'Data retention requirements',
      'Service transition plan',
      'User notification process',
      'Data disposal procedures',
      'System dependencies check',
      'Archive requirements',
      'Compliance documentation'
    ],
    risks: ['Data loss', 'Service interruption'],
    riskLevel: 'Medium',
    controls: ['Backup procedures', 'Transition plan'],
    ethicsPrinciples: ['Security', 'Privacy']
  }
];

export const HomePage = () => {
  const [guardrailStatus, setGuardrailStatus] = useState<GuardrailStatus>(() => {
    // Initialize all guardrails as unchecked
    const status: GuardrailStatus = {};
    stages.forEach(stage => {
      status[stage.stage] = {};
      stage.guardrails.forEach(guard => {
        status[stage.stage][guard] = false;
      });
    });
    return status;
  });

  const getStageCompletion = (stage: string) => {
    const guardrails = guardrailStatus[stage];
    const total = Object.keys(guardrails).length;
    const completed = Object.values(guardrails).filter(Boolean).length;
    return (completed / total) * 100;
  };

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'High': return '#ff4040';
      case 'Medium': return '#ffa500';
      case 'Low': return '#4caf50';
      default: return 'inherit';
    }
  };

  const getStageColor = (stageName: string) => {
    return stageColors[stageName as keyof typeof stageColors] || '#64748b';
  };

  const handleGuardrailToggle = (stage: string, guard: string) => {
    setGuardrailStatus(prev => ({
      ...prev,
      [stage]: {
        ...prev[stage],
        [guard]: !prev[stage][guard]
      }
    }));
  };

  return (
    <AppLayout>
      <PageContent>
        <Stack gap={3}>
          <Stack gap={1}>
            <H1>AI Risk Management Dashboard</H1>
            <Text as="p" color="muted">
              Track and manage AI system guardrails across different development stages
            </Text>
          </Stack>
          
          {/* Risk Overview Section */}
          <Card shadow padding={2}>
            <Stack gap={2}>
              <Text as="h2" fontSize="xl" fontWeight="bold">Overall Risk Status</Text>
              <Columns cols={{ xs: 1, sm: 2, md: 4 }} gap={2}>
                {stages.map((stage) => (
                  <Card 
                    key={stage.stage} 
                    shadow 
                    background="shade"
                    css={{
                      borderLeft: `4px solid ${getStageColor(stage.stage)}`,
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

          {/* Detailed Stage Cards */}
          <Columns cols={{ xs: 1, sm: 2, md: 3 }} gap={2}>
            {stages.map((stage) => (
              <Card 
                key={stage.stage} 
                shadow 
                padding={2}
                css={{
                  borderTop: `4px solid ${getStageColor(stage.stage)}`,
                }}
              >
                <Stack gap={2}>
                  <Stack gap={1}>
                    <Text as="h2" fontSize="xl" fontWeight="bold" css={{ color: getStageColor(stage.stage) }}>
                      {stage.stage}
                    </Text>
                    <div css={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      backgroundColor: getRiskColor(stage.riskLevel),
                      color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: 'bold'
                    }}>
                      {stage.riskLevel} Risk
                    </div>
                  </Stack>

                  <Divider />

                  {/* Guardrails Section */}
                  <Stack gap={1}>
                    <Text fontWeight="bold" color="muted">Guardrails</Text>
                    <Card background="shade" padding={1.5}>
                      <Stack gap={1}>
                        {stage.guardrails.map((guard, idx) => (
                          <Fragment key={guard}>
                            {idx > 0 && <Divider />}
                            <Checkbox
                              checked={guardrailStatus[stage.stage][guard]}
                              onChange={() => handleGuardrailToggle(stage.stage, guard)}
                              label={guard}
                              css={{
                                '& label': {
                                  fontSize: '0.875rem',
                                }
                              }}
                            />
                          </Fragment>
                        ))}
                      </Stack>
                    </Card>
                    <Text fontSize="sm" color="muted" css={{ textAlign: 'right' }}>
                      {Object.values(guardrailStatus[stage.stage]).filter(Boolean).length} of {stage.guardrails.length} complete
                    </Text>
                  </Stack>

                  <Divider />

                  {/* Controls and Ethics */}
                  <Stack gap={2}>
                    <Stack gap={1}>
                      <Text fontWeight="bold" color="muted">Controls</Text>
                      <Card background="shade" padding={1}>
                        {stage.controls.map((control) => (
                          <Text key={control} fontSize="sm">• {control}</Text>
                        ))}
                      </Card>
                    </Stack>

                    <Stack gap={1}>
                      <Text fontWeight="bold" color="muted">Ethics Principles</Text>
                      <Card background="shade" padding={1}>
                        {stage.ethicsPrinciples.map((principle) => (
                          <Text key={principle} fontSize="sm">• {principle}</Text>
                        ))}
                      </Card>
                    </Stack>
                  </Stack>

                  <DirectionLink 
                    direction="right"
                    href="#"
                    onClick={(e) => { e.preventDefault(); }}
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
