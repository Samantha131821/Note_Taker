const router = require('express').Router();
const uuid = require('uuid');
const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

function reader() {
    return readFile("db/db.json", "utf8")
}

function writer(note) {
    return writeFile("db/db.json", JSON.stringify(note))
}

function retrieveNotes(){
    return reader().then((data)=> {
        var alteredNotes;
        try {
            alteredNotes = [].concat(JSON.parse(data))
        } catch(err) {
            alteredNotes = []
        }
        return alteredNotes;
    })
}

function postNotes(note){
    if(!note.title || !note.text){
        throw new Error("Incomplete Note");
    }

    return retrieveNotes().then((data)=> {
        return [...data, note]
    }).then((updatedNotes)=> {
        return writer(updatedNotes)
    }).then(() => {
        return note
    })
}

router.get('/notes', (req, res) => {
    retrieveNotes().then((data) => {
        return res.json(data)
    }).catch((err) => res.status(500).json(err))
})

router.post('/notes', (req, res) => {
    postNotes(req.body).then((data) => {
        return res.json(data)
    }).catch((err) => res.status(500).json(err))
})

router.delete('/notes/:id', (req, res) => {
    removeNotes(req.params.id).then(() => {
        return res.json({ok: true})
    }).catch((err) => res.status(500).json(err))
})

module.exports = router;