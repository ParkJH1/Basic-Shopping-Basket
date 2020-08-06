module.exports.Query = {
    getItems: async (parent, args, context) => {
        const items = await context.dataSources.itemAPI.getAllItems();
        const ret = [];
        for(let i = 0; i < items.length; i++){
            ret.push({
                name: items[i].name,
                price: items[i].price,
                imgUrl: items[i].imgUrl,
            });
        }
        return ret;
    },
    getReceipts: async (parent, args, context) => {
        const receipts = await context.dataSources.receiptAPI.getAllReceipts();
        const ret = [];
        for(let i = 0; i < receipts.length; i++){
            ret.push({
                name: receipts[i].name,
                price: receipts[i].price,
                amount: receipts[i].amount,
            });
        }
        return ret;
    },
};
