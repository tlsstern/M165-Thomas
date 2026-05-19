![TBZ Logo](../x_res/tbz_logo.png)


[TOC]

# KN-M-06: JSON Schema und Collection Validierung

Beachten Sie die [allgemeinen Informationen zu den Abgaben](https://gitlab.com/ch-tbz-it/Stud/m165/m165/-/blob/v2.0/Abgaben.md).

In diesem Auftrag werden Sie Ihr Modell für Ihre Datenbank mit JSON-Schemas abbilden und dann bei den Collections hinterlegen, so dass Ihre Daten validiert werden.

**Quellen:**

- [TBZ: MongoDB Datenmodellierung (ab Kapitel über JSON Schemas](../MongoDB/Datenmodell.md#json-schema))



### A) JSON Schemas erstellen (30%)

In einem früheren Kompetenznachweis haben Sie ein konzeptionelles und logisches Modell erstellt für Ihre Themendatenbank. Nun werden Sie Ihre Modell vertiefen und mit JSON-Schemas arbeiten, so dass die Felder und verschachtelten Objekte und Listen eindeutig werden.

Erstellen Sie ein Schema pro geplanter Collection. Es ist möglicherweise einfacher, wenn Sie ein Beispiel-Inhalt erstellen und Ihr JSON-Schema generieren lassen. Stellen Sie sicher, dass Ihre Schemas inhaltlich korrekt sind (Datentypen und Verschachtelungen) und dass Sie mit Ihrem früheren logischen Modell übereinstimmt.

Überlegen Sie sich zusätzlich welche Attribute Pflicht sind und geben Sie diese entsprechend an.

**Stellen Sie sicher, dass die generierte Datei überarbeiten und z.B. Beispiele wieder löschen, Beschreibungen korrigieren, TBZ Formaten entsprechen, etc.**

**Abgaben:**

- Beispiel-Inhalt pro Collection als JSON-Datei. 
- Ein JSON-Schema pro Collection (jeweils als JSON-Datei)




### B) Validierung hinterlegen und testen (70%)

Aufgrund der JSON-Schemas erstellen Sie nun die Dokumente für die Collection-Validierung. MongoDB kennt mehr Datentypen als JSON und diese müssen korrekt angegeben werden. Nehmen Sie die notwendigen Änderungen vor - einmal via UI und die restlichen via Befehl in `mongosh`

Fügen Sie die Validierung den Collections hinzu. Zeigen Sie, dass Sie nur noch gültige Dokumente in die Collection einfügen können.

Sie müssen Ihrem Benutzer eine neue Rolle geben, damit Sie Validierungen hinzufügen können.

Welcher Befehl ist notwendig, um existierende Validierungen auszulesen?

Welcher Befehl können Sie verwenden, um 

**Abgaben**:

- Ein Screenshot, welcher zeigt, dass die Validierung im UI gültig ist.
- Befehle um
  - Validierungen hinzuzufügen
  - Neue Rolle hinzuzufügen für die Administration von Validierungen
  - Bestehende Validierung auszulesen.
- Screenshots, die zeigen, dass Sie nur noch gültige Dokumente einfügen können (via Compass oder shell)



