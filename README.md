# Modul 165 — NoSQL-Datenbanken einsetzen

Master-Übersicht aller Kompetenznachweise (KN) für M165.
Quelle: https://gitlab.com/ch-tbz-it/Stud/m165/m165/-/tree/main/Komptenznachweise

---

## Empfohlene Bearbeitungsreihenfolge (Ablauf)

Die KN sind im Original alphabetisch (C, M, N, P, R) sortiert, aber **inhaltlich** muss
Block 1 (MongoDB, Präfix **M**) zuerst bearbeitet werden — er liefert die Grundlagen
(Installation, Modellierung, Queries), auf denen alle anderen Blöcke aufbauen.
Danach folgen die weiteren Datenbanktypen.

### Block 1 — Document-Based: MongoDB (zuerst!)

Linearer Pfad, dann zwei optionale Vertiefungen:

1. [KN-M-01 — Installation](./KN-M-01/README.md) *(Gewichtung 2)*
2. [KN-M-02 — Modellierung](./KN-M-02/README.md) *(Gewichtung 2)*
3. [KN-M-03 — Datenabfrage und -manipulation](./KN-M-03/README.md) *(Gewichtung 2)*
4. [KN-M-04 — Datenabfrage komplex](./KN-M-04/README.md) *(Gewichtung 3)*
5. [KN-M-05 — Backup/Restore, Skalierung](./KN-M-05/README.md) *(Gewichtung 2)*
6. [KN-M-06 — JSON Schema / Validierung](./KN-M-06/README.md) *(optional)*
7. [KN-M-07 — Programmierung](./KN-M-07/README.md) *(optional)*

### Block 2 — Graph-Database: Neo4j

Voraussetzung: Block 1 abgeschlossen.

1. [KN-N-01 — Modellierung](./KN-N-01/README.md) *(Gewichtung 3)*
2. [KN-N-02 — Datenabfrage und -manipulation](./KN-N-02/README.md) *(Gewichtung 2)*
3. [KN-N-03 — Programmierung](./KN-N-03/README.md) *(optional)*

### Block 3 — Wide-Column: Cassandra

Voraussetzung: Block 1 abgeschlossen.

1. [KN-C-01 — Modellierung](./KN-C-01/README.md) *(Gewichtung 3)*
2. [KN-C-02 — Datenabfrage und -manipulation](./KN-C-02/README.md) *(Gewichtung 2)*
3. [KN-C-03 — Programmierung](./KN-C-03/README.md) *(optional)*

### Block 4 — Time Series: Prometheus

Voraussetzung: Block 1 abgeschlossen.

1. [KN-P-01 — Installation / Erklärung](./KN-P-01/README.md) *(Gewichtung 2)*
2. [KN-P-02 — Implementation](./KN-P-02/README.md) *(Gewichtung 2)*

### Block 5 — Key-Value: Redis

Voraussetzung: Block 1 abgeschlossen.

1. [KN-R-01 — Key-Value-Datenbank](./KN-R-01/README.md)

---

## Bezug zum Modul-Ablauf (Blöcke 01–09)

| Modul-Block | Datum         | Passende KN                         |
|-------------|---------------|-------------------------------------|
| Block 01    | 12.05.2026    | KN-M-01                             |
| Block 02    | 19.05.2026    | KN-M-02, KN-M-03                    |
| Block 03    | 26.05.2026    | KN-M-03, KN-M-04                    |
| Block 04    | 02.06.2026    | KN-M-05 *(LB1 Vorbereitung)*        |
| Block 05    | 09.06.2026    | KN-M-06, KN-M-07, Indexing          |
| Block 06    | 16.06.2026    | KN-N-01, KN-N-02, KN-N-03           |
| Block 07    | 23.06.2026    | KN-C-01..03, KN-P-01, KN-P-02       |
| Block 08    | 30.06.2026    | LB1 / LB2, KN-R-01                  |
| Block 09    | 07.07.2026    | Individuelle Weiterarbeit           |

## Leistungsbeurteilung

- **50 %** SOL-Aufgaben (diese KN)
- **25 %** LB1 (Collection Based Databases, keine Unterlagen)
- **25 %** LB2
