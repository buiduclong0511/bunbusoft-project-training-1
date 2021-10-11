import styled from "styled-components";

const Element = ({ data = {} }) => {
  return (
    <Container>
      <div className="image">
        <img src={data.image} alt={data.name} draggable={false} />
      </div>
      <div className="name">{data.name}</div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 0;

  .image {
    width: 50px;
    height: 50px;
    user-select: none;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .name {
    user-select: none;
  }
`;

export default Element;