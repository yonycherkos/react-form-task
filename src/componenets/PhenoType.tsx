import React, { useState } from 'react';
import PhenoTypeModal from './PhenoTypeModal';

const PhenoType = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (phenotype: string) => void;
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="field-label">Phenotype</div>
      <button
        type="button"
        className="phenotype-trigger"
        onClick={() => setModalOpen(true)}
      >
        <span className={value ? '' : 'phenotype-placeholder'}>
          {value || 'Select option...'}
        </span>
        <div className="phenotype-dropdown">&#9660;</div>
      </button>
      <PhenoTypeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={onChange}
      />
    </>
  );
};

export default PhenoType;
