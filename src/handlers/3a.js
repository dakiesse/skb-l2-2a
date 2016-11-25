import { personalComputerModel as model } from "../models";
import { objectPathResolver } from "../helpers";

export function getMain(req, res) {
  req.params[ 0 ] = req.params[ 0 ] || '';

  if (model().isEmpty()) return res.send('Model is empty', 404);

  let path = req.params[ 0 ]
    .replace(/[.]|[\/]+$/g, '')
    .replace(/\//g, '.');

  if (path !== 'length') path = path.replace(/length/, '');

  const resultObject = path ? objectPathResolver(path, model().attributes) : model().attributes;

  if (resultObject === undefined) return res.send('Not Found', 404);

  res.json(resultObject);
}

export function getVolumes(req, res) {
  if (model().isEmpty()) return res.send('Model is empty', 404);

  let assignHdds = {};

  model().attributes.hdd.forEach((hdd) => {
    assignHdds[ hdd.volume ] = assignHdds[ hdd.volume ] || 0;
    assignHdds[ hdd.volume ] = parseInt(assignHdds[ hdd.volume ]) + hdd.size + `B`;
  });

  return res.json(assignHdds);
}
