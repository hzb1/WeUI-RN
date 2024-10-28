import React from 'react';
import { act, create } from 'react-test-renderer';

import ButtonDemo from '@/app/(demo)/button/ButtonDemo';

describe('Button', () => {
  jest.useFakeTimers();
  it('Button', async () => {
    const tree = create(<ButtonDemo />).toJSON();
    expect(tree).toMatchSnapshot();

    /**
     * 这是为了解决报错 ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.
     * https://github.com/jestjs/jest/issues/6434
     */
    await act(async () => {}); // this is where the magic happens

    expect(tree).toMatchSnapshot();
  });
});
