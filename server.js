import { join, dirname } from "path";
import express from "express";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
// Use JSON file for storage
const file = join(__dirname, "/data/db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

const setUpDb = async (db) => {
  const defaultData = {
    cities: [
      {
        id: 1,
        name: "Hamburg",
        inhabitants: 1800000
      },
      {
        id: 2,
        name: "Köln",
        inhabitants: 1086000
      },
      {
        id: 3,
        name: "Berlin",
        inhabitants: 4000000
      }
    ]
  };
  await db.read();
  if (db.data === null) {
    db.data = defaultData;
    await db.write();
  }
};

setUpDb(db);
app.use(express.json());
app.get("/", async (req, res) => {
  await db.read();
  res.send(db.data);
});

app.get("/cities/:name", async (req, res) => {
  await db.read();
  console.log("Param name: ", req.params.name);
  const city = db.data.cities.find((city) => city.name === req.params.name);
  console.log(city);
  res.send(city);
});

app.patch("/cities/:id", async (req, res) => {
  await db.read();
  const updateData = req.body;
  const cityIndex = db.data.cities.findIndex(
    (city) => city.id === parseInt(req.params.id)
  );
  console.log(cityIndex);
  if (cityIndex > -1) {
    db.data.cities[cityIndex] = { ...db.data.cities[cityIndex], ...updateData };
    await db.write();
    res.send(db.data.cities[cityIndex]);
  } else {
    res.status(500).send("Error: no city to update");
  }
});

app.get("/cities", async (req, res) => {
  await db.read();
  if (db.data.cities.length > 0) res.send(db.data.cities);
  else res.status(500).send("Error: no cities available");
});

app.post("/city/new", async (req, res) => {
  await db.read();
  const ids = db.data.cities.map((c) => {
    return c.id;
  });
  ids.sort((a, b) => b - a);
  const newId = ids[0] + 1;
  const newCity = { ...req.body, id: newId };
  console.log(ids);
  console.log(newId);
  console.log(newCity);
  db.data.cities.push(newCity);
  await db.write();
  res.send(db.data.cities);
});

app.delete("/city/:id", async (req, res) => {
  await db.read();
  const id = Number(req.params.id);
  console.log(id);
  const deleteIndex = db.data.cities.findIndex((city) => city.id === id);
  if (deleteIndex > -1) {
    db.data.cities.splice(deleteIndex, 1);
    await db.write();
    res.send(db.data.cities);
  } else {
    res.status(500).send(`Fehler! Keine Stadt mit id ${id} gefunden.`);
  }
});

app.listen(3000, function () {
  console.log("http://localhost:3000, listening on port 3000");
});


const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
// Use JSON file for storage
const file = join(__dirname, "/data/db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

const setUpDb = async (db) => {
  const defaultData = {
    cars: [
      {
        id: 1,
        name: "Hamburg",
        inhabitants: 1800000
      },
      {
        id: 2,
        name: "Köln",
        inhabitants: 1086000
      },
      {
        id: 3,
        name: "Berlin",
        inhabitants: 4000000
      }
    ]
  };
  await db.read();
  if (db.data === null) {
    db.data = defaultData;
    await db.write();
  }
};

setUpDb(db);
app.use(express.json());
app.get("/", async (req, res) => {
  await db.read();
  res.send(db.data);
});

app.get("/cars/:name", async (req, res) => {
  await db.read();
  console.log("Param name: ", req.params.name);
  const city = db.data.cars.find((city) => city.name === req.params.name);
  console.log(city);
  res.send(city);
});

app.patch("/cars/:id", async (req, res) => {
  await db.read();
  const updateData = req.body;
  const cityIndex = db.data.cars.findIndex(
    (city) => city.id === parseInt(req.params.id)
  );
  console.log(cityIndex);
  if (cityIndex > -1) {
    db.data.cars[cityIndex] = { ...db.data.cars[cityIndex], ...updateData };
    await db.write();
    res.send(db.data.cars[cityIndex]);
  } else {
    res.status(500).send("Error: no city to update");
  }
});

app.get("/cars", async (req, res) => {
  await db.read();
  if (db.data.cars.length > 0) res.send(db.data.cars);
  else res.status(500).send("Error: no cars available");
});

app.post("/city/new", async (req, res) => {
  await db.read();
  const ids = db.data.cars.map((c) => {
    return c.id;
  });
  ids.sort((a, b) => b - a);
  const newId = ids[0] + 1;
  const newCity = { ...req.body, id: newId };
  console.log(ids);
  console.log(newId);
  console.log(newCity);
  db.data.cars.push(newCity);
  await db.write();
  res.send(db.data.cars);
});

app.delete("/city/:id", async (req, res) => {
  await db.read();
  const id = Number(req.params.id);
  console.log(id);
  const deleteIndex = db.data.cars.findIndex((city) => city.id === id);
  if (deleteIndex > -1) {
    db.data.cars.splice(deleteIndex, 1);
    await db.write();
    res.send(db.data.cars);
  } else {
    res.status(500).send(`Fehler! Keine Stadt mit id ${id} gefunden.`);
  }
});


