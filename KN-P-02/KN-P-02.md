![TBZ Logo](../x_res/tbz_logo.png)


[TOC]

# KN-P-02: Implementation von eigenen Metrics



Beachten Sie die [allgemeinen Informationen zu den Abgaben](https://gitlab.com/ch-tbz-it/Stud/m165/m165/-/blob/v2.0/Abgaben.md).

In dieser Kompetenz werden Sie eigene Metrics für Prometheus programmieren. Sie werden Ihren Programmcode auf einem Server hosten, so dass Prometheus die Daten auslesen kann.



## A) Eigene Metriken schreiben (20%)

Nehmen Sie eine Programmiersprache Ihrer Wahl und erstellen Sie ein Web-Api mit dem Endpoint `/metrics`. Dieser Endpoint soll einfach Zufallszahlen zwischen 0 und 100 generieren, wenn er aufgerufen wird. Dies simuliert mögliche konkrete Daten, die Sie mit Prometheus sammeln möchten, z.B. Anzahl Requests pro Sekunde, etc

Sie benötigen für Ihren Endpoint keine umfangreiche Struktur mit Separation der Programmierlayer. Ein einfacher Controller, welcher Zufallszahlen generiert reicht hier völlig. 



## B) Umgebung einrichten (80%)

Hosten Sie diese Applikation nun auf einem zusätzlichen Server in AWS. Es gibt hier mehrere Wege zum Ziel, wobei Sie sicherlich einen aus m346-KN06 kennen. Sie finden dort Beispiele für Java und .NET Applikationen, welche mit Cloud-Init gestartet werden. Sie können Ihre Applikation aber auch manuell auf den Server publizieren. 

Erweitern Sie nun die *Scrapes* und *Rules* von Prometheus, so dass die Daten eingelesen werden.

Erweitern Sie auch das Grafana Dashboard, um die Daten auszugeben.





- 

