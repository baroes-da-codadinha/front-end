/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import './styles.css';
import WarnIcon from '../../assets/warning.svg';

export default function Snackbar({ openSnack, setOpenSnack, erro }) {
  return (
    <>
      <div
        className={`snackbar erro ${openSnack && 'aberta'}`}
        onClick={() => setOpenSnack(false)}
      >
        {openSnack && (
          <>
            <div className="icone-alerta">
              <img
                src={WarnIcon}
                alt=""
              />
            </div>
            <span>
              {erro}
            </span>
          </>
        )}
      </div>
    </>
  );
}
