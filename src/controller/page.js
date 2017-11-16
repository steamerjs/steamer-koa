exports.index = async (ctx) => {
    await ctx.render('index', { content: 'hey man!' });
};
