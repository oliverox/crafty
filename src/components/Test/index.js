import React from 'react';

const Test = (props) => <div className="test">{props.children}</div>

Test.displayName = 'Test';

export default Test;