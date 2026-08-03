#!/bin/sh
if [ -n "$ASGARDEO_CLIENT_ID" ]; then
cat <<EOF > /app/dist/config.js
window.configs = {
  IDP_CLIENT_ID: "${ASGARDEO_CLIENT_ID}",
  IDP_BASE_URL: "${ASGARDEO_BASE_URL}",
  SIGN_IN_REDIRECT_URL: "${SIGN_IN_REDIRECT_URL}",
  SIGN_OUT_REDIRECT_URL: "${SIGN_OUT_REDIRECT_URL}",
  API_BASE_URL: "${API_BASE_URL}"
};
EOF
fi
exec serve -s dist -l 8080
