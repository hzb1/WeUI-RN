import React from 'react';
import { create } from 'react-test-renderer';

import ButtonDemo from '@/app/(demo)/button/ButtonDemo';

describe('Button', () => {
  it('Button 演示测试', async () => {
    const tree = create(<ButtonDemo />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
