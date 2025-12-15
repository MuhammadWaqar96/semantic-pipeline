const store = [];

function addChunk(chunk){
    store.push(chunk);
}

function getAll(){
    return store;
}

module.exports = {
    addChunk,
    getAll
}