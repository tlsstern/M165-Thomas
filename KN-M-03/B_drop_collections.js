use SternFitness;

print("Loesche Collections in SternFitness...");

var resMitglieder = db.mitglieder.drop();
print("Collection 'mitglieder' geloescht: " + resMitglieder);

var resTrainer = db.trainer.drop();
print("Collection 'trainer' geloescht: " + resTrainer);

var resKurse = db.kurse.drop();
print("Collection 'kurse' geloescht: " + resKurse);

var resGeraete = db.geraete.drop();
print("Collection 'geraete' geloescht: " + resGeraete);

print("Verbleibende Collections:");
db.getCollectionNames().forEach(name => print("  - " + name));
