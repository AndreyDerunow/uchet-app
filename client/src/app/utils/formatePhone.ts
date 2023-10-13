function formatePhone(val: string): string {
    const formated = val
        .split("")

        .map((n, i) => {
            switch (i) {
                case 1:
                    return "(" + n;
                case 4:
                    return ")" + n;
                case 7:
                    return "-" + n;
                case 9:
                    return "-" + n;
                default:
                    return n;
            }
        })

        .join("");
    return formated;
}

export default formatePhone;
