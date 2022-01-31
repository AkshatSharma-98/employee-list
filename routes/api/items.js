const express = require('express')
const router = express.Router()

//Item Model
const Item = require('../../models/Item')

// @route -> GET api/items
// @description -> GET All Items
// @access -> Public

router.get('/', (req, res) => {
    Item.find()
        .then(items => res.json(items))
})

// @route -> POST api/items
// @description -> create an item
// @access -> Public

router.post('/newItem', async (req, res) => {
    const newItem = new Item({
        name: req.body.name
    })

    await newItem.save().then(item => res.json(item))
})

// @route -> DELETE api/items/:id
// @description -> delete an item
// @access -> Public

router.delete('/:id', async (req, res) => {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
        return res.status(404).json({ status: "No item found" });
    }
    res.status(200).json({ status: "Success" });
})

module.exports = router
