// MongoDB Script zur teilweisen Löschung von Daten für SternFitness (KN-M-03 Teil B)
// Verwendung: load("B_delete_data.js") in mongosh oder mongosh < B_delete_data.js

// 1. In die Zieldatenbank wechseln
use SternFitness;

// 2. Ein einzelnes Dokument mit deleteOne() und _id-Filterung löschen
// Wir suchen das Mitglied "Sam Jones" und loeschen es anhand der ID.
var sam = db.mitglieder.findOne({ name: "Sam Jones" });
if (sam) {
  print("Loesche Mitglied 'Sam Jones' mit ID: " + sam._id);
  var resOne = db.mitglieder.deleteOne({ _id: sam._id });
  print("deleteOne Resultat: " + resOne.deletedCount + " Dokument(e) geloescht.");
} else {
  print("Mitglied 'Sam Jones' nicht gefunden (bereits geloescht?).");
}

// 3. Mehrere Dokumente mit deleteMany() und ODER-Verknüpfung der _id loeschen (aber nicht alle)
// Wir loeschen zwei Geraete: 'Spinning Bike V2' und 'Rudergeraet Air'
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

// 4. Endstand ausgeben
print("Aktuelle Anzahl Dokumente:");
print("Mitglieder: " + db.mitglieder.countDocuments());
print("Geraete: " + db.geraete.countDocuments());
