import { createAPIClient, createAdminAPIClient } from "@contena/api-client";
import type { operations as adminOperations } from "@contena/api-client/admin-api-types";
import type { operations } from "@contena/api-client/api-types";

let adminApiClient: ReturnType<typeof createAdminAPIClient<adminOperations>>;
let storeApiClient: ReturnType<typeof createAPIClient<operations>>;

export function getAdminApiClient() {
  if (!adminApiClient) {
    // Support both password and client_credentials grant types
    const credentials: adminOperations["token post /oauth/token"]["body"] =
      process.env.CONTENA_ADMIN_CLIENT_SECRET
        ? {
            grant_type: "client_credentials",
            client_id: process.env.CONTENA_ADMIN_CLIENT_ID || "",
            client_secret: process.env.CONTENA_ADMIN_CLIENT_SECRET,
          }
        : {
            grant_type: "password",
            client_id: "administration",
            scope: "write",
            username: process.env.CONTENA_ADMIN_USERNAME || "",
            password: process.env.CONTENA_ADMIN_PASSWORD || "",
          };

    adminApiClient = createAdminAPIClient<adminOperations>({
      baseURL: `${process.env.OPENAPI_JSON_URL}/api`,
      credentials,
    });
  }
  return adminApiClient;
}

export function getStoreApiClient() {
  if (!storeApiClient) {
    storeApiClient = createAPIClient<operations>({
      baseURL: `${process.env.OPENAPI_JSON_URL}/store-api`,
      accessToken: process.env.OPENAPI_ACCESS_KEY,
    });
  }
  return storeApiClient;
}
