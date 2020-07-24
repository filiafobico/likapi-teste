class Pipedrive {
  constructor() { }

  dealInsertUpdate(pipedriveDeal) {
    const deal = {
      _id: pipedriveDeal.id,
      title: pipedriveDeal.title,
      value: pipedriveDeal.value,
      status: pipedriveDeal.status,
      person_name: pipedriveDeal.person_name,
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

  async dealReport() {
    return await global.db
    .collection('pipedrive-deal')
    .aggregate([
      {
        $match: { status: 'won' }
      },
      {
        $addFields: {
          day: {
            $dateToString: { format: '%d-%m-%Y', date: '$date' }
          }
        }
      },
      {
        $group: {
          _id: '$day',
          vendas: { $sum: '$value' }
        }
      }
    ])
    .toArray();
  }
}

module.exports = Pipedrive;