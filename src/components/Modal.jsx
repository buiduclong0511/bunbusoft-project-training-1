import styled from "styled-components";

const Modal = ({ children = null, onClose = () => {} }) => {
  return (
    <Container>
      <div className="overlay" onClick={onClose}></div>
      <div className="content">{children}</div>
    </Container>
  );
};

const Container = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.5);
  }

  .content {
    z-index: 1;
  }
`;

export default Modal;
