import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Adsense } from './index';

describe('Adsense', () => {
  it('should be instantiable', () => {
    const { container } = render(<Adsense client="123" slot="abc" className="ads-class"/>);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('should call window adsbygoogle', () => {
    (window as any).adsbygoogle = [];
    render(<Adsense client="123" slot="abc"/>);
    expect((window as any).adsbygoogle).toHaveLength(1);
    (window as any).adsbygoogle = undefined;
  });
});
