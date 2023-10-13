function sortByNum(arr: any[], dir: "asc" | "desc") {
    const newArr = [...arr];
    return newArr.sort((a, b) => {
        const sumA = a.type === "top up" ? +a.sum : -a.sum;
        const sumB = b.type === "top up" ? +b.sum : -b.sum;
        if (sumA < sumB) return dir === "asc" ? -1 : 1;
        if (sumA > sumB) return dir === "asc" ? 1 : -1;
        return 0;
    });
}

export default sortByNum;
