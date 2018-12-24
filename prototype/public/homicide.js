var homicide_data;
var homicide_line;

d3.csv("homicide.csv")
.then(function(data) {
  // Convert strings to numbers.
  // parseFloat because it converts empty data to NaN
  data.forEach(function(d) {
    var homicide = [];
    for (i = 2000; i <= 2016; i++) {
      d["" + i] = parseFloat(d["" + i]);
      homicide.push({
        country : d['UNODC Name'],
        year : new Date(i, 0, 1),
        rate : d["" + i]
      });
      d.homicide = homicide;
    }
  });
  homicide_data = data;

  var homicide = d3.select("#homicide")
  // .append("div")
  // .style("width", "1700px")
  // .style("height", "1200px")
  // .style("border", "10px solid black")
  // .style("float", "left")
  // .style("clear", "none");

  var margin = { top: 20, right: 20, bottom: 30, left: 50 };
  var svg_width = 1000;
  var svg_height = 500;
  var width = svg_width - margin.left - margin.right;
   var height = svg_height - margin.top - margin.bottom;

  // var data = [10, 15, 20, 25, 30];

  // Append SVG
  var svg_holder = d3.select("#homicide_chart")
  // .style("display", "inline-block")
  // .style("border", "1px solid black")
  // .style("width", "1000px")
  // .style("height", "800px");
  var svg=svg_holder.append("svg")
              .attr("width", width)
              .attr("height", height)
              .style("postion", "relative");

  // Create x scale
  var x_scale = d3.scaleTime()
                .domain([new Date(2000, 0, 1), new Date(2016, 0, 1)])
                .range([0, width - 100]);
  // Add scale to x axis
  var x_axis = d3.axisBottom()
                 .scale(x_scale);

  // Create y scale
  var y_scale = d3.scaleLinear()
               .domain([0, 100])
               .range([height/2, 0]);
  // Add scale to y axis
  var y_axis = d3.axisLeft().scale(y_scale);

  // Append group and insert axis
  var offset = 10;
    svg.append("g")
         .attr("transform", `translate(50, ${offset})`)
         .call(y_axis);

  var xAxisTranslate = height/2;

      svg.append("g")
              .attr("transform", `translate(50, ${height/2 + offset})`)
              .call(x_axis);


  var line = d3.line()
   .x(function(d) { return x_scale(d.year)})
   .y(function(d) { return y_scale(isNaN(d.rate) ? null : d.rate)}); // handle NaN from parseFloat
   homicide_line = line;

   // for (i = 0; i < 1; i++) {
   //    svg.append("g").append("path")
   //            .datum(data[i].homicide)
   //            .attr("transform", `translate(50, ${offset})`)
   //            .attr("fill", "none")
   //            .attr("stroke", "steelblue")
   //            .attr("stroke-linejoin", "round")
   //            .attr("stroke-linecap", "round")
   //            .attr("stroke-width", 1.5)
   //            .attr("d", line);
   //  }


    // var select_box = d3.select("#homicide_checkbox");
    // for (i = 0; i < 5; i++) {
    //   select_box.append("input")
    //   .attr("type", "checkbox")
    //   .attr("value", data[i].country)
    //   .text(data[i].country)
    //   .on("click", function(input) {
    //     console.log(input);
    //   });
    // }

    var homicide_checkbox = document.getElementById("homicide_checkbox");

    for (i = 0; i < 100; i++) {
      var check_label = document.createElement("label");
      var input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      input.setAttribute("name", i); // abusing name attribute for personal needs
      input.setAttribute("value", data[i]["UNODC Name"]);
      input.setAttribute("onclick", "draw(this)");


      var color_input = document.createElement("input");
      color_input.setAttribute("type", "color");
      color_input.setAttribute("name", i);
      color_input.setAttribute("onchange", "changeColor(this)");

      var info = document.createElement("span");
      info.innerHTML = data[i]["UNODC Name"];
      check_label.appendChild(color_input);
      check_label.appendChild(input);
      check_label.appendChild(info);
      homicide_checkbox.appendChild(check_label);
    }

})
.catch(function(error) {
  console.log("fail");
  console.log(error);
});

function draw(input) {
  console.log(input.name);
  console.log(homicide_data[input.name].homicide);
  if (input.checked) {
    d3.select("#homicide_chart").select("svg").append("g")
            .attr("id", "homicide_line_path_" + input.name)
            .append("path")
            .datum(homicide_data[input.name].homicide)
            .attr("transform", `translate(50, 10)`)
            .attr("fill", "none")
            .attr("stroke", "#000000")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", homicide_line);
  } else {
    d3.select("#homicide_line_path_" + input.name).remove();
  }
}

function changeColor(input) {
  console.log(input.value);
  // d3.select("#homicide_line_path_" + input.name).attr("stroke", input.value);
  d3.select("#homicide_chart").select("svg").append("g")
          .attr("id", "homicide_line_path_" + input.name)
          .append("path")
          .datum(homicide_data[input.name].homicide)
          .attr("transform", `translate(50, 0)`)
          .attr("fill", "none")
          .attr("stroke", input.value)
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1.5)
          .attr("d", homicide_line);
}
