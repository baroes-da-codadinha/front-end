import React, { useState } from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function InputSenha({
  label, placeholder, value, setValue,
}) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div className="flex-column input-password">
      <label htmlFor="password">{label}</label>
      <input
        id="password"
        type={mostrarSenha ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <FontAwesomeIcon
        icon={mostrarSenha ? faEye : faEyeSlash}
        className="eye-password"
        size="lg"
        onClick={() => setMostrarSenha(!mostrarSenha)}
      />
    </div>
  );
}
