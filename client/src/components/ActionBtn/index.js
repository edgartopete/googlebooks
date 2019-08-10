import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function ActionBtn(props) {
  return (
    <a className="btn btn-primary mr-2" {...props} role="button" rel="noopener noreferrer">{props.children}</a>
  );
}
