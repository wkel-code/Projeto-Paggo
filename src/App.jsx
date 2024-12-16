import { useState } from 'react';
import './App.css';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
  outDir: 'build'
      
function App() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');


  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {

      if (!['application/pdf', 'image/jpeg', 'image/png'].includes(uploadedFile.type)) {
        setUploadStatus('Tipo de arquivo inválido. Apenas PDF, JPG e PNG são permitidos.');
        setFile(null);
        setFileName('');
        return;
      }
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
      setUploadStatus('');
    }
  };

  const handleUploadSubmit = async () => {
    if (!file) {
      setUploadStatus('Por favor, selecione um arquivo primeiro.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('Arquivo enviado com sucesso!');
        setFile(null);
        setFileName('');
      } else {
        setUploadStatus('Erro ao enviar arquivo. Tente novamente.');
      }
    } catch (error) {
      setUploadStatus('Erro de conexão. Verifique sua internet.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div>
        <a href="https://www.paggo.com.br/" target="_blank">
          <img
            src="https://griclub.sirv.com/uploads/crm_company/003Dm00000D8Vm6_Marketing_Edited_Logo_2024-10-08_13-18-35.jpg"
            alt="Logo do Paggo"
            className="paggo-logo"
          />
        </a>
      </div>

      <div className="title-wrapper">
        <h1>Upload de arquivo</h1>
      </div>

      <div className="upload-container">
        <input
          type="file"
          onChange={handleFileUpload}
          accept=".pdf,.jpg,.png"
          style={{ display: 'none' }}
          id="fileInput"
        />
        <label htmlFor="fileInput">
          Selecionar arquivo
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </label>

        {file && (
          <button
            className="submit-button"
            onClick={handleUploadSubmit}
            disabled={uploading}
          >
            {uploading ? 'Enviando...' : 'Enviar arquivo'}
          </button>
        )}
      </div>

      {uploadStatus && (
        <p className={`upload-status ${uploadStatus.includes('sucesso') ? 'success' : 'error'}`}>
          {uploadStatus}
        </p>
      )}

      {file && (
        <p className="file-info">
          Arquivo selecionado: {file.name} ({(file.size / 1024).toFixed(2)} KB)
        </p>
      )}

      <p className="read-the-docs">
        Click on the Paggo logo to learn more
      </p>

      <div className="container">
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
      </div>
    </>
  );
}

export default App;
