module.exports.Mutation = {
    updateReceipt: async (parent, args, context) => {
        const receipt = await context.dataSources.receiptAPI.updateReceipt(args.name, args.price, args.amount);
        const ret = {
            name: receipt.name,
            price: receipt.price,
            amount: receipt.amount,
        };
        return ret;
    },
};
