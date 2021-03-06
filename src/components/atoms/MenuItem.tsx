import { Link } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';

interface MenuItemProps {
  type: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({}) => {
  return (
    <StyledLinkContainer>
      <StyledMenuItem href="github.com">Github</StyledMenuItem>
    </StyledLinkContainer>
  );
};

const StyledLinkContainer = styled.div``;

const StyledMenuItem = styled(Link)`
  color: ${theme.colors.teal[100]};
`;
