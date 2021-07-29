import React from 'react';
import './styles.css';

export default function InputImagem() {
  return (
    <div className="flex-column">
      <div className="placeholder-base">
        <div className="placeholder-texto noselect">
          <span>
            Clique ou arraste
            <br />
            para adicionar uma imagem
          </span>
        </div>
      </div>

    </div>
  );
}
