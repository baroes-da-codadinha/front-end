/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import './styles.css';

export default function Snackbar({ openSnack, setOpenSnack }) {
  const [testeMensagem, setTestMensagem] = useState({
    status: 'erro',
    mensagem: 'Texto',
  }); // apenas para teste
  return (
    <>
      <div
        className={`snackbar ${testeMensagem.status} ${openSnack && 'aberta'}`}
        onClick={() => setOpenSnack(false)}
      >
        {openSnack && (
          <>
            <div className="icone-alerta">
              !
            </div>
            <span>
              {testeMensagem.mensagem}
            </span>
          </>
        )}
      </div>
    </>
  );
}
