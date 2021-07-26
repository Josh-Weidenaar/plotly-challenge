var data = "./samples.json";
var bubble = d3.select("#bubble")
var gauge = d3.select("#gauge")
var bar = d3.select("#bar")

function init(input){
    // Fetch the JSON data and console log it
    d3.json(data).then(function(data) {

        initDropdown(data)

        // console.log(data)
        
        plotBar(data.samples);
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
    i.forEach(function(j) {
        
        var labels = j.otu_ids;
        var values = j.sample_values;
        var hovertext = j.otu_labels;
        values.sort(function(a, b){return b-a});
        console.log(values.slice(0,10));
        // console.log(hovertext);
        // console.log(values);
        var data = [{
            type: 'bar',
            x: values.slice(0,10),
            y: labels.slice(0,10),
            orientation: 'h'
        }];

        Plotly.newPlot('bar',data);


    });
}

init()  // enacted on page load only

