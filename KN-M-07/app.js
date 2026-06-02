const { MongoClient } = require('mongodb');

// 1. Verbindungs-URL definieren (Standard-Credentials und Zieldatenbank)
const url = 'mongodb://admin:Thomas-Password@localhost:27017/SternFitness?authSource=admin';
const client = new MongoClient(url);

const dbName = 'SternFitness';

async function main() {
  try {
    console.log('Verbinde mit MongoDB...');
    await client.connect();
    console.log('Erfolgreich mit Server verbunden!');
    
    const db = client.db(dbName);
    
    // 2. Anzahl der Dokumente pro Collection zaehlen
    console.log('\n--- 1. Datenbank-Uebersicht ---');
    const collections = ['trainer', 'geraete', 'kurse', 'mitglieder'];
    for (const colName of collections) {
      const count = await db.collection(colName).countDocuments();
      console.log(`Collection '${colName}': ${count} Dokumente`);
    }

    // 3. Eine einfache Abfrage ausführen (Trainer mit Gehalt > 5900)
    console.log('\n--- 2. Trainer mit Gehalt > 5900 ---');
    const highPaidTrainers = await db.collection('trainer')
      .find({ gehalt: { $gt: 5900 } })
      .project({ name: 1, gehalt: 1, spezialisierung: 1, _id: 0 })
      .toArray();
      
    console.log(JSON.stringify(highPaidTrainers, null, 2));

    // 4. Eine komplexe Aggregation ausführen (Join von Kursen und Trainern)
    console.log('\n--- 3. Aggregation: Kurse gejoint mit Trainer-Details ---');
    const pipeline = [
      {
        $lookup: {
          from: 'trainer',
          localField: 'trainer_id',
          foreignField: '_id',
          as: 'trainer_details'
        }
      },
      {
        $project: {
          titel: 1,
          raum: 1,
          leitung: { $arrayElemAt: ['$trainer_details.name', 0] },
          _id: 0
        }
      }
    ];
    
    const courseJoin = await db.collection('kurse').aggregate(pipeline).toArray();
    console.log(JSON.stringify(courseJoin, null, 2));

  } catch (error) {
    console.error('Fehler bei der Programmausfuehrung:', error);
  } finally {
    // Verbindung am Ende schliessen
    await client.close();
    console.log('\nVerbindung geschlossen.');
  }
}

main();
