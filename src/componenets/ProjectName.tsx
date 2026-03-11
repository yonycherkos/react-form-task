import React from 'react';

const ProjectName = ({
  projectName,
  handleChange,
}: {
  projectName: string;
  handleChange: (e: any) => void;
}) => {
  return (
    <>
      <div className="field-label">Project Name</div>
      <input
        id="project-name"
        name="projectName"
        type="text"
        placeholder="Ex. Genetic Association of Schizophrenia in Europe"
        className="field-input"
        value={projectName}
        onChange={handleChange}
        required
      />
    </>
  );
};

export default ProjectName;
