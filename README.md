![Validasaur](https://raw.githubusercontent.com/emsifa/validasaur/master/validasaur.svg)

Validasaur is Deno validation library slightly inspired by Laravel Validation.

## Examples

#### Basic Usage

For example, let's write our `example.ts` like this:

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

Then, run code above with:

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

If you want a simpler error messages,
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

// Show the differents
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
