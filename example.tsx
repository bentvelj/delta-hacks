import React, { useState } from 'react';

interface IPerson {
  name: string;
  height: number;
}

export const Person: React.FC<IPerson> = ({ name, height }) => {
  const [personData, setPersonData] = useState<IPerson>({
    name,
    height,
  }); // => [value, setter]

  const clickHandler: ButtonClick = (event) => {
    event.preventDefault();
    setPersonData({ name: 'bassel', height: 15 });
  };

  return <button onClick={(event) => clickHandler(event)}>{personData.name}</button>; //onClick={() => setPersonData({ name: 'bassel', height: 15 }) }
};

type ButtonClick = React.MouseEventHandler<HTMLButtonElement>;

