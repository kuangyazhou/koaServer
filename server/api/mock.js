exports.data1 = async (ctx, next) => {
    let one = [];
    let two = [];
    while (one.length < 30) {
        one.push(Math.random() * 100);
        // two.push({
        //   value:Math.random()*100,
        //   name:'1234'
        // })
    }
    ctx.body = {
        data: [one, two]
    };
};

exports.data2 = async (ctx, next) => {
    const data = [4, 5, 6];
    ctx.body = {
        data: data
    };
};
