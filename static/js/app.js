var data = "./samples.json";
var bubble = d3.select("#bubble")
var gauge = d3.select("#gauge")
var bar = d3.select("#bar")

function init(input){
    // Fetch the JSON data and console log it
    d3.json(data).then(function(data) {

        initDropdown(data)

        // console.log(data)
        var filtered = filterData(data)
        console.log(filtered);
        plotBar(filtered[0][0]);
        plotBubble(filtered[0][0]);
        loadMetadata(filtered[2][0]);
  });
  
  //data not accessible
};
     



function optionChanged(){

    d3.json(data).then(function(data) {

        //data accessible
        //maybe use restyle
        // console.log(data);
        // console.log(bubble);
        // console.log(gauge);
        // console.log(bar);
  });
    
  //data not accessible

};   //end function



// var uniqueList = []

function initDropdown(i) {

    var dropdown = d3.select("#selDataset");
    var unique = {};

    i.names.forEach(function(name) {
        
        if (typeof unique[name] == "undefined") {
            dropdown.append("option").text(name).property("value")
            unique[name] = "";
            // uniqueList.push(name['achievement status']);
            
        };
    });
};


function plotBar(i){

        
    var labels = i.otu_ids.slice(0,10);
    var values = i.sample_values;
    var hovertext = i.otu_labels;
    values.sort(function(a, b){return b-a});
    var labels = labels.map(i => {
        return "OTU " + String(i);
    })
    // console.log(hovertext);
    // console.log(values);
    var data = [{
        type: 'bar',
        x: values.slice(0,10),
        y: labels,
        text: hovertext.slice(0,10),
        orientation: 'h'
    }];
   
    var layout = {
        title: 'Top 10 Most Concentrated Cultures'};

    Plotly.newPlot('bar',data, layout);

};

function plotBubble(i){

        
    var ids = i.otu_ids;
    var values = i.sample_values;
    var labels = i.otu_labels;
    values.sort(function(a, b){return b-a});
    
    // var labels = labels.map(i => {
    //     return "OTU " + String(i);
    // })
    // console.log(hovertext);
    // console.log(values);
    var data = [{
        mode: 'markers',
        x: ids,
        y: values,
        text: labels,
        marker: {
            color: ids,
            size: values
        }
    }];
    var layout = {
        title: 'Cultures per Sample'};

    Plotly.newPlot('bubble',data, layout);

};

function loadMetadata(i) {
    
};

function filterData(i) {
    let id = "940";
    var samples = i.samples.filter(j => j.id === id);
    var names = i.names.filter(j => j === id);
    var metadata = i.metadata.filter(j => j.id === parseInt(id));

    return [samples, names, metadata];
};


init()  // enacted on page load only

