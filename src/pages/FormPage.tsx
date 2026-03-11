import React, {useState} from 'react';
import '../styles/App.css';

const FormPage = () => {

    const [step, setStep] = useState(0);

    const [formData, setFormData] = useState({
        projectName: '',
        gwasSource: '',
        phenotype: '',
        population: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const stepperItems = [
        'Project name',
        'GWAS file source',
        'Phenotype',
        'Population Category',
    ]

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
            {
                stepperItems.map((item, index) => (
                    <div className={`stepper-item ${step === index ? 'stepper-item-active' : ''}`}>
                        <span className="stepper-circle">{index + 1}</span>
                        <span className="stepper-label">{item}</span>
                    </div>
                ))
            }
          </div>

          <section className="form-section">
            <label className="field-label" htmlFor="project-name">
              Project name
            </label>
            <input
              id="project-name"
              name="projectName"
              type="text"
              placeholder="Ex. Genetic Association of Schizophrenia in Europe"
              className="field-input"
              value={formData.projectName}
              onChange={handleChange}
              required
            />

            <div className="form-actions">
                {
                    step > 0 ? (
                        <button type="button" className="btn btn-secondary" onClick={handlePrevious}>
                            Previous
                        </button>
                    ) : <div></div>
                }
              <button type="button" className="btn btn-primary" onClick={handleNext}>
                {step === 3 ? 'Submit' : 'Next'}
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default FormPage;