import styled from "styled-components";

export const SelectBox = ({
  id = "",
  label = "",
  options = [],
  value = "",
  onChange = () => {},
}) => {
  return (
    <Container>
      <select id={id} onChange={onChange} value={value}>
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label htmlFor={id}>{label}</label>
    </Container>
  );
};

const Container = styled.div`
  select {
    border: 2px solid #e8ded0;
    background-color: #f7f1e7;
    min-width: 104px;
    height: 34px;
    margin-bottom: 10px;
    margin-right: 5px;
    color: #938671;
  }
`;
