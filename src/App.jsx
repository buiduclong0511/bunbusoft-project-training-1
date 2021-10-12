import * as _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import Counter from "./components/Counter";
import Element from "./components/Element";
import Menu from "./components/Menu";
import Modal from "./components/Modal";
import { alphaModel } from "./models.index";
import { combination, getBaseElements, triggerMatchElement, useWindowDimensions } from "./utils";
import { toggleFullScreen } from "./utils/toggleFullScreen";

const App = () => {
  const [listTags, setListTags] = useState(getBaseElements());
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentActiveMenu, setCurrentActiveMenu] = useState(0);
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

  const handleStopDrag = useCallback(
    (position, tagIndex, elementIndex) => {
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
    },
    [width, listElementsByTag]
  );

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
          newListElementsByTag[mergeableElement.element2.tagIndex][
            mergeableElement.element2.elementIndex
          ].info = newElement;
          delete newListElementsByTag[mergeableElement.element1.tagIndex][
            mergeableElement.element1.elementIndex
          ];

          const isExistedElement = listTags.some((tag) => tag.id === newElement.id);
          if (!isExistedElement) {
            const newListTags = [...listTags, newElement];
            newListElementsByTag["" + (newListTags.length - 1)] = {
              0: {
                position: {
                  x: 0,
                  y: 0,
                },
                info: newElement,
              },
            };
            setListTags(newListTags);
            setListElementsByTag(newListElementsByTag);
          } else {
            setListElementsByTag(newListElementsByTag);
          }
        }
      }
    }
  }, [currentSelectedElement]);

  const handleToggleFullScreen = () => {
    if (!isFullScreen) {
      toggleFullScreen.on(document);
      setIsFullScreen(true);
    } else {
      toggleFullScreen.off(document);
      setIsFullScreen(false);
    }
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleChangeMenu = (tagIndex) => {
    setCurrentActiveMenu(tagIndex);
  };
  return (
    <Container>
      <button className="toggleFullScreen" onClick={handleToggleFullScreen}>
        {isFullScreen ? (
          <img src="images/cancelFullscreenBtn.png" alt="" />
        ) : (
          <img src="images/fullscreenBtn.png" alt="" />
        )}
      </button>
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
      <div className="counter">
        <Counter currentCount={listTags.length} maxCount={580} />
      </div>
      <div className="menu">
        <button onClick={handleOpenModal}>
          <img src="images/menu.png" alt="" />
        </button>
      </div>
      {isOpenModal && (
        <Modal onClose={handleCloseModal}>
          <Menu
            onClose={handleCloseModal}
            currentActiveMenu={currentActiveMenu}
            onChangeMenu={handleChangeMenu}
          />
        </Modal>
      )}
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background-image: url("images/workspace-background.png");
  position: relative;

  .toggleFullScreen {
    margin-left: 10px;
    margin-top: 10px;
  }

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

  .counter {
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 60px;
    color: #e8ded0;
    padding-left: 10px;
  }

  .menu {
    position: absolute;
    bottom: 10px;
    right: 260px;
  }
`;

export default App;
