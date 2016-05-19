
/**
* Graph config
*/
var width = 960;
var height = 500;
var linkDistance = 200;
var nodeRadius = 20;



/**
* Main function
*/
function main() {



    console.log(data_nodes);

	// create an array with nodes
    // var nodes = new vis.DataSet([
    //   {id: 1, label: 'Node 1'},
    //   {id: 2, label: 'Node 2'},
    //   {id: 3, label: 'Node 3'},
    //   {id: 4, label: 'Node 4'},
    //   {id: 5, label: 'Node 5'}
    // ]);

    // // create an array with edges
    // var edges = new vis.DataSet([
    //   {from: 1, to: 3},
    //   {from: 1, to: 2},
    //   {from: 2, to: 4},
    //   {from: 2, to: 5}
    // ]);

    // // create a network
    // var container = document.getElementById('mynetwork');
    // var data = {
    //   nodes: nodes,
    //   edges: edges
    // };
    // var options = {};
    // var network = new vis.Network(container, data, options);

}


/**
* Create json with graph.
* Replace this with the real data.
*/
function loadGraph() {
	var graph = {
		"nodes" :[
			{"name": "Node1", "group":1},
			{"name": "Node2", "group":2},
			{"name": "Node3", "group":3}
		],
		"links":[
			{"source":0, "target":1, "value":1},
			{"source":0, "target":2, "value":1},
		]
	};

	return graph;
}
