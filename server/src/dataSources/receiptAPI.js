const {DataSource} = require('apollo-datasource');
const Sequelize = require('sequelize');
const {isUndefinedOrNull} = require('../utils');

const receiptAttributes = [
    'id',
    'name',
    'price',
    'amount',
];

class ReceiptAPI extends DataSource {
    constructor(receipts) {
        super();
        this.receipts = receipts;
    }

    initialize(config) {
        this.context = config.context;
    }

    async getAttributeOfItem(attributeName, id) {
        if (id === undefined || id === null) {
            throw new Error('idIsNotPassedMessage');
        }
        if (!receiptAttributes.includes(attributeName)) {
            throw new Error('attributeNameIsNotValidMessage');
        }
        const receipt = await this.receipts.Receipts.findOne({
            where: {id: id},
            attributes: [attributeName],
            raw: true,
        });
        return (receipt && isUndefinedOrNull(receipt[attributeName])) ?
            receipt[attributeName] : null;
    }

    async getAllReceipts() {
        const receipts = await this.receipts.Receipts.findAll();
        const ret = [];
        for(let i = 0; i < receipts.length; i++){
            ret.push(receipts[i].dataValues);
        }
        return ret;
    }

    async updateReceipt(name, price, amount) {
        let receipt = await this.receipts.Receipts.findOne({
            where: {name: name},
        });
        if(receipt){
            await this.receipts.Receipts.update({
                name: name,
                price: price,
                amount: amount
            },{
                where: {name: name}
            });
            receipt = await this.receipts.Receipts.findOne({
                where: {name: name},
            });
            return receipt.dataValues;
        }
        receipt = await this.receipts.Receipts.create({
            name: name,
            price: price,
            amount: amount
        });
        return receipt.dataValues;
    }
}

module.exports={
    ReceiptAPI,
};
