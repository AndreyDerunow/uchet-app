function paginate(items: Array<Object>, current: number, size: number) {
    const startIndex = size * (current - 1);

    return [...items].splice(startIndex, size);
}

export default paginate;
