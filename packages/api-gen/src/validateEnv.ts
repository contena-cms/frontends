/**
 * Validates that the required environment variables are set for admin API authentication.
 *
 * If `CONTENA_ADMIN_CLIENT_SECRET` or `CONTENA_ADMIN_CLIENT_ID` is present,
 * assumes client_credentials grant type and requires `CONTENA_ADMIN_CLIENT_SECRET`.
 *
 * Otherwise, assumes password grant type and requires `CONTENA_ADMIN_USERNAME`
 * and `CONTENA_ADMIN_PASSWORD`.
 *
 * @returns array of missing environment variable names
 */
export function validateAdminEnvVars(
  env: Record<string, string | undefined>,
): string[] {
  const hasClientSecret = !!env.CONTENA_ADMIN_CLIENT_SECRET?.trim();
  const hasClientId = !!env.CONTENA_ADMIN_CLIENT_ID?.trim();

  if (hasClientSecret || hasClientId) {
    // client_credentials flow — both CLIENT_ID and CLIENT_SECRET are required
    const missing: string[] = [];
    if (!hasClientId) {
      missing.push("CONTENA_ADMIN_CLIENT_ID");
    }
    if (!hasClientSecret) {
      missing.push("CONTENA_ADMIN_CLIENT_SECRET");
    }
    return missing;
  }

  // password flow — both username and password are required
  const missing: string[] = [];
  if (!env.CONTENA_ADMIN_USERNAME) {
    missing.push("CONTENA_ADMIN_USERNAME");
  }
  if (!env.CONTENA_ADMIN_PASSWORD) {
    missing.push("CONTENA_ADMIN_PASSWORD");
  }
  return missing;
}
