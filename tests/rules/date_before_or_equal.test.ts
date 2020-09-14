import type { Validity } from "../../src/types.ts";
import { dateBeforeOrEqual } from "../../src/rules/date_before_or_equal.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid, fakeUtils } from "../utils.ts";

Deno.test("rules.dateBeforeOrEqual() type check", () => {
  const date = new Date();
  assertInvalid(
    dateBeforeOrEqual(date)(5, fakeUtils) as Validity,
    invalid("dateBeforeOrEqual:typeCheck", { value: 5, date }),
  );
  assertInvalid(
    dateBeforeOrEqual(date)(null, fakeUtils) as Validity,
    invalid("dateBeforeOrEqual:typeCheck", { value: null, date }),
  );
  assertInvalid(
    dateBeforeOrEqual(date)(undefined, fakeUtils) as Validity,
    invalid("dateBeforeOrEqual:typeCheck", { value: undefined, date }),
  );
  assertInvalid(
    dateBeforeOrEqual(date)([], fakeUtils) as Validity,
    invalid("dateBeforeOrEqual:typeCheck", { value: [], date }),
  );
  assertInvalid(
    dateBeforeOrEqual(date)({}, fakeUtils) as Validity,
    invalid("dateBeforeOrEqual:typeCheck", { value: {}, date }),
  );
});

Deno.test("rules.dateBeforeOrEqual() length check", () => {
  const date = new Date();
  assertInvalid(
    dateBeforeOrEqual(date)("20201002", fakeUtils) as Validity,
    invalid("dateBeforeOrEqual:lengthCheck", { value: "20201002", date }),
  );
});

Deno.test("rules.dateBeforeOrEqual() date check", () => {
  const date = new Date("2020-01-02 10:20:30");

  // same date
  assertValid(dateBeforeOrEqual(date)("2020-01-02", fakeUtils) as Validity);
  assertValid(
    dateBeforeOrEqual(date)(new Date("2020-01-02"), fakeUtils) as Validity,
  );

  // date after
  assertInvalid(
    dateBeforeOrEqual(date)("2020-01-03", fakeUtils) as Validity,
    invalid("dateBeforeOrEqual", { value: "2020-01-03", date }),
  );
  assertInvalid(
    dateBeforeOrEqual(date)(new Date("2020-01-03"), fakeUtils) as Validity,
    invalid("dateBeforeOrEqual", { value: new Date("2020-01-03"), date }),
  );

  // date before
  assertValid(dateBeforeOrEqual(date)("2020-01-01", fakeUtils) as Validity);
  assertValid(
    dateBeforeOrEqual(date)(new Date("2020-01-01"), fakeUtils) as Validity,
  );
});
