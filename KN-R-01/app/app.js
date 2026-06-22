// KN-R-01: Programmierschnittstelle (Node.js) fuer Redis.
// Zeigt den Zugriff ueber den offiziellen "redis"-Treiber: in-memory Caching
// mit TTL, Hash, Sorted Set (Leaderboard) und Counter - am Beispiel des
// Fitnessstudios "SternFitness".

const { createClient } = require("redis");

// Verbindungsdaten: 54.242.137.73 nach dem Launch der Instanz eintragen (siehe .gemini/details.md).
const HOST = process.env.REDIS_HOST || "54.242.137.73";
const PORT = 6379;
const PASSWORD = "Thomas-Password";

async function main() {
  const client = createClient({ socket: { host: HOST, port: PORT }, password: PASSWORD });
  client.on("error", (err) => console.error("Redis-Fehler:", err.message));

  await client.connect();
  console.log("Erfolgreich mit Redis verbunden!\n");

  // 1) String + TTL: in-memory Cache fuer einen Mitglieds-Namen (laeuft nach 60s ab)
  await client.set("cache:member:1", "Anna Stern", { EX: 60 });
  console.log("1) Cache GET cache:member:1 :", await client.get("cache:member:1"));
  console.log("   Verbleibende TTL (Sekunden):", await client.ttl("cache:member:1"), "\n");

  // 2) Hash: Mitglieds-Profil als Feld-Wert-Paare
  await client.hSet("member:1", { name: "Anna Stern", status: "aktiv", plan: "premium" });
  console.log("2) HGETALL member:1 :", await client.hGetAll("member:1"), "\n");

  // 3) Counter: Anzahl Studio-Besuche atomar hochzaehlen
  await client.set("stat:visits", 0);
  await client.incr("stat:visits");
  await client.incr("stat:visits");
  console.log("3) stat:visits nach 2x INCR :", await client.get("stat:visits"), "\n");

  // 4) Sorted Set: Leaderboard der aktivsten Mitglieder (Score = Trainings)
  await client.del("leaderboard");
  await client.zAdd("leaderboard", [
    { score: 50, value: "Anna" },
    { score: 30, value: "Ben" },
    { score: 70, value: "Cara" },
  ]);
  const top = await client.zRange("leaderboard", 0, -1, { REV: true });
  console.log("4) Leaderboard (hoechster Score zuerst):", top, "\n");

  await client.quit();
  console.log("Verbindung geschlossen.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
