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
            <div style={{ marginBottom: 80 }}>
              <StyledText>More than 0.4</StyledText>
            </div>

            <StyledText>None</StyledText>
          </StyledWordBox>
          <StyledBar>
            <GradientBar></GradientBar>
          </StyledBar>
        </StyledMidBox>
      </StyledInnerBox>
    </StyledOuterBox>
  );
};

const GradientBar = styled.div`
  border-width: 2px;
  border-color: black;
  border-style: solid;
  width: 15px;
  height: 120px;
  background-image: linear-gradient(#63171b, #fff5f5);
`;

const StyledInnerBox = styled.div`
  height: 80%;
  width: 90%;
  justify-content: center;
`;

const StyledOuterBox = styled.div`
  display: flex;
  width: 110px;
  min-height: 100px;
  justify-content: center;
  align-items; center;
  border-width: 2px;
  border-color: black;
  border-style: solid;
  background-color: white;
  color: black;
`;

const StyledWordBox = styled.div`
  width: 80%;
`;

const StyledTitle = styled(Text)`
  font-weight: bold;
  font-size: 10px;
`;

const StyledText = styled(Text)`
  font-size: 10px;
  display: inline;
  line-height: 2em;
`;
const StyledMidBox = styled.div`
  display: flex;
`;
const StyledBar = styled.div`
width: 20%;
justify-content: center;
align-items; center;
padding 5px 0px;
`;
