use SternFitness;

var sam = db.mitglieder.findOne({ name: "Sam Jones" });
if (sam) {
  print("Loesche Mitglied 'Sam Jones' mit ID: " + sam._id);
  var resOne = db.mitglieder.deleteOne({ _id: sam._id });
  print("deleteOne Resultat: " + resOne.deletedCount + " Dokument(e) geloescht.");
} else {
  print("Mitglied 'Sam Jones' nicht gefunden (bereits geloescht?).");
}

var bike = db.geraete.findOne({ bezeichnung: "Spinning Bike V2" });
var ruder = db.geraete.findOne({ bezeichnung: "Rudergeraet Air" });

if (bike && ruder) {
  print("Loesche Geraete '" + bike.bezeichnung + "' (" + bike._id + ") und '" + ruder.bezeichnung + "' (" + ruder._id + ") via $or...");
  var resMany = db.geraete.deleteMany({
    $or: [
      { _id: bike._id },
      { _id: ruder._id }
    ]
  });
  print("deleteMany Resultat: " + resMany.deletedCount + " Dokument(e) geloescht.");
} else {
  print("Geraete fuer ODER-Loeschung nicht gefunden.");
}

print("Aktuelle Anzahl Dokumente:");
print("Mitglieder: " + db.mitglieder.countDocuments());
print("Geraete: " + db.geraete.countDocuments());
