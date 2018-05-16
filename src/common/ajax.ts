import encode from "strict-uri-encode";
import sha256 from "sha256";
import { ajax, AjaxRequest } from "rxjs/ajax";

export interface Request {
  scheme: string;
  host: string;
  method: string;
  path: string;
  qs?: { [q: string]: string };
  headers?: { [key: string]: string };
  body?: string;
}

export function toRXAjax(r: Request): AjaxRequest {
  const qs = canonicalQueryString(r);
  return {
    url: `${r.scheme}://${r.host}${r.path}?${qs}`,
    body: r.body,
    method: r.method,
    headers: r.headers
  };
}
/*
 I don't know if this is the right thing to do - I'm only signing certain
 headers, because otherwise I couldn't include the signature within the
 header! Plus there are all sorts of headers added by proxies etc which we
 shouldn't consider. So instead I'm externally defining which headers are
 "important" - for now, just "host".

 N.B. This relies on both signer and verifier agreeing on this convention!
 */
const headersToInclude = ["host"];

// sort of based on https://docs.aws.amazon.com/general/latest/gr/sigv4-create-canonical-request.html
export function canonicalRequest(r: Request) {
  let canonical = [
    canonicalMethod(r),
    canonicalPath(r),
    canonicalQueryString(r),
    canonicalHeaders(r),
    signedHeaders(r),
    canonicalBody(r)
  ].join("\n");

  console.log("Canonical request:");
  console.log(canonical);
  console.log("End of canonical request");
  return canonical;
}

function canonicalMethod(r: Request) {
  return r.method.toUpperCase();
}

function canonicalPath(r: Request) {
  const newPath = r.path.replace(/\/+/, "/");
  return newPath;
}

function canonicalHeaders(r: Request) {
  if (r.headers == null) return "";
  const headers = r.headers;
  console.log("Canonical headers");
  console.log(headers);
  const keys = Object.keys(headers)
    .map(s => [
      // key
      s
        .trim()
        .replace(/\s+/, " ")
        .toLowerCase(),
      // value
      headers[s].trim().replace(/\s+/, " ")
    ])
    .filter(([h]) => headersToInclude.indexOf(h) >= 0);

  keys.sort(([k1], [k2]) => k1.localeCompare(k2));

  return keys.map(([k, v]) => {
    return `${k}:${v}\n`;
  });
}

function canonicalQueryString(r: Request) {
  if (r.qs == null) return "";
  const qs = r.qs;
  const keys = Object.keys(qs);
  keys.sort();
  return keys

    .map(k => {
      const key = encode(k),
        value = encode(qs[k]);
      return `${key}=${value}`;
    })
    .join("&");
}

function signedHeaders(r: Request) {
  if (r.headers == null) return "";
  return Object.keys(r.headers)
    .map(s =>
      s
        .trim()
        .replace(/\s+/, " ")
        .toLowerCase()
    )
    .filter(h => headersToInclude.indexOf(h) >= 0)
    .join(";");
}

function canonicalBody(r: Request) {
  return sha256(r.body || "");
}
