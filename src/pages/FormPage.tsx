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

  const [gwasFileSourceType, setGwasFileSourceType] = useState<
    'library' | 'upload' | null
  >(null);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log('formData: ', formData);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const isCurrentStepValid = () => {
    const fields = [
      formData.projectName,
      formData.gwasFile,
      formData.phenotype,
      formData.population,
    ];
    return fields[step]?.trim() !== '';
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
            gwasFile={formData.gwasFile || ''}
            gwasFileSourceType={gwasFileSourceType}
            handleGwasSourceType={(type: 'library' | 'upload') => {
              setGwasSourceType(type);
            }}
            onSelectFromLibrary={(name) => {
              setFormData((prev) => ({ ...prev, gwasFile: name }));
              setGwasFileSourceType('library');
            }}
            onUploadFile={(file) => {
              setFormData((prev) => ({
                ...prev,
                gwasFile: file?.name ?? '',
              }));
              setGwasFileSourceType('upload');
            }}
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
    <main className="container">
      <section className="card">
        <header className="header">
          <h1 className="title">Create hypothesis project</h1>
          <p className="subtitle">
            Set up a new hypothesis project by providing basic details.
          </p>
        </header>

        <div className="form">
          <div className="form-stepper">
            {stepperItems.map((item, index) => (
              <div
                key={index}
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
                disabled={!isCurrentStepValid()}
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
