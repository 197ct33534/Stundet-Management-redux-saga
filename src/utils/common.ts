export const capitalizeString = (str: string) => {
    if (!str) return '';

    return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const getMarkColor = (mark: number): string => {
    if (mark >= 8) {
        return '#1c4ae6';
    }
    if (mark >= 4) {
        return '#41c63b';
    }
    return '#FF0000';
};
