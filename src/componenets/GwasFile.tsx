import React, { useState } from 'react';
import GwasFileModal from './GwasFileModal';

const GwasFile = ({
  gwasSourceType,
  gwasFile,
  gwasFileSourceType,
  handleGwasSourceType,
  onSelectFromLibrary,
  onUploadFile,
}: {
  gwasSourceType: 'library' | 'upload';
  gwasFile: string;
  gwasFileSourceType: 'library' | 'upload' | null;
  handleGwasSourceType: (type: 'library' | 'upload') => void;
  onSelectFromLibrary: (displayName: string) => void;
  onUploadFile: (file: File | null) => void;
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectFromModal = (file: any) => {
    const displayName = String(
      file.filename ?? file.phenotype ?? file.id ?? 'Selected file',
    );
    onSelectFromLibrary(displayName);
  };

  return (
    <>
      <div className="field-label">GWAS file source</div>
      <div className="gwas-toggles">
        <button
          type="button"
          className={`gwas-toggle-btn ${gwasSourceType === 'library' ? 'gwas-toggle-btn--active' : ''}`}
          onClick={() => handleGwasSourceType('library')}
        >
          Select from library
        </button>
        <button
          type="button"
          className={`gwas-toggle-btn ${gwasSourceType === 'upload' ? 'gwas-toggle-btn--active' : ''}`}
          onClick={() => handleGwasSourceType('upload')}
        >
          Upload new file
        </button>
      </div>
      <div className="gwas-file-display">
        <span>
          {gwasFile && gwasFileSourceType === gwasSourceType
            ? gwasFile
            : 'No file selected.'}
        </span>
        {gwasSourceType === 'library' && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setModalOpen(true)}
          >
            Select a file
          </button>
        )}
        {gwasSourceType === 'upload' && (
          <label className="btn btn-secondary file-input-btn">
            Choose file
            <input
              type="file"
              accept=".gz,.zip,.tsv,.bgz"
              onChange={(e) => onUploadFile(e.target.files?.[0] ?? null)}
            />
          </label>
        )}
      </div>

      <GwasFileModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleSelectFromModal}
      />
    </>
  );
};

export default GwasFile;
