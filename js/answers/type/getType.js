 function isObject(value) {
    const type = typeof value
    return value!=null && (type === 'object' || type === "function")
}

function isString(value) {
    const type = typeof value

    return type === 'string' || (type === 'object' && value !== null && !Array.isArray(value))
}
