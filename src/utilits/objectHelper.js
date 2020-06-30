
export const objectHelper = (array, arrayObjectItem, id, objectItemThatChange) => {
    return (array.map(u => {
        if (u[arrayObjectItem] === id) {
            return { ...u, ...objectItemThatChange}}
        return u}
    ))
}