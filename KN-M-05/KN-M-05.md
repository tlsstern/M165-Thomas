![TBZ Logo](../x_res/tbz_logo.png)


[TOC]

# KN-M-05: Administration von MongoDB

Beachten Sie die [allgemeinen Informationen zu den Abgaben](https://gitlab.com/ch-tbz-it/Stud/m165/m165/-/blob/v2.0/Abgaben.md).

Die Grundlage zu den folgenden Aufgaben finden [Sie in der Theorie](../MongoDB/Administration.md). Sie werden hier die Grundlagen zur Administration von MongoDB erlernen.



## A) Rechte und Rollen (40%)

Sie hatten bereit in KN-M-01 eine kurze Übersicht zu den Rechten und Sie mussten damals den Verbindungstext anschauen und verstehen. `mongodb://<IhrBenutzer>:<IhrPasswort>@<IhreIp>:27017/?authSource=admin&readPreference=primary&ssl=false`. 

Mit `authSource` wird mitgegeben, in welcher Datenbank der Benutzer liegt. In diesem Teil werden Sie nun weitere Benutzer erstellen und auch zeigen, dass die Angabe von `authSource` relevant ist.

1. Ändern Sie den Verbindungstext und versuchen Sie als `authSource` eine andere Datenbank als `admin` anzugeben (aber eine existierende). Zeigen Sie so, dass der Zugriff nicht mehr funktioniert. 
2. Erstellen Sie zwei neue Benutzer mit folgenden Bedingungen für Ihre Themendatenbank:
   1. Verwenden Sie für beide Benutzer built-in Rollen, aber **keine**, die any im Namen hat (z.B. readWrite**Any**Database, read**Any**Database)
   2. Benutzer 1 darf Daten nur lesen. Authentifizierungsdatenbank ist Ihre Themendatenbank. 
   3. Benutzer 2 darf Daten lesen und schreiben. Authentifizierungsdatenbank ist `admin`.

**Abgaben:**

- Screenshot des Fehlers bei einer Verbindung mit der falschen Authentifizierungsquelle
- Skript, welches die beiden Benutzer erstellt. 
- Screenshots, die zeigen, dass die Rechte für Benutzer 1 funktionieren, im Speziellen:
  - Screenshot für das Einloggen (Verbindungstext sichtbar)
  - Screenshot für das Lesen von Daten **ohne** Fehler
  - Screenshot für das Schreiben von Daten **mit** Fehler.
- Screenshots, die zeigen, dass die Rechte für Benutzer 2 funktionieren, im Speziellen:
  - Screenshot für das Einloggen (Verbindungstext sichtbar)
  - Screenshot für das Lesen von Daten **ohne** Fehler
  - Screenshot für das Schreiben von Daten **ohne** Fehler.



## B) Backup und Restore (40%)

Setzen Sie **beide** Varianten um:

**Backup Variante 1**: Erstellen sie ein Backup und Restore mit Snapshots in der AWS Console und dokumentieren sie jeweils den Status nach den einzelnen Schritten mit Screenshots. Stellen Sie sicher, dass Sie mindestens zwei Collections mit Daten in Ihrer Datenbank haben, so dass Sie eine löschen können.

1. [Erstellen sie ein Snapshot](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-creating-snapshot.html). Es spielt keine Rolle, ob sie ein Snapshot ihres Volumen oder ihrer Instanz erstellen (Volumen ist schneller). Sie können auch gerne das Skript aus m346-KN08 wieder aktivieren und so das Backup automatisieren! Wenn Sie das tun, machen Sie höchstens wöchentliche Backups und vergessen Sie nicht das Cleanup-Skript ebenfalls zu automatisieren.
2. Löschen Sie eine Collection oder Datenbank aus MongoDB (via GUI oder Shell)
3. [Stellen sie das Volumen wieder her](https://docs.aws.amazon.com/prescriptive-guidance/latest/backup-recovery/restore.html). **Achtung**: Stellen sie sicher, dass sie ihr neues Volumen in der gleichen Zone erstellen, in der sich auch ihre Server-Instanz befindet.

**Backup Variante 2**: Verwenden Sie die [MongoDB Database Tools](https://www.mongodb.com/docs/database-tools/), welche die folgenden Programme verwenden.  Sie können die Schritte entweder in Ihrem Windows durchführen oder die Tools für Linux herunterladen die Schritte direkt auf dem Server durchführen. Erstellen sie ein Backup und Restore mit `mongodumb`  und `mongorestore` und dokumentieren sie jeweils den Status nach den einzelnen Schritten

1. Erstellen sie ein Backup mit `mongodumb`
2. Löschen sie eine Datenbank aus MongoDB (via GUI oder Shell)
3. Stellen sie die Datenbank wieder her mit `mongorestore`.

**Abgaben:**

- Backup Variante 1: 
  - Screenshots des jeweiligen Status. Es muss ersichtlich sein, dass Daten weg sind und anschliessend wieder verfügbar. 
  - Befehle, die ausgeführt wurden

- Backup Variante 2: Screenshots des jeweiligen Status. Es muss ersichtlich sein, dass Daten weg sind und anschliessend wieder verfügbar. 



## C) Skalierung (20%)

Aus [Modul 346](https://gitlab.com/ch-tbz-it/Stud/m346/m346/-/blob/main/CloudComputing.md#skalierung) kennen Sie bereits den Begriff der Skalierung. Schauen Sie dort nochmals nach, falls notwendig.

Erklären Sie den Unterschied zwischen Replication and Partition (Shards) in eigenen Worten. Fügen Sie hilfreiche Illustrationen hinzu (auch eigene sind möglich). Als Quelle können sie [diesen Link verwenden](https://www.mongodb.com/basics/scaling) und auch eigene Quellen suchen. Die Quellen müssen aber angegeben werden!

Nach allem was Sie nun wissen, machen Sie eine Empfehlung an Ihre Firma. Gehen Sie davon aus, dass eine der Applikationen Ihrer Firma MongoDB verwendet. Erklären Sie die Situation (textuell) und geben dann eine Empfehlung ab wie die Applikation weitergeführt werden soll. Ein Status Quo ist erlaubt als Empfehlung, muss aber begründet werden.





