const neo4j = require('neo4j-driver');

// 1. Verbindungsdaten (lokale Neo4j-Desktop-DB aus KN-N-01).
//    Bei Neo4j Aura stattdessen die URI 'neo4j+s://<id>.databases.neo4j.io'
//    und das von Aura vergebene Passwort verwenden.
const URI = 'neo4j://localhost:7687';
const USER = 'neo4j';
const PASSWORD = 'Thomas-Password';

const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));

async function main() {
  const session = driver.session();
  try {
    // Verbindung pruefen
    await driver.verifyConnectivity();
    console.log('Erfolgreich mit Neo4j verbunden!');

    // 2. Knoten pro Label zaehlen
    console.log('\n--- 1. Datenbank-Uebersicht ---');
    const labels = ['Trainer', 'Kurs', 'Mitglied', 'Geraet'];
    for (const label of labels) {
      const res = await session.run(`MATCH (n:${label}) RETURN count(n) AS anzahl`);
      // count() liefert einen Neo4j-Integer -> .toNumber()
      const anzahl = res.records[0].get('anzahl').toNumber();
      console.log(`Label '${label}': ${anzahl} Knoten`);
    }

    // 3. Einfache Abfrage mit Parameter (Trainer mit Gehalt > Grenze)
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

    // 4. Graph-Traversierung: Kurse mit ihren Leiter:innen (Join ueber Kante)
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
    // 5. Session und Driver sauber schliessen
    await session.close();
    await driver.close();
    console.log('\nVerbindung geschlossen.');
  }
}

main();
