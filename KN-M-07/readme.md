# Antworten zu KN-M-07: Programmierung mit MongoDB

Dieses Dokument enthält die Dokumentation und die theoretischen Antworten für den Kompetenznachweis **KN-M-07** zur Anbindung von MongoDB mit einer Programmiersprache.

Wir haben eine Node.js-Konsolenapplikation erstellt. Die Quellcodedateien sind wie folgt abgelegt:
*   **Node.js-Skript:** [`app.js`](file:///C:/Projects/M165-Thomas/KN-M-07/app.js)
*   **Package-Konfiguration:** [`package.json`](file:///C:/Projects/M165-Thomas/KN-M-07/package.json)

---

## Projektbeschreibung und Setup

Das Node.js-Skript nutzt den offiziellen **MongoDB Native Driver für Node.js** (`mongodb`), um eine Verbindung zur Fitnessstudio-Datenbank `SternFitness` herzustellen und Programmbefehle auszuführen.

### Installation & Ausführung

1.  **Voraussetzungen:** Node.js (inkl. npm) muss auf dem Zielsystem installiert sein.
2.  **Dependencies installieren:** Navigieren Sie in den Projektordner `KN-M-07` und führen Sie den folgenden Befehl in Ihrem Terminal aus:
    ```bash
    npm install
    ```
    Dies installiert die in der `package.json` definierte native Client-Bibliothek (`mongodb`).
3.  **Applikation starten:** Führen Sie das Skript aus mit:
    ```bash
    node app.js
    ```

---

## Code-Erklärung

Das Skript [`app.js`](file:///C:/Projects/M165-Thomas/KN-M-07/app.js) führt folgende Schritte asynchron durch (mittels ES6 `async/await` Syntax):

1.  **Verbindungsaufbau:**
    ```javascript
    const { MongoClient } = require('mongodb');
    const url = 'mongodb://admin:Thomas-Password@54.147.24.15:27017/SternFitness?authSource=admin';
    const client = new MongoClient(url);
    await client.connect();
    ```
    *Erklärung:* Wir initialisieren den `MongoClient` mit dem vollständigen Connection String. Die Option `authSource=admin` stellt sicher, dass die Zugangsdaten in der Systemdatenbank `admin` verifiziert werden, während die aktive Sitzung danach auf der Datenbank `SternFitness` arbeitet.
2.  **Collection-Daten zählen:**
    Das Skript iteriert über ein Array von Collection-Namen und ruft für jede Collection `db.collection(colName).countDocuments()` auf, um die Anzahl der Einträge auszugeben.
3.  **Trainer abfragen (`find` und `project`):**
    Das Programm fragt Trainer mit einem Gehalt über 5900 CHF ab. Mittels Projektion werden nur die Felder `name`, `gehalt` und `spezialisierung` geladen.
4.  **Komplexe Join-Aggregation (`aggregate` mit `$lookup`):**
    ```javascript
    const pipeline = [
      {
        $lookup: {
          from: 'trainer',
          localField: 'trainer_id',
          foreignField: '_id',
          as: 'trainer_details'
        }
      },
      {
        $project: {
          titel: 1,
          raum: 1,
          leitung: { $arrayElemAt: ['$trainer_details.name', 0] },
          _id: 0
        }
      }
    ];
    const courseJoin = await db.collection('kurse').aggregate(pipeline).toArray();
    ```
    *Erklärung:* Das Programm führt dieselbe relationale Join-Operation wie in KN-M-04 aus. Die Kurse werden mit den Trainer-Dokumenten verknüpft, und das erste Element des verknüpften Trainer-Namen-Arrays wird als flaches Feld `leitung` ausgegeben.
5.  **Verbindung trennen:**
    Im `finally`-Block wird die Verbindung mittels `client.close()` sicher geschlossen, um Ressourcenleckagen (z. B. offene Sockets) zu verhindern.

---

## Visualisierung der Ausführung

Der folgende Screenshot zeigt die erfolgreiche Konsolenausgabe nach dem Ausführen der Anwendung mit `node app.js`:

![Programmausführung node app.js](./screenshots/01_program_execution.png)
