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
  numberList: number[];
  caseGradient: boolean;
}

export const Projection: React.FC<ProjectionProps> = ({
  onHover,
  numberList,
  province = 'ontario',
  caseGradient,
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
            geographies.map((geo, i) => {
              // console.log(i);
              return (
                <StyledProvince
                  numberList={numberList}
                  caseGradient={caseGradient}
                  province={province}
                  key={i}
                  keyVal={i}
                  geography={geo}
                  stroke={theme.colors.gray[300]}
                  strokeWidth="0.5px"
                  fill={
                    province.toLowerCase() !==
                    geo.properties.gn_name.toLowerCase()
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

const StyledProvince = styled(Geography)<{
  province: string;
  caseGradient: boolean;
  numberList: number[];
  keyVal: number;
}>`
  fill: ${(props) => {
    if (props.caseGradient) {
      return colourSelector(props.numberList[props.keyVal]);
      // return `rgb(${props.numberList[props.keyVal]}, ${
      //   255 - props.numberList[props.keyVal]
      // }, 0)`;
    }
  }};
  :hover {
    cursor: pointer;
    fill: ${(props) => {
      if (!props.caseGradient) {
        return props.geography.properties.gn_name.toLowerCase() !==
          props.province.toLowerCase()
          ? theme.colors.gray[700]
          : theme.colors.teal[500];
      }
    }};
  }

  :focus,
  :active {
    outline: none;
  }

  :active {
    fill: ${(props) => {
      if (!props.caseGradient) {
        return theme.colors.teal[600];
      }
    }};
  }
`;

function colourSelector(keyValue: number) {
  if (keyValue < 10) {
    return theme.colors.red[50];
  } else if (keyValue >= 10 && keyValue < 20) {
    return theme.colors.red[100];
  } else if (keyValue >= 20 && keyValue < 30) {
    return theme.colors.red[200];
  } else if (keyValue >= 30 && keyValue < 40) {
    return theme.colors.red[300];
  } else if (keyValue >= 40 && keyValue < 50) {
    return theme.colors.red[400];
  } else if (keyValue >= 50 && keyValue < 60) {
    return theme.colors.red[500];
  } else if (keyValue >= 60 && keyValue < 70) {
    return theme.colors.red[600];
  } else if (keyValue >= 70 && keyValue < 80) {
    return theme.colors.red[700];
  } else if (keyValue >= 80 && keyValue < 90) {
    return theme.colors.red[800];
  } else if (keyValue >= 90) {
    return theme.colors.red[900];
  }
}
