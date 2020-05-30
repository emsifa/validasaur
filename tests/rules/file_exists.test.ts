import { fileExists } from "../../src/rules/file_exists.ts";
import { invalid } from "../../src/utils.ts";
import { assertInvalid, assertValid } from "../utils.ts";
import { RuleReturn } from "../../src/types.ts";

Deno.test("rules.fileExists('')(123) should be invalid", async () => {
  assertInvalid(
    await fileExists("")(123),
    invalid("fileExists:stringCheck", { value: 123, pathPrefix: "" }),
  );
});

Deno.test("rules.fileExists('')('foobar.md') should be invalid", async () => {
  assertInvalid(
    await fileExists("")("foobar.md"),
    invalid("fileExists:pathCheck", { value: "foobar.md", pathPrefix: "" }),
  );
});

Deno.test("rules.fileExists('src')('mod.ts') should be invalid", async () => {
  assertInvalid(
    await fileExists("src")("mod.ts"),
    invalid("fileExists:pathCheck", { value: "mod.ts", pathPrefix: "src" }),
  );
});

Deno.test("rules.fileExists('')('README.md') should be valid", async () => {
  assertValid(await fileExists("")("README.md"));
});

Deno.test("rules.fileExists('src/')('mod.ts') should be valid", async () => {
  assertValid(await fileExists("src/")("mod.ts"));
});
