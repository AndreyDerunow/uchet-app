const formateDate = (date: string, graph: boolean) => {
    const actualDate = new Date(Date.parse(date)).toLocaleString("default");
    if (graph) return actualDate.substring(0, 10);
    const [day, time] = actualDate.split(",");
    const formatedTime = time.trim().substring(0, 5);
    return `${day + " " + formatedTime}`;
};

export default formateDate;
