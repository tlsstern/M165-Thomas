use SternFitness;

if (db.getUsers().users.some(u => u.user === "leser")) {
  db.dropUser("leser");
}
print("Erstelle Benutzer 1 (leser)...");
db.createUser({
  user: "leser",
  pwd: "Thomas-Password",
  roles: [
    { role: "read", db: "SternFitness" }
  ]
});

use admin;

if (db.getUsers().users.some(u => u.user === "schreiber")) {
  db.dropUser("schreiber");
}
print("Erstelle Benutzer 2 (schreiber)...");
db.createUser({
  user: "schreiber",
  pwd: "Thomas-Password",
  roles: [
    { role: "readWrite", db: "SternFitness" }
  ]
});

print("--- Benutzererstellung abgeschlossen ---");
