import React, { useState, useEffect } from 'react';
import { fetchGwasFiles } from '../api/gwas';

const GwasFileModal = ({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (file: any) => void;
}) => {
  const [search, setSearch] = useState('');
  const [files, setFiles] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (open) setSearch('');
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      setLoading(true);
      fetchGwasFiles(search)
        .then(({ items, total }) => {
          setFiles(items);
          setTotal(total);
          setSelectedId(null);
        })
        .catch((e) => {
          console.error(e);
          setFiles([]);
          setTotal(0);
        })
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [open, search]);

  const handleSelect = () => {
    const file = files.find((f) => String(f.id) === selectedId);
    if (file) onSelect(file);
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2 id="modal-title" className="modal-title">
            Select a GWAS file
          </h2>
          <button
            type="button"
            className="modal-close"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </header>
        <input
          type="text"
          className="modal-search field-input"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <p className="modal-count">There are {total} files in the library.</p>
        {loading ? (
          <p className="modal-loading">Loading…</p>
        ) : (
          <div className="modal-table-wrap">
            <table className="gwas-table">
              <thead>
                <tr>
                  <th>Phenotype</th>
                  <th>Sex</th>
                  <th>Sample size</th>
                  <th>Genome build</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={String(file.id)}>
                    <td>
                      <label className="gwas-table-radio">
                        <input
                          type="radio"
                          name="gwas-file"
                          checked={selectedId === String(file.id)}
                          onChange={() => setSelectedId(String(file.id))}
                        />
                        <span>{String(file.phenotype ?? '–')}</span>
                      </label>
                    </td>
                    <td>{String(file.sex ?? '–')}</td>
                    <td>{String(file.sample_size ?? '–')}</td>
                    <td>{String(file.genome_build ?? '–')}</td>
                    <td>{String(file.source ?? '–')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <footer className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!selectedId}
            onClick={handleSelect}
          >
            Select
          </button>
        </footer>
      </div>
    </div>
  );
};

export default GwasFileModal;
