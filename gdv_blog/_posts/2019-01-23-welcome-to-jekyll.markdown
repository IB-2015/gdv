---
layout: page
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
---

## Abstract
 Im Rahmen des Projektes wurden Daten verschiedener öffentlich zugänglicher Quellen, vornehmlich der UN, zur Thematik der Sustainable Development Goals visualisiert. In einem stetig wachsenden und sich entwickelnden Zeitalter ist es nur logisch, dass sich nicht alle Menschen weltweit gleichermaßen nachhaltig entwickeln können. Mithilfe der Visualisierung der Mordraten, der Bildungsqualität, des Bruttoinlandsproduktes und dem GINI-Index gehen wir der Frage nach, wie sich die Lebensumstände einzelner Individuen wie die Qualität von Bildung, die Wirtschaftlichkeit und die Wohlstandsverteilung auf Gewaltverbrechen auswirken können und ob es Gemeinsam-oder Auffälligkeiten bestimmter Regionen gibt

## Einführung / Konzept
- Einführung: Was ist die Motivation hinter Ihrem Projekt? <br>
  Motiviert aus der Möglichkeit einzelne Kontinente, Subregionen und Staaten einfach miteinander vergleichen zu können stießen wir bei der Datenrecherche auf ein Paper( XXX(Titel und quelle)), dass die Auswirkungen bestimmter Faktoren auf die Lebensumstände behandelt. Was indirekt zur zusätzlichen Motivation der Darstellung bzw. Prüfung von Inhalten aus diesem führte.

- Konzept: Was ist die Grundidee, Hauptfrage, wichtigste Hypothese? <br>
  Aus einer Reihe an konzeptionellen Fragestellungen führen die folgenden gemeinsam zum zentralen Thema der Lebensumstände und dessen Auswirkungen auf die Mordrate. <br>
  -   Welchen Einfluss haben Bildung, Wohlstand und Verteilung von Reichtum auf die Rate von Gewaltverbrechen und Morden?
  - Führt eine große Kluft zwischen Arm und Reich zu mehr Gewaltverbrechen?
  -  Führen schlechte Bildung und Armut zu einer erhöten Gewaltbereitschaft?



## Daten / Auswertung
Zu unseren Fragestellungen passend entschieden wir uns für folgende SDG´s als Indikatoren welche die Faktoren für Lebensumstände wiederspiegeln sollen.
- 4 - Hochwertige Bildung
  - UN Human Development Reports
  - Education Index
  - Human Development Index
- 8 - Menschenwürdige Arbeit und Wirtschaftswachstum
  - 8.1.1 Annual growth rate of real GDP per capita
- 10 - Weniger Ungleichheiten
  - OECD Income inequality
- 16 - Frieden, Gerechtigkeit und starke Institutionen
  - 16.1.1 Number of victims of intentional homicide per 100.000 population

<br>
Auffällig war, dass es verhältnismäßig sehr viel Zeit in Anspruch nahm, ansatzweise vielfältige und vollständige Datensätze zu finden. Da es keine zentrale Erfassung bestimmter Daten gibt und diese von Land zu Land unterschiedlich gehandhabt werden sind zumeist viele Zusammenstellungen mit verschiedenen Werten vorzufinden. Insbesondere Datenlücken in bestimmten Zeitintervallen erschwerte eine so detailreiche Darstellung wie von uns geplant. Die vielversprechendste Lösung war die Bildung eines Mittelwerts über einen fest definierten Zeitraum.
<br>
![image-title-here](/images/image_files/TableauMordsVsBIP.jpg){:class="img-responsive"}
<br>

Was sich auch in einem ersten prototypischen Visualisierungsexperiment als Sinnvoll erwies.

### Daten


### Prozess
Sinnvolle Auswahl relevanter Experimente.<br>
Während der Datenrecherche stießen wir neben
dem oben genannten Paper auch noch auf einige Interessante verwandte Arbeiten
mit Visualisierungsexperimenten die wir zur Inspiration nahmen und im
Nebeneffekt zu unserem Prototyp sinnvoll ergänzen bzw. ggf. verbessern wollten.

World Income, Inequality and Murder - <a>http://staff.math.su.se/hoehle/blog/2018/07/09/gini.html</a> <br>
![image-title-here](/images/image_files/TableauMordsVsBIP.jpg){:class="img-responsive"}
<br>
Homicide Monitor - <a>https://homicide.igarape.org.br/</a> <br>
![image-title-here](/images/image_files/TableauMordsVsEdu.jpg){:class="img-responsive"} <br>
WHO Global Health Estimates - <a>http://apps.who.int/violence-info/homicide/</a> <br>
![image-title-here](/images/image_files/TableauMordsVsGINI.jpg){:class="img-responsive"} <br>
UNODV Global Study on Homicide - <a>https://www.unodc.org/gsh/</a> <br>


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
Wie haben Sie die Visualisierung umgesetzt? Welche Tools haben Sie für welche Schritte eingesetzt?
<br>
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

{% highlight javascript %}
function setup() {
  Data data = loadData();
  doSomeVisualization(data);
}
{% endhighlight %}


## Fazit
- Reflektion: Haben Sie erreicht, was sie wollten? Ist Ihr Ergebnis hilfreich?
- Ausblick: Welche weiteren Ideen haben Sie? Was könnten interessante
nächste Schritte sein?
