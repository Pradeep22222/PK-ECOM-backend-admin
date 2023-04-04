import AdminUserSchema from "./AdminUserSchema.js";

// insert user
export const insertAdminUser = obj => {
    return AdminUserSchema(obj).save()
}