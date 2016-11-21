export function objectPathResolver(path, obj) {
    return path.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : undefined
    }, obj || self)
}

export function checkRgb(rgbColor) {
    const digits = rgbColor.split('(')[1].split(')')[0].split(',');

    if (digits.length !== 3) throw new Error('');

    return !!digits.map((x) => {
        if (x > 255) throw new Error('');

        x = parseInt(x).toString(16);

        return (x.length === 1) ? `0${x}` : x;
    }).length;
}

export function chechHsl(hslColor) {
    const values = hslColor.split('(')[1].split(')')[0].split(',');

    if (parseInt(values[1]) < 0 || parseInt(values[1]) > 100 || values[1].substr(-1) !== '%') throw new Error('');

    return true;
}
