export default function (req, res) {
  const sum = (Number(req.query.a) || 0) + (Number(req.query.b) || 0);

  return res.send(sum.toString());
}
