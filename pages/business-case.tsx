import { useState, useEffect } from 'react';
import { AppLayout } from '../components/AppLayout';
import { PageContent } from '@ag.ds-next/react/content';
import { DocumentTitle } from '../components/DocumentTitle';
import { Box } from '@ag.ds-next/react/box';
import { H1, H2 } from '@ag.ds-next/react/heading';
// Remove TextArea import
import { Select } from '@ag.ds-next/react/select';
import { Button } from '@ag.ds-next/react/button';
import { Card } from '@ag.ds-next/react/card';
import { Text } from '@ag.ds-next/react/text';
import { guardrailData } from '../data/guardrails';
import { useRouter } from 'next/router';
import { Modal } from '@ag.ds-next/react/modal';
import { Tag } from '@ag.ds-next/react/tags';

interface BusinessCasePageProps {} // Add empty props interface

const BusinessCasePage: React.FC<BusinessCasePageProps> = () => {
  const router = useRouter();
  const [businessCase, setBusinessCase] = useState('');
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [showMorePrompt, setShowMorePrompt] = useState(false);

  const handleStageSelect = (stage: string) => {
    setSelectedStages(prev => 
      prev.includes(stage) 
        ? prev.filter(s => s !== stage)
        : [...prev, stage]
    );
  };

  const handleSubmit = () => {
    if (businessCase.length >= 50 && selectedStages.length > 0) {
      console.log('Opening modal with stages:', selectedStages);
      setShowRiskModal(true);
    }
  };

  // Debugging helper
  useEffect(() => {
    console.log('Selected stages:', selectedStages);
  }, [selectedStages]);

  const handleContinue = () => {
    setShowRiskModal(false);
    setShowMorePrompt(true);
  };

  const handleMoreInfo = () => {
    router.push('/assessment');
  };

  const handleSkip = () => {
    router.push('/assessment');
  };

  return (
    <AppLayout>
      <DocumentTitle title="Business Case Review" />
      <PageContent>
        <Box css={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          <H1>Business Case Review</H1>
          
          <Card css={{ padding: '2rem', marginTop: '2rem' }}>
            <Box css={{ marginBottom: '2rem' }}>
              {/* Replace TextArea with styled textarea */}
              <Box css={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Text as="label" htmlFor="business-case">Describe your AI business case</Text>
                <textarea
                  id="business-case"
                  value={businessCase}
                  onChange={e => setBusinessCase(e.target.value.slice(0, 200))}
                  maxLength={200}
                  required
                  css={{
                    width: '100%',
                    minHeight: '120px',
                    padding: '0.75rem',
                    borderRadius: '4px',
                    border: '2px solid #E2E8F0',
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                    resize: 'vertical',
                    '&:focus': {
                      outline: 'none',
                      borderColor: '#4299E1',
                      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)'
                    }
                  }}
                />
                <Text css={{ color: businessCase.length < 50 ? '#C53030' : '#718096', fontSize: '0.875rem' }}>
                  {businessCase.length}/200 characters - Minimum 50 characters required
                </Text>
              </Box>
            </Box>

            <Box css={{ marginBottom: '2rem' }}>
              <Text weight="bold" css={{ marginBottom: '1rem' }}>Select relevant stages:</Text>
              <Box css={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {Object.entries(guardrailData).map(([stage, data]) => (
                  <Button
                    key={stage}
                    variant={selectedStages.includes(stage) ? 'primary' : 'secondary'}
                    onClick={() => handleStageSelect(stage)}
                  >
                    {data.title}
                  </Button>
                ))}
              </Box>
            </Box>

            <Button 
              onClick={handleSubmit}
              disabled={businessCase.length < 50 || selectedStages.length === 0}
            >
              Review Risks ({selectedStages.length} stages selected)
            </Button>
          </Card>

          {/* Risk Review Modal */}
          <Modal
            isOpen={showRiskModal}
            onClose={() => setShowRiskModal(false)}
            title="Risk Consideration"
            css={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000,
              '.modalContent': {
                maxWidth: '800px',
                width: '90vw',
                maxHeight: '90vh',
                overflowY: 'auto',
                background: 'white',
                position: 'relative',
                zIndex: 1001,
                margin: '2rem auto',
                padding: '2rem',
                borderRadius: '8px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <Box css={{ maxWidth: '800px' }}>
              <H2>Before proceeding, consider these risks:</H2>
              
              {selectedStages.map(stage => {
                const stageData = guardrailData[stage];
                return (
                  <Card key={stage} css={{ marginBottom: '1rem', padding: '1.5rem' }}>
                    <H2 css={{ color: stageData.color, marginBottom: '1rem' }}>
                      {stageData.title} Stage
                    </H2>
                    
                    {stageData.guardrails.map((guardrail, index) => (
                      <Box key={index} css={{ marginBottom: '1.5rem' }}>
                        <Box css={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                          <Text weight="bold">{guardrail.name}</Text>
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
                        <ul css={{ marginLeft: '1.5rem' }}>
                          {guardrail.risks.map((risk, rIndex) => (
                            <li key={rIndex} css={{ marginBottom: '0.5rem' }}>{risk}</li>
                          ))}
                        </ul>
                      </Box>
                    ))}
                  </Card>
                );
              })}

              <Box css={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                <Button variant="secondary" onClick={() => setShowRiskModal(false)}>
                  Review Again
                </Button>
                <Button onClick={handleContinue}>
                  Continue
                </Button>
              </Box>
            </Box>
          </Modal>

          {/* More Information Prompt Modal */}
          <Modal
            isOpen={showMorePrompt}
            onClose={() => setShowMorePrompt(false)}
            title="Explore More Stages"
          >
            <Box css={{ maxWidth: '500px', padding: '1rem' }}>
              <Text css={{ marginBottom: '2rem' }}>
                Would you like to explore risks and controls for other stages of AI development?
              </Text>
              <Box css={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <Button variant="secondary" onClick={handleSkip}>
                  Skip
                </Button>
                <Button onClick={handleMoreInfo}>
                  Show More Information
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </PageContent>
    </AppLayout>
  );
};

// Make it clear this is a React component export
const Page: React.FC<BusinessCasePageProps> = BusinessCasePage;
export default Page;