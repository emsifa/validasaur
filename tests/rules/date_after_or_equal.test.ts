import { dateAfterOrEqual } from "../../src/rules/date_after_or_equal.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid, fakeUtils } from "../utils.ts";
import { Validity } from "../../src/types.ts";

Deno.test("rules.dateAfterOrEqual() type check", () => {
  const date = new Date();
  assertInvalid(
    dateAfterOrEqual(date)(5, fakeUtils) as Validity,
    invalid("dateAfterOrEqual:typeCheck", { value: 5, date }),
  );
  assertInvalid(
    dateAfterOrEqual(date)(null, fakeUtils) as Validity,
    invalid("dateAfterOrEqual:typeCheck", { value: null, date }),
  );
  assertInvalid(
    dateAfterOrEqual(date)(undefined, fakeUtils) as Validity,
    invalid("dateAfterOrEqual:typeCheck", { value: undefined, date }),
  );
  assertInvalid(
    dateAfterOrEqual(date)([], fakeUtils) as Validity,
    invalid("dateAfterOrEqual:typeCheck", { value: [], date }),
  );
  assertInvalid(
    dateAfterOrEqual(date)({}, fakeUtils) as Validity,
    invalid("dateAfterOrEqual:typeCheck", { value: {}, date }),
  );
});

Deno.test("rules.dateAfterOrEqual() length check", () => {
  const date = new Date();
  assertInvalid(
    dateAfterOrEqual(date)("20201002", fakeUtils) as Validity,
    invalid("dateAfterOrEqual:lengthCheck", { value: "20201002", date }),
  );
});

Deno.test("rules.dateAfterOrEqual() date check", () => {
  const date = new Date("2020-01-02 10:20:30");

  // same date
  assertValid(dateAfterOrEqual(date)("2020-01-02", fakeUtils) as Validity);
  assertValid(
    dateAfterOrEqual(date)(new Date("2020-01-02"), fakeUtils) as Validity,
  );

  // date before
  assertInvalid(
    dateAfterOrEqual(date)("2020-01-01", fakeUtils) as Validity,
    invalid("dateAfterOrEqual", { value: "2020-01-01", date }),
  );
  assertInvalid(
    dateAfterOrEqual(date)(new Date("2020-01-01"), fakeUtils) as Validity,
    invalid("dateAfterOrEqual", { value: new Date("2020-01-01"), date }),
  );

  // date After
  assertValid(dateAfterOrEqual(date)("2020-01-03", fakeUtils) as Validity);
  assertValid(
    dateAfterOrEqual(date)(new Date("2020-01-03"), fakeUtils) as Validity,
  );
});
