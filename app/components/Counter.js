// @flow
import * as React from 'react';

const Counter = () => {
  const [count, update] = React.useState(0);

  const increment = () => {
    update(count + 1);
  };

  const decrement = () => {
    update(count - 1);
  };

  return (
    <div>
      <div>value is {count}</div>
      <div>
        <button onClick={increment} type="button">
          <i className="fa fa-plus" />
        </button>
        <button onClick={decrement} type="button">
          <i className="fa fa-minus" />
        </button>
      </div>
    </div>
  );
};

export default Counter;
