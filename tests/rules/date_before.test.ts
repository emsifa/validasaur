import type { Validity } from "../../src/types.ts";
import { dateBefore } from "../../src/rules/date_before.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid, fakeUtils } from "../utils.ts";

Deno.test("rules.dateBefore() type check", () => {
  const date = new Date();
  assertInvalid(
    dateBefore(date)(5, fakeUtils) as Validity,
    invalid("dateBefore:typeCheck", { value: 5, date }),
  );
  assertInvalid(
    dateBefore(date)(null, fakeUtils) as Validity,
    invalid("dateBefore:typeCheck", { value: null, date }),
  );
  assertInvalid(
    dateBefore(date)(undefined, fakeUtils) as Validity,
    invalid("dateBefore:typeCheck", { value: undefined, date }),
  );
  assertInvalid(
    dateBefore(date)([], fakeUtils) as Validity,
    invalid("dateBefore:typeCheck", { value: [], date }),
  );
  assertInvalid(
    dateBefore(date)({}, fakeUtils) as Validity,
    invalid("dateBefore:typeCheck", { value: {}, date }),
  );
});

Deno.test("rules.dateBefore() length check", () => {
  const date = new Date();
  assertInvalid(
    dateBefore(date)("20201002", fakeUtils) as Validity,
    invalid("dateBefore:lengthCheck", { value: "20201002", date }),
  );
});

Deno.test("rules.dateBefore() date check", () => {
  const date = new Date("2020-01-02 10:20:30");

  // same date
  assertInvalid(
    dateBefore(date)("2020-01-02", fakeUtils) as Validity,
    invalid("dateBefore", { value: "2020-01-02", date }),
  );
  assertInvalid(
    dateBefore(date)(new Date("2020-01-02"), fakeUtils) as Validity,
    invalid("dateBefore", { value: new Date("2020-01-02"), date }),
  );

  // date after
  assertInvalid(
    dateBefore(date)("2020-01-03", fakeUtils) as Validity,
    invalid("dateBefore", { value: "2020-01-03", date }),
  );
  assertInvalid(
    dateBefore(date)(new Date("2020-01-03"), fakeUtils) as Validity,
    invalid("dateBefore", { value: new Date("2020-01-03"), date }),
  );

  // date before
  assertValid(dateBefore(date)("2020-01-01", fakeUtils) as Validity);
  assertValid(dateBefore(date)(new Date("2020-01-01"), fakeUtils) as Validity);
});
