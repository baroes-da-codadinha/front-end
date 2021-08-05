/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './styles.css';

export default function InputImagemII() {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => Object.assign(file, {
          preview: URL.createObjectURL(file),
        })),
      );
    },
  });

  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: '200px' }} alt="preview" />
      </div>
    </div>
  ));

  return (
    <div {...getRootProps()} className="flex-column">
      <div className="placeholder-base">
        <input {...getInputProps()} className="placeholder-texto noselect">
          {images}
          <span>
            Clique ou arraste
            <br />
            para adicionar uma imagem
          </span>
        </input>
      </div>

    </div>
  );
}
