import { PageContent } from '@ag.ds-next/react/content'; 
import { Box } from '@ag.ds-next/react/box';
import { Text } from '@ag.ds-next/react/text';
import { H1, H2 } from '@ag.ds-next/react/heading';
import { AppLayout } from '../AppLayout';
import { keyframes } from '@emotion/react';
import { useRouter } from 'next/router';
import { guardrailData } from '../../data/guardrails';
import { useState, useMemo } from 'react';
import { Select } from '@ag.ds-next/react/select';
import { Card } from '@ag.ds-next/react/card';
import { Tag } from '@ag.ds-next/react/tags';  // Add this import
import { Button } from '@ag.ds-next/react/button'; // Add this import

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const highlightText = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const countUp = keyframes`
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const rotateIn = keyframes`
  from { transform: rotateX(30deg) translateY(30px); opacity: 0; }
  to { transform: rotateX(0) translateY(0); opacity: 1; }
`;

const glowPulse = keyframes`
  0% { box-shadow: 0 0 5px rgba(66, 153, 225, 0.2); }
  50% { box-shadow: 0 0 20px rgba(66, 153, 225, 0.4); }
  100% { box-shadow: 0 0 5px rgba(66, 153, 225, 0.2); }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const rippleAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(66, 153, 225, 0.2); }
  70% { box-shadow: 0 0 0 10px rgba(66, 153, 225, 0); }
  100% { box-shadow: 0 0 0 0 rgba(66, 153, 225, 0); }
`;

export const HomePage = () => {
  const router = useRouter();
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>('all');  // Fixed syntax error
  const [selectedGuardrail, setSelectedGuardrail] = useState<string>('all');

  // Get unique guardrail names across all stages
  const guardrailOptions = useMemo(() => {
    const guardrails = new Set<string>();
    Object.values(guardrailData).forEach(stageData => {
      stageData.guardrails.forEach(guardrail => {
        guardrails.add(guardrail.name);
      });
    });
    return Array.from(guardrails).sort();
  }, []);

  const riskStats = useMemo(() => {
    let totalRisks = 0;
    let highRisks = 0;
    let mediumRisks = 0;
    let lowRisks = 0;
    
    Object.entries(guardrailData).forEach(([_, stageData]) => {
      stageData.guardrails.forEach(guardrail => {
        totalRisks += guardrail.risks.length;
        if (guardrail.riskLevel === 'High') highRisks += guardrail.risks.length;
        if (guardrail.riskLevel === 'Medium') mediumRisks += guardrail.risks.length;
        if (guardrail.riskLevel === 'Low') lowRisks += guardrail.risks.length;
      });
    });

    return { totalRisks, highRisks, mediumRisks, lowRisks };
  }, []);

  const filteredRisks = useMemo(() => {
    let risks: Array<{ stage: string; level: string; risk: string; guardrail: string; }> = [];
    
    Object.entries(guardrailData).forEach(([stageName, stageData]) => {
      if (selectedStage === 'all' || selectedStage === stageName) {
        stageData.guardrails.forEach(guardrail => {
          if ((selectedRiskLevel === 'all' || selectedRiskLevel === guardrail.riskLevel) &&
              (selectedGuardrail === 'all' || selectedGuardrail === guardrail.name)) {
            guardrail.risks.forEach(risk => {
              risks.push({
                stage: stageName,
                level: guardrail.riskLevel,
                risk: risk,
                guardrail: guardrail.name
              });
            });
          }
        });
      }
    });

    return risks;
  }, [selectedStage, selectedRiskLevel, selectedGuardrail]);

  return (
    <AppLayout>
      {/* Introduction Section */}
      <Box css={{ 
        background: 'linear-gradient(135deg, #f6f8fa 0%, #ffffff 100%)',
        padding: '6rem 2rem',
        borderBottom: '1px solid #E2E8F0',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 30%, rgba(147, 197, 253, 0.15) 0%, transparent 50%)',
          zIndex: 0
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 80% 70%, rgba(199, 210, 254, 0.15) 0%, transparent 50%)',
          zIndex: 0
        }
      }}>
        <PageContent>
          <Box css={{
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1
          }}>
            <Box css={{
              marginBottom: '3rem',
              position: 'relative'
            }}>
              <H1 css={{
                fontSize: ['2.5rem', '3.5rem', '4rem'],
                fontWeight: '800',
                marginBottom: '3rem',
                position: 'relative',
                paddingBottom: '2rem'
              }}>
                <span css={{
                  background: 'linear-gradient(120deg, #1a365d 0%, #4C51BF 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    animation: `${shimmer} 3s linear infinite`,
                  }
                }}>
                  Navigate AI Development with Confidence
                </span>
                <span css={{
                  display: 'block',
                  position: 'absolute',
                  bottom: '-1rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  animation: `${float} 3s ease-in-out infinite`,
                  fontSize: '2rem',
                  WebkitTextFillColor: 'initial'
                }}>
                  🎯
                </span>
              </H1>
            </Box>

            <Box css={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              position: 'relative',
              padding: '2rem',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '10%',
                right: '10%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent)'
              }
            }}>
              <Text 
                as="p" 
                fontSize="xl"
                css={{
                  color: '#2D3748',
                  lineHeight: '1.8',
                  fontWeight: '500',
                  animation: `${fadeIn} 1s ease-out forwards`,
                  opacity: 0,
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                Our AI Risk and Control Framework provides a structured approach to developing safe, 
                ethical, and reliable AI solutions. From initial design to deployment and monitoring, 
                we guide you through each critical stage.
              </Text>
              <Text 
                as="p"
                css={{
                  color: '#4A5568',
                  lineHeight: '1.8',
                  animation: `${fadeIn} 1s ease-out forwards`,
                  opacity: 0,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-1rem',
                    left: '35%',
                    right: '35%',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent)'
                  }
                }}
              >
                Follow our comprehensive 8-stage process to ensure your AI development 
                journey adheres to best practices and risk management principles.
              </Text>
            </Box>
            <Box css={{ marginTop: '2rem' }}>
              <Button
                size="large"
                onClick={() => router.push('/business-case')}
                css={{
                  background: 'linear-gradient(135deg, #4C51BF 0%, #1a365d 100%)',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Start Your AI Risk Review
              </Button>
            </Box>
          </Box>
        </PageContent>
      </Box>

      {/* Enhanced Dashboard Section */}
      <Box css={{
        background: 'linear-gradient(135deg, #1a365d05 0%, #ffffff 100%)',
        padding: '4rem 2rem',
        borderBottom: '1px solid #E2E8F0',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%234299E1" fill-opacity="0.03" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E%3C/svg%3E")',
        }
      }}>
        <PageContent>
          <Box css={{
            textAlign: 'center',
            marginBottom: '4rem',
            animation: `${rotateIn} 0.8s ease-out`
          }}>
            <H2 css={{
              background: 'linear-gradient(120deg, #1a365d 0%, #4C51BF 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '2.5rem',
              marginBottom: '1rem'
            }}>
              Risk Analytics Dashboard
            </H2>
            <Text css={{ color: '#4A5568', maxWidth: '600px', margin: '0 auto' }}>
              Comprehensive overview of AI development risks across all stages
            </Text>
          </Box>

          {/* Enhanced Statistics Cards */}
          <Box css={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            marginBottom: '3rem',
            perspective: '1000px'
          }}>
            {[
              { label: 'Total Risks', value: riskStats.totalRisks, color: '#4299E1', icon: '📊' },
              { label: 'High Risks', value: riskStats.highRisks, color: '#F56565', icon: '⚠️' },
              { label: 'Medium Risks', value: riskStats.mediumRisks, color: '#ED8936', icon: '⚡' },
              { label: 'Low Risks', value: riskStats.lowRisks, color: '#48BB78', icon: '✓' }
            ].map((stat) => (
              <Card key={stat.label} css={{
                padding: '2rem',
                textAlign: 'center',
                animation: `${fadeIn} 0.5s ease-out forwards`,  // Changed from rotateIn to simpler fadeIn
                opacity: 0,
                background: `linear-gradient(165deg, white, ${stat.color}08)`,
                border: `1px solid ${stat.color}20`,
                borderRadius: '16px',
                position: 'relative',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',  // Simplified hover effect
                  boxShadow: `0 12px 24px ${stat.color}30`,
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                  borderRadius: '16px 16px 0 0'
                }
              }}>
                <Text css={{ 
                  fontSize: '2rem',
                  marginBottom: '0.5rem',
                  filter: 'opacity(0.8)'
                }}>
                  {stat.icon}
                </Text>
                <Text css={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '700',
                  color: stat.color,
                  textShadow: `0 2px 10px ${stat.color}40`
                }}>
                  {stat.value}
                </Text>
                <Text css={{ 
                  color: '#4A5568',
                  fontWeight: '500',
                  fontSize: '0.9rem',
                  marginTop: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {stat.label}
                </Text>
              </Card>
            ))}
          </Box>

          {/* Enhanced Filters */}
          <Box css={{
            background: 'white',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            marginBottom: '2rem',
            animation: `${fadeIn} 0.5s ease-out`,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            {[
              {
                label: "Filter by Stage",
                value: selectedStage,
                onChange: setSelectedStage,
                options: [
                  { label: 'All Stages', value: 'all' },
                  ...Object.keys(guardrailData).map(stage => ({
                    label: stage.charAt(0).toUpperCase() + stage.slice(1),
                    value: stage
                  }))
                ]
              },
              {
                label: "Filter by Risk Level",
                value: selectedRiskLevel,
                onChange: setSelectedRiskLevel,
                options: [
                  { label: 'All Levels', value: 'all' },
                  { label: 'High', value: 'High' },
                  { label: 'Medium', value: 'Medium' },
                  { label: 'Low', value: 'Low' }
                ]
              },
              {
                label: "Filter by Guardrail",
                value: selectedGuardrail,
                onChange: setSelectedGuardrail,
                options: [
                  { label: 'All Guardrails', value: 'all' },
                  ...guardrailOptions.map(guardrail => ({
                    label: guardrail,
                    value: guardrail
                  }))
                ]
              }
            ].map((filter) => (
              <Box key={filter.label} css={{ 
                flex: '1',
                minWidth: '250px',
                position: 'relative'
              }}>
                <Select
                  label={filter.label}
                  value={filter.value}
                  onChange={e => filter.onChange(e.target.value)}
                  options={filter.options}
                  css={{
                    '& select': {
                      border: '2px solid #E2E8F0',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: '#4299E1',
                      },
                      '&:focus': {
                        borderColor: '#4299E1',
                        boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)'
                      }
                    }
                  }}
                />
              </Box>
            ))}
          </Box>

          {/* Modern Risk Analytics View */}
          <div css={{
            background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
            borderRadius: '24px',
            padding: '2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            animation: `${fadeIn} 0.5s ease-out`,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '100%',
              background: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%234299E1\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
            }
          }}>
            {/* Risk Summary Pills */}
            <div css={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}>
              {['High', 'Medium', 'Low'].map(level => {
                const count = filteredRisks.filter(r => r.level === level).length;
                const colors = {
                  High: { bg: '#FFF5F5', border: '#FED7D7', text: '#C53030' },
                  Medium: { bg: '#FFFAF0', border: '#FEEBC8', text: '#C05621' },
                  Low: { bg: '#F0FFF4', border: '#C6F6D5', text: '#2F855A' }
                };
                return (
                  <div
                    key={level}
                    css={{
                      padding: '0.75rem 1.5rem',
                      background: colors[level].bg,
                      borderRadius: '999px',
                      border: `1px solid ${colors[level].border}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      animation: `${floatAnimation} 3s ease-in-out infinite`,
                      animationDelay: `${['High', 'Medium', 'Low'].indexOf(level) * 0.2}s`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: `0 5px 15px ${colors[level].border}50`
                      }
                    }}
                  >
                    <span css={{ 
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: colors[level].text,
                      animation: `${rippleAnimation} 2s infinite`
                    }} />
                    <span css={{ 
                      color: colors[level].text,
                      fontWeight: '600',
                      fontSize: '0.875rem'
                    }}>
                      {level}: {count}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Risk Items */}
            <div css={{
              display: 'grid',
              gap: '1.5rem',
              maxHeight: '600px',
              overflowY: 'auto',
              padding: '0.5rem',
              position: 'relative',
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#F7FAFC',
                borderRadius: '2px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#CBD5E0',
                borderRadius: '2px',
                '&:hover': {
                  background: '#A0AEC0'
                }
              }
            }}>
              {filteredRisks.map((risk, index) => {
                const riskColors = {
                  High: { gradient: 'linear-gradient(135deg, #FEB2B2, #FC8181)', shadow: '#FC818150' },
                  Medium: { gradient: 'linear-gradient(135deg, #FEEBC8, #F6AD55)', shadow: '#F6AD5550' },
                  Low: { gradient: 'linear-gradient(135deg, #C6F6D5, #68D391)', shadow: '#68D39150' }
                };
                
                return (
                  <div
                    key={index}
                    css={{
                      position: 'relative',
                      padding: '1.5rem',
                      background: 'white',
                      borderRadius: '16px',
                      animation: `${slideUp} 0.3s ease-out forwards ${index * 0.05}s`,
                      opacity: 0,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: `0 10px 20px ${riskColors[risk.level as keyof typeof riskColors].shadow}`,
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '4px',
                        background: riskColors[risk.level as keyof typeof riskColors].gradient,
                        borderRadius: '16px 16px 0 0'
                      }
                    }}
                  >
                    <div css={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <p css={{
                        margin: 0,
                        fontSize: '1.1rem',
                        fontWeight: '500',
                        color: '#2D3748',
                        lineHeight: '1.5'
                      }}>
                        {risk.risk}
                      </p>
                      <span css={{
                        padding: '0.35rem 1rem',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        background: riskColors[risk.level as keyof typeof riskColors].gradient,
                        color: 'white',
                        whiteSpace: 'nowrap'
                      }}>
                        {risk.level}
                      </span>
                    </div>

                    <div css={{
                      display: 'flex',
                      gap: '0.75rem',
                      flexWrap: 'wrap'
                    }}>
                      <span css={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        background: 'rgba(66, 153, 225, 0.1)',
                        color: '#2B6CB0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#2B6CB0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 17L12 22L22 17" stroke="#2B6CB0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 12L12 17L22 12" stroke="#2B6CB0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {risk.stage}
                      </span>
                      <span css={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        background: 'rgba(113, 128, 150, 0.1)',
                        color: '#4A5568',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 6V12L16 14" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {risk.guardrail}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </PageContent>
      </Box>
    </AppLayout>
  );
};

export default HomePage;
