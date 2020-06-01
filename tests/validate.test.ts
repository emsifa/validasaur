import { validate, validateData, validateValue } from "../src/validate.ts";
import { assertEquals } from "./deps.ts";
import {
  required,
  isInt,
  isNumber,
  isString,
  validateArray,
  validateObject,
  nullable,
} from "../src/rules.ts";
import {
  InputData,
  ValidationRules,
  ValidationMessages,
  ValidationErrors,
} from "../src/interfaces.ts";
import { invalid } from "../src/utils.ts";

const advancedExample = (): {
  input: InputData;
  rules: ValidationRules;
  messages: ValidationMessages;
} => {
  return {
    input: {
      invalidOnRequired: null,
      invalidOnNumber: "2",
      multipleRuleFails: "10",
      arrayFailAtRequired: null,
      arrayFailAtIndex1And3: [0, "1", 2, 3.5],
      objectFailAtX: { x: null, y: 12 },
      objectFailAtY: { x: 10, y: "12" },
      optionalArrayPasses: null,
      optionalObjectPasses: null,
      nestedObjectFailAtFooBarBaz: {
        foo: {
          a: 10,
          b: "thing",
          c: { c1: 1, c2: 2 },
          bar: {
            d: 11,
            baz: null,
          },
        },
      },
    },
    rules: {
      invalidOnRequired: [required, isNumber],
      invalidOnNumber: [required, isNumber],
      multipleRuleFails: [required, isNumber, isInt],
      arrayFailAtRequired: validateArray(true, [isNumber, isInt]),
      arrayFailAtIndex1And3: validateArray(true, [isNumber, isInt]),
      objectFailAtX: validateObject(true, {
        x: [required, isNumber],
        y: [required, isNumber],
      }),
      objectFailAtY: validateObject(true, {
        x: [required, isNumber],
        y: [required, isNumber],
      }),
      optionalArrayPasses: validateArray(false, [isNumber]),
      optionalObjectPasses: validateObject(false, {
        x: [required, isNumber],
        y: [required, isNumber],
      }),
      nestedObjectFailAtFooBarBaz: validateObject(true, {
        foo: validateObject(true, {
          bar: validateObject(true, {
            baz: required,
          }),
        }),
      }),
    },
    messages: {
      "default": ":value is invalid",
    },
  };
};

Deno.test("validateValue() on empty value with non-required rules should be passes", async () => {
  const errs = await validateValue(null, [isString, isNumber, isInt]);
  assertEquals(errs.length, 0);
});

Deno.test("validateValue() on null value with nullable rules should be passes", async () => {
  const errs = await validateValue(
    null,
    [required, nullable, isString, isNumber, isInt],
  );
  assertEquals(errs.length, 0);
});

Deno.test("validateValue() on empty value with required rules should be error", async () => {
  const errs = await validateValue(null, [required, isString, isNumber, isInt]);
  assertEquals(errs.length, 1);
});

Deno.test("validateValue() on implicit rule should returns only 1 error message", async () => {
  const errs = await validateValue(null, [required, isNumber, isInt]);
  assertEquals(errs.length, 1);
  assertEquals(errs[0].rule, "required");
});

Deno.test("validateValue() on non-implicit rule should returns all error message", async () => {
  const errs = await validateValue("text", [isString, isNumber, isInt]);
  assertEquals(errs.length, 2);
  assertEquals(errs[0].rule, "isNumber");
  assertEquals(errs[1].rule, "isInt");
});

Deno.test("validateData() advanced example should return as expected", async () => {
  const { input, rules } = advancedExample();
  const errors = await validateData(input, rules);
  const expected = {
    invalidOnRequired: [invalid("required", { value: null }, true)],
    invalidOnNumber: [invalid("isNumber", { value: "2" }, false)],
    multipleRuleFails: [
      invalid("isNumber", { value: "10" }, false),
      invalid("isInt", { value: "10" }, false),
    ],
    arrayFailAtRequired: [invalid("required", { value: null }, true)],
    arrayFailAtIndex1And3: [invalid("validateArray", {
      value: [0, "1", 2, 3.5],
      errors: {
        "1": [
          invalid("isNumber", { value: "1" }, false),
          invalid("isInt", { value: "1" }, false),
        ],
        "3": [invalid("isInt", { value: 3.5 }, false)],
      },
    }, true)],
    objectFailAtX: [invalid("validateObject", {
      value: { x: null, y: 12 },
      errors: {
        "x": [invalid("required", { value: null }, true)],
      },
    }, true)],
    objectFailAtY: [invalid("validateObject", {
      value: { x: 10, y: "12" },
      errors: {
        "y": [invalid("isNumber", { value: "12" }, false)],
      },
    }, true)],
    nestedObjectFailAtFooBarBaz: [invalid("validateObject", {
      value: {
        foo: {
          a: 10,
          b: "thing",
          c: { c1: 1, c2: 2 },
          bar: {
            d: 11,
            baz: null,
          },
        },
      },
      errors: {
        "foo": [invalid("validateObject", {
          value: {
            a: 10,
            b: "thing",
            c: { c1: 1, c2: 2 },
            bar: {
              d: 11,
              baz: null,
            },
          },
          errors: {
            "bar": [invalid("validateObject", {
              value: {
                d: 11,
                baz: null,
              },
              errors: {
                "baz": [invalid("required", { value: null }, true)],
              },
            }, true)],
          },
        }, true)],
      },
    }, true)],
  };

  // Deno.writeTextFileSync("_errors.json", JSON.stringify(errors, null, 4));
  assertEquals(errors, expected);
});

Deno.test("validate() advanced example should return as expected", async () => {
  const { input, rules, messages } = advancedExample();
  const [passes, errors] = await validate(input, rules, { messages });
  assertEquals(passes, false);

  const expected: ValidationErrors = {
    invalidOnRequired: { required: "null is invalid" },
    invalidOnNumber: { isNumber: "2 is invalid" },
    multipleRuleFails: {
      isNumber: "10 is invalid",
      isInt: "10 is invalid",
    },
    arrayFailAtRequired: {
      required: "null is invalid",
    },
    arrayFailAtIndex1And3: {
      "validateArray": {
        "1": {
          isNumber: "1 is invalid",
          isInt: "1 is invalid",
        },
        "3": {
          isInt: "3.5 is invalid",
        },
      },
    },
    objectFailAtX: {
      validateObject: {
        x: {
          required: "null is invalid",
        },
      },
    },
    objectFailAtY: {
      validateObject: {
        y: {
          isNumber: "12 is invalid",
        },
      },
    },
    nestedObjectFailAtFooBarBaz: {
      validateObject: {
        foo: {
          validateObject: {
            bar: {
              validateObject: {
                baz: {
                  required: "null is invalid",
                },
              },
            },
          },
        },
      },
    },
  };

  // Deno.writeTextFileSync("_errors.json", JSON.stringify(errors, null, 4));
  assertEquals(errors, expected);
});
