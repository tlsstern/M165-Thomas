// MongoDB Script zum Löschen aller Collections für SternFitness (KN-M-03 Teil B)
// Verwendung: load("B_drop_collections.js") in mongosh oder mongosh < B_drop_collections.js

// 1. In die Zieldatenbank wechseln
use SternFitness;

// 2. Alle Collections loeschen
print("Loesche Collections in SternFitness...");

var resMitglieder = db.mitglieder.drop();
print("Collection 'mitglieder' geloescht: " + resMitglieder);

var resTrainer = db.trainer.drop();
print("Collection 'trainer' geloescht: " + resTrainer);

var resKurse = db.kurse.drop();
print("Collection 'kurse' geloescht: " + resKurse);

var resGeraete = db.geraete.drop();
print("Collection 'geraete' geloescht: " + resGeraete);

// 3. Verbleibende Collections ausgeben (sollte leer sein)
print("Verbleibende Collections:");
db.getCollectionNames().forEach(print);
