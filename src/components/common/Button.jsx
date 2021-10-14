import styled from "styled-components";

export const Button = ({ children = null, onClick = () => {} }) => {
  return <Container onClick={onClick}>{children}</Container>;
};

const Container = styled.button`
  padding: 6px 10px;
  border: 2px solid #e8ded0;
  background-color: #f7f1e7;
  color: #938671;
  font-size: 16px;
  font-weight: lighter;
  margin-top: 10px;
`;
