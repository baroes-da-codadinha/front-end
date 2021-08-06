import React, { useState } from 'react';
import './styles.css';
import SetaSelect from '../../assets/select-seta.svg';

export default function InputSelect({
  label, placeholder, value, setValue,
}) {
  const [drop, setDrop] = useState(false);

  function ativarDrop() {
    setDrop(!drop);
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
      />

      { drop && (
        <div className="select-drop">
          {
          ['Diversos ', 'Lanches ', 'Carnes ', 'Massas ', 'Pizzas ', 'Japonesa ', 'Chinesa ', 'Mexicano ', 'Brasileira ', 'Italiana ', 'Árabe'].map((item) => (
            <>
              <div key={item} className="drop-itens">
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
