import styled from "styled-components";

const Counter = ({ currentCount = 0, maxCount = 0 }) => {
  return (
    <Container>
      {currentCount}/{maxCount}
    </Container>
  );
};

const Container = styled.div``;

export default Counter;
