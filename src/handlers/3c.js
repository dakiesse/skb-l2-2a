import Pokemon from '../models/Pokemon';

let defaultOffset = 0;
let defaultLimit = 20;

export function middleware(req, res, next) {
    req.share = {
        model: new Pokemon,
        offset: Number(req.query.offset) || defaultOffset,
        limit: Number(req.query.limit) || defaultLimit,
    };

    next();
}

export function getAll(req, res) {
    let data = req.share.model
        .sortByField('name')
        .toArrayOnly('name')
        .slice(req.share.offset, req.share.offset + req.share.limit);


    res.json(data);
}

export function getHuge(req, res) {
    let data = req.share.model
        .sortByField('name')
        .sortByField('height', false)
        .toArrayOnly('name')
        .slice(req.share.offset, req.share.offset + req.share.limit);


    res.json(data);
}

export function getMicro(req, res) {
    let data = req.share.model
        .sortByField('name')
        .sortByField('height')
        .toArrayOnly('name')
        .slice(req.share.offset, req.share.offset + req.share.limit);


    res.json(data);
}

export function getLight(req, res) {
    let data = req.share.model
        .sortByField('name')
        .sortByField('weight')
        .toArrayOnly('name')
        .slice(req.share.offset, req.share.offset + req.share.limit);


    res.json(data);
}

export function getHeavy(req, res) {
    let data = req.share.model
        .sortByField('name')
        .sortByField('weight', false)
        .toArrayOnly('name')
        .slice(req.share.offset, req.share.offset + req.share.limit);


    res.json(data);
}

export function getAngular(req, res) {
    let data = req.share.model
        .sortAngular()
        .toArrayOnly('name')
        .slice(req.share.offset, req.share.offset + req.share.limit);


    res.json(data);
}

export function getFat(req, res) {
    let data = req.share.model
        .sortFat()
        .toArrayOnly('name')
        .slice(req.share.offset, req.share.offset + req.share.limit);

    res.json(data);
}
