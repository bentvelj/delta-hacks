import { Button, theme } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';

interface CaseToggleProps {
  casegradient: boolean;
  onTogglerClick: () => void;
}

export const CaseToggle: React.FC<CaseToggleProps> = ({
  casegradient,
  onTogglerClick,
}) => {
  return (
    <StyledCaseToggler
      colorScheme={theme.colors.red[200]}
      onClick={onTogglerClick}
      casegradient={casegradient}
    >
      {!casegradient ? 'Toggle Case Gradient' : 'Revert Toggle'}
    </StyledCaseToggler>
  );
};

const StyledCaseToggler = styled(Button)<CaseToggleProps>`
  background-color: ${({ casegradient }) =>
    !casegradient ? theme.colors.red[300] : theme.colors.red[500]};
`;
