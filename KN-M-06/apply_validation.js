// MongoDB Script zur Registrierung der JSON Schemas (KN-M-06 Teil B)
// Verwendung: load("apply_validation.js") in mongosh

// Zieldatenbank verwenden
use SternFitness;

print("Hinterlege JSON-Schema Validierung fuer Collections...");

// Validator fuer 'trainer' setzen
db.runCommand({
  collMod: "trainer",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "spezialisierung", "gehalt", "anstellungsdatum"],
      properties: {
        name: { bsonType: "string" },
        spezialisierung: { bsonType: "string" },
        gehalt: { bsonType: "double", minimum: 0 },
        anstellungsdatum: { bsonType: "date" }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});

// Validator fuer 'geraete' setzen
db.runCommand({
  collMod: "geraete",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["bezeichnung", "typ", "anschaffungsdatum", "wartungsintervall"],
      properties: {
        bezeichnung: { bsonType: "string" },
        typ: { bsonType: "string", enum: ["Kardio", "Kraft", "Freihantel", "Zubehoer"] },
        anschaffungsdatum: { bsonType: "date" },
        wartungsintervall: { bsonType: "int", minimum: 1 }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});

// Validator fuer 'kurse' setzen
db.runCommand({
  collMod: "kurse",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["titel", "raum", "dauer", "maxTeilnehmer", "trainer_id"],
      properties: {
        titel: { bsonType: "string" },
        raum: { bsonType: "string" },
        dauer: { bsonType: "int", minimum: 15, maximum: 180 },
        maxTeilnehmer: { bsonType: "int", minimum: 1 },
        trainer_id: { bsonType: "objectId" }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});

// Validator fuer 'mitglieder' setzen
db.runCommand({
  collMod: "mitglieder",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "geschlecht", "email", "geburtsdatum", "eintrittsdatum", "adresse"],
      properties: {
        name: { bsonType: "string" },
        geschlecht: { bsonType: "string", enum: ["M", "W", "D"] },
        email: { bsonType: "string", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
        telefon: { bsonType: "string" },
        geburtsdatum: { bsonType: "date" },
        eintrittsdatum: { bsonType: "date" },
        adresse: {
          bsonType: "object",
          required: ["strasse", "plz", "ort"],
          properties: {
            strasse: { bsonType: "string" },
            plz: { bsonType: "int" },
            ort: { bsonType: "string" }
          }
        },
        kurs_anmeldungen: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["kurs_id", "anmeldedatum", "status"],
            properties: {
              kurs_id: { bsonType: "objectId" },
              anmeldedatum: { bsonType: "date" },
              status: { bsonType: "string", enum: ["aktiv", "storniert", "warteliste"] }
            }
          }
        }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});

print("--- Validierungen erfolgreich hinterlegt ---");

// Auslesen der Validierung zur Kontrolle
print("Ueberpruefe Validierung der Collection 'trainer':");
printjson(db.getCollectionInfos({ name: "trainer" })[0].options.validator);
