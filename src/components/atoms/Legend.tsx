import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import { Text } from '@chakra-ui/react';


export const Legend: React.FC = () => {
  return (
    <StyledOuterBox>
      <StyledInnerBox>
        <StyledTitle>Daily Covid Cases as a % of Total Population</StyledTitle>
        <StyledMidBox>
          <StyledWordBox>
            <div style={{ marginBottom: 80, padding: 10 }}>
              <StyledText>More than 0.4</StyledText>
            </div>
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
  border-color: 1px solid ${theme.colors.black};
  border-radius: 100px;
  width: 15px;
  height: 120px;
  background-image: linear-gradient(#63171b, #F56565, #fff5f5);
`;

const StyledInnerBox = styled.div`
  height: 80%;
  width: 100%;
  justify-content: center;
`;

const StyledOuterBox = styled.div`
  display: flex;
  width: 170px;
  /* min-height: 100px; */
  /* height: 180px; */
  justify-content: center;
  align-items: center;
  border-style: solid;
  background-color: ${theme.colors.gray[700]};
  color: ${theme.colors.white};
  border-radius: 20px;
`;

const StyledWordBox = styled.div`
  width: 80%;
`;

const StyledTitle = styled(Text)`
  font-weight: bold;
  font-size: 12px;
  padding: 10px;
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
  align-items: center;
  padding: 5px 0px;
`;
