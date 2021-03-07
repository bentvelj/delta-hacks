import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import { Text } from '@chakra-ui/react';

interface LegendProps {}

export const Legend: React.FC<LegendProps> = ({}) => {
  return (
    <StyledOuterBox>
      <StyledInnerBox>
        <StyledTitle>Daily Covid Cases as a % of Total Population</StyledTitle>
        <hr
          style={{
            color: 'red',
            backgroundColor: 'black',
            height: 3,
          }}
        />
        <StyledMidBox>
          <StyledWordBox>
            <StyledText>More than 0.04</StyledText>
            <br />
            <StyledText>Value of 0</StyledText>
          </StyledWordBox>

          <svg width="20" height="80">
            <rect width="20" height="80" />
          </svg>
        </StyledMidBox>
      </StyledInnerBox>
    </StyledOuterBox>
  );
};

const StyledInnerBox = styled.div`
  height: 80%;
  width: 90%;
  justify-content: center;
`;

const StyledOuterBox = styled.div`
  display: flex;
  width: 150px;
  min-height: 100px;
  justify-content: center;
  align-items; center;
  border-weight:3px;
  border-style: dotted;
  background-color: white;
  color: black;
`;

const StyledWordBox = styled.div`
  width: 60%;
`;

const StyledTitle = styled(Text)`
  font-weight: bold;
  font-size: 12px;
`;

const StyledText = styled(Text)`
  font-size: 12px;
  display: inline;
`;
const StyledMidBox = styled.div`
  display: flex;
`;
