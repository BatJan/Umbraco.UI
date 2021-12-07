# uui-popover

![npm](https://img.shields.io/npm/v/@umbraco-ui/uui-popover?logoColor=%231B264F)

Umbraco style popover component.

## Installation

### ES imports

```zsh
npm i @umbraco-ui/uui-popover
```

Import the registration of `<uui-popover>` via:

```javascript
import '@umbraco-ui/uui-popover/lib';
```

When looking to leverage the `UUIPopoverElement` base class as a type and/or for extension purposes, do so via:

```javascript
import { UUIPopoverElement } from '@umbraco-ui/uui-popover/lib/uui-popover.element';
```

### CDN

The component is available via CDN. This means it can be added to your application without the need of any bundler configuration. Here is how to use it with jsDelivr.

```html
<!-- Latest Version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-popover@latest/dist/uui-popover.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/@umbraco-ui/uui-popover@X.X.X/dist/uui-popover.min.js"></script>
```

## Usage

```html
<uui-popover></uui-popover>
```
