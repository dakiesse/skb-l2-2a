export default function (req, res) {
  const rawUsernameParts = req.query.username.trim().split('//'); // remove any protocols
  const re = /^([A-Z\.:+\d-]+\/)?@?([\w.-_]+)((\?|\/).*)?$/i;

  let result;

  switch (rawUsernameParts.length) {
    case 2:
      rawUsernameParts[ 0 ] = rawUsernameParts[ 1 ]; // non-break
    case 1:
      result = rawUsernameParts[ 0 ].match(re)[ 2 ];
      break;
    default:
      result = 'Invalid username';
  }

  return res.send(`@${result}`);
}
