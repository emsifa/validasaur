import { either } from "../../src/rules/either.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid, fakeUtils } from "../utils.ts";
import { isString, isInt } from "../../src/rules.ts";

Deno.test("rules.either with invalid values", async () => {
  const invalidValues = [
    [],
    {},
    1.24,
  ];

  for (const value of invalidValues) {
    assertInvalid(
      await either([isString, isInt])(value, fakeUtils),
      invalid("either", { value }),
      `${value} is not either string or number`,
    );
  }
});

Deno.test("rules.either with valid values", async () => {
  const validValues = [
    1,
    "2",
    3,
    "lorem",
    "ipsum",
    5,
    6,
    7,
    "eight",
    "nine",
    "ten",
  ];

  for (const value of validValues) {
    assertValid(
      await either([isString, isInt])(value, fakeUtils),
      `${value} is either string or number`,
    );
  }
});


Deno.test("rules.either with invalid values and custom errorCode", async () => {
  const invalidValues = [
    [],
    {},
    1.24,
  ];

  for (const value of invalidValues) {
    assertInvalid(
      await either([isString, isInt], "stringOrInt")(value, fakeUtils),
      invalid("stringOrInt", { value }),
      `${value} is not either string or number`,
    );
  }
});
