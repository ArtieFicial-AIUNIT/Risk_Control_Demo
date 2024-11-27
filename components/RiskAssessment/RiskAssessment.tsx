import { useState, useMemo } from 'react';
import { Box } from '@ag.ds-next/react/box';
import { H2, H3 } from '@ag.ds-next/react/heading';
import { Text } from '@ag.ds-next/react/text';
import { Button } from '@ag.ds-next/react/button';
import { Card } from '@ag.ds-next/react/card';
import { Select } from '@ag.ds-next/react/select';
import { Tag } from '@ag.ds-next/react/tags';
import { Checkbox } from '@ag.ds-next/react/checkbox';
import { guardrailData } from '../../data/guardrails';
import { Modal } from '@ag.ds-next/react/modal';

interface RiskScore {
  stage: string;
  guardrail: string;
  isConsidered: boolean;
  allRisks: string[];
  riskLevel: string;
  suggestedControls: string[];
}

export const RiskAssessment = () => {
  const [currentStage, setCurrentStage] = useState<string>(Object.keys(guardrailData)[0]);
  const [scores, setScores] = useState<RiskScore[]>([]);
  const [checkedGuardrails, setCheckedGuardrails] = useState<Record<string, boolean>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentStageData = guardrailData[currentStage as keyof typeof guardrailData];

  const handleGuardrailCheck = (guardrailName: string, checked: boolean) => {
    setCheckedGuardrails(prev => ({
      ...prev,
      [`${currentStage}-${guardrailName}`]: checked
    }));
  };

  const calculateStageScore = () => {
    // Before calculating new scores, remove any existing scores for the current stage
    setScores(prevScores => {
      // First filter out previous scores for this stage
      const otherStageScores = prevScores.filter(score => score.stage !== currentStage);
      
      // Calculate new scores for current stage
      const stageScores: RiskScore[] = currentStageData.guardrails.map(guardrail => {
        const key = `${currentStage}-${guardrail.name}`;
        return {
          stage: currentStage,
          guardrail: guardrail.name,
          riskLevel: guardrail.riskLevel,
          isConsidered: checkedGuardrails[key] || false,
          allRisks: guardrail.risks,
          suggestedControls: guardrail.controls
        };
      });

      // Combine with other stage scores
      return [...otherStageScores, ...stageScores];
    });
  };

  const isAssessmentComplete = useMemo(() => {
    return currentStage === Object.keys(guardrailData)[Object.keys(guardrailData).length - 1];
  }, [currentStage]);

  const handleNext = () => {
    calculateStageScore();
    const stages = Object.keys(guardrailData);
    const currentIndex = stages.indexOf(currentStage);
    if (currentIndex < stages.length - 1) {
      setCurrentStage(stages[currentIndex + 1]);
    } else {
      // Show modal summary when completing the last stage
      setIsModalOpen(true);
    }
  };

  const handlePrevious = () => {
    const stages = Object.keys(guardrailData);
    const currentIndex = stages.indexOf(currentStage);
    if (currentIndex > 0) {
      setCurrentStage(stages[currentIndex - 1]);
    }
  };

  // Replace Progress component with this custom progress bar
  const ProgressBar = ({ value }: { value: number }) => (
    <Box css={{ 
      width: '100%', 
      height: '8px', 
      background: '#E2E8F0',
      borderRadius: '4px',
      overflow: 'hidden'
    }}>
      <Box css={{
        width: `${value}%`,
        height: '100%',
        background: '#4C51BF',
        transition: 'width 0.3s ease'
      }} />
    </Box>
  );

  const generateSummaryText = () => {
    let summaryText = 'AI Risk Assessment Summary\n\n';
    
    // Add Statistics
    summaryText += `Overall Statistics:\n`;
    summaryText += `Total Guardrails: ${scores.length}\n`;
    summaryText += `Implemented: ${scores.filter(s => s.isConsidered).length}\n`;
    summaryText += `Needs Review: ${scores.filter(s => !s.isConsidered).length}\n\n`;

    // Add Stage-wise Summary
    Object.entries(guardrailData).forEach(([stage, data]) => {
      const stageScores = scores.filter(s => s.stage === stage);
      if (stageScores.length > 0) {
        summaryText += `\n${data.title} Stage:\n`;
        summaryText += `Implemented: ${stageScores.filter(s => s.isConsidered).length}/${stageScores.length}\n`;
        
        stageScores.forEach(score => {
          summaryText += `\n${score.guardrail}\n`;
          summaryText += `Risk Level: ${score.riskLevel}\n`;
          summaryText += `Status: ${score.isConsidered ? 'Implemented' : 'Needs Review'}\n`;
          summaryText += `Associated Risks:\n${score.allRisks.map(risk => `- ${risk}`).join('\n')}\n`;
          summaryText += `Recommended Controls:\n${score.suggestedControls.map(control => `- ${control}`).join('\n')}\n`;
        });
        summaryText += '\n---\n';
      }
    });

    return summaryText;
  };

  const downloadSummary = () => {
    const summaryText = generateSummaryText();
    const blob = new Blob([summaryText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AI-Risk-Assessment-Summary.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const Summary = () => (
    <Box id="risk-summary" css={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Modern Stats Cards */}
      <Box css={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {[
          {
            label: 'Total Guardrails',
            value: scores.length,
            color: '#4C51BF',
            icon: '🎯'
          },
          {
            label: 'Implemented',
            value: scores.filter(s => s.isConsidered).length,
            color: '#2F855A',
            icon: '✅'
          },
          {
            label: 'Needs Review',
            value: scores.filter(s => !s.isConsidered).length,
            color: '#C53030',
            icon: '⚠️'
          }
        ].map(stat => (
          <Card key={stat.label} css={{ 
            padding: '1.5rem',
            textAlign: 'center',
            background: `${stat.color}08`,
            border: `1px solid ${stat.color}20`,
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: `0 8px 16px ${stat.color}20`
            }
          }}>
            <Text css={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</Text>
            <Text css={{ color: stat.color, fontSize: '2rem', fontWeight: 'bold' }}>
              {stat.value}
            </Text>
            <Text css={{ color: '#4A5568', fontSize: '0.9rem' }}>{stat.label}</Text>
          </Card>
        ))}
      </Box>

      {/* Stage-wise Summary */}
      <Box css={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {Object.entries(guardrailData).map(([stage, data]) => {
          const stageScores = scores.filter(s => s.stage === stage);
          if (stageScores.length === 0) return null;

          return (
            <Card key={stage} css={{ 
              padding: '1.5rem',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <Box css={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem',
                borderBottom: `2px solid ${data.color}20`,
                paddingBottom: '1rem'
              }}>
                <H3 css={{ 
                  color: data.color,
                  margin: 0,
                  fontSize: '1.25rem'
                }}>
                  {data.title} Stage
                </H3>
                <Tag css={{
                  background: `${data.color}20`,
                  color: data.color
                }}>
                  {stageScores.filter(s => s.isConsidered).length}/{stageScores.length} Implemented
                </Tag>
                <Button
                  variant="text"
                  onClick={() => {
                    setCurrentStage(stage);
                    setShowSummary(false);
                    setIsModalOpen(false); // Add this line to close the modal
                  }}
                >
                  Edit
                </Button>
              </Box>

              <Box css={{ display: 'grid', gap: '1rem' }}>
                {stageScores.map((score, index) => (
                  <Box key={index} css={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    background: '#F7FAFC',
                    borderRadius: '8px',
                    gap: '1rem'
                  }}>
                    <Box css={{ flex: 1 }}>
                      <Text weight="bold">{score.guardrail}</Text>
                    </Box>
                    <Box css={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Tag css={{
                        background: score.riskLevel === 'High' ? '#FED7D7' 
                          : score.riskLevel === 'Medium' ? '#FEEBC8' 
                          : '#C6F6D5',
                        color: score.riskLevel === 'High' ? '#C53030'
                          : score.riskLevel === 'Medium' ? '#C05621'
                          : '#2F855A'
                      }}>
                        {score.riskLevel}
                      </Tag>
                      <Tag css={{
                        background: score.isConsidered ? '#C6F6D5' : '#FED7D7',
                        color: score.isConsidered ? '#2F855A' : '#C53030'
                      }}>
                        {score.isConsidered ? '✓ Done' : '⚠️ Review'}
                      </Tag>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Card>
          );
        })}
      </Box>
    </Box>
  );

  return (
    <Box css={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      {!showSummary ? (
        <>
          {/* Assessment Section */}
          <Box css={{ marginBottom: '2rem', textAlign: 'center' }}>
            <H2>AI Risk Assessment Wizard</H2>
            <Text>Check the guardrails you have considered in your AI system</Text>
            <Box css={{ marginTop: '1rem' }}>
              <ProgressBar 
                value={(Object.keys(guardrailData).indexOf(currentStage) + 1) / Object.keys(guardrailData).length * 100}
              />
            </Box>
          </Box>

          {/* Stage Selection */}
          <Box css={{ marginBottom: '2rem' }}>
            <Select
              label="Select Stage"
              value={currentStage}
              onChange={e => setCurrentStage(e.target.value)}
              options={Object.entries(guardrailData).map(([key, data]) => ({
                label: data.title,
                value: key
              }))}
            />
          </Box>

          {/* Risk Assessment Checkboxes */}
          <Box css={{ marginBottom: '2rem' }}>
            {currentStageData.guardrails.map((guardrail, gIndex) => (
              <Card key={gIndex} css={{ marginBottom: '1rem', padding: '1.5rem' }}>
                <Box css={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Guardrail Header */}
                  <Box css={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    borderBottom: '1px solid #E2E8F0',
                    paddingBottom: '1rem'
                  }}>
                    <Box css={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <H3 css={{ 
                        margin: 0, 
                        color: currentStageData.color,
                        fontSize: '1.25rem'
                      }}>
                        {guardrail.name}
                      </H3>
                      <Text css={{ fontSize: '0.875rem', color: '#718096' }}>
                        Review and implement the recommended controls
                      </Text>
                    </Box>
                    <Tag css={{
                      background: guardrail.riskLevel === 'High' ? '#FED7D7' 
                        : guardrail.riskLevel === 'Medium' ? '#FEEBC8' 
                        : '#C6F6D5',
                      color: guardrail.riskLevel === 'High' ? '#C53030'
                        : guardrail.riskLevel === 'Medium' ? '#C05621'
                        : '#2F855A'
                    }}>
                      {guardrail.riskLevel} Risk
                    </Tag>
                  </Box>

                  {/* Two Column Layout for Risks and Controls */}
                  <Box css={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr',
                    gap: '2rem',
                    '@media (max-width: 768px)': {
                      gridTemplateColumns: '1fr'
                    }
                  }}>
                    {/* Risks Column */}
                    <Box css={{ color: '#4A5568' }}>
                      <Text weight="bold" css={{ marginBottom: '0.75rem' }}>Associated Risks:</Text>
                      <ul css={{ 
                        marginTop: '0.5rem',
                        paddingLeft: '1.5rem'
                      }}>
                        {guardrail.risks.map((risk, rIndex) => (
                          <li key={rIndex} css={{ marginBottom: '0.75rem' }}>{risk}</li>
                        ))}
                      </ul>
                    </Box>

                    {/* Controls Column */}
                    <Box css={{ color: '#4A5568' }}>
                      <Text weight="bold" css={{ marginBottom: '0.75rem' }}>Recommended Controls:</Text>
                      <ul css={{ 
                        marginTop: '0.5rem',
                        paddingLeft: '1.5rem',
                        listStyleType: 'none'
                      }}>
                        {guardrail.controls.map((control, cIndex) => (
                          <li key={cIndex} css={{ 
                            marginBottom: '0.75rem',
                            paddingLeft: '1.5rem',
                            position: 'relative',
                            '&::before': {
                              content: '"✓"',
                              position: 'absolute',
                              left: '-0.5rem',
                              color: currentStageData.color,
                              fontWeight: 'bold'
                            }
                          }}>
                            {control}
                          </li>
                        ))}
                      </ul>
                    </Box>
                  </Box>

                  {/* Consideration Checkbox */}
                  <Box css={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    background: '#F7FAFC',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginTop: '1rem',
                    borderLeft: `4px solid ${currentStageData.color}`
                  }}>
                    <Checkbox
                      checked={checkedGuardrails[`${currentStage}-${guardrail.name}`] || false}
                      onChange={e => handleGuardrailCheck(guardrail.name, e.target.checked)}
                      label="I have reviewed the risks and will implement the recommended controls"
                    />
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>

          {/* Navigation Buttons */}
          <Box css={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '2rem',
            gap: '1rem'
          }}>
            <Button onClick={handlePrevious} disabled={currentStage === Object.keys(guardrailData)[0]}>
              Previous Stage
            </Button>
            <Button onClick={handleNext}>
              {isAssessmentComplete 
                ? 'Complete Assessment and View Summary' 
                : 'Next Stage'}
            </Button>
          </Box>
        </>
      ) : (
        /* Summary View */
        <Box>
          <Box css={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '2rem' 
          }}>
            <H2>Risk Assessment Summary Report</H2>
            <Button 
              variant="secondary"
              onClick={() => {
                // Reset to first stage when returning to assessment
                setCurrentStage(Object.keys(guardrailData)[0]);
                setShowSummary(false);
              }}
            >
              Start New Assessment
            </Button>
          </Box>

          {/* Quick Stats */}
          <Box css={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                label: 'Total Guardrails',
                value: scores.length,
                color: '#4C51BF'
              },
              {
                label: 'Implemented',
                value: scores.filter(s => s.isConsidered).length,
                color: '#2F855A'
              },
              {
                label: 'Needs Review',
                value: scores.filter(s => !s.isConsidered).length,
                color: '#C53030'
              }
            ].map(stat => (
              <Card key={stat.label} css={{ padding: '1rem', textAlign: 'center' }}>
                <Text css={{ color: stat.color, fontSize: '2rem', fontWeight: 'bold' }}>
                  {stat.value}
                </Text>
                <Text>{stat.label}</Text>
              </Card>
            ))}
          </Box>

          {/* Grouped by Stage */}
          {Object.entries(guardrailData).map(([stage, data]) => {
            const stageScores = scores.filter(s => s.stage === stage);
            if (stageScores.length === 0) return null;

            return (
              <Box key={stage} css={{ marginBottom: '2rem' }}>
                <H3 css={{ color: data.color, marginBottom: '1rem' }}>{data.title} Stage</H3>
                <Box css={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {stageScores.map((score, index) => (
                    <Card key={index} css={{ 
                      padding: '1rem',
                      borderLeft: `4px solid ${score.isConsidered ? '#68D391' : '#FC8181'}`
                    }}>
                      <Box css={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <Text weight="bold">{score.guardrail}</Text>
                        <Tag css={{
                          background: score.riskLevel === 'High' ? '#FED7D7' 
                            : score.riskLevel === 'Medium' ? '#FEEBC8' 
                            : '#C6F6D5',
                          color: score.riskLevel === 'High' ? '#C53030'
                            : score.riskLevel === 'Medium' ? '#C05621'
                            : '#2F855A'
                        }}>
                          {score.riskLevel} Risk
                        </Tag>
                        <Tag css={{
                          background: score.isConsidered ? '#C6F6D5' : '#FED7D7',
                          color: score.isConsidered ? '#2F855A' : '#C53030'
                        }}>
                          {score.isConsidered ? 'Implemented' : 'Needs Review'}
                        </Tag>
                      </Box>
                    </Card>
                  ))}
                </Box>
              </Box>
            );
          })}
        </Box>
      )}

      {/* Summary Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          <Box css={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            width: '100%'
          }}>
            <Text weight="bold" fontSize="xl">Risk Assessment Summary</Text>
            <Box css={{ display: 'flex', gap: '1rem' }}>
              <Button
                variant="secondary"
                onClick={downloadSummary}
                iconBefore="download"
              >
                Download Summary
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setIsModalOpen(false);
                  setCurrentStage(Object.keys(guardrailData)[0]);
                  setScores([]);
                  setCheckedGuardrails({});
                }}
              >
                New Assessment
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>Close</Button>
            </Box>
          </Box>
        }
        css={{
          '.modalContent': {
            maxWidth: '1200px',
            width: '90vw',
            maxHeight: '90vh',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#F7FAFC',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#CBD5E0',
              borderRadius: '4px',
              '&:hover': {
                background: '#A0AEC0'
              }
            }
          }
        }}
      >
        <Summary />
      </Modal>
    </Box>
  );
};
