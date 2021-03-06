import React, { useState } from 'react';
import styled from 'styled-components';
import { Projection } from '../atoms/Projection';
import { InfoContainer } from '../containers/InfoContainer';

interface MainProps {}

export const Main: React.FC<MainProps> = ({}) => {
  const [province, setProvince] = useState<string>('ontario');

  const handleHoverEvent = (geo: any) => {
    console.log(geo.properties.gn_name);
    setProvince(geo.properties.gn_name)
  };

  return (
    <StyledContainer>
      <InfoContainer province={province} />
      <Projection onHover={handleHoverEvent} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
