/**
 * Source: https://github.com/contena/contena/blob/trunk/src/Core/PlatformRequest.php#L16
 */
type RequestHeaderName =
  | "ct-context-token"
  | "ct-access-key"
  | "ct-language-id"
  | "ct-currency-id"
  | "ct-inheritance"
  | "ct-version-id"
  | "ct-include-seo-urls"
  | "ct-skip-trigger-flow"
  | "ct-app-integration-id"
  | "indexing-behavior"
  | "indexing-skip";

type RequestHeader = "content-type" | "accept";

type LiteralUnion<T extends U, U = string> = T | (U & { _x?: never });

export type ClientHeaders = Partial<
  Record<LiteralUnion<RequestHeaderName | RequestHeader>, string>
>;

export type ClientHeadersProxy = ClientHeaders & {
  /**
   * Set default headers for the client.
   * Default headers are added to every request.
   * If the header value is falsy, it will be removed from the headers.
   *
   * @example
   * ```ts
   * apiClient.defaultHeaders.apply({
   *  "ct-language-id": "my-language-id",
   * });
   * ```
   */
  readonly apply: (headers: ClientHeaders) => void;
};

export function createHeaders(
  init: ClientHeaders,
  hookCallback?: (key: string, value?: string) => void,
): ClientHeadersProxy {
  const _headers: ClientHeaders = {
    "Content-Type": "application/json",
  };

  const handler: ProxyHandler<ClientHeadersProxy> = {
    get: (target: ClientHeaders, prop: string) => {
      if (prop === "apply") {
        return apply;
      }
      return Reflect.get(target, prop);
    },
    set: (target: ClientHeaders, prop: string, value: string) => {
      if (prop === "apply") {
        throw new Error("Cannot override apply method");
      }
      hookCallback?.(prop, value);
      return Reflect.set(target, prop, value);
    },
    deleteProperty: (target: ClientHeaders, prop: string) => {
      hookCallback?.(prop);
      return Reflect.deleteProperty(target, prop);
    },
  };

  const headersProxy = new Proxy<ClientHeadersProxy>(
    _headers as ClientHeadersProxy,
    handler,
  );
  function apply(headers: ClientHeaders) {
    for (const [key, value] of Object.entries(headers)) {
      if (value) {
        headersProxy[key] = value;
      } else {
        delete headersProxy[key];
      }
    }
  }
  headersProxy.apply({ ...init });

  return headersProxy;
}
