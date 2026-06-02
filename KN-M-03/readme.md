# Antworten zu KN-M-03: Datenmanipulation und Abfragen I

Dieses Dokument enthält die Dokumentation und die theoretischen Antworten für den Kompetenznachweis **KN-M-03** zur Datenmanipulation und einfachen Abfragen in MongoDB.

Als Grundlage dient die in **KN-M-02** erstellte Fitnessstudio-Datenbank namens **`SternFitness`** mit den Collections:
*   `mitglieder` (Mitglieder-Daten mit eingebetteter Adresse und Kursanmeldungen)
*   `trainer` (Mitarbeiterdaten)
*   `kurse` (Kursangebote)
*   `geraete` (Physische Trainingsgeräte)

---

## Teil A: Daten hinzufügen

Für alle vier Collections der Datenbank `SternFitness` wurden repräsentative Testdaten hinzugefügt. Das entsprechende JavaScript-Skript ist unter [`A_insert_data.js`](file:///C:/Projects/M165-Thomas/KN-M-03/A_insert_data.js) gespeichert.

### Designentscheidungen & Bedingungen
1.  **Variablen für ObjectIds:** Zur Verknüpfung der Dokumente (z. B. Referenzierung der `trainer_id` im `kurs`-Dokument) wurden `ObjectId`-Instanzen in JavaScript-Variablen (`var trainerId1 = ObjectId();`, etc.) zwischengespeichert. Dies verhindert Hartcodierung und ermöglicht konsistente Beziehungen bei jedem Skriptdurchlauf.
2.  **`insertMany()`:** Wurde für die Collections `trainer`, `geraete` und `kurse` verwendet, um mehrere Testdatensätze effizient in einem einzigen Datenbank-Aufruf zu persistieren.
3.  **`insertOne()`:** Wurde für die Collection `mitglieder` verwendet. Jedes Mitglied wird einzeln mit verschachtelten Adress-Objekten und einem Array von Kursbuchungen eingefügt.

### Visualisierung der Ausführung
Das Skript wurde in `mongosh` geladen. Der folgende Screenshot zeigt die erfolgreiche Befüllung:

![Daten erfolgreich eingefügt](./screenshots/01_insert_data.png)

---

## Teil B: Daten löschen

Die Befehle zur Löschung und Bereinigung von Collections sind in zwei separaten Skripts aufgeteilt:

1.  **Collections löschen (Clean-up):** [`B_drop_collections.js`](file:///C:/Projects/M165-Thomas/KN-M-03/B_drop_collections.js) entfernt alle Collections aus der Datenbank.
2.  **Teilweises Löschen:** [`B_delete_data.js`](file:///C:/Projects/M165-Thomas/KN-M-03/B_delete_data.js) löscht selektiv Datensätze.

### Theorie: `collection.drop()` vs. `deleteMany({})`
> [!NOTE]
> *   **`collection.drop()`** ist eine DDL-Operation (Data Definition Language). Sie löscht die gesamte Collection physisch von der Festplatte, inklusive aller darin definierten Indizes. Da MongoDB keine Zeilen-basierten Löschungen durchführen muss, sondern die Datenstruktur direkt entfernt, ist dies extrem schnell.
> *   **`deleteMany({})`** ist eine DML-Operation (Data Manipulation Language). Sie löscht alle Dokumente *innerhalb* der Collection, behält jedoch die Collection-Struktur und alle Indizes bei. Dies ist bei großen Datenmengen wesentlich langsamer, da jedes Dokument einzeln entfernt und der Indexbaum für jede Löschung aktualisiert werden muss.

### Bedingungen für teilweises Löschen
*   **`deleteOne()` mit `_id`:** Löscht genau ein Dokument (hier das Mitglied "Sam Jones"). Da die `_id` eindeutig (Unique Primary Key) ist, wird garantiert maximal ein Datensatz gelöscht.
*   **`deleteMany()` mit ODER-Verknüpfung:** Löscht mehrere Dokumente anhand einer ODER-Bedingung (`$or`) über deren `_id`s, ohne die gesamte Collection zu leeren. Es wurden gezielt zwei Geräte ("Spinning Bike V2" und "Rudergeraet Air") entfernt.

### Visualisierung der Ausführung
Hier ist der Screenshot der Ausführung beider Löschskripte in der Shell:

*   **Collections löschen:**
    ![Collections gelöscht](./screenshots/02_drop_collections.png)

*   **Teilweises Löschen:**
    ![Daten teilweise gelöscht](./screenshots/03_delete_data.png)

---

## Teil C: Daten abfragen

Die Abfragen sind im Skript [`C_query_data.js`](file:///C:/Projects/M165-Thomas/KN-M-03/C_query_data.js) definiert. Bei allen Abfragen wurde gemäss Vorgabe **nie** über das Feld `_id` gefiltert.

### Erfüllte Kriterien & Erklärungen

1.  **DateTime-Filter (auf Collection `trainer`):**
    ```javascript
    db.trainer.find({ anstellungsdatum: { $gt: ISODate("2024-01-01T00:00:00Z") } })
    ```
    *Erklärung:* Filtert Dokumente anhand eines BSON-Date-Objekts. Der Operator `$gt` (greater than) gibt alle Trainer zurück, die nach dem 1. Januar 2024 angestellt wurden.
2.  **ODER-Verknüpfung (auf Collection `geraete`):**
    ```javascript
    db.geraete.find({ $or: [ { typ: "Kraft" }, { wartungsintervall: 90 } ] })
    ```
    *Erklärung:* Der `$or`-Operator nimmt ein Array von Filterausdrücken entgegen. Ein Dokument entspricht dem Filter, wenn mindestens eine der Bedingungen zutrifft (entweder Kraftgerät ODER Wartungsintervall beträgt 90 Tage).
3.  **UND-Verknüpfung (auf Collection `kurse`):**
    ```javascript
    db.kurse.find({ $and: [ { dauer: { $gte: 50 } }, { maxTeilnehmer: { $lte: 15 } } ] })
    ```
    *Erklärung:* Der `$and`-Operator verlangt, dass alle Bedingungen im Array erfüllt sein müssen (Dauer mindestens 50 Minuten UND maximale Teilnehmeranzahl höchstens 15).
4.  **Regex-Teilstringsuche (auf Collection `trainer`):**
    ```javascript
    db.trainer.find({ name: /kraft/i })
    ```
    *Erklärung:* Sucht im Feld `name` nach dem Teilstring "kraft". Der Modifier `/i` sorgt dafür, dass die Groß-/Kleinschreibung ignoriert wird (Case-Insensitive), sodass "Markus Kraft" gefunden wird.
5.  **Projektion inklusive `_id` (auf Collection `kurse`):**
    ```javascript
    db.kurse.find({ titel: "CrossFit Basics" }, { titel: 1, raum: 1 })
    ```
    *Erklärung:* Schränkt die zurückgegebenen Felder auf `titel` und `raum` ein. Da die `_id` nicht explizit ausgeschlossen wurde, wird sie standardmäßig mit ausgegeben.
6.  **Projektion exklusive `_id` (auf Collection `mitglieder`):**
    ```javascript
    db.mitglieder.find({}, { name: 1, email: 1, _id: 0 })
    ```
    *Erklärung:* Gibt nur `name` und `email` zurück. Durch das Setzen von `_id: 0` wird die standardmässige Mitausgabe des Primärschlüssels unterdrückt.

### Visualisierung der Ausführung
Der Screenshot zeigt die Ausführung des Abfrageskripts und dessen formatierte Ausgaben in der CLI:

![Datenabfragen erfolgreich](./screenshots/04_query_data.png)

---

## Teil D: Daten verändern

Die Modifikationsbefehle sind in [`D_update_data.js`](file:///C:/Projects/M165-Thomas/KN-M-03/D_update_data.js) implementiert.

### Theorie: `updateOne()`, `updateMany()` und `replaceOne()`
*   **`updateOne(filter, update)`:** Sucht das erste Dokument, das dem Filter entspricht, und aktualisiert nur die im Update-Dokument angegebenen Felder (meist über den Operator `$set`). Andere Felder des Dokuments bleiben unberührt.
*   **`updateMany(filter, update)`:** Verhält sich wie `updateOne()`, wendet die Aktualisierung jedoch auf *alle* Dokumente an, die den Filterkriterien entsprechen.
*   **`replaceOne(filter, replacement)`:** Ersetzt das *gesamte* Dokument, das dem Filter entspricht, durch das neue übergebene Dokument. Die bestehenden Felder werden komplett gelöscht und durch die neuen ersetzt (die `_id` bleibt jedoch erhalten). Es werden keine Update-Operatoren wie `$set` verwendet.

### Bedingungen der Datenänderung
1.  **`updateOne()` auf `trainer` via `_id`:** Aktualisiert Gehalt und Spezialisierung des Trainers "Thomas Stern" gezielt über seine eindeutige ID.
2.  **`updateMany()` auf `geraete` ohne `_id` mit ODER-Verknüpfung:** Sucht alle Kardio-Geräte ODER vor 2025 angeschaffte Geräte und setzt deren Wartungsintervall einheitlich auf 90 Tage sowie den Status auf "Wartung ausstehend". Dies betrifft mehrere Geräte.
3.  **`replaceOne()` auf `kurse`:** Ersetzt das Dokument des Kurses "Spinning Power" vollständig mit einem neuen Dokument ("Indoor Cycling Intense"), wobei die `_id` identisch bleibt.

### Visualisierung der Ausführung
Hier ist der Screenshot, der die erfolgreichen Updates und die geänderten Dokumente zeigt:

![Datenänderung erfolgreich](./screenshots/05_update_data.png)

---

## Theoretischer Hintergrund: Connection Strings & Authentifizierung

### Was macht die Option `authSource=admin` im Connection String?

Der Parameter `authSource` bestimmt, in welcher Datenbank MongoDB nach den Zugangsdaten des sich verbindenden Benutzers suchen soll. 

Im Standard-Verbindungsstring:
```text
mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultdb][?options]]
```
Wenn in der URL kein `authSource` angegeben ist, versucht MongoDB standardmäßig, den Benutzer in der Zieldatenbank (`defaultdb`) zu authentifizieren. Wenn wir uns also mit:
```text
mongodb://admin:Thomas-Password@localhost:27017/SternFitness
```
verbinden, sucht MongoDB den Benutzer `admin` in der Datenbank `SternFitness`. Da dieser administrative Benutzer jedoch global in der zentralen Systemdatenbank `admin` angelegt wurde (zur zentralen Benutzerverwaltung), schlägt die Anmeldung fehl.

Durch das Hinzufügen von `?authSource=admin`:
```text
mongodb://admin:Thomas-Password@localhost:27017/SternFitness?authSource=admin
```
wird dem MongoDB-Treiber mitgeteilt, dass die Anmeldedaten des Benutzers `admin` in der Systemdatenbank `admin` verifiziert werden sollen. Nach erfolgreicher Anmeldung wechselt die Verbindung auf die Zieldatenbank `SternFitness` zur Durchführung der Applikationsoperationen.

### Warum ist dieser Parameter in unserem Kontext korrekt?
1.  **Zentralisiertes Usermanagement:** Aus Sicherheitsgründen werden Administrator-Accounts und Dienstbenutzer in der Systemdatenbank `admin` angelegt, anstatt sie über verschiedene Anwendungsdatenbanken hinweg zu verstreuen.
2.  **Rollenbasierte Rechte (RBAC):** Der Benutzer `admin` besitzt Rollen wie `userAdminAnyDatabase` oder `readWriteAnyDatabase`. Diese Privilegien sind an die `admin`-Datenbank gebunden, weshalb sich der Benutzer dort authentifizieren muss.

### Referenz zur offiziellen Dokumentation
Aus dem offiziellen *MongoDB Manual — Connection String Options*:
> *"authSource: Specifies the database name associated with the user's credentials. [...] If you do not specify authSource, it defaults to the database specified in the connection string. If the connection string does not specify a database, it defaults to admin."*
> — Quelle: [MongoDB Connection String Options (authSource)](https://www.mongodb.com/docs/manual/reference/connection-string/#mongodb-urioption-urioption.authSource)
