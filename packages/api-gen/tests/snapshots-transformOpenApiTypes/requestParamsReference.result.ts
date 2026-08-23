/**
 * This file is auto-generated. Do not make direct changes to the file.
 * Instead override it in your contena.d.ts file.
 *
 * Contena API version: 0.0.0
 *
 */
export type components = {
  schemas: Schemas;
  parameters: {
    accept: string;
    contentType: string;
    criteriaIds: string[];
  };
};
export type Schemas = {};
export type operations = {
  "myRequestWithParams post /customer/wishlist/{productId}": {
    contentType?: "application/json";
    accept?: "application/json";
    query?: {
      /** A list of product identifiers. */
      ids?: components["parameters"]["criteriaIds"];
    };
    response: {
      success: boolean;
    };
    responseCode: 200;
  };
};
