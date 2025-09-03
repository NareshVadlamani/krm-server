import express, { Request, Response } from "express";
import { jaction } from "../utils/express-utils";
import _ from "lodash";

import * as UserService from "../service/user";

/**
 *
 * @swagger
 * definitions :
 *    AddUser:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 */

export function getUserRouter() {
  return express
    .Router({ mergeParams: true })
    .get("/list", jaction(getUserList))
    .post("/sign-up", jaction(signUp));
}

/**
 * @swagger
 * /user/list:
 *  get:
 *   tags:
 *    - Users
 *   summary: API to get user list
 *   description: API to get user list
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 *
 */

async function getUserList() {
  const userList = await UserService.getUserList();
  return userList;
}

/**
 * @swagger
 * /user/add-user:
 *  post:
 *   tags:
 *    - Add user
 *   summary: API to Add user
 *   description: API to Add user
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/AddUser'
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */

async function signUp(req: Request) {
  const { name, email, address } = req.body;
  const user = await UserService.createUser(name, email, address);
  return user;
}
