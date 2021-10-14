import styled from "styled-components";

export const Tag = ({ iconPath = "", title = "", active = false, onChangeMenu = () => {} }) => {
  return (
    <StyledTag active={active} onClick={onChangeMenu}>
      <div className="icon">
        <img src={iconPath} alt="" />
      </div>
      <div className="title">{title}</div>
      <div className="lineActive"></div>
    </StyledTag>
  );
};

const StyledTag = styled.div`
  display: flex;
  align-items: center;
  padding: 0 5px;
  border-bottom: 1px solid rgba(232, 222, 208, 0.5);
  position: relative;
  cursor: pointer;

  .lineActive {
    display: ${(p) => (p.active ? "block" : "none")};
    width: 100%;
    height: 4px;
    background-color: #e8ded0;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  &:hover {
    .lineActive {
      display: block;
    }
  }

  .icon {
    width: 30px;
    height: 30px;

    img {
      width: 100%;
    }
  }
`;
