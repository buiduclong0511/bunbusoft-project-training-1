import styled from "styled-components";

export const Checkbox = ({
  id = "",
  label = "",
  checked = false,
  value = "",
  onChange = () => {},
}) => {
  return (
    <Container checked={checked}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} value={value} />
      <label htmlFor={id}>{label}</label>
    </Container>
  );
};

const Container = styled.div`
  input {
    display: none;
  }

  label {
    padding-left: 40px;
    background-image: ${(p) =>
      p.checked
        ? "url('images/menu-checkbox-checked.png')"
        : "url('images/menu-checkbox-unchecked.png')"};
    background-repeat: no-repeat;
    height: 34px;
    line-height: 34px;
    display: inline-block;
    margin-bottom: 10px;
    cursor: pointer;
  }
`;
