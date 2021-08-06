import React, { useState } from 'react';
import './styles.css';
import SetaSelect from '../../assets/select-seta.svg';
import categorias from '../../assets/categorias';

export default function InputSelect({
  label, placeholder, value, setValue,
}) {
  const [drop, setDrop] = useState(false);

  function ativarDrop() {
    setDrop(!drop);
  }

  function selecionarCategoria(item) {
    setValue(item);
    setDrop(false);
  }

  return (
    <div className="flex-column input-select">
      <label htmlFor="select">{label}</label>
      <input
        id="select"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled
        onClick={() => ativarDrop()}
      />

      { drop && (
        <div className="select-drop">
          {
          categorias.map((item) => (
            <>
              <div
                key={item}
                className="drop-itens"
                onClick={() => selecionarCategoria(item)}
              >
                {item}
              </div>
            </>
          ))
        }
        </div>
      )}
      <img
        src={SetaSelect}
        className={`select-seta ${drop && 'baixo'}`}
        alt="seta"
        onClick={() => ativarDrop()}
      />
    </div>
  );
}
