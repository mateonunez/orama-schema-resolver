# 🪄 Lyra schema resolver

Create your [Lyra](https://github.com/lyrasearch/lyra) schema following the official specification.

[![Tests](https://github.com/mateonunez/lyra-schema-resolver/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/mateonunez/lyra-schema-resolver/actions/workflows/ci.yml)

## Installation

You can install the package using `npm`, `yarn` or `pnpm`:

```sh
npm i lyra-schema-resolver
```
```sh
yarn add lyra-schema-resolver
```
```sh
pnpm add lyra-schema-resolver
```

## Usage

```js
import { create, insert, search } from '@lyrasearch/lyra';
import resolveSchema from 'lyra-schema-resolver';
import * as fs from 'fs';

// You can parse data from any source, but we'll use a local file for this example
const data = JSON.parse(fs.readFileSync('./package.json').toString());
const schema = resolveSchema(data);
const db = create({ schema })

insert(db, data);

const results = search(db, {
  term: 'lyra'
});

console.log(results)
```

# License

[MIT](/LICENSE)
