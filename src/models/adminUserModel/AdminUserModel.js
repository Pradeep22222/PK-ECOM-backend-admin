import AdminUserSchema from "./AdminUserSchema.js";

// insert user
export const insertAdminUser = obj => {
    return AdminUserSchema(obj).save()
}
// update  user
export const updateOneAdminUser = (filter, update) => {
    return AdminUserSchema.findOneAndUpdate(filter,update,{new:true})
}