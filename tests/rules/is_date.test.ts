import { isDate } from "../../src/rules/is_date.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";

Deno.test("rules.isDate(null) should be invalid", () => {
  assertInvalid(isDate(null), invalid("isDate:typeCheck", { value: null }));
});

Deno.test("rules.isDate(undefined) should be invalid", () => {
  assertInvalid(
    isDate(undefined),
    invalid("isDate:typeCheck", { value: undefined }),
  );
});

Deno.test("rules.isDate('') should be invalid", () => {
  assertInvalid(isDate(""), invalid("isDate:lengthCheck", { value: "" }));
});

Deno.test("rules.isDate(2020) should be invalid", () => {
  assertInvalid(isDate(2020), invalid("isDate:typeCheck", { value: 2020 }));
});

Deno.test("rules.isDate('2020-01') should be invalid", () => {
  assertInvalid(
    isDate("2020-01"),
    invalid("isDate:lengthCheck", { value: "2020-01" }),
  );
});

Deno.test("rules.isDate('2020-01-02') should be valid", () => {
  assertValid(isDate("2020-01-02"));
});

Deno.test("rules.isDate('2020-01-02 10:20:30') should be valid", () => {
  assertValid(isDate("2020-01-02 10:20:30"));
});
