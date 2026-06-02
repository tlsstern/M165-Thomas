// MongoDB Script zur Benutzererstellung für SternFitness (KN-M-05 Teil A)
// Verwendung: Führen Sie das Skript als admin aus:
// mongosh -u admin -p Thomas-Password --authenticationDatabase admin < create_users.js

// 1. Benutzer 1 erstellen (Nur Lesen, Authentifizierungsdatenbank: SternFitness)
// In die Themendatenbank wechseln, damit der Benutzer physisch dort angelegt wird
use SternFitness;

print("Erstelle Benutzer 1 (leser)...");
db.createUser({
  user: "leser",
  pwd: "Thomas-Password",
  roles: [
    { role: "read", db: "SternFitness" }
  ]
});

// 2. Benutzer 2 erstellen (Lesen und Schreiben, Authentifizierungsdatenbank: admin)
// In die admin Datenbank wechseln, damit der Benutzer physisch dort angelegt wird
use admin;

print("Erstelle Benutzer 2 (schreiber)...");
db.createUser({
  user: "schreiber",
  pwd: "Thomas-Password",
  roles: [
    { role: "readWrite", db: "SternFitness" }
  ]
});

print("--- Benutzererstellung abgeschlossen ---");
