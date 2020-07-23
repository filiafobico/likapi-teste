const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  const deal = {
    _id: req.body.current.id,
    title: req.body.current.title,
    value: req.body.current.value,
    status: req.body.current.status,
    date: new Date()
  };

  global.db
    .collection('pipedrive-deal')
    .updateOne(
      { _id: deal._id },
      { $set: deal },
      { upsert: true }
    );

  res.sendStatus(200);
});

module.exports = router;
