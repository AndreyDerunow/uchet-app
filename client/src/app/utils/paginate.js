function paginate(items, current, size) {
    const startIndex = size * (current - 1);

    return [...items].splice(startIndex, size);
}

export default paginate;
