import { fileExists } from "../../src/rules/file_exists.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";
import { RuleReturn } from "../../src/types.ts";

Deno.test("fileExists('')('foobar.md') should be invalid", async () => {
  assertInvalid(
    await fileExists("")("foobar.md"),
    invalid("fileExists", { value: "foobar.md", pathPrefix: "" }),
  );
});

Deno.test("fileExists('src')('mod.ts') should be invalid", async () => {
  assertInvalid(
    await fileExists("src")("mod.ts"),
    invalid("fileExists", { value: "mod.ts", pathPrefix: "src" }),
  );
});

Deno.test("fileExists('')('README.md') should be valid", async () => {
  assertValid(await fileExists("")("README.md"));
});

Deno.test("fileExists('src/')('mod.ts') should be valid", async () => {
  assertValid(await fileExists("src/")("mod.ts"));
});
