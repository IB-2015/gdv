---
layout: page
title:  "Visualisierung der weltweiten Mordrate"
subheadline: Wie wirken sich Lebensumstände auf Gewalt aus?
header: no
show_meta: false
categories:
    - projects
image:
    title: Mordrate/completeDashboard.png
author: Sascha Betzwieser, Markus Klatt, Eugen Krizki, Felix Navas und Anusan Ranjan
external_site: "https://github.com/IB-2015/gdv.git"

---

Im Rahmen des Projektes wurden Daten verschiedener öffentlich zugänglicher Quellen, vornehmlich der UN, zur Thematik der Sustainable Development Goals (SDG) visualisiert. In einem stetig wachsenden und sich entwickelnden Zeitalter ist es nur logisch, dass sich nicht alle Menschen weltweit gleichermaßen nachhaltig entwickeln können. Mithilfe der Visualisierung der Mordraten gehen wir der Frage nach, wie sich die Lebensumstände, die Qualität von Bildung, die Wirtschaftlichkeit und die Verteilung von Wohlstand auf die Mordrate auswirken können und ob es Gemeinsam- oder Auffälligkeiten gibt.
## Inhalt
- [1 Konzeption](#Konzeption)
- [2 Datenbasis](#Datenbasis)
- [3 Entwicklungsprozess](#Entwicklungsprozess)
- [4 Prototyp](#Prototyp)
- [5 Fazit](#Fazit)

## <a name="Konzeption"></a>1 Konzeption
Dem Entwicklungsprozess ist eine Konzeptionsphase vorangegangen. In dieser Phase sind Ideen zu einer intuitiven Weboberfläche gesammelt worden, um Daten nutzerfreundlich darzustellen. Ziel ist es auch gewesen, durch die Visualisierung Information zu gewinnen, die in den Rohdaten nicht direkt ersichtlich sind. Eine Auswahl und Beschreibung dieser Ideen hierzu finden Sie unter Punkt [3.2 Visualisierungsprozess](#Visualisierungsprozess).

### 1.1 Einführung
Ziel des Projektes ist es gewesen durch eine Visualisierung Korrelationen zwischen Mordrate und Wohlstandsfaktoren zu untersuchen. Als Wohlstandsfaktoren sind von uns das Bruttoinlandsprodukt (BIP), der GINI Koeffizient und der Bildungsindex ausgewählt worden.

### 1.2 Motivation
Motiviert aus der Möglichkeit einzelne Kontinente, Subregionen und Staaten einfach miteinander vergleichen zu können stießen wir bei der Datenrecherche auf ein Paper.

> “Whats causes violent crime?” <br>
Pablo Fajnzylber, European Economic Review 2000

<a href="https://siteresources.worldbank.org/DEC/Resources/What_Causes_Crime.pdf">Link zum Paper</a>

Welches die Auswirkungen bestimmter Lebensumstände auf die Mordrate eines Landes behandelt. Was indirekt zur zusätzlichen Motivation der Darstellung bzw. Prüfung von Inhalten aus diesem führte. Weiterhin stießen wir auf Projekte, die diverse Ähnlichkeiten aufwiesen, wodurch die qualitative Anforderung entstand ggf. die Darstellungen existierender ähnlicher Ansätze falls möglich zu verbessern. Die interessantesten Ansätze finden Sie unter Punkt [3.1 Verwandte Arbeiten & Inspiration](#Verwandte Arbeiten).

### 1.3 Thesen oder Fragestellung
Aus einer Reihe an konzeptionellen Fragestellungen führten uns die folgenden zur Kernthematik.
- Welchen Einfluss haben Bildung, Wohlstand und Verteilung von Reichtum auf die Rate von Gewaltverbrechen und Morden?
- Führt eine große Kluft zwischen Arm und Reich zu mehr Gewaltverbrechen?
- Führen schlechte Bildung und Armut zu einer erhöhten Gewaltbereitschaft?

> Lebensumstände und deren Auswirkungen auf Mordraten

## <a name="Datenbasis"></a>2 Datenbasis
Im Folgenden werden, die für die Visualisierung zugrunde liegenden Daten und deren Quellen beschrieben.

### 2.1 Datenquellen
Unser Themenschwerpunkt spiegelt sich vor allem in den vier folgenden SDGs und deren Indikatoren wieder.
* <b>SDG 4 - Hochwertige Bildung</b>
<br>(UN Human Development Reports, Education Index, Human Development Index)
* <b>SDG 8 - Menschenwürdige Arbeit und Wirtschaftswachstum</b>
<br>(8.1.1 Annual growth rate of real GDP per capita)
* <b>SDG 10 - Weniger Ungleichheiten</b>
<br>(OECD Income inequality)
* <b>SDG 16 - Frieden, Gerechtigkeit und starke Institutionen</b>
<br>(16.1.1 Number of victims of intentional homicide per 100.000 population)

Nach Sichtung verschiedener Daten auf Basis der oben genannten SDGs und dem Vergleich mit unseren Anforderungen entschieden wir uns folgende Quellen für die geplante Visualisierung zu berücksichtigen.
- <a href="http://hdr.undp.org/en/content/education-index">UN Education index</a>
- <a href="https://unstats.un.org/sdgs/indicators/database/">UN Intentional homicide per 100,000 population</a>
- <a href="https://data.worldbank.org/indicator/NY.GDP.PCAP.CD">Worldbank GDP per capita</a>
- <a href="https://data.worldbank.org/indicator/SI.POV.GINI">Worldbank GINI index</a> <br>

Zur Anzeige aller Länder in einer Karte und ihrer Gruppierung zu Sub-Regionen und Kontinenten wurden außerdem folgende Datenquellen verwendet:
- countries.geojson
- geoscheme.csv <br>

Außerdem wurde für die Akkumulierung der Indizes in Relation zur Bevölkerungsgröße  für Sub-Regionen und Kontinente die jeweiligen Bevölkerungszahlen benötigt. <br>
- <a href="https://data.worldbank.org/indicator/SP.POP.TOTL">Worldbank Population</a>

### 2.2 Datenerhebung
Auffällig war, dass es verhältnismäßig sehr viel Zeit in Anspruch nahm, ansatzweise vielfältige und vollständige Datensätze zu finden. Da es keine zentrale Erfassung der von uns gesuchten Daten gibt und diese von Land zu Land unterschiedlich gehandhabt werden sind zumeist viele Zusammenstellungen mit verschiedenen Werten vorzufinden. Insbesondere Datenlücken in bestimmten Zeitintervallen erschwerte eine so detailreiche Darstellung wie von uns geplant bzw. durch die Aussagen im Paper vorausgesetzt.
Die vielversprechendste Lösung war die Idee der Bildung eines Mittelwerts über einen fest definierten Zeitraum.

### 2.3 Datenauswertung
...//TODO MARKUS… (kurze Beschreibung ansonsten verweis auf 3.3 Visualisierungsexperimente)

### 2.4 Datenaufbereitung
Die Bearbeitung der Datensätze hat sich als sehr aufwendig herauskristallisiert. Am Anfang war es schwer konsistente Daten zu finden. Unsere erste Idee war es verschiedene Quellen zu benutzen um fehlende Daten aufzufüllen.  Nach der Besprechung mit Professor Nagel haben wir uns aber entschieden nur mit einer Informationsquelle zu arbeiten. Das Auswahlkriterium war simpel es ging vor allem um die Qualität der Daten. wir haben uns schließlich für Datensätze der United Nations entschieden, für die Kategorie Bildung und GINI-Index die World Bank - Datensatz benutzt.
Danach ging es um die Verarbeitung der Informationen. Man konnte sich verschiedene Dateitypen herunterladen direkt von der Webseite. Wir haben uns entschlossen Python zu verwenden, um die Daten zu behandeln. Dieser Arbeitsschritt war sehr Zeitintensiv und forderte auch ein gewisses Verständnis mit dem Umgang von Informationen. Man musste penibel auf die Form der Daten achten und jeder Datensatz war unterschiedlich strukturiert. Es war unmöglich ein automatisiertes Verfahren zu entwickeln, die für alle Datensätze anwendbar wäre. Man musste jeden Datensatz einzeln behandeln und forderte wiederum Wissen in den jeweiligen Domänen. Die anschließende Bewertung nach den ganzen Änderungen an den Datensätze konnte man nur mit Recherchen realisieren. Um die fehlenden Einträge zu eliminieren haben wir uns entschlossen den Bereich von 2007 bis 2016 zu benutzen und dabei alle Einträge aufzusummieren und mit der Anzahl der Einträge zu dividieren. Diesen Mittelwert haben wir dann verwendet um unsere Darstellungen zu realisieren. Viele Faktoren haben dafür gesorgt Lücken in die Datensätze zu machen, wie z.B. Kriege, Umweltkatastrophen, Embargos (Nord-Korea). Um die Realisierung mit Python zu ermöglichen haben wir verschiedene Bibliotheken benutzt um die Daten zu bearbeiten und abzuspeichern.


Unsere Datenaufbereitung erwies sich in einem ersten prototypischen Visualisierungsexperiment als sinnvoll und praktikabel. Wodurch wir in unsere Datenbasis bestätigt wurden. Die Ergebnisse besagter Visualisierungsexperimente finden Sie unter Punkt [3.3 Visualisierungsexperimente](#Visualisierungsexperimente).


## <a name="Entwicklungsprozess"></a>3 Entwicklungsprozess
...//TODO MARKUS...

### <a name="Verwandte Arbeiten"></a>3.1 Verwandte Arbeiten & Inspiration
Während der Datenrecherche stießen wir neben dem oben genannten Paper auch noch auf einige Interessante verwandte Arbeiten mit Visualisierungen, die wir zur Inspiration nahmen und als Nebeneffekt zu unserem Prototyp sinnvoll ergänzen bzw. ggf. verbessern wollten.


| <b> World Income, Inequality and Murder</b> <br>Dieses Projekt untersucht den Einfluss der Einkommenungleichverteilung auf die Mordrate von Ländern, durch eine Visualiserung des GINI-Index im Vergleich zur Mordrate. Innerhalb eines Koordinatensystems werden die einzelnen Staaten in einem Punktdiagramm über die Farbe ihren jeweiligen geografischen Regionen zugeordnet. Die Größen der Punkte stellen hierbei die Bevölkerung dar. Weiterhin wird über die Farbe eine Trendlinie dargestellt. Anhand der gewählten Darstellungsmittel kann in einer Animation die Zu- und oder Abnahme der Mordraten von Regionen und einzelner Staaten über mehrere Jahre hinweg übersichtlich dargestellt werden.<br> | <a href="http://staff.math.su.se/hoehle/blog/2018/07/09/gini.html"><img src="/images/Mordrate/GiniFactor.PNG" alt="drawing" width="500"/></a> |
| <b> Homicide Monitor </b> <br> Der Homicide Monitor veranschaulicht die weltweite Mordraten und nimmt Bezug auf Metadaten wie die Gesamtbevölkerung, die Mordwaffen, das Geschlecht sowie das Alter der Opfer. | <a href="https://homicide.igarape.org.br/"><img src="/images/Mordrate/hIgarape.PNG" alt="drawing" width="500"/></a> |
| <b> WHO Global Health Estimates</b><br> Der Bericht "WHO Global Health Estimates" nutzt ebenfalls die Daten einer globalen Mordrate, sowie der Differnzierung zwischen Geschlechtern und dem Alter. Visualisiert ist dies sehr simpel auf einer Weltkarte über verschieden große Rauten und setzt auf Details on Demand. Generell eine sehr simple aber überschaubare Darstellung. | <a href="http://apps.who.int/violence-info/homicide/"><img src="/images/Mordrate/homicidePeryear.PNG" alt="drawing" width="500"/></a> |
| <b> UNODV Global Study on Homicide</b> <br> Die "Global Study on Homicide" sticht vor allem durch sehr spezifische und Daten und dessen Vielfalt hervor. | <a href="https://www.unodc.org/gsh/"><img src="/images/Mordrate/UNODVGlobalStudyonHomicide.PNG" alt="drawing" width="3000"/></a> |

### <a name="Visualisierungsprozess"></a>3.2 Visualisierungsprozess
...//TODO… (Scribbles, Mockups, Entwürfe)

### <a name="Visualisierungsexperimente"></a>3.3 Visualisierungsexperimente

| Um sicherzustellen, dass unsere Datensätze eine angemessene Qualität haben, visualisierten wir ähnlich dem Projekt in 3.1 <a href="http://staff.math.su.se/hoehle/blog/2018/07/09/gini.html">World Income, Inequality and Murder</a>. Die Ergebnisse spiegelten ähnliche Werte wie in den betrachteten verwandten Arbeiten wieder. Weiterhin konnten wir auch die Aussage treffen, dass der GINI-Index und das BIP offensichtlich mit der Mordrate korrelieren. Der Education Index scheint hierbei jedoch nicht relevant. | <img src="/images/Mordrate/TableauMordsVsBIP.JPG" alt="drawing" width="3000"/> |
| <img src="/images/Mordrate/TableauMordsVsEdu.JPG" alt="drawing" width="3000"/> | <img src="/images/Mordrate/TableauMordsVsGINI.JPG" alt="drawing" width="3000"/> |

### 3.4 Erkenntnisse
Wir konnten die Aussagen aus dem Paper erwartungsgemäß bestätigen.
Es gab klar erwartete Ergebnisse aber auch Werte die zunächst vermeintlich zufällig – fast wahllos ohne Anzeichen auf Zusammenhänge aufgetreten sind. Die Begründung hierfür liegt in der Aggregation einzelner Staaten zu Regionen bzw. diese wiederum zu Kontinenten. Man kann also klar die Aussage treffen, dass die Qualität von Bildung auf Basis unserer Daten einen Einfluss auf die Mordrate nimmt, die Faktoren BIP sowie GINI-Index mit den Mordraten korrelieren und die Qualität der Bildung keine Auswirkungen bewirkt.


## <a name="Prototyp"></a>4 Prototyp
...//TODO MARKUS...
[Nach der IEXPO wurde der Prototyp noch um einen Scatterplot erweiteret, ...]

### 4.1 Verwendete Tools & Frameworks
Zur Entwicklung des Prototyps wurden node.js zusammen mit
express.js für das Backend verwendet. Das Frontend wurde
mittels JavaScript und d3.js, einer JavaScript-Bibliothek
zur Erstellung dynamischer, interaktiver
Datenvisualisierungen in Webbrowsern, realisiert. Für das
Design des Frontends wurde zusätzlich Bootstrap für ein
responsive Design eingebunden, um die Portierbarkeit auf
unterschiedliche Bildschirmgrößen zu gewährleisten.

### 4.2 Systemarchitektur
Das Backend wurde als REST API implementiert, welche die
von uns gefundenen Datenquellen über mehrere Endpunkte zur
Verfügung stellt. Hierfür wird die jeweilige CSV-Datei
eingelesen und als JSON-Objekt versendet.

Das Frontend wurde als Single Page Application realisiert.
Dabei werden die Inhalte dynamisch in eine Seite geladen,
anstatt dass neue Seite geladen werden, was dabei hilft,
die Usability zu verbessern, da das Laden neuer Seiten
wegfällt und der Benutzer dadurch unterbrechungsfrei mit
der Applikation interagieren kann.

### 4.3 Herausforderungen
Eine Herausforderung bestand in der Größe der
geojson-Dateien, die wir für die Generierung der Weltkarte
benötigten. Anfänglich speicherten wir die Dateien im
Backend und wollten diese ebenfalls per REST API Endpunkt
zur Verfügung stellen. Allerdings hatten diese Daten eine
Größe von 56 MB was dazu führte, dass die Seite sehr lange
benötigte um sich aufzubauen, da allein die Übertragung
der geojson-Daten 2-3 Minuten dauerte.
Daraufhin entschieden wir uns, die Daten für das Erstellen
der Karte im Frontend zu belassen um die Geschwindigkeit
des Seitenaufbaus zu verbessern. Weiterhin erhielten wir
von Herr Nagel den Tipp, dass es auch kleinere Versionen
der goejson-Daten gab die wir benötigten. Durch die
Verwendung dieser um ca. die hälfte kleineren Daten
konnten wir die Ladegeschwindigkeit der Karte weiter
verbessern, sodass diese nun in ca. 1-2 Sekunden geladen
wird, wie im Folgenden Bild zu sehen.

![image](/images/Mordrate/loadingTime_mapressources.PNG)
### 4.4 Implementierung
...//TODO1 ANUSAN/SASCHA
[OPTIONAL, falls ihr speziell auf was eingehen wollt und könnt zb. CODE zeigen etc]

[LINK ZUM REPO]
Visualisiert wurde in einem interaktiven Screen dessen obere Hälfte eine Weltkarte und in dessen unterer Hälften jeweils 2 Diagramme passend zur oben getroffenen Auswahl liegen.
![image](/images/Mordrate/completeDashboard.png)
Die Karte ist eine sogenannte Choroplethenkarte in welcher wir auf drei Ebenen interagieren und auswählen können vgl. Abbildung X-Y. Die oberste Ebene bildet die Kontinente, die nächst tiefer Ebene das UN-Geoscheme und die tiefste Ebene die einzelnen Staaten ab.

| ![image](/images/Mordrate/mapContinent.PNG) | ![image](/images/Mordrate/mapSubRegions.PNG) | ![image](/images/Mordrate/mapCountries.PNG)|

In den Diagrammbereichen haben wir 2 Arten von Diagrammen benutzt vgl. Abbildung XY.

![image](/images/Mordrate/lowerDashboard.PNG)

| Ein klassisches Balkendiagramm, dass die Mordrate in der ausgewählten Region sowie zum direkten Vergleich der darüberliegenden Ebene anzeigt vgl. Abbildung XY. | <img src="/images/Mordrate/barChart.PNG" alt="drawing" width="2000"/> |
| Das zweite Diagramm ist ein Netzdiagramm und zeigt die Faktoren und deren Intensität mittels einer Fläche, welche auf 3 Achsen läuft die einen gemeinsamen Ursprung haben vgl. Abbildung XY. Erwähnenswert ist hier die Negation des GINI-Indexes damit dieser wie alle anderen Faktoren auch nach dem Prinzip je höher der Wert desto besser ist er dargestellt werden kann. Weiterhin ist i.d.R. zumeist im Hintergrund auch noch ein zweites Dreieck zu erkennen, welches wie in den Balkendiagrammen auch, den Vergleich zur nächst höheren Ebene darstellt. | ![image](/images/Mordrate/radarChart.PNG) |





## <a name="Fazit"></a>5 Fazit
...//TODO MARKUS...

### 5.1 Ergebnisse
Generell haben wir unser Ziel einer visuellen Übersicht, einer Möglichkeit des Vergleichs sowie dem bekräftigen des Papers erreicht.
Dieser Prototyp ist durch die visuelle Kartendarstellung, die Vergleichsmöglichkeiten zwischen Kontinenten, UN-Geoscheme und einzelnen Staaten sowie der Darstellung von Lebensqualität beschreibenden Faktoren vor allem für einen Vergleich der weltweiten Mordrate geeignet.

### 5.2 Ausblick
Ein möglicher nächster Schritt in der Aussagekraft ist die Erhöhung des Detailgrads an Informationen, sodass man von einer zunächst recht oberflächlichen und stark aggregierten Betrachtung die Möglichkeit hat spezifische Werte, Daten und auch Trends zeigen zu können.
Für einen besseren Überblick könnten auch Details on Demand auf der Karte und den Diagrammen sorgen.
Weiterhin wäre es durchaus interessant, spezifische Daten und Zeiträume untersuchen zu können und hierbei vor allem auch Datenlücken aufzuzeigen, welche wiederum mit Medienberichten verknüpft werden könnten, um auf die möglichen Ursachen u.U. direkter schließen zu können.
Rein technisch bieten sich hier ebenfalls noch Optionen, die verwendeten Daten nicht nur wie bisher statisch zu integrieren, sondern eine API-Anbindung zu den betreffenden Datensammlungen zu implementieren, um neue Informationen direkt visualisieren zu können.
[TODO Prototyp erweitern um Quellen und Jahresanzeige der verwendeten Daten, Legenden konkreter bezeichnen, Verbessereung der Usability, es ist nicht direkt einsichtig, wie das Board zu bedienen ist (v.a. Wie ändert man die Ebene der Karte)]
