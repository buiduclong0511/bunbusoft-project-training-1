import { useEffect, useRef } from "react";
import { useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";

import Element from "./components/Element";
import { alphaModel } from "./models.index";
import { combine, getBaseElements } from "./utils";

const App = () => {
  const [listTags, setListTags] = useState(
    getBaseElements().map((item) => ({ image: `images/elements/${item}.png`, name: item }))
  );
  const [listElements, setListElements] = useState(listTags.map((item) => [item]));
  const [listElementInfo, setListElementInfo] = useState([]);
  // const listElementInfo = useRef([]);

  const handleAddNewElement = (tagIndex, elementIndex) => {
    // console.log({ tagIndex, elementIndex });
    if (elementIndex + 1 === listElements[tagIndex].length) {
      const newElement = {
        ...listElements[tagIndex][elementIndex],
      };
      const newListElement = [...listElements];
      newListElement[tagIndex].push(newElement);
      // console.log(newListElement[tagIndex]);
      setListElements(newListElement);
    }
  };

  const handleDrag = (element, tagIndex, index, position) => {
    const key = `${tagIndex}-${index}`;
    const indexElement = listElementInfo.findIndex((item) => item.key === key);
    if (indexElement > -1) {
      const newListElementInfo = [...listElementInfo];
      newListElementInfo[indexElement].info.position = position;
      setListElementInfo(newListElementInfo);
    } else {
      const newElement = {
        key,
        info: {
          element,
          position,
        },
      };
      const newListElementInfo = [...listElementInfo];
      newListElementInfo.push(newElement);
      setListElementInfo(newListElementInfo);
    }
  };

  useEffect(() => {
    listElementInfo.forEach((item) => {
      listElementInfo.forEach((_item) => {
        if (item.key !== _item.key) {
          const diffX = Math.abs(item.info.position.x - _item.info.position.x);
          const diffY = Math.abs(item.info.position.y - _item.info.position.y);
          if (diffX < 20 && diffY < 20) {
            const newElement = {
              name: combine(item.info.element.name, _item.info.element.name)[0],
              image: `images/elements/${
                combine(item.info.element.name, _item.info.element.name)[0]
              }.png`,
            };
            const tagIndex1 = Number(item.key.split("-")[0]);
            const elementIndex1 = Number(item.key.split("-")[1]);
            const tagIndex2 = Number(_item.key.split("-")[0]);
            const elementIndex2 = Number(_item.key.split("-")[1]);
            const newListElements = [...listElements];
            console.log({
              tagIndex1,
              elementIndex1,
              tagIndex2,
              elementIndex2,
            });
            newListElements[tagIndex2].splice(elementIndex2, 1, newElement);
            newListElements[tagIndex1].splice(elementIndex1, 1);
            setListElements(newListElements);
          }
        }
      });
    });
  }, [listElementInfo]);

  return (
    <Container>
      <div className="side">
        <div className="order">
          {alphaModel.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
        <div className="listElements">
          {listTags.map((item, index) => {
            return (
              <div style={{ position: "relative" }}>
                <Element data={item} key={index} />
                {listElements[index].map((item, _index) => {
                  const handleStop = () => handleAddNewElement(index, _index);
                  const _handleDrag = (e) =>
                    handleDrag(item, index, _index, { x: e.clientX, y: e.clientY });
                  return (
                    <Draggable key={_index} onStop={handleStop} onDrag={_handleDrag}>
                      <div style={{ position: "absolute", top: 0, left: 0 }}>
                        <Element data={item} key={index} />
                      </div>
                    </Draggable>
                  );
                })}
              </div>
            );
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
