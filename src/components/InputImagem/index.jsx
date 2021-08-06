/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDropzone } from 'react-dropzone';
import './styles.css';

export default function InputImagem({ value, setValue }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      acceptedFiles.map((file) => Object.assign(file, {
        preview: URL.createObjectURL(file),
      }));
      setValue(acceptedFiles[0].preview);
    },
  });

  return (
    <div
      className="placeholder-base"
      {...getRootProps()}
    >
      <input
        style={{ backgroundImage: `url(${value})` }}
        {...getInputProps()}
      />
      {
        isDragActive
          ? <div className="placeholder-texto"><p>Arquivo aqui</p></div>
          : <div className="placeholder-texto"><p>Clique ou arraste</p></div>
      }
    </div>
  );
}
