# Antworten zu KN-M-05: Administration von MongoDB

Dieses Dokument enthält die Dokumentation und die theoretischen Antworten für den Kompetenznachweis **KN-M-05** zur Administration von MongoDB.

Die entsprechenden Javascript-Befehle zur Benutzererstellung sind im Skript [`create_users.js`](file:///C:/Projects/M165-Thomas/KN-M-05/create_users.js) zu finden.

---

## Teil A: Rechte und Rollen

In diesem Teil zeigen wir die Relevanz der Authentifizierungsquelle (`authSource`) und konfigurieren zwei unterschiedliche Benutzer.

### 1. Falsche Authentifizierungsquelle (`authSource`)
Administrationsbenutzer werden standardmäßig in der Systemdatenbank `admin` gespeichert. Wenn sich ein Benutzer mit:
```text
mongodb://schreiber:Thomas-Password@localhost:27017/SternFitness?authSource=SternFitness
```
verbindet, schlägt die Authentifizierung fehl, da der Benutzer `schreiber` in der Datenbank `SternFitness` gesucht wird, dort aber nicht definiert ist. 

Der folgende Screenshot zeigt den daraus resultierenden Fehler:
![Falsche authSource Fehler](./screenshots/01_wrong_authsource.png)

### 2. Benutzer-Konfiguration für die Zieldatenbank
*   **Benutzer 1 (`leser`):** Darf Daten nur lesen (`read`-Rolle auf `SternFitness`). Authentifizierungsdatenbank ist die Themendatenbank `SternFitness`.
*   **Benutzer 2 (`schreiber`):** Darf Daten lesen und schreiben (`readWrite`-Rolle auf `SternFitness`). Authentifizierungsdatenbank ist `admin`.

#### Visualisierung der Benutzerrechte

*   **Benutzer 1 (`leser`):** Kann Daten erfolgreich lesen, wirft jedoch bei Schreibversuchen (`insertOne`) einen Autorisierungsfehler:
    ![User 1 Leserechte und Schreibfehler](./screenshots/02_user1_rights.png)

*   **Benutzer 2 (`schreiber`):** Kann erfolgreich Daten lesen und schreiben:
    ![User 2 Lese- und Schreibrechte](./screenshots/03_user2_rights.png)

---

## Teil B: Backup und Restore

Wir haben beide geforderten Backup-Methoden implementiert und dokumentiert:

### Backup Variante 1: AWS Volume Snapshots (Infrastruktur-Backup)

Bei dieser Variante wird ein physisches Backup des EBS-Volume der EC2-Instanz durchgeführt. Dies sichert die Datenbank auf Dateisystemebene.

1.  **Snapshot des Volumes erstellen:**
    Über das AWS CLI (oder die AWS Management Console) wird ein Snapshot des Volumes `vol-0f6a27e35b719c8d2` der EC2-Instanz `i-0d86506da93613f37` erstellt.
    ```bash
    aws ec2 create-snapshot --volume-id vol-0f6a27e35b719c8d2 --description "MongoDB SternFitness Backup KN-M-05"
    ```
    *Visualisierung der Snapshot-Erstellung (AWS CLI):*
    ![AWS Snapshot Erstellung](./screenshots/05_aws_snapshot.png)

2.  **Simulation eines Datenverlusts (Löschen der Collection):**
    Wir löschen die Collection `trainer` über die Shell (`db.trainer.drop()`), um einen Datenverlust zu simulieren. Die Abfrage nach dem Löschen liefert keine Ergebnisse mehr und `show collections;` listet die Collection nicht mehr auf.
    *Visualisierung der Datenlöschung (Datenbank leer):*
    ![Daten gelöscht](./screenshots/06_aws_deleted.png)

3.  **Wiederherstellung des Volumes aus dem Snapshot:**
    *   Aus dem erstellten Snapshot wird ein neues Volume in derselben Availability Zone (AZ) erstellt.
    *   Der MongoDB-Daemon auf dem Server wird gestoppt: `sudo systemctl stop mongod`.
    *   Das alte Volume wird detached und das neue, aus dem Snapshot erstellte Volume wird an die Instanz attached (unter demselben Device-Namen, z. B. `/dev/xvda` bzw. `/dev/nvme0n1`).
    *   Der MongoDB-Daemon wird wieder gestartet: `sudo systemctl start mongod`.
    *   Nach dem Mounten des Volumes sind die Daten wieder im ursprünglichen Zustand verfügbar. Die Collection `trainer` und alle ihre 3 Dokumente sind wieder da.
    **Visualisierung der Datenwiederherstellung (Daten wieder da):*
    ![Daten wiederhergestellt](./screenshots/07_aws_restored.png)

### Backup Variante 2: MongoDB Database Tools (Logisches Backup)
Die Database Tools (`mongodump` und `mongorestore`) führen ein logisches Backup der Datenbankinhalte in Form von BSON/JSON-Dateien aus.

1.  **Backup erstellen:**
    ```bash
    mongodump --username admin --password Thomas-Password --authenticationDatabase admin --db SternFitness --out /home/ubuntu/backup/
    ```
2.  **Löschen:** Die Datenbank `SternFitness` wird über `mongosh` mit `db.dropDatabase()` vollständig gelöscht.
3.  **Wiederherstellung:**
    ```bash
    mongorestore --username admin --password Thomas-Password --authenticationDatabase admin --db SternFitness /home/ubuntu/backup/SternFitness/
    ```

*Visualisierung der Database Tools:*
![mongodump und mongorestore](./screenshots/04_backup_tools.png)

---

## Teil C: Skalierung (Theorie & Empfehlung)

### Unterschied zwischen Replication (Replikation) und Partitioning (Sharding)

| Kriterium | Replication (Replica Set) | Partitioning (Sharding) |
| :--- | :--- | :--- |
| **Zweck** | **Ausfallsicherheit & Hochverfügbarkeit.** Daten werden redundant auf mehreren Knoten gesichert. | **Leistung & Speicherplatz (Skalierung).** Große Datenmengen werden horizontal aufgeteilt. |
| **Datenverteilung** | Jeder Knoten besitzt eine **vollständige Kopie** aller Daten. | Jedes Shard besitzt nur einen **Teilbereich (Partition)** der Daten. |
| **Skalierungstyp** | Skaliert hauptsächlich die **Leseleistung** (Read Scalability), da von Secondaries gelesen werden kann. | Skaliert sowohl **Schreib- als auch Leseleistung** (Write & Read Scalability) horizontal. |
| **Komplexität** | Gering. Einfach einzurichten und zu verwalten. | Hoch. Benötigt Config-Server und Router (`mongos`), um Abfragen an die richtigen Shards zu leiten. |

#### Illustrationen
```text
[Replication / Replica Set]
    +-------------------+
    | Primary (Schreibt)|
    +---------+---------+
              | (Replikation der Oplog)
      +-------+-------+
      |               |
+-----v-----+   +-----v-----+
| Secondary |   | Secondary |
+-----------+   +-----------+

[Partitioning / Sharding]
          +------------------+
          |  Client-Anfrage  |
          +--------+---------+
                   |
          +--------v---------+
          | Router (mongos)  |
          +--------+---------+
                   | (Routing via Shard-Key)
      +------------+------------+
      |                         |
+-----v-----+             +-----v-----+
|  Shard A  |             |  Shard B  |
| [Daten A] |             | [Daten B] |
+-----------+             +-----------+
```

### Empfehlung an die Firma

#### Ausgangslage
Unsere Firma betreibt eine Webapplikation, die MongoDB zur Verwaltung von Fitnessstudio-Mitgliedschaften, Trainingsplänen, Kursanmeldungen und Gerätestatistiken verwendet. Die Datenmenge liegt aktuell bei ca. 80 GB und wächst moderat (ca. 5 GB pro Jahr). Die Zugriffsverteilung liegt bei ca. 85 % Lesevorgängen (Mitglieder prüfen Profile, Kurspläne ansehen) und 15 % Schreibvorgängen (neue Anmeldungen, Check-ins).

#### Empfehlung
Ich empfehle für das aktuelle Szenario den Einsatz eines **Replica Sets mit 3 Knoten** (1 Primary, 2 Secondaries) und **kein Sharding**.

#### Begründung
1.  **Kapazität:** 80 GB Daten passen problemlos in den RAM und auf eine Standard-SSD eines einzigen Cloud-Servers. Ein Sharding zur Verteilung des Speicherplatzes ist wirtschaftlich und technisch nicht notwendig.
2.  **Ausfallsicherheit:** Ein 3-Knoten-Replica-Set bietet automatische Failover-Mechanismen. Fällt der Primary aus, wählen die Secondaries in Sekunden einen neuen Primary. Dies sichert den 24/7-Betrieb der Webapplikation.
3.  **Leseleistung:** Da die Applikation stark leselastig ist, können Leseanfragen über die Konfiguration der `readPreference` auf die Secondaries verteilt werden.
4.  **Komplexitäts- und Kostenersparnis:** Sharding erfordert mindestens 2 Shards (die idealerweise selbst Replica Sets sind = 6 Server), 3 Config-Server und 2 mongos-Router (insgesamt mindestens 11 Instanzen). Der administrative und finanzielle Aufwand steht in keinem Verhältnis zum aktuellen Datenvolumen.

#### Quellen
*   *MongoDB Documentation: Replica Sets.* https://www.mongodb.com/docs/manual/replication/
*   *MongoDB Documentation: Sharding.* https://www.mongodb.com/docs/manual/sharding/
*   *MongoDB Basics: Horizontal Scaling.* https://www.mongodb.com/basics/scaling
