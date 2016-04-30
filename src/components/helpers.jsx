import React from 'react';

export function SR({ children }) { // eslint-disable-line react/prop-types
  return (<span className="sr-only">{children}</span>);
}

export function Icon({ name, title }) { // eslint-disable-line react/prop-types
  if (name.startsWith('fa-')) {
    return (<i className={'fa ' + name} title={title} ariaHidden></i>);
  }
  if (name.startsWith('im-')) {
    return (<i className={name} title={title} ariaHidden></i>);
  }
}
