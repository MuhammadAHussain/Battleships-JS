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

module.exports = {
    objectEquality
}