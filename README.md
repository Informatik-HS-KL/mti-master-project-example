# mti-master-project-example

Ein Beispielprojekt für das Modul Mensch-Technik-Interaktion im Masterstudiengang Digital Engineering.

Zum Starten:
- Ins Verzeichnis `Docker` wechseln
- Befehl `docker-compose up` ausführen
- Im Browser Grafana unter `http://localhost:3000` aufrufen
- Mit Benutzernamen `admin` und Passwort `admin` anmelden (ggf. muss ein neues Passwort vergeben werden; der Schritt kann übersprungen werden)
- ``

# Aufgabenstellung an die Studierenden

Grundlegend geht es in diesem Projekt um die visuelle Darstellung von Messwerten in einem frei definierten Frontend. Die Messwerte sollen automatisch generiert und in einen MQTT Broker eingespeist werden. Die Messwerte werden anschließend aus dem MQTT Broker ausgelesen und grafisch aufbereitet präsentiert, z.B. in Tabellenform und/oder in Graphen. Das Frontend soll aktiv auf Änderungen der Topics lauschen und sich entsprechend aktualisieren.

Die Aufgabe der Studierenden lässt sich grob in die folgenden Punkte gliedern:

- Einrichtung eines MQTT Brokers (z.B. Mosquitto) in Docker
- Entwicklung eines Messwertegenerators und Einspeisung der Daten in den Broker
- Entwicklung eines Frontends zur visuellen Darstellung der Daten mit einem beliebigen Frontendframework

Ein weiteres denkbares Szenario ist die Verwendung einer IoT-Lösung wie OpenHab

# Beschreibung

Im Rahmen des vorliegenden Beispiels kommt Grafana zum Einsatz. Ihre Lösung sollte allerdings auf Basis einer der diversen Desktop Frameworks wie WPF, Qt oder aber auch Web- oder Mobiletechnologie (Angular, Vue, React, Flutter, Android, ...) entstehen.


# Eingesetzte Technologien

- Docker
- MQTT
- Grafana