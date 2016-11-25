function capitalize([first, ...rest]) {
  return first.toUpperCase() + rest.join('').toLowerCase();
}

/**
 * @param {string} fullname
 */
export default function fioPresenter(fullname) {
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
      [firstname, middlename, lastname] = nameParts;
      result = `${lastname} ${firstname[0]}. ${middlename[0]}.`;
      break;
    case 2:
      [firstname, lastname] = nameParts;
      result = `${lastname} ${firstname[0]}.`;
      break;
    case 1:
      result = capitalize(fullname);
      break;
    default:
      result = 'Invalid fullname';
  }

  return result;
}
