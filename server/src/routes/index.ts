var express = require('express');
import { Router } from 'express';

export const defaultRoute = Router();

/* GET home page. */
defaultRoute.get('/', function(req, res) {
  res.json({Message: 'Hello, welcome to the main page'})
});

export default defaultRoute