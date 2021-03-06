//declare variables
var response =d3.json("data/samples.json").then(sample=>console.log(sample));
var option=d3.select("option")
var select=d3.select("select")
var panel=d3.select(".panel-body")
var text= d3.select("h4")
text.html("")


//Build drop down of ID's
function buildButton(){

  option.html("")
  

  d3.json("data/samples.json").then(function(data) {

    var ids= data.names

    ids.forEach(id=>{ 
      var row=select.append("option")
      row.text(id)

    })
  });
};

 
//event listener on change
function handleChange(){

  buildDemographics();
  buildBar();
  buildBubble();


};



//build a bar graph
function buildBar(){
  
  //pull value from drop down menu
  var dropdownMenuValue=d3.selectAll("#selDataset").node().value;

    
    text.text(" Hover over an OTU ID to see the bacteria detected:")
    d3.json("data/samples.json").then(data=>{

      var samples=data.samples

      var filteredSamples=samples.filter(row=>row.id==dropdownMenuValue)[0]

      var otu_ids=filteredSamples.otu_ids.slice(0,10)
      var sample_values=filteredSamples.sample_values.slice(0,10)
      var otu_labels=filteredSamples.otu_labels.slice(0,10)

      var otu_idStr= otu_ids.map(otu_ids=>"OTU "+ otu_ids.toString())
     
      

      var trace={
        x: sample_values.reverse(),
        y: otu_idStr.reverse(),
        type: "bar", 
        orientation: 'h', 
        text: otu_labels.reverse() 
      };
  
      var data=[trace]
      var layout={
        // title:"new graph", 
        barmode: "stack",
        xaxis: {title:'Sample Values'},
        yaxis: {title:'OTU ID', 
        font: {
          size: 20,
          // color: 'black'
        }
      }      
      };
      
      Plotly.newPlot("bar", data, layout);
    });   
};


//bubble chart
function buildBubble(){
  var dropdownMenuValue=d3.selectAll("#selDataset").node().value;

  d3.json("data/samples.json").then(data=>{

    var samples=data.samples

    var filteredSamples=samples.filter(row=>row.id==dropdownMenuValue)[0]

    var otu_ids=filteredSamples.otu_ids
    var sample_values=filteredSamples.sample_values
    var otu_labels=filteredSamples.otu_labels

    console.log(filteredSamples)

    var trace1 = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        color: sample_values,
        colorscale: 'Earth',
        size: sample_values,
      },
      text: otu_labels
    };
    
    var data = [trace1];
    
    var layout = {
      showlegend: false,
       height: 600,
       width: 900,
       font: {
        // size: 18,
        color: 'black'
      },
      xaxis: {
        rangemode: 'tozero',
        autorange: true, 
        title: 'OTU ID'
      },
      yaxis: {
        rangemode: 'tozero',
        autorange: true, 
        title: 'Sample Values'
      }
      
    };
    
    
    Plotly.newPlot('bubble', data, layout);
});

}

function buildDemographics(){
  
  panel.html("")

  var dropdownMenuValue=d3.selectAll("#selDataset").node().value;

  d3.json("data/samples.json").then(data=>{
    
    metadata=data.metadata

    filteredMetadata= metadata.filter(row=>row.id==dropdownMenuValue)[0]

    Object.entries(filteredMetadata).forEach(([key, value])=>{
      var p= panel.append("p")
      p.text(`${key}: ${value}`)
    })
    
    })
  }


//add event listener for change
d3.select("#selDataset").on('change', handleChange)
//event listening for button
window.addEventListener("load", buildButton)

