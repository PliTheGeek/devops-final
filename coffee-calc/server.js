const express = require('express');
const { Pool } = require('pg');
const client = require('prom-client'); 
const path = require('path');
const app = express();
const port = 3000;


const register = new client.Registry();
client.collectDefaultMetrics({ register });

const brewCounter = new client.Counter({
  name: 'coffee_brews_total',
  help: 'Total coffee calculations/brews requested',
  labelNames: ['method']
});
register.registerMetric(brewCounter);


app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});


app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

// Config Database (PostgreSQL)

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});


app.post('/calc', (req, res) => {
  const { type, value, ratio, bloomRatio, pours } = req.body;
  
 
  if (!value || !ratio) {
    return res.status(400).json({ error: "Missing fields" });
  }


  const methodUsed = type === 'coffee' ? 'coffee_based' : 'water_based';
  brewCounter.inc({ method: methodUsed });


  let coffeeWeight, waterWeight;
  if (type === 'coffee') {
    coffeeWeight = parseFloat(value);
    waterWeight = coffeeWeight * parseFloat(ratio);
  } else {
    waterWeight = parseFloat(value);
    coffeeWeight = waterWeight / parseFloat(ratio);
  }


  const bloomAmount = coffeeWeight * parseFloat(bloomRatio);
  const remainingWater = waterWeight - bloomAmount;
  const remainingPoursCount = parseInt(pours) - 1;
  
  let schedule = [];

  schedule.push({
    step: "Bloom",
    amount: parseFloat(bloomAmount.toFixed(1)),
    total: parseFloat(bloomAmount.toFixed(1))
  });
  
 
  if (remainingPoursCount > 0) {
    const amountPerPour = remainingWater / remainingPoursCount;
    let currentTotal = bloomAmount;
    for (let i = 0; i < remainingPoursCount; i++) {
      currentTotal += amountPerPour;
      schedule.push({
        step: `Pour ${i + 2}`,
        amount: parseFloat(amountPerPour.toFixed(1)),
        total: parseFloat(currentTotal.toFixed(1))
      });
    }
  }

  res.json({
    coffee: parseFloat(coffeeWeight.toFixed(1)),
    water: parseFloat(waterWeight.toFixed(1)),
    recipe: schedule
  });
});

//Endpoint store brew log ke Database

app.post('/api/save-brew', async (req, res) => {
  const { coffeeName, method, ratio, coffeeWeight, waterAmount } = req.body;
  try {
    const clientDb = await pool.connect();
    const query = `
      INSERT INTO brew_logs (coffee_name, method, ratio, coffee_weight, water_amount) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;
    const values = [coffeeName, method, ratio, coffeeWeight, waterAmount];
    const result = await clientDb.query(query, values);
    clientDb.release();
    res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

//Test Koneksi DB

app.get('/test-db', async (req, res) => {
  try {
    const clientDb = await pool.connect();
    const result = await clientDb.query('SELECT NOW()');
    clientDb.release();
    res.send(`<h1>✅ Database Terhubung!</h1> <p>Waktu Server DB: ${result.rows[0].now}</p>`);
  } catch (err) {
    console.error(err);
    res.send(`<h1>❌ Gagal Konek Database</h1> <p>${err}</p>`);
  }
});


app.listen(port, () => {
  console.log(`☕ Server jalan di port ${port}`);
});