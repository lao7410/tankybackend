const express = require('express');
const router = express.Router();
const { ProductDao, UserDao, OrderDao } = require('../Dao/factory');
const { OrderModel } = require('../Dao/mongo/models/order.model');
const TicketDaoMongo = require('./mongo/TicketDaoMongo');


const ticketDaoMongo = new TicketDaoMongo();

async function getProducts(req, res) {
    const { page, limit, title, code, category, isActive, sort } = req.query;
  
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      sort: sort || '-atCreate',
    };
  
    const query = {};
  
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }
  
    if (code) {
      query.code = { $regex: code, $options: 'i' };
    }
  
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }
  
    if (isActive) {
      query.isActive = isActive === 'true';
    }
  
    try {
      const products = await ProductDao.find(query, options);
      res.json(products);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  router.put('/order/:id', async (req, res) => {
    const orderId = req.params.id;
    const updatedOrder = req.body;
  
    try {
      const order = await OrderDao.update(orderId, updatedOrder);
      res.json(order);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
  
  router.delete('/order/:id', async (req, res) => {
    const orderId = req.params.id;
  
    try {
      const result = await OrderDao.delete(orderId);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
  