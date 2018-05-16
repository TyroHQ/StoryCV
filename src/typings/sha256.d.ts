declare module "sha256" {
  interface sha256 {
    (input: string, opts?: { asBytes?: boolean; asString?: boolean }): string;
    x2: (
      input: string,
      opts?: { asBytes?: boolean; asString?: boolean }
    ) => string;
  }
  const sha256: sha256;
  export default sha256;
}
