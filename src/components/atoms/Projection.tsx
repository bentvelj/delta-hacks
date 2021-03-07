import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import styled from 'styled-components';
import theme from '../../theme';
import { ButtonEvent } from '../../utils/types';
import { useColorModeValue } from "@chakra-ui/react"

// url to a valid topojson file
const geoUrl =
  'https://gist.githubusercontent.com/Brideau/2391df60938462571ca9/raw/f5a1f3b47ff671eaf2fb7e7b798bacfc6962606a/canadaprov.json';

interface ProjectionProps {
  onHover: (event: ButtonEvent, geo: any) => void;
  province: string;
  numberlist: number[];
  casegradient: boolean;
}

export const Projection: React.FC<ProjectionProps> = ({
  onHover,
  numberlist,
  province = 'ontario',
  casegradient,
}) => {
  const colour = useColorModeValue(theme.colors.gray[900], theme.colors.gray[300]);

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
                  numberlist={numberlist}
                  casegradient={casegradient}
                  province={province}
                  key={i}
                  keyval={i}
                  geography={geo}
                  stroke={colour}
                  strokeWidth="1px"
                  fill={
                    province.toLowerCase() !==
                    geo.properties.gn_name.toLowerCase()
                      ? theme.colors.gray[600]
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
  casegradient: boolean;
  numberlist: number[];
  keyval: number;
}>`
  fill: ${(props) => {
    if (props.casegradient) {
      return colourSelector(props.numberlist[props.keyval]);
      // return `rgb(${props.numberlist[props.keyval]}, ${
      //   255 - props.numberlist[props.keyval]
      // }, 0)`;
    }
  }};
  :hover {
    cursor: pointer;
    fill: ${(props) => {
      if (!props.casegradient) {
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
      if (!props.casegradient) {
        return theme.colors.teal[600];
      }
    }};
  }
`;

function colourSelector(keyvalue: number) {
  if (keyvalue < 10) {
    return theme.colors.red[50];
  } else if (keyvalue >= 10 && keyvalue < 20) {
    return theme.colors.red[100];
  } else if (keyvalue >= 20 && keyvalue < 30) {
    return theme.colors.red[200];
  } else if (keyvalue >= 30 && keyvalue < 40) {
    return theme.colors.red[300];
  } else if (keyvalue >= 40 && keyvalue < 50) {
    return theme.colors.red[400];
  } else if (keyvalue >= 50 && keyvalue < 60) {
    return theme.colors.red[500];
  } else if (keyvalue >= 60 && keyvalue < 70) {
    return theme.colors.red[600];
  } else if (keyvalue >= 70 && keyvalue < 80) {
    return theme.colors.red[700];
  } else if (keyvalue >= 80 && keyvalue < 90) {
    return theme.colors.red[800];
  } else if (keyvalue >= 90) {
    return theme.colors.red[900];
  }
}
