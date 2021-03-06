import React from 'react';
import ReactDOM from 'react-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import styled from 'styled-components';
import theme from '../../theme';
import { ProvinceMarkers } from './ProvinceMarkers';

// url to a valid topojson file
const geoUrl =
  'https://gist.githubusercontent.com/Brideau/2391df60938462571ca9/raw/f5a1f3b47ff671eaf2fb7e7b798bacfc6962606a/canadaprov.json';

interface ProjectionProps {
  onHover: (geo: any) => void;
}

export const Projection: React.FC<ProjectionProps> = ({onHover}) => {
  return (
    <StyledProjectionContainer className="div-projection">
      <StyledComposableMap
        projection="geoAlbers"
        className="svg-composible"
        // viewBox="0 0 500 500"
        projectionConfig={{ scale: 700, center: [-0.6, 58.7] }}
      >
        <StyledGeographies geography={geoUrl} className="g-geographies">
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
                  onMouseEnter={() => onHover(geo)}
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
  height: 600px;
  width: 900px;
  margin: 0;
  margin-right: -40px;
`;

const StyledComposableMap = styled(ComposableMap)`
  display: block;
`;

const StyledGeographies = styled(Geographies)``;

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
function updateAnnotation(geo: any) {
  <ProvinceMarkers
    name={geo.properties.gn_name}
    population={100}
    cases={46}
  ></ProvinceMarkers>;
}
