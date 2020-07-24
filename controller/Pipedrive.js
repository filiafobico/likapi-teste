class Pipedrive {

  constructor() { }

  /**
   * Recebe uma venda e insere ou atualiza caso exista no banco
   *
   * @param {Object} pipedriveDeal Deal provindo da API do pipedrive com o estado atual
   * @returns objeto deal como foi inserido no banco
   */
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

    return deal;
  }

  /**
   * Agrega vendas por dia e soma o valor vendido
   *
   * @returns array com dias e valor vendido
   */
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