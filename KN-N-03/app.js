const neo4j = require('neo4j-driver');

const URI = 'neo4j://localhost:7687';
const USER = 'neo4j';
const PASSWORD = 'Thomas-Password';

const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));

async function main() {
  const session = driver.session();
  try {
    await driver.verifyConnectivity();
    console.log('Erfolgreich mit Neo4j verbunden!');

    console.log('\n--- 1. Datenbank-Uebersicht ---');
    const labels = ['Trainer', 'Kurs', 'Mitglied', 'Geraet'];
    for (const label of labels) {
      const res = await session.run(`MATCH (n:${label}) RETURN count(n) AS anzahl`);
      const anzahl = res.records[0].get('anzahl').toNumber();
      console.log(`Label '${label}': ${anzahl} Knoten`);
    }

    console.log('\n--- 2. Trainer mit Gehalt > 5900 ---');
    const trainerRes = await session.run(
      `MATCH (t:Trainer)
       WHERE t.gehalt > $grenze
       RETURN t.name AS name, t.gehalt AS gehalt, t.spezialisierung AS spezialisierung
       ORDER BY t.gehalt DESC`,
      { grenze: 5900 }
    );
    trainerRes.records.forEach(r => {
      console.log(`  ${r.get('name')} – ${r.get('gehalt')} CHF (${r.get('spezialisierung')})`);
    });

    console.log('\n--- 3. Kurse und ihre Leitung (Trainer) ---');
    const joinRes = await session.run(
      `MATCH (t:Trainer)-[:LEITET]->(k:Kurs)
       RETURN k.titel AS kurs, k.raum AS raum, t.name AS leitung
       ORDER BY k.titel`
    );
    joinRes.records.forEach(r => {
      console.log(`  ${r.get('kurs')} (${r.get('raum')}) – Leitung: ${r.get('leitung')}`);
    });

  } catch (error) {
    console.error('Fehler bei der Programmausfuehrung:', error.message);
  } finally {
    await session.close();
    await driver.close();
    console.log('\nVerbindung geschlossen.');
  }
}

main();
