import React from 'react';
import ReactDOM from 'react-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import styled from 'styled-components';
import theme from '../../theme';

// url to a valid topojson file
const geoUrl =
  'https://gist.githubusercontent.com/Brideau/2391df60938462571ca9/raw/f5a1f3b47ff671eaf2fb7e7b798bacfc6962606a/canadaprov.json';

interface ProjectionProps {}

export const Projection: React.FC<ProjectionProps> = ({}) => {
  return (
    <StyledProjectionContainer className="projection">
      <ComposableMap
        projection="geoAlbers"
        projectionConfig={{ scale: 400, center: [-0.6, 38.7] }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) => {
            console.log('Geographies:', geographies);

            return geographies.map((geo) => {
              console.log("geo ->", geo);

              return (
                <Geography
                  className="here"
                  key={geo.rsmKey}
                  geography={geo}
                  stroke={theme.colors.gray[300]}
                  strokeWidth="0.5px"
                  fill="none"
                />
              );
            });
          }}
        </Geographies>
      </ComposableMap>
    </StyledProjectionContainer>
  );
};

const StyledProjectionContainer = styled.div`
  /* height: 1000px;
  display: flex;
  align-items: center; */
`;
