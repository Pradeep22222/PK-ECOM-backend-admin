# API server for the ecommerce admin cms

Here is the repo for the frontend app .........
about the project: ................

## APIs

All the endpoints will follow the folowing patterns `{rootUrl}/api/v1`

### admin user api

This api endpoint is responsible for handling all the admin user related request.

All the admin api endpoints will follow the following patterns `{rooturl}/api/v1/admin-user/`
| # | PATH | METHOD | PRIVATE | DESCRIPTION |
| -- | -- | -- | -- | -- |
|1.|`/`|POST|No|- Receives new admin data and create new admin in our database. IF admin user's email already exist, it will return error otherwise it will return success with info from database.|
|2.|`verify-email`|PATCH|NO|receives `email, verification code`  to verify newly created user account, return success or error accordingly.|
/
|3.|`/login`|POST|NO|Receives `email, password` and checks if the user exist for that combination in our database, if it does, it will handle all the login process.|
  -
