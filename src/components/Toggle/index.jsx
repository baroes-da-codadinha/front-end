/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import './styles.css';

export default function Toggle() {
  // o useState deverá ser passado por props
  const [active, setActive] = useState(false);
  return (
    <>
      <div
        className={`toggle-out ${active && 'ativada'}`}
        onClick={() => setActive(!active)}
      >
        <div className={`toggle-in ${active && 'ativada'}`} />
      </div>
    </>
  );
}
