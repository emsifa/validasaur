[![Validasaur](https://raw.githubusercontent.com/emsifa/validasaur/master/validasaur.svg)](#)

[![tag](https://img.shields.io/github/tag/emsifa/validasaur.svg)](https://github.com/emsifa/validasaur)
[![CI](https://github.com/emsifa/validasaur/workflows/ci/badge.svg)](https://github.com/emsifa/validasaur/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/emsifa/validasaur/blob/master/LICENSE)
[![tag](https://img.shields.io/badge/deno->=1.0.0-green.svg)](https://github.com/denoland/deno)

Validasaur is Deno validation library slightly inspired by Laravel Validation.

## Examples

#### Basic Usage

Write your `example.ts` like this:

```ts
import { validate } from "https://raw.githubusercontent.com/emsifa/validasaur/master/src/mod.ts";
import { required, isNumber } from "https://raw.githubusercontent.com/emsifa/validasaur/master/src/rules.ts";

const inputs = {
  name: "",
  age: "20"
};

const [ passes, errors ] = await validate(inputs, {
  name: required,
  age: [required, isNumber]
});

console.log({ passes, errors });
```

Run code above with:

```bash
deno run example.ts
```

And this is the result:

```json
{
  "passes": false,
  "errors": {
    "name": {
      "required": "name is required"
    },
    "age": {
      "isNumber": "age must be a number"
    }
  }
}
```

#### Formatting Errors

If you want a simpler error message,
you can use `flattenMessages` or `firstMessages` to format error messages.

For example:

```ts
import { validate, flattenMessages, firstMessages } from "https://raw.githubusercontent.com/emsifa/validasaur/master/src/mod.ts";
import { required, isNumber } from "https://raw.githubusercontent.com/emsifa/validasaur/master/src/rules.ts";

const inputs = {
  name: "",
  age: "20"
};

const [ passes, errors ] = await validate(inputs, {
  name: required,
  age: [required, isNumber]
});

const firstErrors = firstMessages(errors);
const flattenErrors = flattenMessages(errors);

// Show the difference
console.log({
  defaultErrors: errors,
  firstErrors,
  flattenErrors
});
```

Result:

```json
{
  "defaultErrors": {
    "name": {
      "required": "name is required"
    },
    "age": {
      "isNumber": "age must be a number"
    }
  },
  "firstErrors": {
    "name": "name is required",
    "age": "age must be a number"
  },
  "flattenErrors": {
    "name.required": "name is required",
    "age.isNumber": "age must be a number",
    "name": "name is required",
    "age": "age must be a number"
  }
}
```

#### Custom Error Message

```ts
import { validate, flattenMessages } from "repourl/src/mod.ts";
import { required, isNumber, isString, validateArray, validateObject } from "repourl/src/rules.ts";

const inputs = {
  name: "",
  age: '12',
};

const [passes, errors] = await validate(inputs, {
  name: required,
  age: [required, isNumber],
}, {
  messages: {
    "name": "Nama tidak boleh kosong",
    "age.required": "Usia tidak boleh kosong",
    "age.isNumber": "Usia harus berupa angka",
    // Use this if you want same message for any rule fail
    // "age": "Usia tidak valid"
  },
});

console.log({ passes, errors });
```

Result:

```json
{
  "passes": false,
  "errors": {
    "name": {
      "required": "Nama tidak boleh kosong"
    },
    "age": {
      "isNumber": "Umur harus berupa angka"
    }
  }
}
```

#### Validating Array and Object

```ts
import { validate, flattenMessages } from "repourl/src/mod.ts";
import { required, isNumber, isString, validateArray, validateObject } from "repourl/src/rules.ts";

const inputs = {
  name: "",
  age: "20",
  skills: ["PHP", "Node.js", 0, "Deno"],
  address: {
    street: null,
    city: "Jakarta",
    country: "Indonesia",
  }
};

const [ passes, errors ] = await validate(inputs, {
  name: required,
  age: [required, isNumber],

  // validateArray(required: boolean, rules: Rule[])
  skills: validateArray(true, [isString]),

  // validateObject(required: boolean, rules: ValidationRule)
  address: validateObject(true, {
    street: required,
    city: required,
    country: required,
  }),
});

const flattenErrors = flattenMessages(errors);

console.log({ passes, flattenErrors });
```

Result:

```json
{
  "passes": false,
  "flattenErrors": {
    "name.required": "name is required",
    "age.isNumber": "age must be a number",
    "skills.2.isString": "2 must be a string",
    "address.street.required": "street is required",
    "name": "name is required",
    "age": "age must be a number",
    "skills.2": "2 must be a string",
    "address.street": "street is required"
  }
}
```
