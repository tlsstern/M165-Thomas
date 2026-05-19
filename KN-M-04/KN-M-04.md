![TBZ Logo](../x_res/tbz_logo.png)


[TOC]

# KN-M-04: Datenmanipulation und Abfragen II

Beachten Sie die [allgemeinen Informationen zu den Abgaben](https://gitlab.com/ch-tbz-it/Stud/m165/m165/-/blob/v2.0/Abgaben.md).

Die Grundlage zu den folgenden Aufgaben finden [Sie in der Theorie](../MongoDB/Abfragen.md). Sie werden nun komplexere Abfragen erstellen, z.B.  Aggregationen, Joins und Subdocument. 



## A) Aggregationen (50%)

In der Theorie sehen Sie, dass sie beliebige Aggregationen aneinanderketten können (Stages). Erstellen Sie die folgenden Befehle:

1. In KN-M-03 hatten Sie den Befehl `find()` mit der Kombination einer UND-Verknüpfung verwendet. Verwenden Sie nun Aggregationen (`$match`-Anweisung), um das gleiche Resultat zu erzielen, indem Sie die beiden Filterungen einzeln hintereinander schalten.
2. Erstellen Sie nun eine Abfrage auf eine Collection unter Verwendung von Aggregation und den Anweisungen `$match, $project, $sort`. Natürlich soll das Resultat mehr als einen Datensatz Zurück liefern.
3. Erstellen Sie eine Abfrage auf eine Collection unter der Verwendung der `$sum`- Anweisung (für *count* oder *sum*). 
4. Verwenden Sie mindestens einmal eine `$group`-Aggregation.

Stellen Sie sicher, dass sie Ihre Abgabe **im Detail** verstanden haben. Die Lehrperson wird Sie testen und **direkt Anpassungen während des Gesprächs verlangen**.

**Abgabe**:

- Skript mit den Abfragen.
- Screenshot, der zeigt, dass Sie die Abfragen ausführen konnten. 



## B) Join-Aggregation (30%)

Erstellen Sie eine Abfragen, die die `$lookup`-Anweisung verwendet, die so einen join durchführt. Es müssen Felder aus beiden Collections im Resultat verfügbar sein.

Erstellen Sie eigene Abfragen unter Verwendung von `$lookup` und anschliessender Filterung und anderen Aggregationen der hinzugefügten Dokumente.

Stellen Sie sicher, dass sie Ihre Abgabe **im Detail** verstanden haben. Die Lehrperson wird Sie testen und **direkt Anpassungen während des Gesprächs verlangen**.

**Abgabe**:

- Skript mit den Abfragen.
- Screenshot, der zeigt, dass Sie die Abfragen ausführen konnten. 



## C) Unter-Dokumente / Arrays (20%)

Filterungen können auch auf Unterdokumente ausgeführt werden. Erstellen Sie folgende Abfragen:

- Einfache Abfrage, die **nur einzelne Felder der Unterdokumente** ausgibt.
- Eine Abfrage, die nach Feldern von Unterdokumenten filtert.
- Verwenden Sie `$unwind`, um die Rückgabe zu "verflachen".

Stellen Sie sicher, dass sie Ihre Abgabe **im Detail** verstanden haben. Die Lehrperson wird Sie testen und **direkt Anpassungen während des Gesprächs verlangen**.

**Abgabe**:

- Skript mit den Abfragen. 
- Screenshot, der zeigt, dass Sie die Abfragen ausführen konnten. 





