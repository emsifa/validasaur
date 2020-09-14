import type { Validity } from "../../src/types.ts";
import { dateBetween } from "../../src/rules/date_between.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid, fakeUtils } from "../utils.ts";

Deno.test("rules.dateBetween() type check", () => {
  const minDate = new Date("2020-01-02");
  const maxDate = new Date("2020-01-09");
  assertInvalid(
    dateBetween(minDate, maxDate)(5, fakeUtils) as Validity,
    invalid("dateBetween:typeCheck", { value: 5, minDate, maxDate }),
  );
  assertInvalid(
    dateBetween(minDate, maxDate)(null, fakeUtils) as Validity,
    invalid("dateBetween:typeCheck", { value: null, minDate, maxDate }),
  );
  assertInvalid(
    dateBetween(minDate, maxDate)(undefined, fakeUtils) as Validity,
    invalid("dateBetween:typeCheck", { value: undefined, minDate, maxDate }),
  );
  assertInvalid(
    dateBetween(minDate, maxDate)([], fakeUtils) as Validity,
    invalid("dateBetween:typeCheck", { value: [], minDate, maxDate }),
  );
  assertInvalid(
    dateBetween(minDate, maxDate)({}, fakeUtils) as Validity,
    invalid("dateBetween:typeCheck", { value: {}, minDate, maxDate }),
  );
});

Deno.test("rules.dateBetween() length check", () => {
  const minDate = new Date("2020-01-02");
  const maxDate = new Date("2020-01-09");
  assertInvalid(
    dateBetween(minDate, maxDate)("20201002", fakeUtils) as Validity,
    invalid("dateBetween:lengthCheck", { value: "20201002", minDate, maxDate }),
  );
});

Deno.test("rules.dateBetween() date check", () => {
  const minDate = new Date("2020-01-02");
  const maxDate = new Date("2020-01-09");

  // date min
  assertValid(
    dateBetween(minDate, maxDate)("2020-01-02", fakeUtils) as Validity,
  );
  assertValid(
    dateBetween(minDate, maxDate)(
      new Date("2020-01-02"),
      fakeUtils,
    ) as Validity,
  );
  // date max
  assertValid(
    dateBetween(minDate, maxDate)("2020-01-09", fakeUtils) as Validity,
  );
  assertValid(
    dateBetween(minDate, maxDate)(
      new Date("2020-01-09"),
      fakeUtils,
    ) as Validity,
  );

  // below date min
  assertInvalid(
    dateBetween(minDate, maxDate)("2020-01-01", fakeUtils) as Validity,
    invalid("dateBetween", { value: "2020-01-01", minDate, maxDate }),
  );
  assertInvalid(
    dateBetween(minDate, maxDate)(
      new Date("2020-01-01"),
      fakeUtils,
    ) as Validity,
    invalid("dateBetween", { value: new Date("2020-01-01"), minDate, maxDate }),
  );

  // above date max
  assertInvalid(
    dateBetween(minDate, maxDate)("2020-01-10", fakeUtils) as Validity,
    invalid("dateBetween", { value: "2020-01-10", minDate, maxDate }),
  );
  assertInvalid(
    dateBetween(minDate, maxDate)(
      new Date("2020-01-10"),
      fakeUtils,
    ) as Validity,
    invalid("dateBetween", { value: new Date("2020-01-10"), minDate, maxDate }),
  );

  // date between
  assertValid(
    dateBetween(minDate, maxDate)("2020-01-07", fakeUtils) as Validity,
  );
  assertValid(
    dateBetween(minDate, maxDate)(
      new Date("2020-01-07"),
      fakeUtils,
    ) as Validity,
  );
});
