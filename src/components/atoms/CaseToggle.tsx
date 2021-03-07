import { Button, theme } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';

interface CaseToggleProps {
  caseGradient: boolean;
  onTogglerClick: () => void;
}

export const CaseToggle: React.FC<CaseToggleProps> = ({
  caseGradient,
  onTogglerClick,
}) => {
  return (
    <StyledCaseToggler
      colorScheme={theme.colors.red[200]}
      onClick={onTogglerClick}
      caseGradient={caseGradient}
    >
      {!caseGradient ? 'Toggle Case Gradient' : 'Revert Toggle'}
    </StyledCaseToggler>
  );
};

const StyledCaseToggler = styled(Button)<CaseToggleProps>`
  background-color: ${({ caseGradient }) =>
    !caseGradient ? theme.colors.red[200] : 'white'};
`;
