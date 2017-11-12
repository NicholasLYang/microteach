import React from "react";
import { TextField } from "redux-form-material-ui";

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  floatingLabelText
}) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <TextField
        {...input}
        floatingLabelText={floatingLabelText}
        placeholder={label}
        type={type}
      />
      {touched &&
        ((error &&
          <span className="error">
            {error}
          </span>) ||
          (warning &&
            <span>
              {warning}
            </span>))}
    </div>
  </div>;

export default renderField;
