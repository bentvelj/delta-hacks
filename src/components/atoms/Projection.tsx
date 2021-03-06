import React from 'react';
import ReactDOM from 'react-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import styled from 'styled-components';
import theme from '../../theme';
import { ProvinceMarkers } from './ProvinceMarkers';

// url to a valid topojson file
const geoUrl =
  'https://gist.githubusercontent.com/Brideau/2391df60938462571ca9/raw/f5a1f3b47ff671eaf2fb7e7b798bacfc6962606a/canadaprov.json';

interface ProjectionProps {}

export const Projection: React.FC<ProjectionProps> = ({}) => {
  return (
    <StyledProjectionContainer className="projection">
      <ComposableMap projection="geoAlbers" className="composible">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              // console.log(geo);
              return (
                <StyledProvince
                  key={geo.rsmKey}
                  geography={geo}
                  stroke={theme.colors.gray[300]}
                  strokeWidth="0.5px"
                  fill={theme.colors.gray[800]}
                  preserveAspectRatio="xMidYMid meet"
                  onMouseEnter={() => displayAnnotation(geo)}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </StyledProjectionContainer>
  );
};

function displayAnnotation(geo: any) {
  <ProvinceMarkers
    name={geo.properties.gn_name}
    population={100}
    cases={46}
  ></ProvinceMarkers>;
}

const StyledProjectionContainer = styled.div`
  display: flex;
  justify-content: center;
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
