import styled from "styled-components";
import { Checkbox, SelectBox } from "../common";
import { Button } from "../common/Button";

export const SettingMenu = ({
  selectedLanguage = "",
  languageOptions,
  settingConfigs = [],
  selectedSettingConfigs = [],
  onChangeLanguage = () => {},
  onChangeSettingConfigs = () => {},
}) => {
  return (
    <Container>
      <div className="heading">Settings</div>
      <div className="choseLanguage">
        <div className="selectBox">
          <SelectBox
            options={languageOptions}
            onChange={onChangeLanguage}
            value={selectedLanguage}
            id="choose-language"
            label="Choose language"
          />
        </div>
      </div>
      <div className="settingConfigs">
        {settingConfigs.map((settingConfig) => {
          const checked = selectedSettingConfigs.includes(settingConfig.value);
          return (
            <Checkbox
              id={settingConfig.value}
              value={settingConfig.value}
              onChange={onChangeSettingConfigs}
              checked={checked}
              label={settingConfig.label}
            />
          );
        })}
      </div>
      <Button>Reset progress</Button>
    </Container>
  );
};

const Container = styled.div`
  .heading {
    font-size: 18px;
    margin-top: 16px;
    margin-bottom: 20px;
  }
`;
