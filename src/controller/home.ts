import express, { Request, Response } from "express";
import { jaction } from "../utils/express-utils";
import got from "got";
import _ from "lodash";

import User from "../models/user";
import { Types } from "mongoose";
import Mongo from "../models/mongo";
import { get } from "http";

export function getHomeRouter() {
  return express.Router({ mergeParams: true }).get("/home", jaction(getHome));
}

export async function getHome(req: Request, res: Response) {}
