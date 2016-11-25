import colorcolor from "colorcolor";
import { checkRgb, checkHsl } from "../helpers";

export default function (req, res) {
  let result;

  const hexRe = /^[#]?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  const rgbaRe = /^rgba?/;
  const hslRe = /^hsl/;

  try {
    let rawAnyColor = req.query.color.trim().toLowerCase()
      .replace(/%23/g, '#')
      .replace(/%20/g, '')
      .replace(/\s/g, '');

    if (hexRe.test(rawAnyColor)) {
      if (rawAnyColor[ 0 ] !== '#') rawAnyColor = `#${rawAnyColor}`;

      result = colorcolor(rawAnyColor, 'hex');
    } else if (rgbaRe.test(rawAnyColor) && checkRgb(rawAnyColor)) {
      result = colorcolor(rawAnyColor, 'hex');
    } else if (hslRe.test(rawAnyColor) && checkHsl(rawAnyColor)) {
      result = colorcolor(rawAnyColor, 'hex');
    } else {
      throw new Error();
    }

    return res.send(result);
  } catch (e) {
    return res.send('Invalid color');
  }
}
