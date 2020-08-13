var jsonData = "samples.json";

// // Fetch the JSON data and console log it
function init() {
    d3.json(jsonData).then(function(data) {
        var sampleNames = data.names;
    console.log(sampleNames);
    var idLocation = d3.select("#selDataset");
    sampleNames.forEach((x) => {
        idLocation.append("option").text(x).property("value", x)
    })
    var firstID = sampleNames[0];
    buildTable(firstID);
    buildCharts(firstID);
        });
};

function buildTable(sample) {
    d3.json(jsonData).then(function(data) {
        var sampleMetaData = data.metadata;
    console.log(sampleMetaData);
    var filterData = sampleMetaData.filter(x => x.id == sample);
    var result = filterData[0];
    console.log(result);
    var idMetaData = d3.select("#sample-metadata");
    idMetaData.html("");
    Object.entries(result).forEach(([key, value]) => {
      idMetaData.append("h6").text(`${key.toUpperCase()}: ${value}`);
    })
});
}
init();

function buildCharts(sample) {
    d3.json(jsonData).then(function(data) {
    var sampleCharts = data.samples;
    console.log(sampleCharts);
    var filterData = sampleCharts.filter(x => x.id == sample);
    var result = filterData[0];
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    var trace1 = [{
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
            size: sample_values,
            color:otu_ids
        }
    }];
    var bubblelayout = {
        title:"Bubble Chart for each Sample ID"
    };
    Plotly.newPlot("bubble", trace1, bubblelayout);

    //Bar Chart
    var trace2 = [{
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).map(x => `OTU ${x}`).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"

    }]
    var barlayout = {
        title: "Bar Chart for each Sample ID"
    };
    Plotly.newPlot("bar", trace2, barlayout);
});
}

function optionChanged(Sample1) {
    // Fetch new data each time a new sample is selected "refer eg03 from day 3"
    buildTable(Sample1);
    buildCharts(Sample1);
  }

// // Promise Pending
// var dataPromise = d3.json(jsonData);
// console.log("Data Promise: ", dataPromise);