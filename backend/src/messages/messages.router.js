/**
 * Required External Modules and Interfaces
 */

const express = require("express");
const { getPublicMessage, getProtectedMessage, getRolesMessage} = require("./messages.service");
const { checkJwt } = require("../auth/check-jwt");

/**
 * Router Definition
 */

const messagesRouter = express.Router();

/**
 * Controller Definitions
 */

// GET messages/

messagesRouter.get("/public-message", (req, res) => {
  const message = getPublicMessage();
  console.log("Message: " + message);
  res.status(200).send(message);
});

messagesRouter.get("/protected-message", checkJwt, (req, res) => {
  const message = getProtectedMessage();
  console.log("Message: " + message);
  res.status(200).send(message);
});

messagesRouter.get("/roles-message", checkJwt, (req, res) => {
  const message = getRolesMessage();
  console.log("Message: " + message);
  res.status(200).send(message);
});

module.exports = {
  messagesRouter,
};