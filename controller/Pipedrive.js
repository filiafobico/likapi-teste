class Pipedrive {
  constructor() { }

  dealInsertUpdate(pipedriveDeal) {
    const deal = {
      _id: pipedriveDeal.id,
      title: pipedriveDeal.title,
      value: pipedriveDeal.value,
      status: pipedriveDeal.status,
      date: new Date()
    };

    global.db
      .collection('pipedrive-deal')
      .updateOne(
        { _id: deal._id },
        { $set: deal },
        { upsert: true }
      );
  }
}

module.exports = Pipedrive;