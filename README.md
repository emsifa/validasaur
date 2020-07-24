[![Validasaur](https://raw.githubusercontent.com/emsifa/validasaur/master/validasaur.svg)](#)

[![tag](https://img.shields.io/github/tag/emsifa/validasaur.svg)](https://github.com/emsifa/validasaur)
[![CI](https://github.com/emsifa/validasaur/workflows/ci/badge.svg)](https://github.com/emsifa/validasaur/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/emsifa/validasaur/blob/master/LICENSE)
[![tag](https://img.shields.io/badge/deno->=1.0.0-green.svg)](https://github.com/denoland/deno)
[![nest badge](https://nest.land/badge.svg)](https://nest.land/package/validasaur)

Validasaur is Deno validation library slightly inspired by Laravel Validation.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Examples](#examples)
    - [Basic Usage](#basic-usage)
    - [Formatting Errors](#formatting-errors)
    - [Custom Error Message](#custom-error-message)
    - [Validating Array and Object](#validating-array-and-object)
    - [Make Your own Simple Rule Validation](#make-your-own-simple-rule-validation)
    - [Make More Advanced Rule Validation](#make-more-advanced-rule-validation)
- [Available Rules](#available-rules)
    - [`required`](#required)
    - [`endsWith(str: string)`](#endswithstr-string)
    - [`fileExists(pathPrefix: string)`](#fileexistspathprefix-string)
    - [`isArray`](#isarray)
    - [`isBool`](#isbool)
    - [`isDate`](#isdate)
    - [`isEmail`](#isemail)
    - [`isFloat`](#isfloat)
    - [`isIn(allowedValues: PrimitiveTypes[])`](#isinallowedvalues-primitivetypes)
    - [`isInt`](#isint)
    - [`isIPv4`](#isipv4)
    - [`isNumber`](#isnumber)
    - [`isNumeric`](#isnumeric)
    - [`isString`](#isstring)
    - [`lengthBetween(minLength: number, maxLength: number)`](#lengthbetweenminlength-number-maxlength-number)
    - [`match(regex: RegExp, trim: boolean = false)`](#matchregex-regexp-trim-boolean--false)
    - [`maxLength(minValue: number)`](#maxlengthminvalue-number)
    - [`maxNumber(maxValue: number)`](#maxnumbermaxvalue-number)
    - [`minLength(minValue: number)`](#minlengthminvalue-number)
    - [`minNumber(minValue: number)`](#minnumberminvalue-number)
    - [`notIn(disallowedValues: PrimitiveTypes[])`](#notindisallowedvalues-primitivetypes)
    - [`notNull`](#notnull)
    - [`nullable`](#nullable)
    - [`numberBetween(minValue: number, maxValue: number)`](#numberbetweenminvalue-number-maxvalue-number)
    - [`requiredIf(field: string, fieldValue: any)`](#requirediffield-string-fieldvalue-any)
    - [`requiredUnless(field: string, fieldValue: any)`](#requiredunlessfield-string-fieldvalue-any)
    - [`requiredWhen(callback: (value: any, utils: ValidationUtils) => boolean|Promise<boolean>)`](#requiredwhencallback-value-any-utils-validationutils--booleanpromiseboolean)
    - [`startsWith(str: string)`](#startswithstr-string)
- [TODOS](#todos)

## Examples

#### Basic Usage

Write your `example.ts` like this:

```ts
import { validate, required, isNumber } from "https://deno.land/x/validasaur/mod.ts";

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
import {
  validate,
  flattenMessages,
  firstMessages,
  required,
  isNumber
} from "https://deno.land/x/validasaur/mod.ts";

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
import {
  validate,
  InvalidParams,
  required,
  isNumber,
  isIn,
  isString,
} from "https://deno.land/x/validasaur/mod.ts";

const inputs = {
  name: "",
  age: "12",
  sex: "unknown",
};

const [passes, errors] = await validate(inputs, {
  name: required,
  age: [required, isNumber],
  sex: [required, isString, isIn(["male", "female"])]
}, {
  messages: {
    "name": "Nama tidak boleh kosong",
    "age.required": "Usia tidak boleh kosong",
    "age.isNumber": "Usia harus berupa angka",
    // Using function
    "isIn": (params: InvalidParams): string => {
      const allowedValues = params.allowedValues.join("/");
      return `${params.attr} field doesn't allow '${params.value}', it only allows ${allowedValues}`;
    },
    // Use this if you want same message for any rule fail
    // "age": "Usia tidak valid",
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
      "isNumber": "Usia harus berupa angka"
    }
  }
}
```

#### Validating Array and Object

```ts
import {
  validate,
  flattenMessages,
  required,
  isNumber,
  isString,
  validateArray,
  validateObject
} from "https://deno.land/x/validasaur/mod.ts";

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

#### Make Your own Simple Rule Validation

In this example we will make an `isOdd` rule validation that check odd number.

First, let's make `is_odd.ts` like this:

```ts
import { invalid, Validity } from "https://deno.land/x/validasaur/mod.ts";

export function isOdd(value: any): Validity {
  if (typeof value !== "number") {
    return invalid("isOdd", { value });
  }

  if (value % 2 !== 1) {
    return invalid("isOdd", { value });
  }
}

```

Now, we can use it like this:

```ts
import {
  validate,
  flattenMessages,
  firstMessages,
  required,
  isNumber
} from "https://deno.land/x/validasaur/mod.ts";

import { isOdd } from "./is_odd.ts";

const inputs = {
  number: 20
};

const [ passes, errors ] = await validate(inputs, {
  number: [required, isNumber, isOdd]
});

console.log({ passes, errors });
```

#### Make More Advanced Rule Validation

In this example we will make a `unique` rule that check value availability in the database.
This rule accepts `table` and `column` as arguments, then calling database function to check availability based on those arguments.

First, let's make our `unique.ts`:

```ts
import db from "./your_db_service.ts";
import { invalid, Validity, Rule } from "https://deno.land/x/validasaur/mod.ts";

export function unique(table: string, column: string): Rule {
  return async function uniqueRule(value: any): Promise<Validity> {
    if (typeof value !== "string" && typeof value !== "number") {
      return invalid("unique", { value, table, column });
    }

    const data = await db.findOne(table, { [column]: value });
    if (data !== null) {
      return invalid("unique", { value, table, column });
    }
  };
}

```

Now we can use it like this:

```ts
import {
  validate,
  flattenMessages,
  firstMessages,
  required,
  isEmail
} from "https://deno.land/x/validasaur/mod.ts";

import { unique } from "./unique.ts";

const inputs = {
  email: "emsifa@gmail.com"
};

const [ passes, errors ] = await validate(inputs, {
  email: [required, isEmail, unique("users", "email")]
});

console.log({ passes, errors });
```

## Available Rules

#### `required`

Value under this field should not be `null`, `undefined`, or an empty string (`""`).

* Invalid values: `null`, `undefined`, `""`
* Valid values: `"0"`, `[]`, `{}`, `0`, etc.

> When you don't put `required` on a field, that field will be considered as optional field. Which means when it's value is `undefined`, `null`, or `""`, that field will be considered as valid without checking for next rules.

#### `endsWith(str: string)`

Value under this field must be a string that ends with given `str`.

Example:

```ts
const [ passes, errors ] = await validate({
  value1: null,
  value2: "barfoo",
  value3: "foobar"
}, {
  value1: endsWith("bar"), // invalid
  value2: endsWith("bar"), // invalid
  value3: endsWith("bar"), // valid
})
```

#### `fileExists(pathPrefix: string)`

Value under this field must be existed file.

For example you have file `/var/www/media/image.jpg` in your file system:

```ts
const [ passes, errors ] = await validate({
  file1: "image.jpg",
  file2: "image.jpg",
  file3: "not-image.txt"
}, {
  file1: fileExists("/var/www/media"), // << this will be fail because it check "/var/www/mediaimage.jpg"
  file2: fileExists("/var/www/media/"), // << this will be pass
  file3: fileExists("/var/www/media/"), // << this will be fail because it check "/var/www/media/not-image.txt" that is not exists
})
```

#### `isArray`

Value under this field must be an array.

* Invalid values: `""`, `10`, `0.5`, etc.
* Valid values: `[]`, `[1, 2, 3]`, `[{x: 10}, {x: 12}]`, etc.

#### `isBool`

Value under this field must be a boolean.

* Invalid values: `""`, `10`, `0.5`, etc.
* Valid values: `true` and `false`.

#### `isDate`

Value under this field must be a string that has length >= 10 and can be parsed by `Date.parse()`.

* Invalid values: `2020`, `"01-2020-10"`, `"2020-01"`, etc.
* Valid values: `"2020-01-02"`, `"2020-01-02 10:20:30"`, `"2020/01/02"`, etc.

#### `isEmail`

Value under this field must be valid email address.

* Invalid values: `"someone name"`, `123`, `foo.bar.baz`, `foo@bar@baz`, etc.
* Valid values: `"someone@mail.com"`, `"someone@mail.co.id"`, `"someone@[1.2.3.4]"`, etc.

#### `isFloat`

Value under this field must be a float number.

* Invalid values: `"0.1"`, `[]`, `0`, `1`, `123`, etc.
* Valid values: `0.1`, `1.2`, `12.345`, etc.

#### `isIn(allowedValues: PrimitiveTypes[])`

Value under this field must be one of allowed values.

Example:

```ts
const [ passes, errors ] = await validate({
  value1: "yes",
  value2: "no",
  value3: "maybe"
}, {
  value1: isIn(["yes", "no"]), // passes
  value2: isIn(["yes", "no"]), // passes
  value3: isIn(["yes", "no"]), // fail
})
```

#### `isInt`

Value under this field must be an integer.

* Invalid values: `0.5`, `"123"`, etc.
* Valid values: `0`, `123`, etc.

#### `isIPv4`

Value under this field must be valid IPv4.

* Invalid values: `"foo"`, `"a.b.c.d"`, `"1.2.3.256"`, `"1.02.3.4"`, etc.
* Valid values: `"0.0.0.0"`, `"1.2.3.4"`, `"255.255.255.255"`, etc.

#### `isNumber`

Value under this field must be a float or an integer.

* Invalid values: `"1"`, `"1.5"`, etc.
* Valid values: `1`, `1.5`, etc.

#### `isNumeric`

Same as `asNumber`, but it allows numeric string.

* Invalid values: `"1.0abc"`, `"x.1"`, etc.
* Valid values: `1`, `1.5`, `"2"`, `"2.5"`, etc.

#### `isString`

Value under this field must be a string.

* Invalid values: `1`, `1.5`, etc.
* Valid values: `"1"`, `"1.5"`, `"foo"`, etc.

#### `lengthBetween(minLength: number, maxLength: number)`

Value under this field must be a string that has char length between `minLength` and `maxLength`.

Example:

```ts
const [ passes, errors ] = await validate({
  value1: 'foo',
  value2: 'foobar',
  value3: 'fo',
  value4: 'foobars',
}, {
  value1: lengthBetween(3, 6), // passes
  value2: lengthBetween(3, 6), // passes
  value3: lengthBetween(3, 6), // fail
  value4: lengthBetween(3, 6), // fail
})
```

#### `match(regex: RegExp, trim: boolean = false)`

Value under this field must be a string that match with given `regex`.

```ts
const [ passes, errors ] = await validate({
  value1: 'foo$',
  value2: '$foo',
  value3: 'foo1',
  value4: 'foo2',
  value5: ' foo3',
  value6: ' foo4',
}, {
  value1: match(/^[a-z0-9]{4}$/), // fail
  value2: match(/^[a-z0-9]{4}$/), // fail
  value3: match(/^[a-z0-9]{4}$/), // passes
  value4: match(/^[a-z0-9]{4}$/), // passes
  value5: match(/^[a-z0-9]{4}$/), // fail
  value6: match(/^[a-z0-9]{4}$/, true), // passes after trim
})
```

#### `maxLength(minValue: number)`

Value under this field must be a string that has char length lower or equals `maxValue`.

Example:

```ts
const [ passes, errors ] = await validate({
  value1: 'foobarbaz',
  value2: 'foobar',
}, {
  value1: maxLength(6), // fail
  value2: maxLength(6), // passes
})
```

#### `maxNumber(maxValue: number)`

Value under this field should be a number that is not higher than `maxValue`.

Example:

```ts
const [ passes, errors ] = await validate({
  value1: 6,
  value2: 5.01,
  value3: 5,
  value4: 4
}, {
  value1: maxNumber(5), // fail
  value2: maxNumber(5), // fail
  value3: maxNumber(5), // passes
  value4: maxNumber(5), // passes
})
```

#### `minLength(minValue: number)`

Value under this field must be a string that has char length higher or equals `minValue`.

Example:

```ts
const [ passes, errors ] = await validate({
  value1: 'foo',
  value2: 'foobar',
}, {
  value1: minLength(6), // fail
  value2: minLength(6), // passes
})
```

#### `minNumber(minValue: number)`

Value under this field should be a number that is not lower than `minValue`.

Example:

```ts
const [ passes, errors ] = await validate({
  value1: 1,
  value2: 4.99,
  value3: 5,
  value4: 5.01,
}, {
  value1: minNumber(5), // fail
  value2: minNumber(5), // fail
  value3: minNumber(5), // passes
  value4: minNumber(5), // passes
})
```

#### `notIn(disallowedValues: PrimitiveTypes[])`

Value under this field must not be one of disallowed values.

Example:

```ts
const [ passes, errors ] = await validate({
  value1: "yes",
  value2: "no",
  value3: "maybe"
}, {
  value1: notIn(["yes", "no"]), // fail
  value2: notIn(["yes", "no"]), // fail
  value3: notIn(["yes", "no"]), // passes
})
```

#### `notNull`

Value under this field must not be `null`.

#### `nullable`

In case you need a `required` field that accept `null` value,
you can put `nullable` after `required` field. So when the value is `null`, validator will consider your value as valid without checking for next rules.

Example:

```ts
const [ passes, errors ] = await validate({
  value1: null,
  value2: null,
  value3: "3",
  value4: 4,
}, {
  value1: [required, isNumber],           // failed on required
  value2: [required, nullable, isNumber], // passes
  value3: [required, nullable, isNumber], // failed on isNumber
  value4: [required, nullable, isNumber], // passes
})
```

#### `numberBetween(minValue: number, maxValue: number)`

Value under this field must be a number between `minValue` and `maxValue`.

```ts
const [ passes, errors ] = await validate({
  value1: 5,
  value2: 10,
  value3: 4.99,
  value4: 10.01,
}, {
  value1: numberBetween(5, 10), // passes
  value2: numberBetween(5, 10), // passes
  value3: numberBetween(5, 10), // fail
  value4: numberBetween(5, 10), // fail
})
```

#### `requiredIf(field: string, fieldValue: any)`

Field within this rule will be required if given `field` match `fieldValue`.

```ts
const [ passes, errors ] = await validate({
  value1: null,
  value2: "2",
  value3: null,
  otherField: 1,
}, {
  value1: [requiredIf('otherField', 1), isNumber], // failed at required
  value2: [requiredIf('otherField', 1), isNumber], // failed at isNumber
  value3: [requiredIf('otherField', 0), isNumber], // passes because value3 becomes optional
})
```

#### `requiredUnless(field: string, fieldValue: any)`

Field within this rule will be required if given `field` doesn't match with `fieldValue`.

```ts
const [ passes, errors ] = await validate({
  value1: null,
  value2: "2",
  value3: null,
  otherField: 1,
}, {
  value1: [requiredUnless('otherField', 9), isNumber], // failed at required
  value2: [requiredUnless('otherField', 6), isNumber], // failed at isNumber
  value3: [requiredUnless('otherField', 1), isNumber], // passes because value3 becomes optional
})
```

#### `requiredWhen(callback: (value: any, utils: ValidationUtils) => boolean|Promise<boolean>)`

Field within this rule will be required if callback returns `true`.

```ts
const [ passes, errors ] = await validate({
  value1: null,
  value2: "2",
  value3: null,
  value4: null,
  otherField: 10,
}, {
  value1: [requiredWhen(() => true), isNumber], // failed at required
  value2: [requiredWhen(() => true), isNumber], // failed at isNumber
  value3: [requiredWhen(() => false), isNumber], // passes because value3 becomes optional
  value4: [
    requiredWhen((_, { getValue }): boolean => {
      const x = getValue('otherField');
      return typeof x !== "number" || x % 2 === 0;
    }),
    isNumber
  ], // this will fail because value4 is null and otherField|x is 10 where 10 % 2 === 0
})
```

#### `startsWith(str: string)`

Value under this field must be a string that starts with given `str`.

Example:

```ts
const [ passes, errors ] = await validate({
  value1: null,
  value2: "barfoo",
  value3: "foobar"
}, {
  value1: startsWith("foo"), // invalid
  value2: startsWith("foo"), // invalid
  value3: startsWith("foo"), // valid
})
```

## TODOS

* [ ] `isUrl` rule.
* [ ] `isIP` rule.
* [ ] `isIPv6` rule.
* [ ] add more examples to documentation.
