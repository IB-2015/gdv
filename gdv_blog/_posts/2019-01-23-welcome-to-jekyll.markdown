---
layout: post
title:  "Visualisierung der weltweiten Mordrate"
subheadline: Wie wirken sich Lebensumstände auf Gewalt aus?
teaser: "Dieses Markdown-Template zeigt einige Möglichkeiten für die Projektdokumentation"
header: no
show_meta: false
categories:
    - projects
image:
    title: image_files/Edu.jpg
    caption: Teaser
author: Sascha Betzwieser, Markus Klatt, Eugen Krizki, Felix Navas und Anusan Ranjan
external_site: "https://making.pusher.com/latency-working-set-ghc-gc-pick-two/"

---

Im Rahmen des Projektes wurden Daten verschiedener öffentlich zugänglicher Quellen, vornehmlich der UN, zur Thematik der Sustainable Development Goals visualisiert. In einem stetig wachsenden und sich entwickelnden Zeitalter ist es nur logisch, dass sich nicht alle Menschen weltweit gleichermaßen nachhaltig entwickeln können. Mithilfe der Visualisierung der Mordraten gehen wir der Frage nach, wie sich die Lebensumstände wie die Qualität von Bildung, die Wirtschaftlichkeit und die Wohlstandsverteilung auf die Mordrate eines Kontinentes, einer Region oder eines Staates auswirken können und ob es Gemeinsam- oder Auffälligkeiten bestimmter Regionen gibt.
# Inhalt
- [1 Konzeption](#Konzeption)
- [2 Datenbasis](#Datenbasis)
- [3 Entwicklungsprozess](#Entwicklungsprozess)
- [3 Prototyp](#Prototyp)
- [4 Fazit](#Fazit)

# <a name="Konzeption"></a>1 Konzeption
Im Projektverlauf entstanden eine Reihe an Ideen wie man mit hilfe einer interaktiven Weboberfläche schnell, einfach und vorzugsweise intuitiv Daten darstellen und hilfreiche informationen daraus gewinnen kann. Eine Auswahl und Beschreibung der vielversprechendsten Ideen hierzu finden Sie unter Punkt [3.2 Visualisierungsprozess](#Visualisierungsprozess).

## 1.1 Einführung
Ziel des Projektes war die Visualisierung der weltweiten Mordrate anhand spezifischer Daten. Im speziellen Daten, welche für bzw. aus den Zielen der Sustainable Development Goals von zentraler Bedeutung sind.

## 1.2 Motivation
Motiviert aus der Möglichkeit einzelne Kontinente, Subregionen und Staaten einfach miteinander vergleichen zu können stießen wir bei der Datenrecherche auf ein Paper.

> “Whats causes violent crime?” <br>
Pablo Fajnzylber, European Economic Review 2000

<a href="https://siteresources.worldbank.org/DEC/Resources/What_Causes_Crime.pdf">Link zum Paper</a>

Welches die Auswirkungen bestimmter Lebensumstände auf die Mordrate eines Landes behandelt. Was indirekt zur zusätzlichen Motivation der Darstellung bzw. Prüfung von Inhalten aus diesem führte. Weiterhin stießen wir auf Projekte die diverse Ähnlichkeiten aufwiesen wodurch die qualitative Anforderung entstand ggf. die Darstellungen existierender ähnlicher Ansätze falls möglich zu verbessern. Die interessantesten Ansätze finden Sie unter Punkt [3.1 Verwandte Arbeiten & Inspiration](#Verwandte Arbeiten).

## 1.3 Thesen oder Fragestellung
Aus einer Reihe an konzeptionellen Fragestellungen führten uns die folgenden zur Kernthematik.
Welchen Einfluss haben Bildung, Wohlstand und Verteilung von Reichtum auf die Rate von Gewaltverbrechen und Morden?
Führt eine große Kluft zwischen Arm und Reich zu mehr Gewaltverbrechen?
Führen schlechte Bildung und Armut zu einer erhöhten Gewaltbereitschaft?

> “Lebensumstände und dessen Auswirkungen auf die Mordrate.”

# <a name="Datenbasis"></a>2 Datenbasis
Im folgenden werden die für die visualisierung zugrunde liegenden Daten und deren Quellen beschrieben.

## 2.1 Datenquellen
Unser Themenschwerpunkt spiegelt sich vor allem in den vier folgenden SDG´s und deren Indikatoren wieder.
- 4 - Hochwertige Bildung
<br>(UN Human Development Reports, Education Index, Human Development Index)
- 8 - Menschenwürdige Arbeit und Wirtschaftswachstum 
<br>(8.1.1 Annual growth rate of real GDP per capita)
- 10 - Weniger Ungleichheiten
<br>(OECD Income inequality)
- 16 - Frieden, Gerechtigkeit und starke Institutionen
<br>(16.1.1 Number of victims of intentional homicide per 100.000 population)

Nach Sichtung der oben genannten Daten und dem Vergleich mit unseren Anforderungen entschieden wir uns folgende Quellen für die geplante Visualisierung zu berücksichtigen.
- <a href="http://hdr.undp.org/en/content/education-index">UN Education index</a>
- <a href="https://unstats.un.org/sdgs/indicators/database/">UN Intentional homicide per 100,000 population</a>
- <a href="https://data.worldbank.org/indicator/NY.GDP.PCAP.CD">Worldbank GDP per capita</a>
- <a href="https://data.worldbank.org/indicator/SI.POV.GINI">Worldbank GINI index</a>
- <a href="https://data.worldbank.org/indicator/SP.POP.TOTL">Worldbank Population</a>

## 2.2 Datenerhebung
Auffällig war, dass es verhältnismäßig sehr viel Zeit in Anspruch nahm, ansatzweise vielfältige und vollständige Datensätze zu finden. Da es keine zentrale Erfassung der von uns gesuchten Daten gibt und diese von Land zu Land unterschiedlich gehandhabt werden sind zumeist viele Zusammenstellungen mit verschiedenen Werten vorzufinden. Insbesondere Datenlücken in bestimmten Zeitintervallen erschwerte eine so detailreiche Darstellung wie von uns geplant bzw. durch die Aussagen im Paper Vorausgesetzt.
Die vielversprechendste Lösung war die Idee der Bildung eines Mittelwerts über einen fest definierten Zeitraum.

## 2.3 Datenauswertung
...//TODO MARKUS… (kurze Beschreibung ansonsten verweis auf 3.3 Visualisierungsexperimente)

## 2.4 Datenaufbereitung
...//TODO FELIX… (Wie haben wir die Datensätze modifiziert/angepasst bspw. Mittelwertbildung,... → scrrens der Datenstruktur/Csv.Datein,...) 

Unsere Datenaufbereitung erwies sich in einem ersten prototypischen Visualisierungsexperiment als sinnvoll und praktikabel. Wodurch wir in unsere Datenbasis bestätigt wurden. Die Ergebnisse besagter Visualisierungsexperimente finden Sie unter Punkt [3.3 Visualisierungsexperimente](#Visualisierungsexperimente).


# <a name="Entwicklungsprozess"></a>3 Entwicklungsprozess
...//TODO MARKUS...

## <a name="Verwandte Arbeiten"></a>3.1 Verwandte Arbeiten & Inspiration
Während der Datenrecherche stießen wir neben dem oben genannten Paper auch noch auf einige Interessante verwandte Arbeiten mit Visualisierungen, die wir zur Inspiration nahmen und als Nebeneffekt zu unserem Prototyp sinnvoll ergänzen bzw. ggf. verbessern wollten.

- <a href="http://staff.math.su.se/hoehle/blog/2018/07/09/gini.html">World Income, Inequality and Murder</a> <br>
[//TODO BESCHREIBUNG]<br>
Dieses Projekt untersucht den Einfluss der Einkommensungleichverteilung auf die Mordrate von Ländern, durch eine Visualisierung des Gini-Index im Vergleich zur Mordrage.<br>
<a href="http://staff.math.su.se/hoehle/blog/2018/07/09/gini.html"><img src="/images/Mordrate/GiniFactor.PNG" alt="drawing" style="width:400px;"/></a>

- <a href="https://homicide.igarape.org.br/">Homicide Monitor</a> <br>
[//TODO BESCHREIBUNG]<br>
Der Homicide Monitor veranschaulicht weltweite Mordraten auf anschauliche Weise.<br>
<a href="https://homicide.igarape.org.br/"><img src="/images/Mordrate/hIgarape.PNG" alt="drawing" style="width:400px;"/></a>

- <a href="http://apps.who.int/violence-info/homicide/">WHO Global Health Estimates</a><br>
[//TODO BESCHREIBUNG]<br>
<a href="https://www.unodc.org/gsh/"><img src="/images/Mordrate/homicidePeryear.PNG" alt="drawing" style="width:400px;"/></a>

- <a href="https://www.unodc.org/gsh/">UNODV Global Study on Homicide</a> <br>
[//TODO BESCHREIBUNG]<br>
<a href="https://www.unodc.org/gsh/"><img src="/images/Mordrate/UNODVGlobalStudyonHomicide.PNG" alt="drawing" style="width:400px;"/></a>

## <a name="Visualisierungsprozess"></a>3.2 Visualisierungsprozess
...//TODO… (Scribbles, Mockups, Entwürfe)

## <a name="Visualisierungsexperimente"></a>3.3 Visualisierungsexperimente
...//TODO…

<img src="/images/Mordrate/TableauMordsVsBIP.JPG" alt="drawing" width="400"/>
<img src="/images/Mordrate/TableauMordsVsEdu.JPG" alt="drawing" width="400"/>
<img src="/images/Mordrate/TableauMordsVsGINI.JPG" alt="drawing" width="400"/>

## 3.4 Erkenntnisse
[TODO überarbeiten]
Wir konnten die Aussagen aus dem Paper erwartungsgemäß bestätigen.
Es gab klar erwartete Ergebnisse aber auch Werte die zunächst vermeintlich zufällig – fast wahllos ohne Anzeichen auf Zusammenhänge aufgetreten sind. Die Begründung hierfür liegt in der Aggregation einzelner Staaten zu Regionen bzw. diese wiederum zu Kontinenten. Man kann also klar die Aussage treffen, dass die Qualität von Bildung auf Basis unserer Daten einen Einfluss auf die Mordrate nimmt, die Faktoren BIP sowie Gini-Index mit den Mordraten korrelieren und die Qualität der Bildung keine Auswirkungen bewirkt.

# <a name="Prototyp"></a>4 Prototyp
...//TODO MARKUS...

## 4.1 Verwendete Tools & Frameworks
...//TODO ANUSAN/SASCHA
Technisch umgesetzt wurde der Prototyp mittels node.js im Backend mit express.js und im Frontend mit d3.js

## 4.2 Systemarchitektur
...//TODO ANUSAN/SASCHA…

## 4.3 Herausforderungen
...//TODO ANUSAN/SASCHA

## 4.4 Implementierung
...//TODO1 ANUSAN/SASCHA
[OPTIONAL, falls ihr speziell auf was eingehen wollt und könnt zb. CODE zeigen etc]

[LINK ZUM HOST/
PROJEKT]
Visualisiert wurde in einem interaktiven Screen dessen obere Hälfte eine Weltkarte und in dessen unterer Hälften jeweils 2 Diagramme passend zur oben getroffenen Auswahl liegen.
<br>(Screen gesamt)
Die Karte ist eine sogenannte Choroplethenkarte in welcher wir auf drei Ebenen interagieren und auswählen können vgl. Abbildung X-Y. Die oberste Ebene bildet die Kontinente, die nächst tiefer Ebene das UN-Geoscheme und die tiefste Ebene die einzelnen Staaten ab.

<br>(Screen Ebene 1)
<br>(Screen Ebene 2)
<br>(Screen Ebene 3)

In den Diagrammbereichen haben wir 2 Arten von Diagrammen benuzt vgl. Abbildung XY.

<br>(Screen Diagrammbereich)

Ein klassisches Balkendiagramm, dass die Mordrate in der ausgewählten Region sowie zum direkten Vergleich der darüberliegenden Ebene anzeigt vgl. Abbildung XY.

<br>(Screen Balkendiagramm)

Das zweite Diagramm ist ein Netzdiagramm und zeigt die Faktoren und deren Intensität mittels einer Fläche welche auf 3 Achsen läuft die einen gemeinsamen Ursprung haben vgl. Abbildung XY.

<br>(Screen Netzdiagramm)

Erwähnenswert ist hier die negation des GINI-Indexes damit dieser wie alle anderen Faktoren auch nach dem Prinzip je höher der Wert desto besser ist er dargestellt werden kann. Weiterhin ist i.d.R. zumeist im Hintergrund auch noch ein zweites Dreieck zu erkennen welches wie in den Balkendiagrammen auch die nächst höhere Ebene zum Vergleich darstellt.

# <a name="Fazit"></a>5 Fazit
...//TODO MARKUS...

## 5.1 Ergebnisse
Generell haben wir unser Ziel einer visuellen Übersicht, einer Möglichkeit des Vergleichs sowie dem bekräftigen des Papers erreicht.
Dieser Prototyp ist durch die visuelle Kartendarstellung, die Vergleichsmöglichkeiten zwischen Kontinenten, UN-Geoscheme und einzelnen Staaten sowie der Darstellung von Lebensqualität beschreibenden Faktoren vor allem für einen Vergleich der weltweiten Mordrate geeignet.

## 5.2 Ausblick
Ein möglicher nächster Schritt in der Aussagekraft ist die Erhöhung des Detailgrads an Informationen, sodass man von einer zunächst recht oberflächlichen und stark aggregierten Betrachtung die Möglichkeit hat spezifische Werte, Daten und auch Trends zeigen zu können.
Für einen besseren Überblick könnten auch Details on Demand auf der Karten und den Diagrammen sorgen.
Weiterhin wäre es durchaus interessant, spezifische Daten und Zeiträume untersuchen zu können und hierbei vor allem auch Datenlücken aufzuzeigen, welche wiederum mit Medienberichten verknüpft werden könnten, um auf die möglichen Ursachen u.U. direkter schließen zu können.
Rein technisch bieten sich hier ebenfalls noch Optionen, die verwendeten Daten nicht nur wie bisher statisch zu integrieren, sondern eine API-Anbindung zu den betreffenden Datensammlungen zu implementieren, um neue Informationen direkt visualisieren zu können. 
[TODO Prottyp erweitern um Quellen und Jahresanzeige der verwendeten Daten, Legenden konkreter bezeichnen, verbessereung der Usability, es ist nicht direkt einsichtig, wie das Board zu bedienen ist (v.a. Wie ändert man die Ebene der Karte)]