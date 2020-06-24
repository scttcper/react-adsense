# @ctrl/react-adsense [![npm](https://badgen.net/npm/v/@ctrl/react-adsense)](https://www.npmjs.com/package/@ctrl/react-adsense) [![CircleCI](https://badgen.net/github/status/typectrl/react-adsense)](https://circleci.com/gh/TypeCtrl/react-adsense) [![coverage status](https://badgen.net/codecov/c/github/typectrl/react-adsense)](https://codecov.io/gh/typectrl/react-adsense)

### Install

```console
npm install @ctrl/react-adsense
```

### Use

Use the standard AdSense code somewhere in your `<head></head>` as you [normally would](https://support.google.com/adsense/answer/7477845)

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
```

```tsx
import React from 'react';
import {Adsense} from 'react-adsense';

// ads with no set-up
<Adsense
  client="ca-pub-7640562161899788"
  slot="7259870550"
/>

// ads with custom format
<Adsense
  client="ca-pub-7640562161899788"
  slot="7259870550"
  style={{ width: 500, height: 300 }}
  format=""
/>

// responsive and native ads
<Adsense
  client="ca-pub-7640562161899788"
  slot="7259870550"
  style={{ display: 'block' }}
  layout="in-article"
  format="fluid"
/>
```
