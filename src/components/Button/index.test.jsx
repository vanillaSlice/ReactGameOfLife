import React from 'react';
import { shallow } from 'enzyme';

import Button from './index';

describe('Button', () => {
  const onClick = jest.fn();
  const text = 'button text';
  const button = shallow(<Button onClick={onClick} text={text} />);

  it('is passed onClick function', () => {
    expect(button.props().onClick).toBe(onClick);
  });

  it('renders text', () => {
    expect(button.text()).toBe(text);
  });
});
