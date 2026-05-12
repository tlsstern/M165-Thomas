![TBZ Logo](../x_res/tbz_logo.png)


[TOC]

# KN-C-01: Installation und Datenmodellierung für Cassandra

Beachten Sie die [allgemeinen Informationen zu den Abgaben](https://gitlab.com/ch-tbz-it/Stud/m165/m165/-/blob/v2.0/Abgaben.md).

In diesem Kompetenznachweis erstellen Sie eine Cassandra Datenbank und anschliessend das Datenmodell für ihr gewähltes Thema. Die Grundlagen können Sie **in der [Theorie](../Cassandra/Datenmodell.md) nachlesen**.

## A) Installation / Account erstellen (10%)

Folgen Sie der [Installationsanleitung](../Cassandra/Installation.md) und richten Sie Ihre Datenbank ein. 

Sie können sich jederzeit mit *cqlsh* (Command Linie Tool für Cassandra) verbinden. Ein graphisches Tool ist optional - wir empfehlen [DataGrip von JetBrain](https://gitlab.com/ch-tbz-it/Stud/m165/m165/-/blob/main/Neo4j/Datenmodell.md#tools). Sie können eine Studenten-Lizenz beantragen mit Ihrer ID. Sie können auch ein anderes Tool verwenden. Zeigen Sie nun, dass die Verbindung mit *cqlsh* (und dem graphischen Tool) funktioniert.

**Abgaben:**

- Screenshot der zeigt, dass die Verbindung mit *cqlsh* funktioniert.

- Screenshot der zeigt, dass die Verbindung mit Ihrem graphischen UI funktioniert (falls Sie ein GUI installiert haben).

  


## B) Logisches Modell für Cassandra (40%)

Sie haben das konzeptionelle Modell bereits für die MongoDB Aufgaben erstellt. Sie verwenden hier das **gleiche** konzeptionelle Modell als Grundlage. In der [Theorie](../Cassandra/Datenmodell.md) finden Sie die Information wie Sie das das logische Datenmodell erstellen können. 

Beschränken Sie sich auf 3-4 Screens, so dass Sie nicht zu viele Tabellen erstellen müssen.

**Abgaben**:

- Eine visuelle Darstellung des logischen Datenmodells. 
- Erklärung zu den Abläufen/Szenarien/Screens und welche Daten benötigt werden. Die Partition- und Cluster-Keys müssen sichtbar sein und sinnvoll gewählt.



## C) Physisches Modell für Cassandra (50%)

Auch für das physische Modell finden Sie in der [Theorie](../Cassandra/Datenmodell.md) die korrekten Links und Informationen.

**Abgaben:**

- Skript, um das physische Datenmodell zu erstellen.
- Screenshot, der zeigt, dass das physische Modell erstellt wurde
