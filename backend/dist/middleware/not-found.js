"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res) => res.send(404).send('Route does not exist');
exports.default = notFound;