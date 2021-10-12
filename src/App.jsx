import { useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import Element from "./components/Element";
import { alphaModel } from "./models.index";
import { getBaseElements } from "./utils";

const App = () => {
  const [listTags, setListTags] = useState(getBaseElements());

  return (
    <Container>
      <div className="side">
        <div className="order">
          {alphaModel.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
        <div className="listElements">
          {listTags.map((element) => {
            return <Element data={element} key={element.id} />;
          })}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background-image: url("images/workspace-background.png");

  .side {
    background-image: url("images/library-background.png");
    width: 250px;
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    min-height: 100vh;

    .order {
      width: 30px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      max-height: 100vh;
      overflow-y: scroll;
      border-right: 1px solid #fff;

      ::-webkit-scrollbar {
        display: none;
      }

      span {
        text-align: center;
        padding: 10px 0;
        cursor: pointer;
      }
    }

    .listElements {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }
  }
`;

export default App;
