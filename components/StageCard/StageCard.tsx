import { Box } from '@ag.ds-next/react/box';
import { Text } from '@ag.ds-next/react/text';
import { Button } from '@ag.ds-next/react/button';
import { keyframes } from '@emotion/react';

interface StageCardProps {
  title: string;
  description: string;
  color: string;
  onClick: () => void;
  number: number; // Add number prop
}

const floatEffect = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const pulseEffect = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shineGradient = keyframes`
  to {
    backgroundPosition: 200% center;
  }
`;

export const StageCard = ({ title, description, color, onClick, number }: StageCardProps) => {
  return (
    <Box
      css={{
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.4s ease',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 12px 24px ${color}30`,
          animation: `${floatEffect} 3s ease-in-out infinite`,
        }
      }}
      onClick={onClick}
    >
      <Box css={{ position: 'relative' }}>
        <Box 
          css={{
            height: '100px', // Reduced from 140px
            background: `linear-gradient(145deg, 
              ${color}ee, 
              ${color}dd 20%, 
              ${color}cc 40%,
              ${color}dd 60%,
              ${color}ee 80%)`,
            backgroundSize: '200% auto',
            animation: `${shineGradient} 4s linear infinite`,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background: `linear-gradient(145deg, 
                transparent 0%,
                rgba(255,255,255,0.1) 40%,
                rgba(255,255,255,0.2) 50%,
                rgba(255,255,255,0.1) 60%,
                transparent 100%)`,
              backgroundSize: '200% auto',
              animation: `${shineGradient} 3s linear infinite`,
              pointerEvents: 'none'
            }
          }} 
        >
          <Box
            css={{
              background: 'rgba(255,255,255,0.98)',
              borderRadius: '50%',
              width: '3rem', // Slightly reduced from 3.5rem
              height: '3rem', // Slightly reduced from 3.5rem
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 4px 12px ${color}40`,
              color: color,
              fontWeight: '800',
              fontSize: '1.5rem', // Slightly reduced from 1.75rem
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.15) rotate(5deg)',
                animation: `${pulseEffect} 2s ease-in-out infinite`,
                boxShadow: `0 6px 16px ${color}60`,
              }
            }}
          >
            {number}
          </Box>
        </Box>
      </Box>

      <Box css={{ 
        padding: '1.75rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(to bottom, white, #fafafa)'
      }}>
        <Text
          as="h3"
          fontSize="xl"
          css={{
            fontWeight: '700',
            color: color,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}
        >
          {title}
        </Text>
        
        <Text
          as="p"
          css={{
            fontSize: '0.925rem',
            lineHeight: '1.6',
            color: '#2D3748',
            marginBottom: '1.75rem',
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {description}
        </Text>

        <Button 
          onClick={(e) => { 
            e.stopPropagation(); 
            onClick(); 
          }}
          css={{
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: `0 4px 12px ${color}30`,
            }
          }}
        >
          Explore Stage
        </Button>
      </Box>
    </Box>
  );
};
