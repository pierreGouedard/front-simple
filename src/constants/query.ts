import { AUTH_URL } from "./global"


// Error codes
export const codeMessageMap = new Map<number, string>([
    [200, "The server successfully returned the requested data."],
    [201, "New or modified data is successful."],
    [202, "A request has entered the background queue (asynchronous task)."],
    [204, "The data was deleted successfully."],
    [400, "The request was made with an error and the server did not perform any new or modified data operations."],
    [401, "User does not have permission (token, username, password is incorrect)."],
    [403, "The user is authorized, but access is forbidden."],
    [404, "The request is made for a record that does not exist and the server does not operate."],
    [406, "The format of the request is not available."],
    [410, "The requested resource is permanently deleted and will not be retrieved."],
    [422, "A validation error occurred when creating an object."],
    [500, "An error occurred on the server. Please check the server."],
    [502, "Gateway error."],
    [503, "The service is unavailable and the server is temporarily overloaded or maintained."],
    [504, "The gateway timed out."]
]);

// Auth urls
export const signaturePasswordUrl: string = AUTH_URL + 'users/generate_password_signature'
export const resetPasswordUrl: string = AUTH_URL + 'users/reset_password'
export const selfUrl: string = AUTH_URL + 'users/self'
export const tokenRefreshUrl: string = AUTH_URL + 'refresh'
export const loginUrl: string = AUTH_URL + 'login'
export const refreshLogoutUrl: string = AUTH_URL + 'refresh/logout'
export const accessLogoutUrl: string = AUTH_URL + 'access/logout'
export const refreshVerifyUrl: string = AUTH_URL + 'refresh/verify'
export const accessVerifyUrl: string = AUTH_URL + 'access/verify'

// Roles urls


// Other urls