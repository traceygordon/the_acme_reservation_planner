const express = require("express");
const app = express();
const db = require("./db");

app.use(express.json());

app.get("/api/customers", async (req, res, next) => {
  try {
    const result = await db.fetchCustomers(req.body);
    res.send(result);
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/restaurants", async (req, res, next) => {
  try {
    const result = await db.fetchRestaurants(req.body);
    res.send(result);
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/reservations", async (req, res, next) => {
  try {
    const result = await db.fetchReservations(req.body);
    res.send(result);
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/customers", async (req, res, next) => {
  try {
    const result = await db.createCustomer(req.body.name);
    res.send(result);
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/customers/:customer_id/reservations", async (req, res, next) => {
  const { customer_id } = req.params;
  const { restaurant_id, date, party_count } = req.body;

  try {
    const response = await db.createReservation({
      customerName: customer_id,
      restaurantName: restaurant_id,
      date: date,
      partyCount: party_count,
    });
    res.sendStatus(201).json(response);
  } catch (ex) {
    next(ex);
  }
});

app.delete(
  "/api/customers/:customer_id/reservations/:id",
  async (req, res, next) => {
    const {id, customer_id} = req.params;
    try {
      await db.createReservation({
        id: id,
        customer_id: customer_id,
      });
      res.sendStatus(204);
    } catch (ex) {
      next(ex);
    }
  }
);

const init = async () => {
  await db.init();
  app.listen(3000, () => console.log("listening on port 3000"));
};

init();
