/* eslint-disable consistent-return */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React from 'react';
import imageToBase64 from 'image-to-base64/browser';
import { useDropzone } from 'react-dropzone';
import useAuth from '../../hooks/useAuth';
import { post } from '../../services/ApiClient';
import './styles.css';

export default function InputImagem({ value, setValue }) {
  const { token } = useAuth();

  async function uploadImagem(resource) {
    try {
      const resposta = await (await post('imagem', resource, token)).json();
      return resposta;
    } catch (error) {
      console.log(error);
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      acceptedFiles.map((file) => Object.assign(file, {
        preview: URL.createObjectURL(file),
      }));
      imageToBase64(acceptedFiles[0].preview).then((data) => {
        const body = {
          nome: 'teste/mais_um',
          imagem: data,
        };

        uploadImagem(body)
          .then((response) => {
            setValue(response);
            console.log(response);
          });
      });
    },
  });

  return (
    <div className="placeholder-base" {...getRootProps()}>
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
