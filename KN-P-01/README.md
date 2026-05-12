![TBZ Logo](../x_res/tbz_logo.png)


[TOC]

# KN-P-01: Installation von Prometheus und Grafana



Beachten Sie die [allgemeinen Informationen zu den Abgaben](https://gitlab.com/ch-tbz-it/Stud/m165/m165/-/blob/v2.0/Abgaben.md).

In dieser Kompetenz werden Sie Prometheus und Grafana installieren. Dabei werden Sie auch einige Inhalt von Modul m346 wiederholen. 

### A) Installation (50%)

**Bevor Sie beginnen, stellen Sie sicher, dass Sie verstanden haben was Sie anschliessend abgeben müssen.**

Lesen Sie die [Anleitung zur Installation](../Prometheus/Installation.md) und erstellen Sie eine neue AWS Instanz mit Prometheus und Grafana installiert. Schauen Sie sich die Cloud-Init Datei **genau** an, damit Sie einen Überblick über den Ablauf kriegen. Sie werden einiges davon später erklären und neu definieren.

**Abgaben:**

- Screenshots der vier Seiten aus der Installationsanleitung mit Ihrer URL/IP sichtbar.



## B) Erklärungen Cloud-Init (50%)

In der Cloud-Init Datei schauen Sie sich die beiden Dateien an, die geschrieben werden (/etc/prometheus/prometheus.yml und /etc/prometheus/rules.yml). Suchen Sie zusätzlich selbstständig Informationen zu `scrape` und `rules` von Prometheus. Beantworten Sie folgende Fragen:

1. Was sind *Scrapes*? Erklären Sie den Begriff im Zusammenhang mit Prometheus und geben Sie konkrete Beispiele.
2. Was sind *Rules*? Erklären Sie den Begriff im Zusammenhang mit Prometheus und geben Sie konkrete Beispiele. 
3. Was sind die Schritte, die Sie als Programmierer ausführen müssen, um eigene Daten in Prometheus zu speichern?
4. Welche Variablen werden verwendet in den Scrapes und Rules und von welchen Seiten/URLs kommen diese Variablen?
5. Wie weiss Prometheus, ob ein System *up* ist (siehe Regeln bei den Alerting Rules).



**Abgaben:**

- *Ausführliche* Erklärungen zu den Fragen

