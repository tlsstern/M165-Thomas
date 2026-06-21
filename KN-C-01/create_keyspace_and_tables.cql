// KN-C-01 Teil C: Physisches Datenmodell fuer SternFitness (Cassandra / CQL)
// Re-runnable: Keyspace und Tabellen werden nur angelegt, wenn sie noch fehlen.
// Ausfuehren mit:  cqlsh 13.220.49.223 9042 -f create_keyspace_and_tables.cql

CREATE KEYSPACE IF NOT EXISTS sternfitness
  WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE sternfitness;

// Screen 1: "Teilnehmerliste eines Kurses" - Abfrage nach kurs_id (optional + status)
CREATE TABLE IF NOT EXISTS kursteilnehmer_by_kurs (
  kurs_id        int,
  status         text,
  mitglied_id    int,
  kurs_titel     text,
  mitglied_name  text,
  anmeldedatum   date,
  PRIMARY KEY ((kurs_id), status, mitglied_id)
) WITH CLUSTERING ORDER BY (status ASC, mitglied_id ASC);

// Screen 2: "Kursplan eines Mitglieds" - Abfrage nach mitglied_id
CREATE TABLE IF NOT EXISTS kurse_by_mitglied (
  mitglied_id    int,
  kurs_id        int,
  mitglied_name  text,
  kurs_titel     text,
  status         text,
  anmeldedatum   date,
  PRIMARY KEY ((mitglied_id), kurs_id)
);

// Screen 3: "Kurse eines Trainers" - Abfrage nach trainer_id
CREATE TABLE IF NOT EXISTS kurse_by_trainer (
  trainer_id      int,
  kurs_id         int,
  trainer_name    text,
  spezialisierung text,
  kurs_titel      text,
  raum            text,
  dauer           int,
  PRIMARY KEY ((trainer_id), kurs_id)
);

// Screen 4: "Geraetebedarf eines Kurses" - Abfrage nach kurs_id
CREATE TABLE IF NOT EXISTS geraete_by_kurs (
  kurs_id            int,
  geraet_id          int,
  kurs_titel         text,
  geraet_bezeichnung text,
  typ                text,
  anzahl             int,
  PRIMARY KEY ((kurs_id), geraet_id)
);
