import { Link } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';

interface MenuItemProps {
  type: 'github' | 'docs';
}

export const MenuItem: React.FC<MenuItemProps> = ({ type }) => {
  let url = urlSwticher(type);

  return (
    <StyledLinkContainer>
      <StyledMenuItem href={url} target="_blank">
        {type}
      </StyledMenuItem>
    </StyledLinkContainer>
  );
};

const StyledLinkContainer = styled.div``;

const StyledMenuItem = styled(Link)`
  color: ${theme.colors.teal[100]};
  text-transform: capitalize;
`;

/**
 *
 */
const urlSwticher = (type: 'github' | 'docs') => {
  switch (type) {
    case 'github':
      return 'https://github.com/dimitritsampiras/delta-hacks';
    default:
      return 'https://github.com/dimitritsampiras/delta-hacks';
  }
};
