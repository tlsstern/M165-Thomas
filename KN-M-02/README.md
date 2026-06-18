# Antworten zu KN-M-02: Datenmodellierung für MongoDB

**Gewähltes Thema:** Fitnessstudio ("SternFitness")

---

## Teil A: Konzeptionelles Datenmodell (ER-Diagramm)

Das konzeptionelle Datenmodell bildet die fachliche Struktur unseres Fitnessstudios unabhängig vom konkreten Datenbanksystem ab. Es besteht aus vier Entitäten und drei Beziehungen (inklusive zwei netzwerkförmiger N:N-Beziehungen).

### Diagramme & Quelldateien
- **Original-Datei:** [conceptual_model.drawio](file:///C:/Projects/M165-Thomas/KN-M-02/conceptual_model.drawio)
- **Visualisierung:**

![Konzeptionelles ER-Diagramm](./screenshots/01_conceptual_model.png)

### Textuelle Erklärungen zu den Entitäten
1. **Mitglied:** Repräsentiert die Kunden des Fitnessstudios.
   - **Attribute:** `MitgliedID` (Primary Key), `Name`, `Geschlecht` (Char: 'M'/'W'/'D'), `Email`, `Telefon`, `Geburtsdatum`, `Eintrittsdatum`.
2. **Trainer:** Repräsentiert die Angestellten, die Kurse leiten und für Mitglieder zur Verfügung stehen.
   - **Attribute:** `TrainerID` (Primary Key), `Name`, `Spezialisierung`, `Gehalt`, `Anstellungsdatum`.
3. **Kurs:** Repräsentiert die angebotenen Fitness- und Gruppenkurse (z.B. Yoga, CrossFit).
   - **Attribute:** `KursID` (Primary Key), `Titel`, `Raum`, `Dauer` (in Minuten), `MaxTeilnehmer`.
4. **Gerät:** Repräsentiert die physischen Trainingsgeräte auf der Trainingsfläche (z.B. Laufband, Hantelbank).
   - **Attribute:** `GeraetID` (Primary Key), `Bezeichnung`, `Typ`, `Anschaffungsdatum`, `Wartungsintervall` (in Tagen).

### Textuelle Erklärungen zu den Beziehungen
- **Mitglied (N) <-> (M) Kurs (Beziehung "besucht"):** Ein Mitglied kann an mehreren Kursen teilnehmen, und ein Kurs wird von vielen Mitgliedern besucht. Dies ist eine netzwerkförmige N:N-Beziehung.
- **Trainer (1) <-> (N) Kurs (Beziehung "leitet"):** Ein Kurs wird von genau einem Trainer geleitet (1). Ein Trainer kann jedoch mehrere Kurse leiten (N). Dies ist eine 1:N-Beziehung.
- **Kurs (N) <-> (M) Gerät (Beziehung "nutzt"):** Ein Kurs nutzt verschiedene Geräte (z.B. nutzt ein Spin-Kurs mehrere Indoor-Bikes) (N), und ein bestimmter Gerätetyp kann in verschiedenen Kursen verwendet werden (M). Dies stellt eine weitere netzwerkförmige N:N-Beziehung dar.

---

## Teil B: Logisches Modell für MongoDB (Dokumenten-Schema)

Bei der Übersetzung des ER-Modells in das logische Modell für MongoDB machen wir Gebrauch von der Dokumenten-Struktur von BSON. Hierbei wägen wir ab zwischen **Embedding (Einbetten)** und **Referencing (Referenzieren via IDs)**.

### Diagramme & Quelldateien
- **Original-Datei:** [logical_model.drawio](file:///C:/Projects/M165-Thomas/KN-M-02/logical_model.drawio)
- **Visualisierung:**

![Logisches Modell für MongoDB](./screenshots/02_logical_model.png)

### Erklärung zu Verschachtelungen (Embedding vs. Referencing)

In MongoDB stehen uns zwei primäre Entwurfsmuster zur Verfügung:
1. **Einbetten (Embedding):** Daten werden direkt als untergeordnete Dokumente (Sub-Dokumente oder Arrays) in das Hauptdokument integriert.
2. **Referenzieren (Referencing):** Dokumente werden in getrennten Collections gehalten und über Fremdschlüssel (meist `ObjectId`) miteinander verknüpft.

Für "SternFitness" haben wir folgende Architektur gewählt:

- **Eingebettetes Objekt (`adresse` im Mitglied):** Die Adresse besteht aus `strasse`, `plz` und `ort`. Diese Daten werden direkt als Dokument in das Mitglied eingebettet.
  - *Begründung:* Die Adresse hat eine klare 1:1-Beziehung zum Mitglied und wird praktisch nie ohne die Personaldaten abgefragt oder aktualisiert. Durch das Embedding entfällt eine zusätzliche Query (oder ein `$lookup`), was die Lese-Performance erheblich steigert.
- **Eingebettetes Array (`kurs_anmeldungen` im Mitglied):** Ein Array von Dokumenten, das jeweils die `kurs_id` (Referenz) sowie anmeldungsspezifische Daten (`anmeldedatum`, `status`) enthält.
  - *Begründung:* Das ist ein hybrider Ansatz (Referenced Bookings). Anstatt eine separate Verknüpfungstabelle wie in SQL zu erstellen, betten wir die Anmeldungsdetails direkt im Mitglied ein. Die `kurs_id` verweist auf die `kurse`-Collection, da Kurse unabhängig existieren und eine eigene Lebensdauer besitzen. Da ein Mitglied im Regelfall nicht zehntausende Kurse besucht, droht kein Verstoß gegen die 16MB-Dokumentengrößenbeschränkung von MongoDB.
- **Flache Referenzierung (`trainer_id` in Kurs):** Kurse verweisen über `trainer_id` auf den Trainer.
  - *Begründung:* Ein Trainer leitet viele Kurse, aber Trainer-Daten (wie Gehalt oder Anstellungsdatum) ändern sich unabhängig von den Kursen und sollten nicht dupliziert werden, um Anomalien zu vermeiden.
- **Referenz-Array (`geraet_ids` in Kurs):** Die N:M-Beziehung "nutzt" aus dem konzeptionellen Modell (Kurs ↔ Gerät) wird als Array von Referenzen (`geraet_ids: [ObjectId, ...]`) in der `kurse`-Collection umgesetzt.
  - *Begründung:* Geräte existieren unabhängig von Kursen und werden in mehreren Kursen verwendet, daher wäre ein Einbetten redundant und würde bei Geräte-Änderungen Anomalien erzeugen. Das Array liegt auf der `kurse`-Seite, weil die typische Abfrage lautet "welche Geräte benötigt dieser Kurs?". Für eine reine N:M-Verknüpfung genügen die Referenzen, daher trägt diese Kante – anders als `kurs_anmeldungen` – keine eigenen Attribute.

### Datentyp Char in MongoDB / BSON
> [!NOTE]
> Da BSON (Binary JSON) keinen eigenständigen, dedizierten Datentyp für ein einzelnes Zeichen (Char) besitzt (im Gegensatz zu SQL-Datenbanken), wird ein einzelner Buchstabe in MongoDB physisch als String der Länge 1 abgespeichert. Im logischen Schema wird dies dennoch explizit als `Char` deklariert (z.B. für das Feld `geschlecht` mit den zulässigen Werten 'M', 'W', 'D'), um den fachlichen Anforderungen des logischen Modells gerecht zu werden. Dies stellt sicher, dass Entwickler und Datenbank-Designer die beabsichtigte Feldlänge und Semantik sofort erkennen.

---

## Teil C: Anwendung des Schemas in MongoDB

Um die Collections in der MongoDB anzulegen, wurde ein JavaScript-Skript erstellt.

### Script & Quelldateien
- **Original-Datei:** [create_collections.js](file:///C:/Projects/M165-Thomas/KN-M-02/create_collections.js)

### Screenshot der Ausführung
Das Skript wurde in `mongosh` ausgeführt. Der folgende Screenshot zeigt das erfolgreiche Erstellen der Collections in der neu angelegten Datenbank `SternFitness`:

![Collections erfolgreich erstellt](./screenshots/03_collections_created.png)

---

## Teil D: Theoretische Hintergrundfragen (Connection Strings)

### Was macht die Option `authSource=admin` im Connection String?

Der Parameter `authSource` spezifiziert die Datenbank, in welcher der authentifizierende Benutzer definiert ist. 

Im Standard-Format eines MongoDB-Verbindungsstrings:
```text
mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultdb][?options]]
```
Wenn ein Benutzername angegeben wird, versucht MongoDB standardmäßig, den Benutzer in der in der URL angegebenen Zieldatenbank (`defaultdb`) zu authentifizieren. 

Wenn wir uns beispielsweise mit:
```text
mongodb://admin:Thomas-Password@localhost:27017/SternFitness
```
verbinden möchten, würde MongoDB versuchen, die Zugangsdaten des Benutzers `admin` in der Datenbank `SternFitness` zu verifizieren. Da der Administrator-Account jedoch aus Sicherheits- und Administrationsgründen global in der zentralen Datenbank `admin` angelegt wurde (wie in unserer `cloud-init.yaml` definiert), würde dieser Verbindungsaufbau fehlschlagen.

Durch das Anhängen des Parameters `?authSource=admin` weisen wir den MongoDB-Treiber an, die Authentifizierungsprüfung in der Datenbank `admin` durchzuführen, während die aktive Sitzung danach auf der Zieldatenbank `SternFitness` arbeitet:
```text
mongodb://admin:Thomas-Password@localhost:27017/SternFitness?authSource=admin
```

### Warum ist dieser Parameter in unserem Kontext korrekt?
1. **Zentrales Usermanagement:** Alle Administrations- und Dienstbenutzer werden standardmäßig in der Systemdatenbank `admin` abgelegt, um eine saubere Trennung zwischen Systemkonten und Applikationsdaten zu gewährleisten.
2. **Rechteverwaltung:** Der Benutzer `admin` besitzt übergeordnete Rollen wie `userAdminAnyDatabase` oder `readWriteAnyDatabase` auf der `admin`-Datenbank, womit er sich dort anmelden muss, um Rechte über alle anderen Datenbanken hinweg ausüben zu können.

### Referenzen & Offizielle Dokumentation
Gemäß der offiziellen MongoDB-Dokumentation:
- *MongoDB Manual — Connection String Options:*
  > *"authSource: Specifies the database name associated with the user's credentials. [...] If you do not specify authSource, it defaults to the database specified in the connection string. If the connection string does not specify a database, it defaults to admin."*
  - Quelle: [MongoDB Connection String Specification (authSource)](https://www.mongodb.com/docs/manual/reference/connection-string/#mongodb-urioption-urioption.authSource)
