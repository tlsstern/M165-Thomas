// MongoDB Script zur Dateninfügung für SternFitness (KN-M-03 Teil A)
// Verwendung: load("A_insert_data.js") in mongosh oder mongosh < A_insert_data.js

// 1. In die Zieldatenbank wechseln
use SternFitness;

// 2. ObjectIds als Variablen definieren (Keine hartcodierten IDs in den Daten)
var trainerId1 = ObjectId();
var trainerId2 = ObjectId();
var trainerId3 = ObjectId();

var geraetId1 = ObjectId();
var geraetId2 = ObjectId();
var geraetId3 = ObjectId();
var geraetId4 = ObjectId();

var kursId1 = ObjectId();
var kursId2 = ObjectId();
var kursId3 = ObjectId();

var mitgliedId1 = ObjectId();
var mitgliedId2 = ObjectId();
var mitgliedId3 = ObjectId();
var mitgliedId4 = ObjectId();

// 3. Trainer einfügen (3 Datensätze) - Verwendung von insertMany
db.trainer.insertMany([
  {
    _id: trainerId1,
    name: "Thomas Stern",
    spezialisierung: "CrossFit, Personal Training",
    gehalt: 6200.00,
    anstellungsdatum: ISODate("2024-01-15T08:00:00Z")
  },
  {
    _id: trainerId2,
    name: "Sarah Meier",
    spezialisierung: "Yoga, Pilates",
    gehalt: 5800.00,
    anstellungsdatum: ISODate("2024-03-01T09:00:00Z")
  },
  {
    _id: trainerId3,
    name: "Markus Kraft",
    spezialisierung: "Kraftsport, Bodybuilding",
    gehalt: 6000.00,
    anstellungsdatum: ISODate("2023-11-10T08:30:00Z")
  }
]);

// 4. Geräte einfügen (4 Datensätze) - Verwendung von insertMany
db.geraete.insertMany([
  {
    _id: geraetId1,
    bezeichnung: "Laufband ProX",
    typ: "Kardio",
    anschaffungsdatum: ISODate("2025-01-10T00:00:00Z"),
    wartungsintervall: 90
  },
  {
    _id: geraetId2,
    bezeichnung: "Hantelbank Pro",
    typ: "Kraft",
    anschaffungsdatum: ISODate("2024-06-15T00:00:00Z"),
    wartungsintervall: 180
  },
  {
    _id: geraetId3,
    bezeichnung: "Spinning Bike V2",
    typ: "Kardio",
    anschaffungsdatum: ISODate("2025-02-20T00:00:00Z"),
    wartungsintervall: 60
  },
  {
    _id: geraetId4,
    bezeichnung: "Rudergeraet Air",
    typ: "Kardio",
    anschaffungsdatum: ISODate("2024-09-05T00:00:00Z"),
    wartungsintervall: 120
  }
]);

// 5. Kurse einfügen (3 Datensätze) - Verwendung von insertMany
db.kurse.insertMany([
  {
    _id: kursId1,
    titel: "CrossFit Basics",
    raum: "Sektor A",
    dauer: 60,
    maxTeilnehmer: 15,
    trainer_id: trainerId1
  },
  {
    _id: kursId2,
    titel: "Yoga fuer Anfaenger",
    raum: "Sektor B (Spiegel)",
    dauer: 45,
    maxTeilnehmer: 20,
    trainer_id: trainerId2
  },
  {
    _id: kursId3,
    titel: "Spinning Power",
    raum: "Kardio-Raum 1",
    dauer: 50,
    maxTeilnehmer: 12,
    trainer_id: trainerId1
  }
]);

// 6. Mitglieder einfügen (4 Datensätze) - Verwendung von insertOne für jedes Dokument
db.mitglieder.insertOne({
  _id: mitgliedId1,
  name: "Hans Mueller",
  geschlecht: "M",
  email: "hans.mueller@example.com",
  telefon: "+41 79 123 45 67",
  geburtsdatum: ISODate("1990-05-12T00:00:00Z"),
  eintrittsdatum: ISODate("2025-02-01T00:00:00Z"),
  adresse: {
    strasse: "Hauptstrasse 15",
    plz: 8001,
    ort: "Zuerich"
  },
  kurs_anmeldungen: [
    {
      kurs_id: kursId1,
      anmeldedatum: ISODate("2025-02-02T10:00:00Z"),
      status: "aktiv"
    },
    {
      kurs_id: kursId3,
      anmeldedatum: ISODate("2025-02-05T14:30:00Z"),
      status: "warteliste"
    }
  ]
});

db.mitglieder.insertOne({
  _id: mitgliedId2,
  name: "Anna Schmid",
  geschlecht: "W",
  email: "anna.schmid@example.com",
  telefon: "+41 79 987 65 43",
  geburtsdatum: ISODate("1995-10-22T00:00:00Z"),
  eintrittsdatum: ISODate("2025-03-01T00:00:00Z"),
  adresse: {
    strasse: "Bahnhofstrasse 2",
    plz: 8400,
    ort: "Winterthur"
  },
  kurs_anmeldungen: [
    {
      kurs_id: kursId2,
      anmeldedatum: ISODate("2025-03-02T09:15:00Z"),
      status: "aktiv"
    }
  ]
});

db.mitglieder.insertOne({
  _id: mitgliedId3,
  name: "Sam Jones",
  geschlecht: "D",
  email: "sam.jones@example.com",
  telefon: "+41 78 555 44 33",
  geburtsdatum: ISODate("1988-08-08T00:00:00Z"),
  eintrittsdatum: ISODate("2025-01-10T00:00:00Z"),
  adresse: {
    strasse: "Wiesenweg 7",
    plz: 8600,
    ort: "Duebendorf"
  },
  kurs_anmeldungen: []
});

db.mitglieder.insertOne({
  _id: mitgliedId4,
  name: "Felix Meier",
  geschlecht: "M",
  email: "felix.meier@example.com",
  telefon: "+41 79 222 33 44",
  geburtsdatum: ISODate("2002-04-18T00:00:00Z"),
  eintrittsdatum: ISODate("2025-04-01T00:00:00Z"),
  adresse: {
    strasse: "Zuercherstrasse 101",
    plz: 8004,
    ort: "Zuerich"
  },
  kurs_anmeldungen: [
    {
      kurs_id: kursId1,
      anmeldedatum: ISODate("2025-04-02T11:00:00Z"),
      status: "aktiv"
    }
  ]
});

// 7. Kontrollausgabe
print("--- Datenbefuellung abgeschlossen ---");
print("Trainer eingefuegt: " + db.trainer.countDocuments());
print("Geraete eingefuegt: " + db.geraete.countDocuments());
print("Kurse eingefuegt: " + db.kurse.countDocuments());
print("Mitglieder eingefuegt: " + db.mitglieder.countDocuments());
