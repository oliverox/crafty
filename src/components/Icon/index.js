import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Icon = ({ name, className, ...rest }) => {
  return (
    <i className={classnames({
      'material-icons': true,
      [`${name}`]: true,
    }, className)}
    {...rest}
    />
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
