import React, { useState, useEffect } from 'react';
import { geoEqualEarth, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';

interface ProjectionProps {}

const projection = geoEqualEarth()
  .scale(160)
  .translate([800 / 2, 450 / 2]);

export const Projection: React.FC<ProjectionProps> = ({}) => {
  const [geographies, setGeographies] = useState([]);

  useEffect(() => {
    fetch('/world-110m.json').then((response) => {
      if (response.status !== 200) {
        console.log(`There was a problem: ${response.status}`);
        return;
      }
      response.json().then((worlddata) => {
        setGeographies(
          feature(worlddata, worlddata.objects.countries).features
        );
      });
    });
  }, []);

  return (
    <svg width={800} height={450} viewBox="0 0 800 450">
      <g className="countries">
        {geographies.map((d, i) => (
          <path
            key={`path-${i}`}
            d={geoPath().projection(projection)(d)}
            className="country"
            fill={`rgba(38,50,56,${(1 / geographies.length) * i})`}
            stroke="#FFFFFF"
            strokeWidth={0.5}
          />
        ))}
      </g>
      <g className="markers">
        <circle
          cx={this.projection()([8, 48])[0]}
          cy={this.projection()([8, 48])[1]}
          r={10}
          fill="#E91E63"
          className="marker"
        />
      </g>
    </svg>
  );
};
