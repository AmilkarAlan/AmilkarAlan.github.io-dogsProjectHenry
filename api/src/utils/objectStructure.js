module.exports = (arr) => {
    let objectAtribute = {};
    arr.forEach(o => {
        for (let a in o) {
            objectAtribute[a] = (objectAtribute[a] || 0) + 1;
        }
    });
    let structure = {};
    for (let a in objectAtribute) {
        if (objectAtribute[a] === arr.length) {
            structure[a] = null;
        }
    }
    return structure;
}

