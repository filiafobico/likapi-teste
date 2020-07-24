const express = require('express');
const router = express.Router();
const Pipedrive = require('../controller/Pipedrive');

router.post('/', (req, res, next) => {
  new Pipedrive().dealInsertUpdate(req.body.current);
  res.sendStatus(200);
});

module.exports = router;
