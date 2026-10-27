import { act, StrictMode, type ReactNode } from 'react';
import { hydrateRoot, type Root } from 'react-dom/client';
import { renderToReadableStream } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Adsense } from './index.js';

const ads = window as Window & { adsbygoogle?: unknown };
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | undefined;

afterEach(() => {
  act(() => root?.unmount());
  root = undefined;
  document.body.replaceChildren();
  delete ads.adsbygoogle;
  vi.restoreAllMocks();
});

async function serverRender(node: ReactNode) {
  const bailouts: unknown[] = [];
  const errors: unknown[] = [];
  const stream = await renderToReadableStream(node, {
    onBrowserBailout: error => bailouts.push(error),
    onError: error => {
      errors.push(error);
    },
  });
  await stream.allReady;
  return { html: await new Response(stream).text(), bailouts, errors };
}

describe('server rendering', () => {
  it('should send a placeholder and leave the ad to the browser', async () => {
    const { html, bailouts, errors } = await serverRender(
      <Adsense client="123" slot="abc" className="ads-class" style={{ height: 250 }} />,
    );
    expect(html).toContain('<ins class="ads-class" style="display:block;height:250px">');
    expect(html).not.toContain('adsbygoogle');
    expect(bailouts).toHaveLength(1);
    expect(errors).toEqual([]);
    expect(ads.adsbygoogle).toBeUndefined();
  });

  it('should hydrate without errors and push once', async () => {
    const app = (
      <main>
        <Adsense client="123" slot="abc" />
      </main>
    );
    const { html } = await serverRender(app);
    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.append(container);
    // Another ad's push fills every empty <ins class="adsbygoogle"> it finds before React hydrates
    for (const ins of document.querySelectorAll('ins.adsbygoogle')) {
      ins.setAttribute('data-adsbygoogle-status', 'done');
      ins.append(document.createElement('iframe'));
    }
    const consoleError = vi.spyOn(console, 'error');
    const recoverableErrors: unknown[] = [];

    await act(async () => {
      root = hydrateRoot(container, <StrictMode>{app}</StrictMode>, {
        onRecoverableError: error => recoverableErrors.push(error),
      });
    });

    expect(recoverableErrors).toEqual([]);
    expect(consoleError).not.toHaveBeenCalled();
    expect(container.querySelector('ins.adsbygoogle')?.getAttribute('data-ad-slot')).toBe('abc');
    expect(ads.adsbygoogle).toEqual([{}]);
  });
});
