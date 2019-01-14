const drawRadarChart = (id, data) => {
  RadarChart.defaultConfig.color = function() {};
  RadarChart.defaultConfig.radius = 3;
  RadarChart.defaultConfig.w = d3v3.select(id).node().offsetWidth / 2;
  RadarChart.defaultConfig.h = d3v3.select(id).node().offsetHeight;

  var chart = RadarChart.chart();
  var cfg = chart.config(); // retrieve default config
  var svg = d3v3.select(id).append('svg')
    .attr('width', cfg.w + cfg.w + 0)
    .attr('height', cfg.h + cfg.h / 4);
  svg.append('g').classed('single', 1).datum(data).call(chart);

  // many radars
  chart.config({w: cfg.w / 2, h: cfg.h / 2, axisText: true, levels: 0, circles: false});
  cfg = chart.config();
  function render() {
    var game = svg.selectAll('g.game').data(
      [
        data,
        data
      ]
    );
    game.enter().append('g').classed('game', 1);
    game
      .attr('transform', function(d, i) { return 'translate('+((cfg.w * 1.5) + (i * cfg.w))+','+ (cfg.h * 0.75) +')'; })
      .call(chart);

    // setTimeout(render, 1000);
  }
  render();
}
