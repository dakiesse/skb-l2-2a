import { fioPresenter } from "../helpers";

export default function (req, res) {
  const fullname = req.query.fullname
    .trim()
    .toLowerCase()
    .replace(/\s\s+/g, ' '); // Remove multiple whitespaces

  const presentedFullName = fioPresenter(fullname);

  return res.send(presentedFullName);
}
