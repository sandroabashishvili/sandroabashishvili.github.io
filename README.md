# Sandro Abashishvili – Developer Portfolio

Persönliches Entwicklerportfolio mit ausgewählten Projekten aus Softwareentwicklung, Automatisierung, Datenverarbeitung und operativen Anwendungen.

**Live:** [sandro-abashishvili.de](https://sandro-abashishvili.de/)

Die eigene Domain ist die kanonische öffentliche Adresse. GitHub Pages dient ausschließlich als Hosting-Layer.

## Positionierung

**Engineering → Practical Operations → Software & Automation**

Das Portfolio zeigt praxisorientierte Softwareprojekte, die konkrete Abläufe, Daten und Entscheidungen verständlicher oder effizienter machen – von Webanwendungen und Dashboards bis zu Automatisierung, Datenpipelines und internen Werkzeugen.

## Ausgewählte Projekte

### SmartSignalHub – Bitcoin Live Signals

Daten- und Softwareprojekt zur transparenten Beobachtung regelbasierter Bitcoin-Strategien. Die Plattform zeigt Signale, Entry-/TP-/SL-Pläne, simulierte Positionen und die Logik hinter sichtbaren Entscheidungen.

[Live](https://sandro-abashishvili.de/Bitcoin-Live-Signals/) · [Repository](https://github.com/sandroabashishvili/Bitcoin-Live-Signals)

### Hessen Aktuell

Automatisiertes regionales Informationsportal für Hessen. Python-Pipelines erfassen freigegebene Nachrichten- und Jobquellen, strukturieren die Daten und erzeugen daraus statische Stadt-, Themen-, Archiv- und Stellenangebotsseiten.

[Live](https://sandro-abashishvili.de/hessen-aktuell/) · [Repository](https://github.com/sandroabashishvili/hessen-aktuell)

### Logistics Operations Dashboard

Interaktiver Operations- und BI-Prototyp für Transport-, Touren-, Kraftstoff-, Fahrzeug- und Kostendaten. Das Dashboard berechnet Kennzahlen, markiert Risiken und unterstützt operative Entscheidungen über eine gefilterte Analyseansicht.

[Live](https://sandro-abashishvili.de/logistics-operations-dashboard/) · [Repository](https://github.com/sandroabashishvili/logistics-operations-dashboard)

### Education Center CRM

Flask-/SQLite-Anwendung für Schüler, Kurse, Gruppen, Unterricht, Anwesenheit und Zahlungen. Die lokale Vollversion enthält Anmeldung, Rollen, Formulare, Geschäftslogik, Exporte, Backups und Regressionstests; öffentlich steht eine schreibgeschützte Portfolio-Demo bereit.

[Demo](https://sandro-abashishvili.de/education-center-crm/) · [Repository](https://github.com/sandroabashishvili/education-center-crm)

### Project Quality & Release Inspector

Konfigurationsgesteuerte QA-Plattform für mehrere Websites und Python-Anwendungen. Sie kombiniert Code-, Browser-, SEO-, Accessibility- und Security-Prüfungen, vergleicht Scans und erstellt nachvollziehbare Release-Entscheidungen.

[Repository](https://github.com/sandroabashishvili/project-quality-release-inspector)

### Georgien Atlas

Leichtgewichtiger datenbasierter Web-Atlas mit interaktiver Karte, Regions- und Gemeindedaten sowie strukturierten Reiseinformationen. Das Projekt verbindet Datenvisualisierung, redaktionelle Inhalte und responsive Frontend-Entwicklung ohne schweres Framework.

[Live](https://sandro-abashishvili.de/georgien-atlas/) · [Repository](https://github.com/sandroabashishvili/georgien-atlas)

## Technischer Fokus

Die Projekte im Portfolio decken unter anderem folgende Bereiche ab:

- Python, Flask und SQLite
- HTML5, CSS3 und Vanilla JavaScript
- REST-/Daten-APIs und externe Datenquellen
- Automatisierung und Datenpipelines
- Dashboards, CRM- und interne Werkzeuge
- JSON- und CSV-Verarbeitung
- Tests, Debugging und Release-Prüfung
- Git, GitHub, Linux/WSL und GitHub Pages

### Dieses Portfolio selbst

Die Portfolio-Seite ist bewusst leichtgewichtig aufgebaut:

- semantisches HTML5
- modulares CSS
- Vanilla JavaScript
- GitHub Pages
- responsive Bildvarianten und WebP-Assets
- automatische Hell-/Dunkeldarstellung über `prefers-color-scheme`
- Google Analytics mit Consent-Logik

## Repository-Struktur

```text
.
├── index.html                       # Hauptseite des Portfolios
├── datenschutz/                     # Datenschutzhinweise
└── assets/
    ├── styles.css                   # primäres visuelles System
    ├── polish.css                   # responsive/readability refinements
    ├── navigation.js                # Navigation und Anchor-Scrolling
    ├── analytics-consent.js         # GA4-Consent-Logik
    ├── sandro-portrait-*.webp       # responsive Portraitvarianten
    ├── favicon.svg                  # Browser-Favicon
    ├── portfolio-icon.png           # Brand-Icon
    ├── portfolio-app-icon.png       # App-/Apple-Touch-Icon
    ├── portfolio-social-card.png    # Social-Sharing-Bild
    └── projects/                    # Projekt-Screenshots
```

## Lokal starten

Es gibt keinen Build-Schritt und keine Paketabhängigkeiten.

```bash
git clone https://github.com/sandroabashishvili/sandroabashishvili.github.io.git
cd sandroabashishvili.github.io
python3 -m http.server 8000
```

Danach im Browser öffnen:

```text
http://127.0.0.1:8000/
```

## Performance und Qualität

- Kritische Above-the-fold-Styles sind direkt in `index.html` eingebettet.
- Vollständige Stylesheets laden ohne Blockierung des ersten Renderings.
- Portfolio- und Projektbilder verwenden WebP, feste Dimensionen und Lazy Loading, wo es sinnvoll ist.
- Google Analytics startet nach dem initialen Seitenaufbau unter Beibehaltung der Consent-Konfiguration.
- Release-Prüfungen kontrollieren unter anderem Mobile Performance, Layout-Stabilität, Accessibility und SEO.

## Production-Regeln

- `https://sandro-abashishvili.de/` bleibt die einzige kanonische öffentliche Domain.
- `github.io`-Adressen werden nicht in Canonical-, Social- oder Structured-Data-Metadaten zurückgeführt.
- Analytics-Consent und Datenschutzverhalten bleiben bei Änderungen erhalten.
- Nach größeren Änderungen werden veraltete Assets, doppelter Code, tote Logik und temporäre Workarounds geprüft und nur nach Verifikation entfernt.

## Status

**Aktives Production-Portfolio.**

Die Seite wird als zentrale technische Präsentation gepflegt. Einzelne Projekte können unabhängig davon abgeschlossen, erweitert oder weiterentwickelt werden.

## Autor

Sandro Abashishvili

[Portfolio](https://sandro-abashishvili.de/) · [GitHub](https://github.com/sandroabashishvili) · [LinkedIn](https://www.linkedin.com/in/aleksandre-abashishvili-03417617a/)
