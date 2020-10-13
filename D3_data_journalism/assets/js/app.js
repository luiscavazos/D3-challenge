// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = chart.select("#scrapper")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  var chosenXAxis = "poverty";
  var chosenYAxis = "healthcare";

var states= d3.csv("assets/data/data.csv").then(function(h) {
    h.forEach(function(data) {
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
      data.age = +data.age;
      data.smokes = +data.smokes;
      data.obesity = +data.obesity;
      data.income = +data.income;
    });

    var xLinearScale = XScale(h, chosenXAxis);
    var yLinearScale = yScale(h, chosenYAxis);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    var xAxis = chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    var yAxis = chartGroup.append("g")
        .call(leftAxis);
    
    var circlesGroup = chartGroup.append("g circle")
        .data(states)
        .enter()
        .append("g");

    var circlesXY = circlesGroup.append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis])+5)
        .classed("stateText", true);

    var circlesText = circlesGroup.append("text")
        .text(d => d.abbr)
        .attr("dx", d=> xLinearScale(d[chosenXAxis]))
        .attr("dy", d=> yLinearScale(d[chosenYAxis])+5)
        .classed("stateText", true);

    var xlabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height})`)

    var povertyLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "poverty")
        .text("In Poverty (%)")
        .classed("active", true);

    var ageLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "poverty")
        .text("Age (Median)")
        .classed("inactive", true);

    var incomeLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "poverty")
        .text("Household (Median)")
        .classed("inactive", true);

    var ylabelsGroup = chartGroup.append("g");

    var healthcareLabel = ylabelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height / 2))
        .attr("y", -40)
        .attr("value", "healtcare")
        .text("Lacks Healthcare (%)")
        .classed("active", true);

    var smokesLabel = ylabelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height / 2))
        .attr("y", -40)
        .attr("value", "smokes")
        .text("smokes (%)")
        .classed("inactive", true);

    var obeseLabel = ylabelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height / 2))
        .attr("y", -40)
        .attr("value", "obese")
        .text("smokes (%)")
        .classed("inactive", true);

circlesGroup = updateToolTip(circlesGroup, chosenXAxis, chosenYAxis);

xlabelsGroup.selectAll("text")
  .on("click", function() {
  var value = d3.select(this).attr("value");
  if (value !== chosenXAxis) {

    chosenXAxis = value;

    xLinearScale = xScale(stateData, chosenXAxis);

    xAxis = renderXAxes(xLinearScale, xAxis);

    circlesXY = renderXCircles(circlesXY, xLinearScale, chosenXAxis);

    circlesText = renderXText(circlesText, xLinearScale, chosenXAxis);

    circlesGroup = updateToolTip(circlesGroup, chosenXAxis, chosenYAxis);

    if (chosenXAxis === "age") {
      povertyLabel
        .classed("active", false)
        .classed("inactive", true);
      ageLabel
        .classed("active", true)
        .classed("inactive", false);
      incomeLabel
        .classed("active", false)
        .classed("inactive", true);
    }
    else if (chosenXAxis === "income") {
      povertyLabel
        .classed("active", false)
        .classed("inactive", true);
      ageLabel
        .classed("active", false)
        .classed("inactive", true);
      incomeLabel
        .classed("active", true)
        .classed("inactive", false);
    }
    else {
      povertyLabel
        .classed("active", true)
        .classed("inactive", false);
      ageLabel
        .classed("active", false)
        .classed("inactive", true);
      incomeLabel
        .classed("active", false)
        .classed("inactive", true);
    }
  }
});

ylabelsGroup.selectAll("text")
  .on("click", function() {
  const value = d3.select(this).attr("value");
  if (value !== chosenYAxis) {

    chosenYAxis = value;

    yLinearScale = yScale(stateData, chosenYAxis);

    yAxis = renderYAxes(yLinearScale, yAxis);

    circlesXY = renderYCircles(circlesXY, yLinearScale, chosenYAxis);

    circlesText = renderYText(circlesText, yLinearScale, chosenYAxis);

    circlesGroup = updateToolTip(circlesGroup, chosenXAxis, chosenYAxis);

    if (chosenYAxis === "smokes") {
      healthcareLabel
        .classed("active", false)
        .classed("inactive", true);
      smokesLabel
        .classed("active", true)
        .classed("inactive", false);
      obeseLabel
        .classed("active", false)
        .classed("inactive", true);
    }
    else if (chosenYAxis === "obesity"){
      healthcareLabel
        .classed("active", false)
        .classed("inactive", true);
      smokesLabel
        .classed("active", false)
        .classed("inactive", true);
      obeseLabel
        .classed("active", true)
        .classed("inactive", false);
    }
    else {
      healthcareLabel
        .classed("active", true)
        .classed("inactive", false);
      smokesLabel
        .classed("active", false)
        .classed("inactive", true);
      obeseLabel
        .classed("active", false)
        .classed("inactive", true);
    }
  }
});

})()