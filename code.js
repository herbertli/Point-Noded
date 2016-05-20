
/**
* Graph config
*/
var width = 960;
var height = 500;
var linkDistance = 200;
var nodeRadius = 20;

var graphNodes = null;
var graphEdges = null;
var network = null;

function destroy() {
  if (network !== null) {
    network.destroy();
    network = null;
  }
}

/**
* Main function
*/
function main() {

    destroy();

    var graphNodes = [];
    var graphEdges = [];

    // Read nodes
    for(i=0;i<data_nodes.length;i++){
        graphNodes.push({
            id: data_nodes[i].id,
            instrumentList: [],
            value: 0,
            label: data_nodes[i].name,
            val: round(0.00, 2),
            title: ''
        });
    }

    // For each node, generate its list of instruments
    for(i = 0; i < data_node_positions.length; i++){
        (graphNodes.find(x=> x.id  === data_node_positions[i].nodeId)).instrumentList[data_node_positions[i].instrumentId]=data_node_positions[i].qty;
    }

    // Read edges
    for(i=0;i<data_edges.length;i++){
        graphEdges.push({
            from: data_edges[i].fromNodeId,
            to: data_edges[i].toNodeId,
            arrows: 'to',
            id: data_edges[i].id,
            label: "",
            instrumentList: [],
            val: round(0.00, 2),
            font: {
                align: 'middle',
            }
        });
    }

    // For each edge, generate its list of instruments
    for(i = 0; i < data_edge_positions.length; i++){
        (graphEdges.find(x=> x.id  === data_edge_positions[i].edgeId)).instrumentList[data_edge_positions[i].instrumentId]=data_edge_positions[i].qty;
    }

    // Read instruments
    var instruments = [];
    for(i = 0; i < data_instruments.length; i++){
        instruments[data_instruments[i].id] = {
            id: data_instruments[i].id,
            price: data_instruments[i].price
        }
    }

    // Get total value of each node
    for(i = 0; i < graphNodes.length; i++){
        for(k = 0; k < graphNodes[i].instrumentList.length; k++){
            graphNodes[i].value+=(graphNodes[i].instrumentList[k] * instruments[k].price);
            graphNodes[i].val+=round((graphNodes[i].instrumentList[k] * instruments[k].price),2);
        }
    }

    // Get total value of each edge
    for(i = 0; i < graphEdges.length; i++){
        for(k = 0; k < graphEdges[i].instrumentList.length; k++){
            graphEdges[i].val+=round((graphEdges[i].instrumentList[k] * instruments[k].price),2);
        }
    }

    // For scaling nodes and edges:
    var min_node = Infinity;
    var min_edge = Infinity;
    var max_node = -Infinity;
    var max_edge = -Infinity;

    for(i = 0; i < graphNodes.length; i++) {
        if (graphNodes[i].value < min_node)
            min_node = graphNodes[i].value;
        else if (graphNodes[i].value > max_node)
            max_node = graphNodes[i].value;
    }
    for(i = 0; i < graphEdges.length; i++) {
        if (graphEdges[i].value < min_edge)
            min_edge = graphEdges[i].value;
        else if (graphEdges[i].value > max_edge)
            max_edge = graphEdges[i].value;
    }

    for( i =0; i < graphNodes.length; i++){
        graphNodes[i].title =  graphNodes[i].val;
    }

    for( i =0; i < graphEdges.length; i++){
        graphEdges[i].title =  graphEdges[i].val;
    }

    // create a network
    var container = document.getElementById('mynetwork');
    var data = {
      nodes: graphNodes,
      edges: graphEdges
    };

    var options = {
        interaction: {
            navigationButtons: true, 
           //    keyboard: true, 
            hover: true, 
            hoverConnectedEdges: true, 
            tooltipDelay: 10
        },

        nodes: {
            scaling: {
                min: min_node,
                max: max_node,
                label: {
                    enabled: true,
                    min: 14,
                    max: 30,
                    maxVisible: 30,
                    drawThreshold: 5
                },
                customScalingFunction: function (min,max,total,value) {
                    var scale = 1 / (max - min);
                    //console.log(Math.max(0, (value - min)*scale))
                    return Math.max(0, (value)*scale);
                }
            },

            shape: 'circle'
        },

        edges: {
            scaling: {
                min: min_edge,
                max: max_edge,
                customScalingFunction: function (min,max,total,value) {
                    var scale = 1 / (max - min);
                    return Math.max(0, (value - min)*scale);
                }
            }
        }

    };

    var network = new vis.Network(container, data, options);
    // add event listeners
      network.on('select', function(params) {
        document.getElementById('selection').innerHTML = 'Selection: ' + params.nodes;
      });
}


function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
