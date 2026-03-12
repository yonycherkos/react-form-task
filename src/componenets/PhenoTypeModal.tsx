import React, { useState, useEffect } from 'react';
import { fetchPhenotypes } from '../api/phenotypes';

const PhenoTypeModal = ({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (phenotype: string) => void;
}) => {
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState<Record<string, any>[]>([]);
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
      fetchPhenotypes(search)
        .then(({ items, total }) => {
          setOptions(items);
          setTotal(total);
          setSelectedId(null);
        })
        .catch((e) => {
          console.error(e);
          setOptions([]);
          setTotal(0);
        })
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [open, search]);

  const handleSelect = () => {
    const opt = options.find(
      (o) => String(o?.id ?? o?.phenotype_name) === selectedId,
    );
    if (opt) {
      const label = String(opt?.phenotype_name ?? opt?.id ?? '');
      onSelect(label);
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="phenotype-modal-title"
    >
      <div
        className="modal phenotype-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <h2 id="phenotype-modal-title" className="modal-title">
            Select phenotype
          </h2>
          <button
            type="button"
            className="modal-close"
            aria-label="Close"
            onClick={onClose}
          >
            &#215;
          </button>
        </header>
        <input
          type="text"
          className="modal-search field-input"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <p className="modal-count">
          There are {total} phenotype search results.
        </p>
        {loading ? (
          <p className="modal-loading">Loading...</p>
        ) : (
          <div className="modal-list-wrap">
            {options.map((opt, idx) => {
              const optId = String(opt.id ?? opt.phenotype_name ?? idx);
              const label = String(opt.phenotype_name ?? opt.id ?? opt ?? '');
              return (
                <label
                  key={optId}
                  className={`phenotype-option ${selectedId === optId ? 'phenotype-option--active' : ''}`}
                >
                  <input
                    type="radio"
                    name="phenotype"
                    checked={selectedId === optId}
                    onChange={() => setSelectedId(optId)}
                  />
                  <span>{label}</span>
                </label>
              );
            })}
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

export default PhenoTypeModal;
