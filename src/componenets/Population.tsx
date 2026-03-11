const Population = ({
  population,
  onChange,
}: {
  population: string;
  onChange: (population: string) => void;
}) => {
  const populationOptions = [
    'African',
    'European',
    'East Asian',
    'South Asian',
    'Native American',
  ];

  return (
    <>
      <div className="field-label">Population Category</div>
      <div className="population-options">
        {populationOptions.map((option) => (
          <label className="population-option" key={option}>
            <input
              type="radio"
              name="population"
              value={option}
              checked={population === option}
              onChange={() => onChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </>
  );
};

export default Population;
