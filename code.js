
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
            instrumentList: [],
            val: 0
        });
    }

    for(i = 0; i < data_node_positions.length; i++){
        (graphNodes.find(x=> x.id  === data_node_positions[i].nodeId)).instrumentList[data_node_positions[i].instrumentId]=data_node_positions[i].qty;
    }

    for(i=0;i<data_edges.length;i++){
        graphEdges.push({
            from: data_edges[i].fromNodeId,
            to: data_edges[i].toNodeId,
            arrows: 'to',
            id: data_edges[i].id,
            instrumentList: [],
            label: 0,
            font: {
                align: 'middle',
            }
        });
    }

    for(i = 0; i < data_edge_positions.length; i++){
        (graphEdges.find(x=> x.id  === data_edge_positions[i].edgeId)).instrumentList[data_edge_positions[i].instrumentId]=data_edge_positions[i].qty;
    }

    var instruments = [];
    for(i = 0; i < data_instruments.length; i++){
        instruments[data_instruments[i].id] = {
            id: data_instruments[i].id,
            price: data_instruments[i].price
        }
    }

    for(i = 0; i < graphNodes.length; i++){
        for(k = 0; k < graphNodes[i].instrumentList.length; k++){
            graphNodes[i].val+=(graphNodes[i].instrumentList[k] * instruments[k].price);
        }
    }

    for(i = 0; i < graphEdges.length; i++){
        for(k = 0; k < graphEdges[i].instrumentList.length; k++){
            graphEdges[i].label+=(graphEdges[i].instrumentList[k] * instruments[k].price);
        }
    }

    var min_node = Infinity;
    var min_edge = Infinity;
    var max_node = -Infinity;
    var max_edge = -Infinity;

    for(i = 0; i < graphNodes.length; i++) {
        if (graphNodes[i].val < min_node)
            min_node = graphNodes[i].val
        else if (graphNodes[i].val > max_node)
            max_node = graphNodes[i].val
    }

    for(i = 0; i < graphEdges.length; i++) {
        if (graphEdges[i].label < min_edge)
            min_edge = graphEdges[i].label
        else if (graphEdges[i].label > max_edge)
            max_edge = graphEdges[i].label
    }

    console.log(min_node);
    console.log(min_edge);
    console.log(max_node);
    console.log(max_edge);

    // create a network
    var container = document.getElementById('mynetwork');
    var data = {
      nodes: graphNodes,
      edges: graphEdges
    };
    var options = {
        edges:{
              scaling: {
                min: min_node,
                max: max_node,
                customScalingFunction: function (min,max,total,value) {
                  if (max === min) {
                    return 0.5;
                  }
                  else {
                    let scale = 1 / (max - min);
                    return Math.max(0,(value - min)*scale);
                  }
                }
              },
            }
    }

    var network = new vis.Network(container, data, options);

}
