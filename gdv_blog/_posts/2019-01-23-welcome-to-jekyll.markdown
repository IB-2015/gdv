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

## Konzeption
Im Projektverlauf entstanden eine Reihe an Ideen wie man mit hilfe einer interaktiven Weboberfläche schnell, einfach und vorzugsweise intuitiv Daten darstellen und hilfreiche informationen daraus gewinnen kann. Eine Auswahl und Beschreibung der vielversprechendsten Ideen hierzu finden Sie unter Punkt 3.2 Visualisierungsprozess.

# 1.1 Einführung
Ziel des Projektes war die Visualisierung der weltweiten Mordrate anhand spezifischer Daten. Im speziellen Daten, welche für bzw. aus den Zielen der Sustainable Development Goals von zentraler Bedeutung sind.

# 1.2 Motivation
Motiviert aus der Möglichkeit einzelne Kontinente, Subregionen und Staaten einfach miteinander vergleichen zu können stießen wir bei der Datenrecherche auf ein Paper.


> “Whats causes violent crime?”
Pablo Fajnzylber, European Economic Review 2000 https://siteresources.worldbank.org/DEC/Resources/What_Causes_Crime.pdf”

Welches die Auswirkungen bestimmter Lebensumstände auf die Mordrate eines Landes behandelt. Was indirekt zur zusätzlichen Motivation der Darstellung bzw. Prüfung von Inhalten aus diesem führte. Weiterhin stießen wir auf Projekte die diverse Ähnlichkeiten aufwiesen wodurch die qualitative Anforderung entstand ggf. die Darstellungen existierender ähnlicher Ansätze falls möglich zu verbessern. Die interessantesten Ansätze finden Sie unter Punkt 3.1 Verwandte Arbeiten & Inspiration.

# 1.3 Thesen oder Fragestellung
Aus einer Reihe an konzeptionellen Fragestellungen führten uns die folgenden zur Kernthematik.
Welchen Einfluss haben Bildung, Wohlstand und Verteilung von Reichtum auf die Rate von Gewaltverbrechen und Morden?
Führt eine große Kluft zwischen Arm und Reich zu mehr Gewaltverbrechen?
Führen schlechte Bildung und Armut zu einer erhöhten Gewaltbereitschaft?

> “Lebensumstände und dessen Auswirkungen auf die Mordrate.”



## Daten / Auswertung
Zu unseren Fragestellungen passend entschieden wir uns für folgende SDG´s als Indikatoren welche die Faktoren für Lebensumstände wiederspiegeln sollen.
- SDG 4 - Hochwertige Bildung
  - UN Human Development Reports
  - Education Index
  - Human Development Index
- SDG 8 - Menschenwürdige Arbeit und Wirtschaftswachstum
  - 8.1.1 Annual growth rate of real GDP per capita
- SDG 10 - Weniger Ungleichheiten
  - OECD Income inequality
- SDG 16 - Frieden, Gerechtigkeit und starke Institutionen
  - 16.1.1 Number of victims of intentional homicide per 100.000 population

<br>
Auffällig war, dass es verhältnismäßig sehr viel Zeit in Anspruch nahm, ansatzweise vielfältige und vollständige Datensätze zu finden. Da es keine zentrale Erfassung bestimmter Daten gibt und diese von Land zu Land unterschiedlich gehandhabt werden sind zumeist viele Zusammenstellungen mit verschiedenen Werten vorzufinden. Insbesondere Datenlücken in bestimmten Zeitintervallen erschwerte eine so detailreiche Darstellung wie von uns geplant. Die vielversprechendste Lösung war die Bildung eines Mittelwerts über einen fest definierten Zeitraum.
<br>
![image-title-here](/images/Mordrate/TableauMordsVsBIP.JPG){:class="img-responsive"}
![image-title-here](/images/Mordrate/TableauMordsVsEdu.JPG){:class="img-responsive"}
![image-title-here](/images/Mordrate/TableauMordsVsGINI.JPG){:class="img-responsive"}
<br>

Was sich auch in einem ersten prototypischen Visualisierungsexperiment als Sinnvoll erwies.

### Daten


### Prozess

Während der Datenrecherche stießen wir neben
dem oben genannten Paper auch noch auf einige Interessante verwandte Arbeiten
mit Visualisierungsexperimenten die wir zur Inspiration nahmen und im
Nebeneffekt zu unserem Prototyp sinnvoll ergänzen bzw. ggf. verbessern wollten.



- <a href="http://staff.math.su.se/hoehle/blog/2018/07/09/gini.html">World Income, Inequality and Murder</a> <br>
[BESCHREIBUNG]<br>
Dieses Projekt untersucht den Einfluss der Einkommensungleichverteilung auf die Mordrate von Ländern, durch eine Visualisierung des Gini-Index im Vergleich zur Mordrage.<br>
<a href="http://staff.math.su.se/hoehle/blog/2018/07/09/gini.html"><img src="/images/Mordrate/GiniFactor.PNG" alt="drawing" style="width:400px;"/></a>

- <a href="https://homicide.igarape.org.br/">Homicide Monitor</a> <br>
[BESCHREIBUNG]<br>
Der Homicide Monitor veranschaulicht weltweite Mordraten auf anschauliche Weise.<br>
<a href="https://homicide.igarape.org.br/"><img src="/images/Mordrate/hIgarape.PNG" alt="drawing" style="width:400px;"/></a>

- <a href="http://apps.who.int/violence-info/homicide/">WHO Global Health Estimates</a><br>
[BESCHREIBUNG]<br>
<a href="https://www.unodc.org/gsh/"><img src="/images/Mordrate/homicidePeryear.PNG" alt="drawing" style="width:400px;"/></a>

- <a href="https://www.unodc.org/gsh/">UNODV Global Study on Homicide</a> <br>
[BESCHREIBUNG]<br>
<a href="https://www.unodc.org/gsh/"><img src="/images/Mordrate/UNODVGlobalStudyonHomicide.PNG" alt="drawing" style="width:400px;"/></a>




## Prototyp / Ergebnisse

### Visualisierung
Ergebnisse, Design, Prototyp. Darstellungen echter oder ausgewählter Daten.

### Erkenntnisse
Was haben Sie herausgefunden? Können Sie ein/zwei Aussagen oder Stories hervorheben? <br>
Entgegen der Erwartungen konnten wir die Aussagen aus dem Paper weder bestätigen noch widerlegen. Es gab einige klar erwartete Ergebnisse aber auch Werte die zufällig – 
fast wahllos ohne Anzeichen auf Zusammenhänge aufgetreten sind.
Überwiegend kann man aber sagen, dass die Qualität von Bildung auf Basis unserer Daten vermeintlich keinen Einfluss auf die Mordrate nimmt und die Faktoren BIP sowie Gini-Index mit den Mordraten korrelieren. Ob sich das tatsächliche Ergebnis ggf.
anhand der Aggregation der Daten auf einen Mittelwert von unserem erwarteten
und dem im Paper unterscheidet gilt es noch zu klären.


### Implementierung

Visualisiert wurde in einem interaktiven Screen
dessen obere Hälfte eine Weltkarte und in dessen unterer Hälften jeweils 2 Diagramme
passend zur oben getroffenen Auswahl liegen.
Die Karte ist eine sogenannte Choroplethenkarte
in welcher wir auf drei Ebenen interagieren und auswählen können. Die oberste
Ebene bildet die Kontinente, die nächst tiefer Ebene das UN-Geoscheme und die
tiefste Ebene die einzelnen Staaten ab.
In den Diagrammbereichen haben wir 2 Arten
von Diagrammen benutzt. Ein klassisches Balkendiagramm, dass die Mordrate in
der ausgewählten Region sowie zum direkten Vergleich der darüberliegenden Ebene
anzeigt. Das zweite Diagramm zeigt die Faktoren und deren Intensität mittels
einer Fläche welche auf 3 Achsen läuft die einen gemeinsamen Ursprung haben.
Erwähnenswert ist hier die negation des GINI-Indexes damit dieser wie alle anderen
Faktoren auch nach dem Prinzip je höher der Wert desto besser ist er
dargestellt werden kann. Weiterhin ist i.d.R. zumeist im Hintergrund auch noch
ein zweites Dreieck zu erkennen welches wie in den Balkendiagrammen auch die
nächst höhere Ebene zum Vergleich darstellt.
Technisch umgesetzt wurde der Prototyp mittels
node.js im Backend mit express.js und im Frontend mit d3.js

## Fazit
### Ergebnisse
Generell haben wir unser Ziel einer visuellen Übersicht und einer Möglichkeit des Vergleichs erreicht. Dieser Prototyp ist durch die visuelle Kartendarstellung, die Vergleichsmöglichkeiten zwischen Kontinenten, UN-Geoscheme und einzelnen Staaten sowie der Darstellung von Lebensqualität beschreibenden Faktoren vor allem für einen Vergleich der weltweiten Mordrate geeignet.

### Ausblick
Ein möglicher nächster Schritt in der Aussagekraft ist die Erhöhung des Detailgrads an Informationen, sodass man von einer zunächst recht oberflächlichen und stark aggregierten Betrachtung die Möglichkeit hat spezifische Werte, Daten und auch Trends zeigen zu können.
Für einen besseren Überblick könnten auch Details on Demand auf der Karten und den Diagrammen sorgen.
Weiterhin wäre es durchaus interessant, spezifische Daten und Zeiträume untersuchen zu können und hierbei vor allem auch Datenlücken aufzuzeigen, welche wiederum mit Medienberichten verknüpft werden könnten, um auf die möglichen Ursachen schließen zu können.
Rein technisch bieten sich hier ebenfalls noch Optionen, die verwendeten Daten nicht nur wie bisher statisch zu integrieren, sondern eine API-Anbindung zu den betreffenden Datensammlungen zu implementieren, um neue Informationen direkt visualisieren zu können. 

