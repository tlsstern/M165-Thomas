// MongoDB Script zur Erstellung der Collections für SternFitness
// Verwenden Sie: load("create_collections.js") in mongosh oder führen Sie mongosh < create_collections.js aus.

// 1. In die neue Datenbank wechseln
use SternFitness;

// 2. Collections explizit erstellen
db.createCollection("mitglieder");
db.createCollection("trainer");
db.createCollection("kurse");
db.createCollection("geraete");

// 3. Ausgeben der erstellten Collections zur Überprüfung
print("Erstellte Collections in Datenbank:");
db.getCollectionNames().forEach(print);
