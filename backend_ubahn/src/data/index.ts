/**
 * Contains the read raw data from `lines.json`.
 */

import { Line } from "../domain/Line";

export const lines = require("./lines.json") as Line[];

export const graph = require("./graph.json") as object;