function capitalize([first, ...rest]) {
  return first.toUpperCase() + rest.join('').toLowerCase();
}

/**
 * @param {string} fullname
 */
export function fioPresenter(fullname) {
  let result,
    nameParts,
    firstname,
    middlename,
    lastname;

  const regexp = /^(?!.*(_|\/).*)[\D\s]+$/;

  if (!regexp.test(fullname)) {
    nameParts = [];
  } else {
    nameParts = fullname.split(' ');
  }

  nameParts = nameParts.map(capitalize);

  switch (nameParts.length) {
    case 3:
      [ firstname, middlename, lastname ] = nameParts;
      result = `${lastname} ${firstname[ 0 ]}. ${middlename[ 0 ]}.`;
      break;
    case 2:
      [ firstname, lastname ] = nameParts;
      result = `${lastname} ${firstname[ 0 ]}.`;
      break;
    case 1:
      result = capitalize(fullname);
      break;
    default:
      result = 'Invalid fullname';
  }

  return result;
}

export function objectPathResolver(path, obj) {
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[ curr ] : undefined
  }, obj || self)
}

export function checkRgb(rgbColor) {
  const digits = rgbColor.split('(')[ 1 ].split(')')[ 0 ].split(',');

  if (digits.length !== 3) throw new Error('');

  return !!digits.map((x) => {
    if (x > 255) throw new Error('');

    x = parseInt(x).toString(16);

    return (x.length === 1) ? `0${x}` : x;
  }).length;
}

export function checkHsl(hslColor) {
  const values = hslColor.split('(')[ 1 ].split(')')[ 0 ].split(',');

  if (parseInt(values[ 1 ]) < 0 || parseInt(values[ 1 ]) > 100 || values[ 1 ].substr(-1) !== '%') throw new Error('');

  return true;
}
