import React, { Component } from "react";
import "../App.css";
import databaseImg  from "../images/database.svg";
import {
  mxGraph,
  mxGraphModel,
  mxConstants,
  mxSwimlane,
  mxPrintPreview,mxEdgeStyle,
  mxPerimeter,mxXmlUtils,mxCodec,mxGraphComponent,mxCellRenderer,Color,
  mxUtils,xGraphViewImageReader,mxPngEncodeParam,FileOutputStream,mxPngImageEncoder,
  mxRectangle,mxXmlCanvas2D,mxImageExport,mxXmlRequest
} from "mxgraph-js";

export default class Graph extends React.Component {
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
    apiResponse: '',
    xml:'',
  };

  constructor(props) {
    super(props);
    this.containerId = "mxgraph-container";
    /* onsole.log(this.props.formItem);
    console.log(this.props.vertex);
    console.log(this.props.edge); */
  }

  componentDidMount() {
    var canvas = document.getElementById("MyCanvas");
  if (canvas.getContext)
    {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle="white";
    ctx.beginPath();
    ctx.rect (5,5,300,250);
    ctx.fill();
    ctx.stroke();
    ctx.arc(150,150,100,0,Math.PI, false);
    ctx.stroke();
    }



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
      style[mxConstants.STYLE_SPACING_TOP] = 15;
      style[mxConstants.STYLE_SPACING_RIGHT] = 0;
      style[mxConstants.STYLE_IMAGE_HEIGHT] = 500;
      graph.getStylesheet().putCellStyle("condition", style);

      style = mxUtils.clone(style);
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CYLINDER;
      style[mxConstants.STYLE_VERTICAL_ALIGN] = "top";
      style[mxConstants.STYLE_SPACING_TOP] = 50;
      style[mxConstants.STYLE_SPACING_RIGHT] = 4;
      style[mxConstants.STYLE_SPACING] = 0;
      graph.getStylesheet().putCellStyle("database", style);

      style = mxUtils.clone(style);
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_DOUBLE_ELLIPSE;
      style[mxConstants.STYLE_PERIMETER] = mxPerimeter.EllipsePerimeter;
      style[mxConstants.STYLE_SPACING_TOP] = 13;
      style[mxConstants.STYLE_FONTSIZE] = 14;
      style[mxConstants.STYLE_FONTSTYLE] = 1;
      delete style[mxConstants.STYLE_SPACING_RIGHT];
      graph.getStylesheet().putCellStyle("end", style);

      style = mxUtils.clone(style);
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
      style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
      style[mxConstants.STYLE_IMAGE] = databaseImg ;//'../images/database.png';
      /* style[mxConstants.STYLE_SPACING_TOP] = 13;
      style[mxConstants.STYLE_FONTSIZE] = 14;
      style[mxConstants.STYLE_FONTSTYLE] = 1;
      delete style[mxConstants.STYLE_SPACING_RIGHT]; */
      graph.getStylesheet().putCellStyle("actor", style);

      style = graph.getStylesheet().getDefaultEdgeStyle();
      style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
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
      /* Create Main lane  */
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

      let vertex = [],
      vertex_no = [0, 0, 0];
      let xaxis = [30, 30, 30];
      let yaxis = [30, 30, 30];
      let lane_name = 0;
      for (let i = 0; i < vertexs.length; i++) {
        let lane = "",lane_no = "";
        lane_no = lanes.map(function (lane) { return lane.value;  }).indexOf(vertexs[i].lane);
        lane = lanes[lane_no];
        vertex_no[lane_no]++;
        lane_name = lane_no;
        vertex[i] = graph.insertVertex(lane,null,vertexs[i].name,
          xaxis[lane_name],yaxis[lane_name],80,50,vertexs[i].type
        );
        xaxis[lane_name] =
          Math.floor(vertex_no[lane_no] % 5) === 0
            ? xaxis[lane_name]
            : Math.floor(vertex_no[lane_no] / 5) % 2 === 0
            ? xaxis[lane_name] + 150
            : xaxis[lane_name] - 150;
        /*  console.log(vertexs[i].name + " = " + vertex_no[lane_no] / 5); */
        yaxis[lane_name] =
          Math.floor(vertex_no[lane_no] % 5) === 0
            ? yaxis[lane_name] + 80
            : yaxis[lane_name];
      }
      /*Insert Edge*/
      for (let i = 0; i < edges.length; i++) {
        let start = vertex.map(function (v) { return v.value;}).indexOf(edges[i].start);
        let end = vertex.map(function (v) { return v.value;}).indexOf(edges[i].end);
        graph.insertEdge(lanes[0], null, null, vertex[start], vertex[end]);
      }

      this.setState({
        graphNew: graph,
      });

      
    } catch (e) {
      console.error("An error has occurred.", e);
    } finally {
      graph.getModel().endUpdate();
    }
  }

  handleSave() {
    const graph = this.state.graphNew;
    let preview = new mxPrintPreview(graph);
    preview.scale = 0.8;
    preview.title = this.props.formItem.integration.value;
    console.log(preview);
    /* preview.print();

    preview.open(); */

    let file = new Blob(
      [
        preview
      ],
      { type: 'image/*' }
    );
    let elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(file);
    elem.download = 'image.jpg';
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);

    /* fetch('http://localhost:9000/testapi')
    .then(res => res.text())
    .then(res => this.setState({apiResponse : res})); */

   
    /* const graph = this.state.graphNew;
    var xmlDoc = mxUtils.createXmlDocument();
    var root = xmlDoc.createElement('output');
    xmlDoc.appendChild(root);

    var xmlCanvas = new mxXmlCanvas2D(root);
    var imgExport = new mxImageExport();
    imgExport.drawState(graph.getView().getState(graph.model.root), xmlCanvas);

    var bounds = graph.getGraphBounds();
    var w = Math.ceil(bounds.x + bounds.width);
    var h = Math.ceil(bounds.y + bounds.height);

     var xml = mxUtils.getXml(root);
     console.log(imgExport);
    new mxXmlRequest('http://localhost:9000/testapi', 'format=png&w=' + w +
        '&h=' + h + '&bg=#F9F7ED&xml=' + encodeURIComponent(xml))
        .simulate(document, '_blank');  
       var onload = function(req)
        {
          mxUtils.alert('Success');
        }
        
        var onerror = function(req)
        {
          mxUtils.alert('Error');
        } 
        new mxXmlRequest('export', 'filename = graph.jpg & format=jpg&w=' + w +
        '&h=' + h + '&bg=#F9F7ED&xml=' + encodeURIComponent(xml)).simulate(document, '_blank');//send(onload, onerror);
        alert(imgExport); */
       
  }
  exportFile(format)
				{
          let container = document.getElementById(this.containerId);
          let graph = new mxGraph(container)
					let bg = '#ffffff';
					let scale = 1;
					let b = 1;
					console.log('Export file');
					let imgExport = new mxImageExport();
					let bounds = graph.getGraphBounds();
					let vs = graph.view.scale;
					
					// New image export
					let xmlDoc = mxUtils.createXmlDocument();
					let root = xmlDoc.createElement('output');
					xmlDoc.appendChild(root);
					
					// Renders graph. Offset will be multiplied with state's scale when painting state.
					let xmlCanvas = new mxXmlCanvas2D(root);
					xmlCanvas.translate(Math.floor((b / scale - bounds.x) / vs), Math.floor((b / scale - bounds.y) / vs));
					xmlCanvas.scale(scale / vs);
					
					imgExport.drawState(graph.getView().getState(graph.model.root), xmlCanvas);

					// Puts request data together
					let w = Math.ceil(bounds.width * scale / vs + 2 * b);
					let h = Math.ceil(bounds.height * scale / vs + 2 * b);
					
					let xml = mxUtils.getXml(root);
					this.setState({
            xml:xml
          });	
					if (bg != null)
					{
						bg = '&bg=' + bg;
					}
					
					new mxXmlRequest('http://localhost:9000/testapi', 'filename=export.' + format + '&format=' + format +
	        			bg + '&w=' + w + '&h=' + h + '&xml=' + encodeURIComponent(xml)).
                simulate(document, '_blank');
          console.log('export end');
        }
        
  download() {
    let container = document.getElementById(this.containerId);
          let graph = new mxGraph(container)
					let bg = '#ffffff';
					let scale = 1;
					let b = 1;
					let imgExport = new mxImageExport();
					let bounds = graph.getGraphBounds();
					let vs = graph.view.scale;
					
					// New image export
					let xmlDoc = mxUtils.createXmlDocument();
					let root = xmlDoc.createElement('output');
					xmlDoc.appendChild(root);
					
					// Renders graph. Offset will be multiplied with state's scale when painting state.
					let xmlCanvas = new mxXmlCanvas2D(root);
					xmlCanvas.translate(Math.floor((b / scale - bounds.x) / vs), Math.floor((b / scale - bounds.y) / vs));
					xmlCanvas.scale(scale / vs);
					
					imgExport.drawState(graph.getView().getState(graph.model.root), xmlCanvas);

					// Puts request data together
					let w = Math.ceil(bounds.width * scale / vs + 2 * b);
					let h = Math.ceil(bounds.height * scale / vs + 2 * b);
					
          let xml = mxUtils.getXml(root);
          console.log(encodeURIComponent(xml));
          const anchor = document.querySelector('a'); //window.document.createElement('a') //document.querySelector('a');
          let fileName = 'image.png';
          console.log(window.navigator.msSaveBlob);
          
          if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(xmlCanvas.msToBlob(), 'image.png');
            //e.preventDefault();
          } else {
            anchor.setAttribute('download', fileName);
            console.log('else part');
            anchor.setAttribute('href',encodeURIComponent(xml))
          }
          var canvas1 = document.getElementById("MyCanvas");
          let format = 'png';
          if (canvas1.getContext) {
            var ctx = canvas1.getContext("2d");                // Get the context for the canvas.
            var myImage = canvas1.toDataURL("image/png");      // Get the data as an image.
          }
         var imageElement = document.getElementById("MyPix");  // Get the img object.
         new mxXmlRequest('http://localhost:9000/testapi', 'filename=export.' + format + '&format=' + format +
          bg + '&w=' + w + '&h=' + h + '&xml=' + encodeURIComponent(xml)).
          simulate(document, '_blank'); 

          console.log();
          if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(canvas1.msToBlob(), 'image.png');
            //e.preventDefault();
          } else {
            anchor.setAttribute('download', fileName);
            console.log('else part');
            anchor.setAttribute('href',canvas1.toDataURL("image/png"))
          }
  };

  render() {
    return (
      <div>
        <div className="row">
          <div id={this.containerId} />
        </div>
        <div>
        <canvas id="MyCanvas" width="400" height="400" > </canvas>
        <img id="MyPix" />
        </div>
        <div className="row">
          <button onClick={this.handleSave.bind(this)}>Save</button>
          <a
            download
            onClick={this.download.bind(this)}
          >
            <i className="fa fa-download" />
            download
          </a>
        </div>
      </div>
    );
  }
}
