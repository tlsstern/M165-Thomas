use SternFitness;

print("=== START DER KOMPLEXEN ABFRAGEN & AGGREGATIONEN ===\n");

print("--- A1. Verkettete $match Stages (UND-Emulation auf 'kurse') ---");
db.kurse.aggregate([
  { $match: { dauer: { $gte: 50 } } },
  { $match: { maxTeilnehmer: { $lte: 15 } } }
]).forEach(printjson);

print("\n--- A2. $match, $project und $sort Pipeline auf 'trainer' ---");
db.trainer.aggregate([
  { $match: { gehalt: { $gt: 5000 } } },
  { $project: { _id: 0, name: 1, monatsgehalt: "$gehalt", spezialisierung: 1 } },
  { $sort: { monatsgehalt: -1 } }
]).forEach(printjson);

print("\n--- A3. $sum Aggregation zur Berechnung der Gehaltssumme aller Trainer ---");
db.trainer.aggregate([
  {
    $group: {
      _id: "Gesamtsumme Gehaelter",
      totalGehalt: { $sum: "$gehalt" },
      anzahlTrainer: { $sum: 1 }
    }
  }
]).forEach(printjson);

print("\n--- A4. $group Aggregation (Geraete gruppiert nach Typ) ---");
db.geraete.aggregate([
  {
    $group: {
      _id: "$typ",
      anzahlGeraete: { $sum: 1 },
      durchschnittsWartungTage: { $avg: "$wartungsintervall" }
    }
  }
]).forEach(printjson);

print("\n--- B1. Join-Aggregation: Kurse mit Trainer-Details verknuepfen ---");
db.kurse.aggregate([
  {
    $lookup: {
      from: "trainer",
      localField: "trainer_id",
      foreignField: "_id",
      as: "trainer_details"
    }
  },
  {
    $project: {
      titel: 1,
      raum: 1,
      "leitung": { $arrayElemAt: ["$trainer_details.name", 0] }
    }
  }
]).forEach(printjson);

print("\n--- B2. Komplexe Join-Aggregation: Filterung nach Spezialisierung des Trainers ---");
db.kurse.aggregate([
  {
    $lookup: {
      from: "trainer",
      localField: "trainer_id",
      foreignField: "_id",
      as: "trainer_info"
    }
  },
  {
    $match: {
      "trainer_info.spezialisierung": /yoga/i
    }
  },
  {
    $project: {
      _id: 0,
      titel: 1,
      raum: 1,
      trainer_name: { $arrayElemAt: ["$trainer_info.name", 0] },
      trainer_spez: { $arrayElemAt: ["$trainer_info.spezialisierung", 0] }
    }
  }
]).forEach(printjson);

print("\n--- C1. Mitgliederabfrage mit Projektion auf eingebettete Adressfelder ---");
db.mitglieder.find(
  {},
  { _id: 0, name: 1, "adresse.strasse": 1, "adresse.ort": 1 }
).forEach(printjson);

print("\n--- C2. Filterung nach Feldern von Unterdokumenten (ort == 'Zuerich') ---");
db.mitglieder.find(
  { "adresse.ort": "Zuerich" },
  { name: 1, "adresse.ort": 1 }
).forEach(printjson);

print("\n--- C3. $unwind Aggregation zur Verflachung der Kursbuchungs-Arrays ---");
db.mitglieder.aggregate([
  { $match: { kurs_anmeldungen: { $exists: true, $not: { $size: 0 } } } },
  { $unwind: "$kurs_anmeldungen" },
  {
    $project: {
      _id: 0,
      mitglied: "$name",
      kurs_id: "$kurs_anmeldungen.kurs_id",
      anmeldedatum: "$kurs_anmeldungen.anmeldedatum",
      status: "$kurs_anmeldungen.status"
    }
  }
]).forEach(printjson);
