
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

    var graphNodes = [];
    var graphEdges = [];

    for(i=0;i<data_nodes.length;i++){
        graphNodes.push({
            id: data_nodes[i].id,
            label: data_nodes[i].name,
            group: 'nodes',
            instrumentList: []
        });
    }

    for(i = 0; i < data_node_positions.length; i++){
        if(data_node_positions[i].qty != 0){
            (graphNodes.find(x=> x.id  === data_node_positions[i].nodeId)).instrumentList[data_node_positions[i].instrumentId]=data_node_positions[i].qty;
        }
    }

    console.log(graphNodes); 

    for(i=0;i<data_edges.length;i++){
        graphEdges.push({
            from: data_edges[i].fromNodeId,
            to: data_edges[i].toNodeId,
            arrows: 'to',
            id: data_edges[i].id
        });
    }

    // create a network
    var container = document.getElementById('mynetwork');
    var data = {
      nodes: graphNodes,
      edges: graphEdges
    };
    var options = {};
    var network = new vis.Network(container, data, options);

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
