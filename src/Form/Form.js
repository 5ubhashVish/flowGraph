import React from "react";
import "../App.css";
import Graph from "../Graph/Graph.js";
import Graph2 from "../Graph/Graph-2.js";
import ReactDOM from 'react-dom';
import deleteImg from "../images/delete.svg";
import Wizard from "../Wizard/Wizard";

class Form extends React.Component {
  state = {
    formItem: {
      source: { value: this.props.formData.source },
      target: { value: this.props.formData.target },
      middleware: { value: this.props.formData.middleware },
      integration: { value: this.props.formData.integration },
      submit: false,
      vertexType: [
        { value: "end", name: "Start" },
        { value: "end", name: "End" },
        { value: "database", name: "Database" },
        { value: "process", name: "Process" },
        { value: "condition", name: "Condition" },
      ],
      vertexData: [{ value: "data" }],
      vertexSourceData: [{ value: "data" }],
      vertexMiddleData: [{ value: "data" }],
      vertexTargetData: [{ value: "data" }],
    },
    vertexData: [
      {
        lane: "",
        name: "",
        type: "",
      },
    ],
    vertexSourceData: [
      {
        lane: "",
        name: "",
        type: "",
      },
    ],
    vertexMiddleData: [
      {
        lane: "",
        name: "",
        type: "",
      },
    ],
    vertexTargetData: [
      {
        lane: "",
        name: "",
        type: "",
      },
    ],
    edge: [
      {
        start: "",
        end: "",
        text: "",
      },
    ],
    errors: [],
    formIsValid: false,
    changePage: false,
    setDisabled: false,
    changeTab:this.props.formData.source,
  };

  openNav() {
    document.getElementById("mySidenav").style.width = "400px";
    document.getElementById("main").style.marginRight = "400px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
    document.body.style.backgroundColor = "white";
  }

  handleSubmit(state) {
    let vertexSourceData = this.state.vertexSourceData;
    let vertexMiddleData = this.state.vertexMiddleData;
    let vertexTargetData = this.state.vertexTargetData;
    let edges = [];
    let vertexData = vertexSourceData.concat(vertexMiddleData).concat(vertexTargetData);
    /* vertexData.unshift(vertexSourceData);
    vertexData.push(vertexTargetData); */
    for(let i = 1;i < vertexData.length; i++){
      let edge = {};
      edge.start = vertexData[i-1].name;
      edge.end = vertexData[i].name;
      edge.text = "";
      edges.push(edge);
    }
    console.log(edges);
    this.setState({
      submit: state,
      setDisabled: state,
      vertexData: vertexData,
      edge: edges
    });
  }

  appendDropDown(event) {
    let currentFormData = this.state.formItem;
    let arrOfEdge = this.state.edge;
    
    console.log(this.state.changeTab);
    if(this.state.changeTab === this.state.formItem.source.value){
      let arrOfVertex = this.state.vertexSourceData;
      let AttributesDatatArr = currentFormData.vertexSourceData;
      let prepareValue = {};
      prepareValue.value = "";
      AttributesDatatArr.push(prepareValue);
      currentFormData.vertexSourceData = AttributesDatatArr;

      let prepareData = {};
      prepareData.lane = "";
      prepareData.name = "";
      prepareData.type = "";
      arrOfVertex.push(prepareData);

      let prepareEdge = {};
      prepareEdge.start = "";
      prepareEdge.end = "";
      prepareEdge.text = "";

      arrOfEdge.push(prepareEdge);

      this.setState({
        formItem: currentFormData,
        vertexSourceData: arrOfVertex,
        edge: arrOfEdge,
      });
    }
    else if(this.state.changeTab === this.state.formItem.middleware.value){
      let arrOfVertex = this.state.vertexMiddleData;
      let AttributesDatatArr = currentFormData.vertexMiddleData;
      let prepareValue = {};
      prepareValue.value = "";
      AttributesDatatArr.push(prepareValue);
      currentFormData.vertexMiddleData = AttributesDatatArr;

      let prepareData = {};
      prepareData.lane = "";
      prepareData.name = "";
      prepareData.type = "";
      arrOfVertex.push(prepareData);

      let prepareEdge = {};
      prepareEdge.start = "";
      prepareEdge.end = "";
      prepareEdge.text = "";

      arrOfEdge.push(prepareEdge);

      this.setState({
        formItem: currentFormData,
        vertexMiddleData: arrOfVertex,
        edge: arrOfEdge,
      });
    }
    else if(this.state.changeTab === this.state.formItem.target.value){
      let arrOfVertex = this.state.vertexTargetData;
      let AttributesDatatArr = currentFormData.vertexTargetData;
      let prepareValue = {};
      prepareValue.value = "";
      AttributesDatatArr.push(prepareValue);
      currentFormData.vertexTargetData = AttributesDatatArr;

      let prepareData = {};
      prepareData.lane = "";
      prepareData.name = "";
      prepareData.type = "";
      arrOfVertex.push(prepareData);

      let prepareEdge = {};
      prepareEdge.start = "";
      prepareEdge.end = "";
      prepareEdge.text = "";

      arrOfEdge.push(prepareEdge);

      this.setState({
        formItem: currentFormData,
        vertexTargetData: arrOfVertex,
        edge: arrOfEdge,
      });
    }
  }

  handelFormForDropDown(event, index) {
    let currentFormData = { ...this.state.formItem };
    let edgeValue = this.state.edge;
    console.log(event.target.id);
    if(this.state.changeTab === this.state.formItem.source.value){
      let element = this.state.vertexSourceData;
      element[index].lane = this.state.changeTab;
      if (event.target.value !== "") {
        if (event.target.name === "vertexSourceType") {
          element[index].type = event.target.value;
          console.log();
        }
        if (event.target.name === "vertexSourceName") {
          element[index].name = event.target.value;
         /*  if (index === 0) {
            edgeValue[index].start = event.target.value;
          } else {
            edgeValue[index].start = event.target.value;
            edgeValue[index - 1].end = event.target.value;
          } */
        }
      }
      this.setState({
        formItem: currentFormData,
        vertexSourceData: element,
        //edge: edgeValue,
      });
    }
    else if(this.state.changeTab === this.state.formItem.middleware.value){
      let element = this.state.vertexMiddleData;
    element[index].lane = this.state.changeTab;
    if (event.target.value !== "") {
      if (event.target.name === "vertexMiddleType") {
        element[index].type = event.target.value;
        console.log();
      }
      if (event.target.name === "vertexMiddleName") {
        element[index].name = event.target.value;
        /* if (index === 0) {
          edgeValue[index].start = event.target.value;
        } else {
          edgeValue[index].start = event.target.value;
          edgeValue[index - 1].end = event.target.value;
        } */
      }
    }
    this.setState({
      formItem: currentFormData,
      vertexMiddleData: element,
      //edge: edgeValue,
    });
    }
    else if(this.state.changeTab === this.state.formItem.target.value){
    let element = this.state.vertexTargetData;
    element[index].lane = this.state.changeTab;
    if (event.target.value !== "") {
      if (event.target.name === "vertexType") {
        element[index].type = event.target.value;
        console.log();
      }
      if (event.target.name === "vertexName") {
        element[index].name = event.target.value;
        /* if (index === 0) {
          edgeValue[index].start = event.target.value;
        } else {
          edgeValue[index].start = event.target.value;
          edgeValue[index - 1].end = event.target.value;
        } */
      }
    }
    this.setState({
      formItem: currentFormData,
      vertexTargetData: element,
      //edge: edgeValue,
    });
    }
  }
  onHover(event){
    /* console.log(event.target.id);
    document.getElementsByClassName('row_drag')[0].sortable({
      delay: 100,
      stop: function () {
        var selectedRow = new Array();
        document.getElementsByClassName('row_drag>tr')[0].each(function () {
          selectedRow.push(event.target.id);
        });
      },
    }); */
  }
  handleRemoveDropDown(index) {
    let currentFormData = { ...this.state.formItem };
    let edgeData = this.state.edge;

    
    if(this.state.changeTab === this.state.formItem.source.value){
      let currentData = this.state.vertexSourceData;
      let attributeValueArr = currentFormData.vertexSourceData;
      attributeValueArr.splice(index, 1);
      currentData.splice(index, 1);
      edgeData.splice(index, 1);
      if (attributeValueArr.length === 0) {
        let prepareValue = {};
        prepareValue.value = "";
        attributeValueArr.push(prepareValue);
      }
      if (currentData.length === 0) {
        let prepareValue = {};
        prepareValue.lane = "";
        prepareValue.name = "";
        prepareValue.type = "";
        currentData.push(prepareValue);
      }
      if (edgeData.length === 0) {
        let prepareValue = {};
        prepareValue.start = "";
        prepareValue.end = "";
        prepareValue.text = "";
        edgeData.push(prepareValue);
      }
      currentFormData.vertexSourceData = attributeValueArr;
      this.setState({
        formItem: currentFormData,
        vertexSourceData: currentData,
        edge: edgeData,
      });
    }
    else if(this.state.changeTab === this.state.formItem.middleware.value){
      let currentData = this.state.vertexMiddleData;
      let attributeValueArr = currentFormData.vertexMiddleData;
      attributeValueArr.splice(index, 1);
      currentData.splice(index, 1);
      edgeData.splice(index, 1);
      if (attributeValueArr.length === 0) {
        let prepareValue = {};
        prepareValue.value = "";
        attributeValueArr.push(prepareValue);
      }
      if (currentData.length === 0) {
        let prepareValue = {};
        prepareValue.lane = "";
        prepareValue.name = "";
        prepareValue.type = "";
        currentData.push(prepareValue);
      }
      if (edgeData.length === 0) {
        let prepareValue = {};
        prepareValue.start = "";
        prepareValue.end = "";
        prepareValue.text = "";
        edgeData.push(prepareValue);
      }
      currentFormData.vertexMiddleData = attributeValueArr;
      this.setState({
        formItem: currentFormData,
        vertexMiddleData: currentData,
        edge: edgeData,
      });
    }
    else if(this.state.changeTab === this.state.formItem.target.value){
      let currentData = this.state.vertexTargetData;
      let attributeValueArr = currentFormData.vertexTargetData;
      attributeValueArr.splice(index, 1);
      currentData.splice(index, 1);
      edgeData.splice(index, 1);
      if (attributeValueArr.length === 0) {
        let prepareValue = {};
        prepareValue.value = "";
        attributeValueArr.push(prepareValue);
      }
      if (currentData.length === 0) {
        let prepareValue = {};
        prepareValue.lane = "";
        prepareValue.name = "";
        prepareValue.type = "";
        currentData.push(prepareValue);
      }
      if (edgeData.length === 0) {
        let prepareValue = {};
        prepareValue.start = "";
        prepareValue.end = "";
        prepareValue.text = "";
        edgeData.push(prepareValue);
      }
      currentFormData.vertexTargetData = attributeValueArr;
      this.setState({
        formItem: currentFormData,
        vertexTargetData: currentData,
        edge: edgeData,
      });
    }
  }
  handleData(event) {
    let currentData = { ...this.state.formItem }
    let name = event.target.name
    let value = event.target.value

    console.log(name, value)
    if (name === 'source') {
      currentData.source = value
    }
    if (name === 'target') {
      currentData.target = value
    }
    if (name === 'middleware') {
      currentData.middleware = value
    }
    if (name === 'integration') {
      currentData.integration = value
    }
    this.setState({
      formItem: currentData
    })

  }
  changeTab(type) {
    this.setState({
      changeTab: type
    })
  }
  render() {
    return (
      <div className="form">
        {!this.state.changePage ? (
          <div>
            <div className="row pad text-right my-4">
              <div
                  className="col-sm-11 cursor-pointer"
                  onClick={() => this.openNav()}
                >
                  &#9776; open
              </div>
            </div>
          <div className="row pad mt-4">
            <div className="col-sm-8" id="main">
            
              <div className="col-sm-10">
                {this.state.submit ? (
                  <Graph
                    vertex={this.state.vertexData}
                    formItem={this.state.formItem}
                    edge={this.state.edge}
                  />
                ) : (
                  <Graph2
                    vertex={this.state.vertexData}
                    formItem={this.state.formItem}
                    edge={this.state.edge}
                  />
                )}
              </div>
              
            </div>
            <div className="col-sm-4 mt-3">
              <div id="mySidenav" className="sidenav">
                <a
                  className="closebtn cursor-pointer"
                  onClick={() => this.closeNav()}
                >
                  &times;
                </a>
                <br />

                <h6 className="text-right white cursor-pointer">
                  <small
                    onClick={() =>
                      this.setState({
                        changePage: true,
                      })
                    }
                  >
                    back to home?
                  </small>
                </h6>
                <hr className="Hr" />
              <div className="row cursor-pointer">
                <div className={this.state.changeTab === this.state.formItem.source.value ? "col-sm-4 white grey-bg" : "col-sm-4 white"} onClick={() => this.changeTab(this.state.formItem.source.value)}  > {this.state.formItem.source.value} </div>
                <div className={this.state.changeTab === this.state.formItem.middleware.value ? "col-sm-4 white grey-bg" : "col-sm-4 white "} onClick={() => this.changeTab(this.state.formItem.middleware.value)} > {this.state.formItem.middleware.value}</div>
                <div className={this.state.changeTab === this.state.formItem.target.value ? "col-sm-4 white grey-bg" : "col-sm-4 white"} onClick={() => this.changeTab(this.state.formItem.target.value)} > {this.state.formItem.target.value} </div>
              </div>

              <br />
              <br />

              {this.state.changeTab === this.state.formItem.source.value ?
                <div>
                  <div className="form-row">
                  {this.state.formItem.vertexSourceData.map((vertexData, index) => {
                    return (
                      <div className="form-row " key={"vertexSourceDataDiv" + index}>
                        <div className="form-group white">
                          {index == 0 ? (
                            <span>
                              <label>&nbsp;&nbsp;&nbsp; Add More</label>
                              &nbsp;&nbsp;&nbsp;
                              <small
                                className="blue-color cursor-pointer underline-text"
                                onClick={(event) => {
                                  this.appendDropDown(event);
                                }}
                              >
                                &nbsp;&nbsp;&nbsp;Add New
                              </small>
                            </span>
                          ) : null}
                          <div className="row">
                          <table>
                          <tbody className="row_drag" onMouseOver={(event) => this.onHover(event)}>
                          <tr>
                            <th>
                              <input
                                type="text"
                                className="form-control"
                                placeholder=" Value"
                                id={"vertexSourceName" + index}
                                name="vertexSourceName"
                                value = {this.state.vertexSourceData[index].name}
                                disabled={(this.state.setDisabled)? "disabled" : ""}
                                onChange={(event) => {
                                  this.handelFormForDropDown(event, index);
                                }}
                              />
                            </th>
                            <th>
                              <select
                                className="form-control"
                                name="vertexSourceType"
                                id={"vertexSourceType" + index}
                                disabled={(this.state.setDisabled)? "disabled" : ""}
                                value = {this.state.vertexSourceData[index].type}
                                onChange={(event) => {
                                  this.handelFormForDropDown(event, index);
                                }}
                              >
                                <option value="">choose</option>
                                {this.state.formItem.vertexType.map(
                                  (vertex, key) => {
                                    return (
                                      <option
                                        key={"systemDataOption" + key}
                                        value={vertex.value}
                                      >
                                        {vertex.name}
                                      </option>
                                    );
                                  }
                                )}
                              </select>
                            </th>
                            
                            <th>
                              {index != 0 ? (
                                <img
                                  title="Delete"
                                  onClick={this.handleRemoveDropDown.bind(
                                    this,
                                    index
                                  )}
                                  alt="detele"
                                  src={deleteImg}
                                />
                              ) : null}
                            </th>
                            </tr>
                            </tbody>
                            
                            </table>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                </div> : null
              }

              {this.state.changeTab === this.state.formItem.middleware.value ?
                <div>
                  <div className="form-row">
                  {this.state.formItem.vertexMiddleData.map((vertexData, index) => {
                    return (
                      <div className="form-row " key={"vertexMiddleDataDiv" + index}>
                        <div className="form-group white">
                          {index == 0 ? (
                            <span>
                              <label>&nbsp;&nbsp;&nbsp; Add More</label>
                              &nbsp;&nbsp;&nbsp;
                              <small
                                className="blue-color cursor-pointer underline-text"
                                onClick={this.appendDropDown.bind(this)}
                              >
                                &nbsp;&nbsp;&nbsp;Add New
                              </small>
                            </span>
                          ) : null}
                          <div className="row">
                          <table>
                          <tbody className="row_drag" onMouseOver={(event) => this.onHover(event)}>
                          <tr>
                            <th>
                              <input
                                type="text"
                                className="form-control"
                                placeholder=" Value"
                                id={"vertexMiddleName" + index}
                                name="vertexMiddleName"
                                value = {this.state.vertexMiddleData[index].name}
                                disabled={(this.state.setDisabled)? "disabled" : ""}
                                onChange={(event) => {
                                  this.handelFormForDropDown(event, index);
                                }}
                              />
                            </th>
                            
                            <th>
                              <select
                                className="form-control"
                                name="vertexMiddleType"
                                id={"vertexMiddleType" + index}
                                disabled={(this.state.setDisabled)? "disabled" : ""}
                                value = {this.state.vertexMiddleData[index].type}
                                onChange={(event) => {
                                  this.handelFormForDropDown(event, index);
                                }}
                              >
                                <option value="">choose</option>
                                {this.state.formItem.vertexType.map(
                                  (vertex, key) => {
                                    return (
                                      <option
                                        key={"systemDataOption" + key}
                                        value={vertex.value}
                                      >
                                        {vertex.name}
                                      </option>
                                    );
                                  }
                                )}
                              </select>
                            </th>
                            <th>
                              {index != 0 ? (
                                <img
                                  title="Delete"
                                  onClick={this.handleRemoveDropDown.bind(
                                    this,
                                    index
                                  )}
                                  alt="detele"
                                  src={deleteImg}
                                />
                              ) : null}
                            </th>
                            </tr>
                            </tbody>
                            
                            </table>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                </div> : null
              }

              {this.state.changeTab === this.state.formItem.target.value ?
                <div>
                  <div className="form-row">
                  {this.state.formItem.vertexTargetData.map((vertexData, index) => {
                    return (
                      <div className="form-row " key={"vertexTargetDataDiv" + index}>
                        <div className="form-group white">
                          {index == 0 ? (
                            <span>
                              <label>&nbsp;&nbsp;&nbsp; Add More</label>
                              &nbsp;&nbsp;&nbsp;
                              <small
                                className="blue-color cursor-pointer underline-text"
                                onClick={this.appendDropDown.bind(this)}
                              >
                                &nbsp;&nbsp;&nbsp;Add New
                              </small>
                            </span>
                          ) : null}
                          <div className="row">
                          <table>
                          <tbody className="row_drag" onMouseOver={(event) => this.onHover(event)}>
                          <tr>
                            <th>
                              <input
                                type="text"
                                className="form-control"
                                placeholder=" Value"
                                id={"vertexName" + index}
                                name="vertexName"
                                disabled={(this.state.setDisabled)? "disabled" : ""}
                                value = {this.state.vertexTargetData[index].name}
                                onChange={(event) => {
                                  this.handelFormForDropDown(event, index);
                                }}
                              />
                            </th>
                            <th>
                              <select
                                className="form-control"
                                name="vertexType"
                                id={"vertexType" + index}
                                disabled={(this.state.setDisabled)? "disabled" : ""}
                                value = {this.state.vertexTargetData[index].type}
                                onChange={(event) => {
                                  this.handelFormForDropDown(event, index);
                                }}
                              >
                                <option value="">choose</option>
                                {this.state.formItem.vertexType.map(
                                  (vertex, key) => {
                                    return (
                                      <option
                                        key={"systemDataOption" + key}
                                        value={vertex.value}
                                      >
                                        {vertex.name}
                                      </option>
                                    );
                                  }
                                )}
                              </select>
                            </th>
                            <th>
                              {index != 0 ? (
                                <img
                                  title="Delete"
                                  onClick={this.handleRemoveDropDown.bind(
                                    this,
                                    index
                                  )}
                                  alt="detele"
                                  src={deleteImg}
                                />
                              ) : null}
                            </th>
                            </tr>
                            </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                </div> : null
              }
              <button onClick={() => this.handleSubmit(false)} id = "editButtom"> Edit</button>
              <button onClick={() => this.handleSubmit(true)} id = "submitButtom"> Submit</button>
            </div>
          </div>
                
              </div>
            </div>
          
        ) : (
          <Wizard />
        )}
      </div>
    );
  }
}

export default Form;
