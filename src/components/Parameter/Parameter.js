import React from 'react';

const Parameter = (props) => {
  const {
    name,
    moduleId,
    param,
    setModuleParameter
  } = props;

  function handleChange (evt) {
    // evt.preventDefault();
    evt.stopPropagation();
    // ^^ ??

    const {
      value
    } = evt.target;

    setModuleParameter(name, moduleId, value);
  }

  return (
    <foreignObject x='10' y='60' width='120' height='120'>
      <div xmlns='http://www.w3.org/1999/xhtml'>
        <input
          type='range'
          min={0}
          max={1}
          step={1 / param.range}
          defaultValue={param.value}
          onChange={handleChange}
          />
        <label>{ name }</label>
      </div>
    </foreignObject>
  );
};

Parameter.propTypes = {

};

export default Parameter;
