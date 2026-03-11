import { useState } from 'react';
import ProjectName from '../componenets/ProjectName';
import GwasFile from '../componenets/GwasFile';
import Phenotype from '../componenets/PhenoType';
import Population from '../componenets/Population';
import '../styles/App.css';

const FormPage = () => {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    projectName: '',
    gwasFile: '',
    phenotype: '',
    population: '',
  });

  const [gwasSourceType, setGwasSourceType] = useState<'library' | 'upload'>(
    'library',
  );

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log('Submit');
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const buildStepsContent = () => {
    switch (step) {
      case 0:
        return (
          <ProjectName
            projectName={formData.projectName}
            handleChange={handleChange}
          />
        );
      case 1:
        return (
          <GwasFile
            gwasSourceType={gwasSourceType}
            handleGwasSourceType={(type: 'library' | 'upload') => {
              setGwasSourceType(type);
            }}
            gwasFile={formData.gwasFile || ''}
            onSelectFromLibrary={(name) =>
              setFormData((prev) => ({ ...prev, gwasFile: name }))
            }
            onUploadFile={(file) =>
              setFormData((prev) => ({
                ...prev,
                gwasFile: file?.name ?? '',
              }))
            }
          />
        );
      case 2:
        return (
          <Phenotype
            value={formData.phenotype}
            onChange={(phenotype) =>
              setFormData((prev) => ({ ...prev, phenotype }))
            }
          />
        );
      case 3:
        return (
          <Population
            population={formData.population}
            onChange={(population) =>
              setFormData((prev) => ({ ...prev, population }))
            }
          />
        );
      default:
        return <div className="field-label">Unimplemented step</div>;
    }
  };

  const stepperItems = [
    'Project name',
    'GWAS file selection',
    'Phenotype',
    'Population Category',
  ];

  return (
    <main className="form">
      <section className="form-card">
        <header className="form-header">
          <h1 className="form-title">Create hypothesis project</h1>
          <p className="form-subtitle">
            Set up a new hypothesis project by providing basic details.
          </p>
        </header>

        <div className="form-layout">
          <div className="form-stepper">
            {stepperItems.map((item, index) => (
              <div
                className={`stepper-item ${step === index ? 'stepper-item-active' : ''}`}
              >
                <span className="stepper-circle">{index + 1}</span>
                <span className="stepper-label">{item}</span>
              </div>
            ))}
          </div>

          <div className="form-section">
            {buildStepsContent()}

            <div className="form-actions">
              {step > 0 ? (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
              ) : (
                <div></div>
              )}
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
              >
                {step === 3 ? 'Submit' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FormPage;
