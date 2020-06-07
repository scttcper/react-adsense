# @ctrl/react-adsense [![npm](https://img.shields.io/npm/v/@ctrl/react-adsense.svg?maxAge=3600)](https://www.npmjs.com/package/@ctrl/react-adsense) [![CircleCI](https://circleci.com/gh/TypeCtrl/react-adsense.svg?style=svg)](https://circleci.com/gh/TypeCtrl/react-adsense) [![coverage status](https://codecov.io/gh/typectrl/react-adsense/branch/master/graph/badge.svg)](https://codecov.io/gh/typectrl/react-adsense)

### Install

```console
npm install @ctrl/react-adsense
```

### Use

```tsx
import React from 'react';
import {Adsense} from 'react-adsense';

// ads with no set-up
<Adsense
  client="ca-pub-7292810486004926"
  slot="7806394673"
/>

// ads with custom format
<Adsense
  client="ca-pub-7292810486004926"
  slot="7806394673"
  style={{ width: 500, height: 300, float: 'left' }}
  format=""
/>

// responsive and native ads
<Adsense
  client="ca-pub-7292810486004926"
  slot="7806394673"
  style={{ display: 'block' }}
  layout="in-article"
  format="fluid"
/>

// auto full width responsive ads
<Adsense
  client="ca-pub-7292810486004926"
  slot="7806394673"
  style={{ display: 'block' }}
  format="auto"
  responsive="true"
  layoutKey="-gw-1+2a-9x+5c"
/>
```
