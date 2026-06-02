# Antworten zu KN-M-02 (Datenmodellierung)

**Gewähltes Thema:** Fitnessstudio ("SternFitness")

## Teil A: Konzeptionelles Datenmodell

**Kurze textuelle Erklärungen zu den Entitäten und Beziehungen:**
Für das Datenmodell des Fitnessstudios wurden folgende vier Entitäten definiert:
1. **Mitglied:** Repräsentiert die Kunden des Fitnessstudios (Name, Adresse, Geburtsdatum, Eintrittsdatum).
2. **Trainer:** Die Angestellten, die Kurse leiten (Name, Spezialisierung, Gehalt).
3. **Kurs:** Die angebotenen Fitnesskurse wie z.B. Yoga, CrossFit oder Pilates (Titel, Raum, Dauer).
4. **Gerät:** Die physischen Trainingsgeräte im Studio (Bezeichnung, Anschaffungsdatum, Wartungsintervall).

**Beziehungen:**
- **N:N-Beziehung (Mitglied <-> Kurs):** Ein Mitglied kann an mehreren Kursen teilnehmen, und ein Kurs wird von vielen Mitgliedern besucht. Diese netzwerkförmige Beziehung bildet den Kern der Aktivitätsverwaltung.
- **1:N-Beziehung (Trainer <-> Kurs):** Ein Trainer kann mehrere Kurse leiten, aber ein Kurs wird (in diesem Modell) immer genau von einem Trainer geleitet.

## Teil B: Logisches Modell für MongoDB

**Erklärung zu Verschachtelungen (Embedding vs. Referencing):**
In MongoDB haben wir die Möglichkeit, Daten ineinander zu verschachteln (Embedding), anstatt sie wie in relationalen Datenbanken strikt zu trennen.

- **Meine gewählte Variante (Embedding der Adresse & Kursanmeldungen):** Ich habe mich dazu entschieden, die `Adresse` (Straße, PLZ, Ort) direkt als untergeordnetes Dokument (Verschachtelung) in das `Mitglied`-Dokument einzubetten. Zudem wird ein Array von besuchten Kursen (mit einer Referenz zur Kurs-ID und dem Anmeldedatum) im Mitglied eingebettet. 
- **Wieso diese Variante?** Da Adressdaten und die Liste der besuchten Kurse in der Regel immer genau dann abgefragt werden, wenn das Mitgliedsprofil geladen wird, spart diese Verschachtelung teure und komplexe `JOIN`-Operationen (bzw. `$lookup` in MongoDB). Die Daten, die logisch zusammengehören und gemeinsam gelesen werden, liegen so physisch nah beieinander. Geräte und Trainer bleiben jedoch in eigenen Collections, da sie unabhängig von einzelnen Mitgliedern verwaltet werden.
