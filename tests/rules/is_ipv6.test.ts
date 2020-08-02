import { isIPv6 } from "../../src/rules/is_ipv6.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";

Deno.test("rules.isIPv6 with invalid values", () => {
  const invalidValues = [
    null,
    123,
    "2001:af40:::",
    "2001:af40:::1234",
    "2001::af40::1234",
    "1080:0:0:0:8:800:200C:417G",
  ];

  for (const value of invalidValues) {
    assertInvalid(
      isIPv6(value),
      invalid("isIPv6", { value }),
      `${value} should be invalid ipv6`,
    );
  }
});

Deno.test("rules.isIPv6 with valid values", () => {
  const validValues = [
    "2001:db8::7",
    "FEDC:BA98:7654:3210:FEDC:BA98:7654:3210",
    "FEDC:BA98:7654:3210:FEDC:BA98:7654:3210",
    "1080:0:0:0:8:800:200C:417A",
    "::1:2:3:4:5:6:7",
    "::1:2:3:4:5:6",
    "1::1:2:3:4:5:6",
    "::1:2:3:4:5",
    "1::1:2:3:4:5",
    "2:1::1:2:3:4:5",
    "::1:2:3:4",
    "1::1:2:3:4",
    "2:1::1:2:3:4",
    "3:2:1::1:2:3:4",
    "::1:2:3",
    "1::1:2:3",
    "2:1::1:2:3",
    "3:2:1::1:2:3",
    "4:3:2:1::1:2:3",
    "::1:2",
    "1::1:2",
    "2:1::1:2",
    "3:2:1::1:2",
    "4:3:2:1::1:2",
    "5:4:3:2:1::1:2",
    "::1",
    "1::1",
    "2:1::1",
    "3:2:1::1",
    "4:3:2:1::1",
    "5:4:3:2:1::1",
    "6:5:4:3:2:1::1",
    "::",
    "1::",
    "2:1::",
    "3:2:1::",
    "4:3:2:1::",
    "5:4:3:2:1::",
    "6:5:4:3:2:1::",
    "7:6:5:4:3:2:1::",
  ];

  for (const value of validValues) {
    assertValid(isIPv6(value), `${value} should be valid ipv6`);
  }
});
