function getOperationStat(currentOperationsList, categories) {
    const arrTakeOff = [];
    const arrTopUp = [];
    let TakeOffSum = 0;
    let TopUpSum = 0;
    currentOperationsList.forEach((o) => {
        if (o.type === "take off") {
            TakeOffSum += +o.sum;
            if (arrTakeOff.find((a) => a[1] === o.category)) {
                arrTakeOff.find((a) => a[1] === o.category)[0] += +o.sum;
            } else {
                arrTakeOff.push([+o.sum, o.category]);
            }
        } else {
            TopUpSum += +o.sum;

            if (arrTopUp.find((a) => a[1] === o.category)) {
                arrTopUp.find((a) => a[1] === o.category)[0] += +o.sum;
            } else {
                arrTopUp.push([+o.sum, o.category]);
            }
        }
    });
    const takeOff = arrTakeOff.map((a) => [
        a[0] / TakeOffSum,
        categories.find((c) => c._id === a[1]).color
    ]);
    const topUp = arrTopUp.map((a) => [
        a[0] / TopUpSum,
        categories.find((c) => c._id === a[1]).color
    ]);

    return [TakeOffSum, TopUpSum, takeOff, topUp];
}

export default getOperationStat;
