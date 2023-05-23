const express = require('express');
const router = express.Router();
const ticketManager = require('../Dao/manager').TicketManager;

router.get('/', async (req, res) => {
  try {
    const tickets = await ticketManager.getAll();
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  const ticketId = req.params.id;
  try {
    const ticket = await ticketManager.get(ticketId);
    res.json(ticket);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  const newTicket = req.body;
  try {
    const ticket = await ticketManager.create(newTicket);
    res.json(ticket);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  const ticketId = req.params.id;
  const updatedTicket = req.body;
  try {
    const ticket = await ticketManager.update(ticketId, updatedTicket);
    res.json(ticket);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  const ticketId = req.params.id;
  try {
    const result = await ticketManager.delete(ticketId);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
