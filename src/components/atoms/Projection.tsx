import React from 'react';
import ReactDOM from 'react-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import styled from 'styled-components';
import theme from '../../theme';
import { ButtonEvent } from '../../utils/types';

// url to a valid topojson file
const geoUrl =
  'https://gist.githubusercontent.com/Brideau/2391df60938462571ca9/raw/f5a1f3b47ff671eaf2fb7e7b798bacfc6962606a/canadaprov.json';

interface ProjectionProps {
  onHover: (event: ButtonEvent, geo: any) => void;
  province: string;
}

export const Projection: React.FC<ProjectionProps> = ({
  onHover,
  province = 'ontario',
}) => {
  return (
    <StyledProjectionContainer className="div-projection">
      <StyledComposableMap
        projection="geoAlbers"
        className="svg-composible"
        projectionConfig={{ scale: 700, center: [-0.6, 58.7] }}
      >
        <StyledGeographies geography={geoUrl} className="g-geographies">
          {({ geographies }) =>
            geographies.map((geo) => {
              return (
                <StyledProvince
                  province={province}
                  key={geo.rsmKey}
                  geography={geo}
                  stroke={theme.colors.gray[300]}
                  strokeWidth="0.5px"
                  fill={
                    province !== geo.properties.gn_name
                      ? theme.colors.gray[800]
                      : theme.colors.teal[600]
                  }
                  preserveAspectRatio="xMidYMid meet"
                  onClick={(event) => onHover(event, geo)}
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
  position: relative;
  height: 600px;
  width: 900px;
  margin: 0;

  @media (max-width: 1746px) {
    margin: -70px 0 -20px;
  }
`;

const StyledComposableMap = styled(ComposableMap)`
  display: block;
`;

const StyledGeographies = styled(Geographies)``;

const StyledProvince = styled(Geography)<{ province: string }>`
  :hover {
    cursor: pointer;
    fill: ${(props) =>
      props.geography.properties.gn_name.toLowerCase() !==
      props.province.toLowerCase()
        ? theme.colors.gray[700]
        : theme.colors.teal[500]};
  }

  :focus,
  :active {
    outline: none;
  }

  :active {
    fill: ${theme.colors.teal[600]};
  }
`;
