var response =d3.json("data/samples.json"). then(sample=>console.log(sample));



function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }
 
  
// Fetch data & build bar graph

function buildBar(){
    d3.json("data/samples.json").then(function(data) {

    //grab values from data json object
        var sample_values=unpack(data.samples.sample_values, );
        //var otu_ids
       // var otu_labels
})}

buildBar(response)