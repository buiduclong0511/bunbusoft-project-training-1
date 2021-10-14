import { useState } from "react";
import styled from "styled-components";
import { Tag } from "../components/common";
import { AchievementsMenu, HomeMenu, SettingMenu } from "../components/MenuBlocks";
import { configs, ENGLISH, languages, menuModels } from "../data";

const Menu = ({ onClose = () => {} }) => {
  const [currentActiveMenu, setCurrentActiveMenu] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(ENGLISH);
  const [selectedSettingConfigs, setSelectedSettingConfigs] = useState([]);

  const handleChangeMenu = (tagIndex) => {
    setCurrentActiveMenu(tagIndex);
  };

  const handleChangeLanguage = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleChangeSettingConfigs = (e) => {
    console.log(e);
    const index = selectedSettingConfigs.findIndex(
      (settingConfig) => settingConfig === e.target.value
    );
    if (index > -1) {
      setSelectedSettingConfigs((prevState) => {
        const newState = [...prevState];
        newState.splice(index, 1);
        return newState;
      });
    } else {
      setSelectedSettingConfigs((prevState) => {
        const newState = [...prevState];
        newState.push(e.target.value);
        return newState;
      });
    }
  };

  const renderContent = () => {
    switch (currentActiveMenu) {
      case 0:
        return <HomeMenu />;
      case 1:
        return (
          <SettingMenu
            selectedLanguage={selectedLanguage}
            onChangeLanguage={handleChangeLanguage}
            languageOptions={languages}
            settingConfigs={configs}
            selectedSettingConfigs={selectedSettingConfigs}
            onChangeSettingConfigs={handleChangeSettingConfigs}
          />
        );
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
              onChangeMenu={() => handleChangeMenu(tagIndex)}
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

export default Menu;
