import styled from "styled-components";
import { menuModels } from "../data";
import { AchievementsMenu, HomeMenu, SettingMenu } from "./MenuBlocks";

const Tag = ({ iconPath = "", title = "", active = false, onChangeMenu = () => {} }) => {
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

const Menu = ({ onClose = () => {}, currentActiveMenu = 0, onChangeMenu = () => {} }) => {
  const renderContent = () => {
    switch (currentActiveMenu) {
      case 0:
        return <HomeMenu />;
      case 1:
        return <SettingMenu />;
      case 2:
        return <AchievementsMenu />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <div className="header">
        <div className="listTags">
          {menuModels.map((tag, tagIndex) => (
            <Tag
              iconPath={tag.iconUrl}
              title={tag.title}
              key={tag.id}
              active={currentActiveMenu === tagIndex}
              onChangeMenu={() => onChangeMenu(tagIndex)}
            />
          ))}
        </div>
        <div className="closeBtn">
          <button onClick={onClose}>
            <img src="images/close.png" alt="" />
          </button>
        </div>
      </div>
      <div className="main">{renderContent()}</div>
    </Container>
  );
};

const Container = styled.div`
  background-color: #f7f1e7;
  padding: 15px;
  width: 460px;
  height: 650px;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    justify-content: space-between;
  }

  .main {
    flex: 1;
  }

  .listTags {
    display: flex;
  }
`;

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

export default Menu;
