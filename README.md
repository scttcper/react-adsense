# @ctrl/react-adsense [![npm](https://badgen.net/npm/v/@ctrl/react-adsense)](https://www.npmjs.com/package/@ctrl/react-adsense)

> React component for Google AdSense

DEMO: https://react-adsense.xmplaylist.com

### Install

```console
npm install @ctrl/react-adsense
```

Requires React 19.3 or newer.

### Use

Load the AdSense script once, either in your HTML `<head>` as you [normally would](https://support.google.com/adsense/answer/7477845) or anywhere in your React tree. React hoists async scripts into the `<head>` and only loads them once.

```tsx
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
  crossOrigin="anonymous"
/>
```

```tsx
import { Adsense } from '@ctrl/react-adsense';

// ads with no set-up
<Adsense
  client="ca-pub-7640562161899788"
  slot="7259870550"
/>

// ads with a fixed size
<Adsense
  client="ca-pub-7640562161899788"
  slot="7259870550"
  style={{ display: 'inline-block', width: 300, height: 250 }}
  format=""
/>

// responsive and native ads
<Adsense
  client="ca-pub-7640562161899788"
  slot="7259870550"
  style={{ textAlign: 'center' }}
  layout="in-article"
  format="fluid"
/>
```

### Props

| Prop           | Sets                                      | Default   |
| -------------- | ----------------------------------------- | --------- |
| `client`       | `data-ad-client`                          |           |
| `slot`         | `data-ad-slot`                            |           |
| `layout`       | `data-ad-layout`                          |           |
| `layoutKey`    | `data-ad-layout-key`                      |           |
| `format`       | `data-ad-format`                          | `'auto'`  |
| `responsive`   | `data-full-width-responsive`              | `'false'` |
| `adTest`       | `data-adtest`                             |           |
| `pageLevelAds` | pushes `enable_page_level_ads` for client | `false`   |

`style` is merged over `{ display: 'block' }`. Everything else (`className`, `id`, `ref`, `data-*`, ...) is passed to the `<ins>`.

### Server rendering

Works with server rendering (Next.js, TanStack Start, React Router, ...) and React Server Components, no wrapper needed. The package is marked `'use client'`, and the ad itself only renders in the browser using React's [`browser()`](https://react.dev/reference/react-dom/browser).

- The server sends an empty `<ins>` with your `className` and `style`. Give it a size so the page doesn't shift when the ad loads, like `style={{ minHeight: 280 }}` for a responsive ad.
- After hydration the browser swaps in the real `<ins class="adsbygoogle">` and requests the ad. AdSense can't fill a slot React hasn't hydrated yet, which used to cause hydration errors.
- Server renderers report this through `onBrowserBailout`, not `onError`, so it doesn't show up as an error.

```tsx
// app/page.tsx, a server component
import { Adsense } from '@ctrl/react-adsense';

export default function Page() {
  return <Adsense client="ca-pub-7640562161899788" slot="7259870550" style={{ minHeight: 280 }} />;
}
```

### Single page apps

Each `<Adsense>` asks AdSense for one ad when it mounts, changing its props doesn't load another. Give it a `key` that changes when you want a new ad, like the current route.

```tsx
<Adsense key={pathname} client="ca-pub-7640562161899788" slot="7259870550" />
```
