const express = require('express');
const router = express.Router();
const Pipedrive = require('../controller/Pipedrive');
const Bling = require('../controller/Bling');

router.post('/', (req, res, next) => {
  const deal = new Pipedrive().dealInsertUpdate(req.body.current);
  new Bling().insertDemand(deal);
  res.sendStatus(200);
});

router.get('/', async (req, res, next) => {
  const soldPerDay = await new Pipedrive().dealReport();
  res.send(soldPerDay);
});

module.exports = router;