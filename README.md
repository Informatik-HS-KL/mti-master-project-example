# mti-master-project-example

Ein Beispielprojekt für das Modul Mensch-Technik-Interaktion im Masterstudiengang Digital Engineering.

Zum Starten:
- Ins Verzeichnis `Docker` wechseln
- Befehl `docker-compose up` ausführen
- Im Browser Grafana unter `http://localhost:3000` aufrufen
- Mit Benutzernamen `admin` und Passwort `admin` anmelden (ggf. muss ein neues Passwort vergeben werden; der Schritt kann übersprungen werden)

Nach der Anmeldung kann in der linken Leiste im Bereich „Manage“ eine Übersicht der enthaltenen Dashboards eingesehen werden. In der Übersicht befindet sich auch das vorbereitete Dashboard „Temperature and humidity“, welches mit einem Klick aufgerufen werden kann.

# Troubleshooting

Sollte Grafana unter Linux Probleme beim Schreiben in das Verzeichnis `/var/lib/grafana` melden, kann folgendes getan werden:

1. Id des aktuellen Benutzers als Root herausfinden
```
id -u
```

2. In der docker-compose.yml den Benutzer hinzufügen (z.B. User Id 1000)
```
  grafana:
    image: grafana/grafana:7.0.0
    container_name: grafana
    user: "1000"
    depends_on:
      - influxdb
    ports:
      - 3000:3000
    volumes:
      - ${DATA_DIR}/grafana:/var/lib/grafana
    restart: always
```
3. Docker Compose mit Rootrechten ausführen `sudo docker-compose up`

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
