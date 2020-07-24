const unirest = require('unirest');
const { toXML } = require('jstoxml');

class Bling {

  /**
   * Pega apikey da variável de ambiente KEY_BLING
   * necessária para enviar dados ao Bling
   */
  constructor() {
    this.apiKey = process.env.KEY_BLING;
    if (!this.apiKey) {
      throw new Error("The KEY_BLING environment variable is no set");
    }
  }

  /**
   * Insere um novo pedido de venda no Bling caso seja uma venda ganha
   *
   * @param {Object} pipedriveDeal objeto com informações da deal
   * @returns null caso o deal não tenha o status 'won'
   */
  insertDemand(pipedriveDeal) {
    if (pipedriveDeal.status !== 'won') {
      return;
    }

    const xml = this.makeDemandXml(pipedriveDeal);

    unirest('POST', `https://bling.com.br/Api/v2/pedido/json/?apikey=${this.apiKey}&xml=${xml}`)
      .send("")
      .end( res => {
        if (res.error) throw new Error(res.error);
        console.log(res.raw_body);
      });
  }

  /**
   * Constrói XML de envio para Bling
   * remove caracteres inválidos para a api
   *
   * @param {Object} pipedriveDeal objeto com informações da deal
   * @returns string com XML para envio
   */
  makeDemandXml(pipedriveDeal) {
    return toXML({
      pedido: {
        cliente: { nome: pipedriveDeal.person_name },
        pedido: {
          itens: {
            item: {
              codigo: 1,
              descricao: pipedriveDeal.title,
              un: 'Un',
              qtde: 1,
              vlr_unit: pipedriveDeal.value
            }
          }
        }
      }
    }).replace(/[^<>\w\s\d\/]/g, '');
  }
}

module.exports = Bling;