export function objectPathResolver(path, obj) {
    return path.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : undefined
    }, obj || self)
}
