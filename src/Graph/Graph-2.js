import React from "react";
import "../App.css";
import {
  mxGraph,
  mxGraphModel,
  mxConstants,
  mxSwimlane,
  mxImageExport,
  mxPerimeter,
  mxUtils,
  mxSvgCanvas2D,
  mxRectangle,
  mxEdgeStyle,
} from "mxgraph-js";

export default class Graph2 extends React.Component {
  state = {
    Diagram: this.props.formItem.integration.value,
    lanes: [
      { name: this.props.formItem.source.value },
      { name: this.props.formItem.middleware.value },
      { name: this.props.formItem.target.value },
    ],
    vertex: this.props.vertex,
    edge: this.props.edge,
    graphNew: "",
  };

  constructor(props) {
    super(props);
    this.containerId = "mxgraph-container";
  }

  componentDidMount() {
    let edges = this.state.edge;
    let vertexs = this.state.vertex;
    let lanesCopy = this.state.lanes;

    this.container = document.getElementById(this.containerId);
    this.model = new mxGraphModel();
    const graph = new mxGraph(this.container);
    graph.border = 80;
    this.layout = new mxSwimlane(graph);

    this.layout.bounds = mxRectangle;
    this.layout.orientation = mxConstants.DIRECTION_WEST;
    this.layout.fill = "red";

    graph.getModel().beginUpdate();
    try {
      var parent = graph.getDefaultParent();
      var style = graph.getStylesheet().getDefaultVertexStyle();
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
      style[mxConstants.STYLE_VERTICAL_ALIGN] = "middle";
      style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = "white";
      style[mxConstants.STYLE_FONTSIZE] = 11;
      style[mxConstants.STYLE_STARTSIZE] = 22;
      style[mxConstants.STYLE_HORIZONTAL] = false;
      style[mxConstants.STYLE_FONTCOLOR] = "black";
      style[mxConstants.STYLE_STROKECOLOR] = "black";
      delete style[mxConstants.STYLE_FILLCOLOR];

      style = mxUtils.clone(style);
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
      style[mxConstants.STYLE_FONTSIZE] = 10;
      style[mxConstants.STYLE_ROUNDED] = true;
      style[mxConstants.STYLE_HORIZONTAL] = true;
      style[mxConstants.STYLE_VERTICAL_ALIGN] = "middle";
      delete style[mxConstants.STYLE_STARTSIZE];
      style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = "none";
      graph.getStylesheet().putCellStyle("process", style);

      style = mxUtils.clone(style);
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
      style[mxConstants.STYLE_FONTSIZE] = 10;
      style[mxConstants.STYLE_ROUNDED] = true;
      style[mxConstants.STYLE_HORIZONTAL] = true;
      style[mxConstants.STYLE_VERTICAL_ALIGN] = "middle";
      delete style[mxConstants.STYLE_STARTSIZE];
      style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = "none";
      graph.getStylesheet().putCellStyle("process", style);

      style = mxUtils.clone(style);
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RHOMBUS;
      style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RhombusPerimeter;
      style[mxConstants.STYLE_VERTICAL_ALIGN] = "center";
      style[mxConstants.STYLE_SPACING_TOP] = 20;
      style[mxConstants.STYLE_SPACING_RIGHT] = 4;
      graph.getStylesheet().putCellStyle("condition", style);

      style = mxUtils.clone(style);
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CYLINDER;
      style[mxConstants.STYLE_VERTICAL_ALIGN] = "top";
      style[mxConstants.STYLE_SPACING_TOP] = 20;
      style[mxConstants.STYLE_SPACING_RIGHT] = 4;
      graph.getStylesheet().putCellStyle("database", style);

      style = mxUtils.clone(style);
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_DOUBLE_ELLIPSE;
      style[mxConstants.STYLE_PERIMETER] = mxPerimeter.EllipsePerimeter;
      style[mxConstants.STYLE_SPACING_TOP] = 13;
      style[mxConstants.STYLE_FONTSIZE] = 14;
      style[mxConstants.STYLE_FONTSTYLE] = 1;
      delete style[mxConstants.STYLE_SPACING_RIGHT];
      graph.getStylesheet().putCellStyle("end", style);

      style = graph.getStylesheet().getDefaultEdgeStyle();
      //style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
      style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_BLOCK;
      style[mxConstants.STYLE_ROUNDED] = true;
      style[mxConstants.STYLE_FONTCOLOR] = "black";
      style[mxConstants.STYLE_STROKECOLOR] = "black";

      style = mxUtils.clone(style);
      style[mxConstants.STYLE_DASHED] = true;
      style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_OPEN;
      style[mxConstants.STYLE_STARTARROW] = mxConstants.ARROW_OVAL;
      graph.getStylesheet().putCellStyle("crossover", style);

      graph.alternateEdgeStyle = "elbow=vertical";

      let pool1 = graph.insertVertex(parent,null,this.props.formItem.integration.value,0,0,0,0);
      pool1.setConnectable(false);

      /* Calculate heigth of lane */
      let lane_vertex_count,lane_height = [],lane_y = [];
      for (let i = 0; i < lanesCopy.length; i++) {
        lane_vertex_count = vertexs.reduce(function (n, vertex) {
          return n + (vertex.lane === lanesCopy[i].name);
        }, 0);
        lane_height[i] = Math.floor(lane_vertex_count / 5) + 1;
        lane_y[i] = i === 0 || i === 1 ? i : lane_height[i - 1] + 1;
      }

      /* Insert Lanes */
      let lanes = [];
      for (let i = 0; i < lanesCopy.length; i++) {
        lanes[i] = graph.insertVertex(pool1,null,lanesCopy[i].name,0,100 * lane_y[i],150 * 6,100 * lane_height[i]);
        lanes[i].setConnectable(false);
      }

      var vertex = [],
        vertex_no = [0, 0, 0];
      var xaxis = [0, 0, 4];
      var yaxis = [30, 30, 30];
      var lane_name = 0;
      for (let i = 0; i < vertexs.length; i++) {
        let lane = "",
          lane_no = "";
        lane_no = lanes
          .map(function (lane) {
            return lane.value;
          })
          .indexOf(vertexs[i].lane);
        lane = lanes[lane_no];
        vertex_no[lane_no]++;
        lane_name = lane_no;
        vertex[i] = graph.insertVertex(
          lane,
          null,
          vertexs[i].name,
          150 * xaxis[lane_name],
          yaxis[lane_name],
          80,
          50,
          vertexs[i].type
        );
        xaxis[lane_name] =
          Math.floor(vertex_no[lane_no] % 5) === 0
            ? xaxis[lane_name]
            : Math.floor(vertex_no[lane_no] / 5) % 2 === 0
            ? xaxis[lane_name] + 1
            : xaxis[lane_name] - 1;
        /*  console.log(vertexs[i].name + " = " + vertex_no[lane_no] / 5); */
        yaxis[lane_name] =
          Math.floor(vertex_no[lane_no] % 5) === 0
            ? yaxis[lane_name] + 80
            : yaxis[lane_name];
      }

      for (let i = 0; i < edges.length; i++) {
        let start = vertex
          .map(function (v) {
            return v.value;
          })
          .indexOf(edges[i].start);
        let end = vertex
          .map(function (v) {
            return v.value;
          })
          .indexOf(edges[i].end);
        graph.insertEdge(lanes[0], null, null, vertex[start], vertex[end]);
      }

      this.setState({
        graphNew: graph,
      });

      console.log(this.state.graphNew);
    } catch (e) {
      console.error("An error has occurred.", e);
    } finally {
      graph.getModel().endUpdate();
    }
  }

  handleSave() {
    var graph = this.state.graphNew;
    console.log(graph);
    var background = "#ffffff";
        var scale = 1;
        var border = 1;
        var imgExport = new mxImageExport();
        var bounds = graph.getGraphBounds();
        var vs = graph.view.scale;

        // Prepares SVG document that holds the output
        var svgDoc = mxUtils.createXmlDocument();
        var root =
          svgDoc.createElementNS != null
            ? svgDoc.createElementNS(mxConstants.NS_SVG, "svg")
            : svgDoc.createElement("svg");

        if (background != null) {
          if (root.style != null) {
            root.style.backgroundColor = background;
          } else {
            root.setAttribute("style", "background-color:" + background);
          }
        }

        if (svgDoc.createElementNS == null) {
          root.setAttribute("xmlns", mxConstants.NS_SVG);
          root.setAttribute("xmlns:xlink", mxConstants.NS_XLINK);
        } else {
          // KNOWN: Ignored in IE9-11, adds namespace for each image element instead. No workaround.
          root.setAttributeNS(
            "http://www.w3.org/2000/xmlns/",
            "xmlns:xlink",
            mxConstants.NS_XLINK
          );
        }

        root.setAttribute(
          "width",
          Math.ceil((bounds.width * scale) / vs) + 2 * border + "px"
        );
        root.setAttribute(
          "height",
          Math.ceil((bounds.height * scale) / vs) + 2 * border + "px"
        );
        root.setAttribute("version", "1.1");

        // Adds group for anti-aliasing via transform
        var group =
          svgDoc.createElementNS != null
            ? svgDoc.createElementNS(mxConstants.NS_SVG, "g")
            : svgDoc.createElement("g");
        group.setAttribute("transform", "translate(0.5,0.5)");
        root.appendChild(group);
        svgDoc.appendChild(root);

        // Renders graph. Offset will be multiplied with state's scale when painting state.
        var svgCanvas = new mxSvgCanvas2D(group);
        svgCanvas.translate(
          Math.floor((border / scale - bounds.x) / vs),
          Math.floor((border / scale - bounds.y) / vs)
        );
        svgCanvas.scale(scale / vs);

        // Displayed if a viewer does not support foreignObjects (which is needed to HTML output)
        svgCanvas.foAltText = "[Not supported by viewer]";
        imgExport.drawState(
          graph.getView().getState(graph.model.root),
          svgCanvas
        );

        var xml = encodeURIComponent(mxUtils.getXml(root));

        let payloadType = "payload.svg";
        var hiddenElement = document.createElement("a");
        hiddenElement.href = "data:image/svg+xml;charset=utf-8," + xml;
        hiddenElement.target = "_blank";
        hiddenElement.download = payloadType;
        hiddenElement.click();
  }
  render() {
    return (
      <div>
        <div className="row">
          <div id={this.containerId} />
        </div>
        <div className="row">
          <div className="col-sm-12 text-right">
            <button onClick={this.handleSave.bind(this)}>Download</button>
          </div>
        </div>
      </div>
    );
  }
}
