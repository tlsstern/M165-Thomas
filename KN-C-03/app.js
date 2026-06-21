const cassandra = require('cassandra-driver');

// Verbindungsdaten: 13.220.49.223 nach dem Launch der Instanz eintragen
// (oder per Umgebungsvariable: set CASSANDRA_HOST=...).
const HOST = process.env.CASSANDRA_HOST || '13.220.49.223';

const client = new cassandra.Client({
  contactPoints: [HOST],
  localDataCenter: 'datacenter1', // Standard-DC einer Single-Node-Installation (siehe: nodetool status)
  keyspace: 'sternfitness',
  credentials: { username: 'cassandra', password: 'cassandra' }
});

async function main() {
  try {
    await client.connect();
    console.log('Erfolgreich mit Cassandra verbunden!');

    console.log('\n--- 1. Kurse von Trainer 1 (Thomas Stern) ---');
    const r1 = await client.execute(
      'SELECT kurs_titel, raum, dauer FROM kurse_by_trainer WHERE trainer_id = ?',
      [1], { prepare: true });
    r1.rows.forEach(row => console.log(`  ${row.kurs_titel} (${row.raum}, ${row.dauer} Min)`));

    console.log('\n--- 2. Aktive Teilnehmer von Kurs 1 (parametrisierte Abfrage) ---');
    const r2 = await client.execute(
      'SELECT mitglied_name, anmeldedatum FROM kursteilnehmer_by_kurs WHERE kurs_id = ? AND status = ?',
      [1, 'aktiv'], { prepare: true });
    r2.rows.forEach(row => console.log(`  ${row.mitglied_name} (angemeldet: ${row.anmeldedatum})`));

    console.log('\n--- 3. Geraetebedarf von Kurs 1 ---');
    const r3 = await client.execute(
      'SELECT geraet_bezeichnung, anzahl FROM geraete_by_kurs WHERE kurs_id = ?',
      [1], { prepare: true });
    r3.rows.forEach(row => console.log(`  ${row.geraet_bezeichnung}: ${row.anzahl} Stueck`));

  } catch (error) {
    console.error('Fehler bei der Programmausfuehrung:', error.message);
  } finally {
    await client.shutdown();
    console.log('\nVerbindung geschlossen.');
  }
}

main();
