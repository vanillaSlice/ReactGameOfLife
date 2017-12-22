import React from 'react';
import { mount } from 'enzyme';

import SpeedControls from './index';

describe('SpeedControls', () => {
  const onChange = jest.fn();

  it('slow is checked when speed is 1000', () => {
    const speedControls = mount(<SpeedControls speed={1000} onChange={onChange} />);
    expect(speedControls.find('#slow').first().props().checked).toBe(true);
  });

  it('medium is checked when speed is 500', () => {
    const speedControls = mount(<SpeedControls speed={500} onChange={onChange} />);
    expect(speedControls.find('#medium').first().props().checked).toBe(true);
  });

  it('fast is checked when speed is 300', () => {
    const speedControls = mount(<SpeedControls speed={300} onChange={onChange} />);
    expect(speedControls.find('#fast').first().props().checked).toBe(true);
  });

  it('fastest is checked when speed is 100', () => {
    const speedControls = mount(<SpeedControls speed={100} onChange={onChange} />);
    expect(speedControls.find('#fastest').first().props().checked).toBe(true);
  });
});
