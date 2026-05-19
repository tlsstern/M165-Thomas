# Antworten zu KN-M-01

## Teil A: Installation
**Was macht die Option `authSource=admin` im Connection String und wieso ist dieser Parameter korrekt?**
Dieser Parameter gibt an, in welcher Datenbank die Authentifizierungsinformationen des Benutzers liegen. Standardmäßig werden Administrationsbenutzer in der `admin`-Datenbank gespeichert. Wenn wir uns verbinden, teilt `authSource=admin` der Datenbank mit, dass sie in der `admin`-Datenbank nachschauen soll, ob die Anmeldedaten korrekt sind, auch wenn wir vielleicht auf eine andere Datenbank zugreifen möchten.

**Erklärung der beiden `sed`-Befehle im cloud-init:**
In der Standardinstallation lässt MongoDB nur lokale Verbindungen (`127.0.0.1`) zu und erfordert keine Authentifizierung.
1. Der erste `sed`-Befehl ändert meistens die `bindIp` in der Konfigurationsdatei (`/etc/mongod.conf`) von `127.0.0.1` auf `0.0.0.0`. Dies ist notwendig, damit die Datenbank über das Netzwerk/Internet von aussen erreichbar ist.
2. Der zweite `sed`-Befehl aktiviert die Authentifizierung (`authorization: enabled` unter dem Abschnitt `security`). Ohne diesen Befehl könnte jeder, der die IP kennt, ohne Passwort auf die Datenbank zugreifen, was ein enormes Sicherheitsrisiko darstellt.

## Teil B: Erste Schritte GUI
**Wieso ist dieser komplizierte Weg notwendig, um ein Datum zu definieren (Implikationen auf andere Datentypen)?**
Standard-JSON hat keine nativen Datentypen für Datumswerte (es kennt nur String, Number, Boolean, Null, Array, Object). Wenn man in einem gewöhnlichen JSON-Dokument ein Datum als Text (`"2023-10-01"`) eingibt, wird es in MongoDB auch nur als String gespeichert. Um MongoDB direkt beim Einfügen mitzuteilen, dass es ein echtes Datum (Date) ist, müsste man *MongoDB Extended JSON* verwenden (z.B. `{"$date": "2023-10-01T00:00:00Z"}`). Dieser Weg ist notwendig, da die MongoDB intern BSON (Binary JSON) verwendet, welches viel mehr Datentypen (wie Date, ObjectId, etc.) unterstützt als das reine Text-JSON.

## Teil C: Erste Schritte Shell
**Was machen die Befehle 1-5?**
1. `show dbs;` - Zeigt alle vorhandenen Datenbanken auf dem Server an.
2. `show databases;` - Ist ein Alias für `show dbs;` und macht exakt dasselbe.
3. `use <Datenbank>;` - Wechselt zur angegebenen Datenbank. Falls sie nicht existiert, wird sie im Speicher vorbereitet (und beim ersten Speichern von Daten physisch angelegt).
4. `show collections;` - Zeigt alle Collections in der aktuell ausgewählten Datenbank an.
5. `show tables;` - Ist ein Alias für `show collections;` (abgeleitet aus der SQL-Sprache) und macht dasselbe.

**Was ist der Unterschied zwischen Collections und Tables?**
*Tables (Tabellen)* werden in relationalen (SQL) Datenbanken verwendet und besitzen ein striktes Schema. Jede Zeile in einer Tabelle muss die gleichen Spalten mit fest definierten Datentypen haben.
*Collections* werden in NoSQL-Datenbanken wie MongoDB verwendet. Sie enthalten Dokumente (BSON) und sind schemalos. Das bedeutet, dass Dokumente innerhalb derselben Collection völlig unterschiedliche Strukturen, Felder und Datentypen haben können.

## Teil D: Rechte und Rollen
**Skript zum Erstellen der Benutzer:**
*(Hinweis: Ersetzen Sie `Muster` mit dem Namen Ihrer Zieldatenbank, also Ihrem Nachnamen)*

```javascript
// Benutzer 1 erstellen (Nur Lesen, Authentifizierungsdatenbank: Eigene Datenbank)
use Muster;
db.createUser({
  user: "user1",
  pwd: "password1",
  roles: [ { role: "read", db: "Muster" } ]
});

// Benutzer 2 erstellen (Lesen & Schreiben, Authentifizierungsdatenbank: admin)
use admin;
db.createUser({
  user: "user2",
  pwd: "password2",
  roles: [ { role: "readWrite", db: "Muster" } ]
});
```
