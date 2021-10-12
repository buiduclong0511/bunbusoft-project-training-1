import * as _ from "lodash";
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import Element from "./components/Element";
import { alphaModel } from "./models.index";
import { combination, getBaseElements, triggerMatchElement, useWindowDimensions } from "./utils";

const App = () => {
  const [listTags, setListTags] = useState(getBaseElements());
  const [listElementsByTag, setListElementsByTag] = useState(
    listTags.reduce((result, current, index) => {
      const newTag = {
        [index]: {
          0: {
            position: {
              x: 0,
              y: 0,
            },
            info: current,
          },
        },
      };
      return Object.assign(result, newTag);
    }, {})
  );
  const [currentSelectedElement, setCurrentSelectedElement] = useState(null);
  // console.log(listElementsByTag);
  const { width } = useWindowDimensions();

  const handleMouseEnter = (tagIndex, element) => {
    // console.log({ tagIndex, element });
    const newListElementsByTag = _.cloneDeep(listElementsByTag);
    const newElement = {
      position: {
        x: 0,
        y: 0,
      },
      info: element,
    };
    const lastIndex = Object.keys(newListElementsByTag[tagIndex]).pop();
    newListElementsByTag[tagIndex][Number(lastIndex) + 1] = newElement;
    setListElementsByTag(newListElementsByTag);
  };

  const handleStopDrag = (position, tagIndex, elementIndex) => {
    // console.log({ tagIndex, elementIndex });
    // console.log({ position, tagIndex, elementIndex });
    const isDragToDroppable = position.x < width - 270;
    if (!isDragToDroppable) {
      const newListElementsByTag = _.cloneDeep(listElementsByTag);
      delete newListElementsByTag[tagIndex][elementIndex];
      setListElementsByTag(newListElementsByTag);
      setCurrentSelectedElement(null);
    } else {
      const newListElementsByTag = _.cloneDeep(listElementsByTag);
      const newElement = {
        position,
        info: newListElementsByTag[tagIndex][elementIndex].info,
      };
      newListElementsByTag[tagIndex][elementIndex] = newElement;
      setListElementsByTag(newListElementsByTag);
      setCurrentSelectedElement({
        tagIndex,
        elementIndex,
        element: newListElementsByTag[tagIndex][elementIndex],
      });
    }
  };

  useEffect(() => {
    if (currentSelectedElement) {
      const mergeableElement = triggerMatchElement(listElementsByTag, currentSelectedElement);
      if (mergeableElement) {
        const elementId1 =
          listElementsByTag[mergeableElement.element1.tagIndex][
            mergeableElement.element1.elementIndex
          ].info.id;
        const elementId2 =
          listElementsByTag[mergeableElement.element2.tagIndex][
            mergeableElement.element2.elementIndex
          ].info.id;
        const newElement = combination(elementId1, elementId2);
        if (newElement) {
          const newListElementsByTag = _.cloneDeep(listElementsByTag);
          newListElementsByTag[mergeableElement.element1.tagIndex][
            mergeableElement.element1.elementIndex
          ].info = newElement;
          delete newListElementsByTag[mergeableElement.element2.tagIndex][
            mergeableElement.element2.elementIndex
          ];
          setListElementsByTag(newListElementsByTag);
        }
      }
    }
  }, [currentSelectedElement]);

  return (
    <Container>
      <div className="side">
        <div className="order">
          {alphaModel.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
        <div className="listElements">
          {listTags.map((tag, tagIndex) => {
            return (
              <div style={{ position: "relative" }}>
                <Element
                  key={tag.id}
                  data={tag}
                  onMouseEnter={() => handleMouseEnter(tagIndex, tag)}
                />
                {Object.keys(listElementsByTag[tagIndex]).map((elementIndex) => (
                  <Draggable
                    key={elementIndex}
                    onStop={(e) =>
                      handleStopDrag({ x: e.clientX, y: e.clientY }, tagIndex, elementIndex)
                    }
                  >
                    <div style={{ position: "absolute", top: 0, left: 0 }}>
                      <Element data={listElementsByTag[tagIndex][elementIndex].info} />
                    </div>
                  </Draggable>
                ))}
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
