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
    <StyledProjectionContainer className="div-projection">
      <StyledComposableMap
        projection="geoAlbers"
        className="svg-composible"
        viewBox="0 0 500 500"
        // width={100}
        // height={100}
      >
        <StyledGeographies
          geography={geoUrl}
          className="g-geographies"
        >
          {({ geographies }) =>
            geographies.map((geo) => {
              return (
                <StyledProvince
                  key={geo.rsmKey}
                  geography={geo}
                  stroke={theme.colors.gray[300]}
                  strokeWidth="0.5px"
                  fill={theme.colors.gray[800]}
                  preserveAspectRatio="xMidYMid meet"
                  onClick={() => displayAnnotation(geo)}
                />
              );
            })
          }
        </StyledGeographies>
      </StyledComposableMap>
    </StyledProjectionContainer>
  );
};

const StyledProjectionContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 600px;
  width: 100%;
`;

const StyledComposableMap = styled(ComposableMap)`
  height: 100%;
  position: relative;
`;

const StyledGeographies = styled(Geographies)`
  max-width: 100%;
  max-height: 100%;
  display: block;
  position: absolute;
  top: 50%
`;

const StyledProvince = styled(Geography)`
  :hover {
    cursor: pointer;
    fill: ${theme.colors.gray[700]};
  }

  :focus,
  :active {
    outline: none;
  }

  :active {
    fill: ${theme.colors.teal[600]};
  }
`;

/**
 *
 */
function displayAnnotation(geo: any) {
  console.log(geo.properties.gn_name);
}
