use SternFitness;

const gewuenschteCollections = ["mitglieder", "trainer", "kurse", "geraete"];

gewuenschteCollections.forEach(function (name) {
  if (db.getCollectionNames().indexOf(name) === -1) {
    db.createCollection(name);
    print("Collection '" + name + "' wurde erstellt.");
  } else {
    print("Collection '" + name + "' existiert bereits.");
  }
});

print("\nVorhandene Collections in 'SternFitness':");
db.getCollectionNames().forEach(name => print("  - " + name));
