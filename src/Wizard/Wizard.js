import React, { useState } from "react";
import StepWizard from "react-step-wizard";

import Nav from "./nav";

import "./wizard.css";
import "./transitions.css";
import Form from "../Form/Form";
/* eslint react/prop-types: 0 */

/**
 * A basic demonstration of how to use the step wizard
 */
const Wizard = () => {
  const [state, updateState] = useState({
    form: {
      integration: "",
      source: "",
      middleware: "",
      target: "",
    },
    transitions: {
      enterRight: "animated enterRight",
      enterLeft: "animated enterLeft",
      exitRight: "animated exitRight",
      exitLeft: "animated exitLeft",
      intro: "animated intro",
    },
    showGraph: false, // uncomment to see more
  });

  const updateForm = (key, value) => {
    const { form } = state;

    form[key] = value;

    updateState({
      ...state,
      form,
    });
  };

  const changeForm = () => {
    updateState({
      ...state,
      showGraph: true,
    });
  };

  // Do something on step change
  const onStepChange = (stats) => {};

  const setInstance = (SW) =>
    updateState({
      ...state,
      SW,
    });

  return (
    <div>
      {!state.showGraph ? (
        <div className="container">
          <div className={"jumbotron"}>
            <div className="row">
              <div className={`col-12 col-sm-6 offset-sm-3 rsw-wrapper`}>
                <StepWizard
                  onStepChange={onStepChange}
                  isHashEnabled
                  transitions={state.transitions} // comment out for default transitions
                  nav={<Nav />}
                  instance={setInstance}
                >
                  <Start hashKey={"FirstStep"} update={updateForm} />
                  <First update={updateForm} />
                  <Second form={state.form} update={updateForm} />
                  <Progress form={state.form} update={updateForm} />
                  <Last
                    form={state.form}
                    hashKey={"TheEnd!"}
                    update={updateForm}
                    changeForm={changeForm}
                  />
                </StepWizard>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Form formData={state.form} />
      )}
    </div>
  );
};

export default Wizard;

/**
 * Stats Component - to illustrate the possible functions
 * Could be used for nav buttons or overview
 */
const Stats = ({ nextStep, previousStep, totalSteps, step, validatyCheck }) => (
  <div>
    <hr />
    {step > 1 && (
      <button className="btn btn-default btn-block" onClick={previousStep}>
        Go Back
      </button>
    )}
    {step < totalSteps ? (
      <button className="btn btn-primary btn-block" onClick={nextStep}>
        Continue
      </button>
    ) : (
      <button
        className="btn btn-success btn-block"
        disabled={!validatyCheck}
        onClick={nextStep}
      >
        Finish
      </button>
    )}
    <hr />
  </div>
);

/** Steps */
const Start = (props) => {
  return (
    <div>
      <h3 className="text-center">Welcome to ThreadConnect Self Service  Tool </h3>
        <br/>
      <label>Integration Name</label>
    {/*   <input
        type="text"
        className="form-control"
        name="integration"
        placeholder="Integration Name"
        onChange={update}
      /> */}
      <Stats step={1} {...props} />
    </div>
  );
}
const First = (props) => {
  const update = (e) => {
    props.update(e.target.name, e.target.value);
  };

  return (
    <div>
      <h3 className="text-center">Welcome to ThreadConnect Self Service  Tool </h3>

      <label>Integration Name</label>
      <input
        type="text"
        className="form-control"
        name="integration"
        placeholder="Integration Name"
        onChange={update}
      />
      <Stats step={1} {...props} />
    </div>
  );
};

const Second = (props) => {
  const validate = () => {
    props.previousStep();
  };
  const update = (e) => {
    props.update(e.target.name, e.target.value);
  };

  return (
    <div>
      <h3 className="text-center">Please Enter a Source</h3>

      <label>Source </label>
      <input
        type="text"
        className="form-control"
        name="source"
        placeholder="Enter a Source"
        onChange={update}
      />
      <Stats step={2} {...props} previousStep={validate} />
    </div>
  );
};

const Progress = (props) => {
  const validate = () => {
    props.previousStep();
  };
  const update = (e) => {
    props.update(e.target.name, e.target.value);
  };

  return (
    <div>
      <h3 className="text-center">Please Enter a Middleware</h3>

      <label>Middleware </label>
      <input
        type="text"
        className="form-control"
        name="middleware"
        placeholder="Enter a Middleware"
        onChange={update}
      />
      <Stats step={3} {...props} previousStep={validate} />
    </div>
  );
};

const Last = (props) => {
  const [isValid, setIsValid] = useState(false);

  const update = (e) => {
    props.update(e.target.name, e.target.value);
    if (
      props.form.integration.trim() === "" ||
      props.form.source.trim() === "" ||
      props.form.middleware.trim() === "" ||
      props.form.target.trim() === ""
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  return (
    <div>
      <h3 className="text-center">Please Enter a Target</h3>
      <label>Target </label>
      <input
        type="text"
        className="form-control"
        name="target"
        placeholder="Enter a Target"
        onChange={update}
      />
      <Stats
        step={4}
        {...props}
        nextStep={props.changeForm}
        validatyCheck={isValid}
      />
    </div>
  );
};
