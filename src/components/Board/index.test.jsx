import React from 'react';
import { mount } from 'enzyme';

import Board from './index';

describe('Board', () => {
  it('renders rows', () => {
    mount(<Board rows={[]} />);
  });
});
