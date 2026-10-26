# @ctrl/react-adsense [![npm](https://badgen.net/npm/v/@ctrl/react-adsense)](https://www.npmjs.com/package/@ctrl/react-adsense)

> React component for Google AdSense

DEMO: https://react-adsense.xmplaylist.com

### Install

```console
npm install @ctrl/react-adsense
```

Requires React 19 or newer.

### Use

Use the standard AdSense code somewhere in your `<head></head>` as you [normally would](https://support.google.com/adsense/answer/7477845)

```html
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
  crossorigin="anonymous"
></script>
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

### Single page apps

Each `<Adsense>` asks AdSense for one ad when it mounts, changing its props doesn't load another. Give it a `key` that changes when you want a new ad, like the current route.

```tsx
<Adsense key={pathname} client="ca-pub-7640562161899788" slot="7259870550" />
```

### Server components

The package is marked `'use client'`, so server components (like the Next.js App Router) can render `<Adsense>` directly.
