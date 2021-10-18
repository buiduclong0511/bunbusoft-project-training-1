export const triggerMatchElement = (listElementsByTag, currentSelectedElement) => {
  let _tagIndex = 0;
  let _elementIndex = 0;
  const listTagIndex = Object.keys(listElementsByTag);
  const result = listTagIndex.some((tagIndex) => {
    const listElementIndex = Object.keys(listElementsByTag[tagIndex]);
    return listElementIndex.some((elementIndex) => {
      const x = listElementsByTag[tagIndex][elementIndex].position.x;
      const y = listElementsByTag[tagIndex][elementIndex].position.y;
      _tagIndex = tagIndex;
      _elementIndex = elementIndex;
      if (
        Number(tagIndex) === Number(currentSelectedElement.tagIndex) &&
        Number(elementIndex) === Number(currentSelectedElement.elementIndex)
      ) {
        return false;
      }
      return (
        (x > 0 || y > 0) &&
        Math.abs(currentSelectedElement.element.position.x - x) < 40 &&
        Math.abs(currentSelectedElement.element.position.y - y) < 40
      );
    });
  });
  if (result) {
    return {
      element1: {
        tagIndex: _tagIndex,
        elementIndex: _elementIndex,
      },
      element2: {
        tagIndex: currentSelectedElement.tagIndex,
        elementIndex: currentSelectedElement.elementIndex,
      },
    };
  } else {
    return false;
  }
};
