// KN-P-02 A) Eigene Metrik fuer Prometheus
// Minimaler Web-Endpoint /metrics, der bei jedem Aufruf eine Zufallszahl
// zwischen 0 und 100 im Prometheus-Exposition-Format ausgibt. Dies simuliert
// eine konkrete Kennzahl (z. B. Requests pro Sekunde) der SternFitness-App.
// Bewusst ohne Framework/Layer-Struktur (nur Node http) - ein einfacher
// Controller reicht laut Aufgabenstellung voellig.

const http = require("http");

const PORT = 8080;

const server = http.createServer((req, res) => {
  if (req.url === "/metrics") {
    const wert = Math.floor(Math.random() * 101); // 0..100 inklusive
    res.writeHead(200, { "Content-Type": "text/plain; version=0.0.4" });
    res.end(
      "# HELP sternfitness_random_value Simulierte Kennzahl (Zufallswert 0-100), z. B. Requests pro Sekunde\n" +
        "# TYPE sternfitness_random_value gauge\n" +
        `sternfitness_random_value ${wert}\n`
    );
  } else {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("SternFitness Metrics-App (KN-P-02). Metrik unter /metrics\n");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Metrics-App laeuft auf Port ${PORT}, Endpoint /metrics`);
});
