# 🪄 Orama schema resolver

Create your [Orama](https://github.com/oramasearch/orama) schema following the official specification.

[![Tests](https://github.com/mateonunez/orama-schema-resolver/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/mateonunez/orama-schema-resolver/actions/workflows/ci.yml)

## Installation

You can install the package using `npm`, `yarn` or `pnpm`:

```sh
npm i orama-schema-resolver
```
```sh
yarn add orama-schema-resolver
```
```sh
pnpm add orama-schema-resolver
```

## Usage

```js
import { create, insert, search } from '@oramasearch/orama';
import resolveSchema from 'orama-schema-resolver';
import * as fs from 'fs';

// You can parse data from any source, but we'll use a local file for this example
const data = JSON.parse(fs.readFileSync('./package.json').toString());
const schema = resolveSchema(data);
const db = create({ schema })

insert(db, data);

const results = search(db, {
  term: 'orama'
});

console.log(results)
```

# License

[MIT](/LICENSE)
