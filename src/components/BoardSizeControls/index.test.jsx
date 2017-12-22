import React from 'react';
import { mount } from 'enzyme';

import BoardSizeControls from './index';

describe('BoardSizeControls', () => {
  const onChange = jest.fn();

  it('10x10 is checked when 10x10 is passed in', () => {
    const boardSizeControls = mount(<BoardSizeControls
      onChange={onChange}
      columns={10}
      rows={10}
    />);
    expect(boardSizeControls.find('#_10x10').first().props().checked).toBe(true);
  });

  it('10x10 is checked when 20x20 is passed in', () => {
    const boardSizeControls = mount(<BoardSizeControls
      onChange={onChange}
      columns={20}
      rows={20}
    />);
    expect(boardSizeControls.find('#_20x20').first().props().checked).toBe(true);
  });

  it('40x20 is checked when 40x20 is passed in', () => {
    const boardSizeControls = mount(<BoardSizeControls
      onChange={onChange}
      columns={40}
      rows={20}
    />);
    expect(boardSizeControls.find('#_40x20').first().props().checked).toBe(true);
  });
});
