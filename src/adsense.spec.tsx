import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Adsense } from './index';

describe('Adsense', () => {
  it('should be instantiable', () => {
    const { container } = render(<Adsense client="123" slot="abc" className="ads-class" />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('should allow children', () => {
    const { container } = render(
      <Adsense client="123" slot="abc" className="ads-class">
        <img alt="placeholder" />
      </Adsense>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it('should call window adsbygoogle', () => {
    (window as any).adsbygoogle = [];
    render(<Adsense client="123" slot="abc" />);
    expect((window as any).adsbygoogle).toHaveLength(1);
    (window as any).adsbygoogle = undefined;
  });
});
