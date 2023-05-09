function getDefaultImage() {
    return `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${(
        Math.random() + 1
    )
        .toString(36)
        .substring(7)}`;
}

export default getDefaultImage;
