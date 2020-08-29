import { dateAfter } from "../../src/rules/date_After.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid, fakeUtils } from "../utils.ts";
import { Validity } from "../../src/types.ts";

Deno.test("rules.dateAfter() type check", () => {
  const date = new Date();
  assertInvalid(
    dateAfter(date)(5, fakeUtils) as Validity,
    invalid("dateAfter:typeCheck", { value: 5, date })
  );
  assertInvalid(
    dateAfter(date)(null, fakeUtils) as Validity,
    invalid("dateAfter:typeCheck", { value: null, date })
  );
  assertInvalid(
    dateAfter(date)(undefined, fakeUtils) as Validity,
    invalid("dateAfter:typeCheck", { value: undefined, date })
  );
  assertInvalid(
    dateAfter(date)([], fakeUtils) as Validity,
    invalid("dateAfter:typeCheck", { value: [], date })
  );
  assertInvalid(
    dateAfter(date)({}, fakeUtils) as Validity,
    invalid("dateAfter:typeCheck", { value: {}, date })
  );
});

Deno.test("rules.dateAfter() length check", () => {
  const date = new Date();
  assertInvalid(
    dateAfter(date)("20201002", fakeUtils) as Validity,
    invalid("dateAfter:lengthCheck", { value: "20201002", date })
  );
});

Deno.test("rules.dateAfter() date check", () => {
  const date = new Date("2020-01-02 10:20:30");

  // same date
  assertInvalid(
    dateAfter(date)("2020-01-02", fakeUtils) as Validity,
    invalid("dateAfter", { value: "2020-01-02", date })
  );
  assertInvalid(
    dateAfter(date)(new Date("2020-01-02"), fakeUtils) as Validity,
    invalid("dateAfter", { value: new Date("2020-01-02"), date })
  );

  // date before
  assertInvalid(
    dateAfter(date)("2020-01-01", fakeUtils) as Validity,
    invalid("dateAfter", { value: "2020-01-01", date })
  );
  assertInvalid(
    dateAfter(date)(new Date("2020-01-01"), fakeUtils) as Validity,
    invalid("dateAfter", { value: new Date("2020-01-01"), date })
  );

  // date After
  assertValid(dateAfter(date)("2020-01-03", fakeUtils) as Validity);
  assertValid(dateAfter(date)(new Date("2020-01-03"), fakeUtils) as Validity);
});
