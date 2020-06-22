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
    idMetadata.html("");
    Object.entries(result).forEach(([key, value]) => {
      idMetadata.append("h6").text(`${key.toUpperCase()}: ${value}`);
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
};

function optionChanged(Sample1) {
    // Fetch new data each time a new sample is selected "refer eg03 from day 3"
    buildcharts(Sample1);
    buildCharts(Sample1);
  }

// // Promise Pending
// var dataPromise = d3.json(jsonData);
// console.log("Data Promise: ", dataPromise);