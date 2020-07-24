const express = require('express');
const router = express.Router();
const Pipedrive = require('../controller/Pipedrive');

router.post('/', (req, res, next) => {
  new Pipedrive().dealInsertUpdate(req.body.current);
  res.sendStatus(200);
});

router.get('/', async (req, res, next) => {
  const soldPerDay = await new Pipedrive().dealReport();
  res.send(soldPerDay);
});

module.exports = router;