const objectEquality = (firstObj, secondObj) => {
    const hasSameLength = Object.keys(firstObj).length === Object.keys(secondObj).length;

    const firstObjProperties = Object.getOwnPropertyNames(firstObj);
    const secondObjProperties = Object.getOwnPropertyNames(secondObj);

    const hasAllProperties = firstObjProperties.every((elem, index) => elem === secondObjProperties[index]);

    const firstObjValues = Object.keys(firstObj).map(elem => firstObj[elem]);
    const secondObjValues = Object.keys(secondObj).map(elem => secondObj[elem]);

    const hasAllValues = firstObjValues.every((elem, index) => elem === secondObjValues[index]);

    return hasSameLength && hasAllProperties && hasAllValues;
}

const shipEquality = (shipOne, shipTwo) => {
    const hasSameName = shipOne.getName() === shipTwo.getName();

    const hasSameShipNum = shipOne.getShipNum() === shipTwo.getShipNum();

    const hasSameCoordinates = shipOne.getCoordinates().every((elem, index) => objectEquality(elem, shipTwo.getCoordinates()[index]));

    return hasSameName && hasSameShipNum && hasSameCoordinates
}

module.exports = {
    objectEquality,
    shipEquality
}