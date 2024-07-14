export const oktaConfig = {
    clientId: `0oagbcpjue6eRxlmW5d7`,
    issuer: `https://dev-32715123.okta.com/oauth2/default`,
    redirectUri: `https://localhost:3000/login/callback`,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true
}