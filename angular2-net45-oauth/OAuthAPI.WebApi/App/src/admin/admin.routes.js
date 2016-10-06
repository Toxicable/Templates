"use strict";
var router_1 = require("@angular/router");
var admin_component_1 = require("./admin.component");
var roles_component_1 = require("./roles/roles.component");
var users_component_1 = require("./users/users.component");
/**
 * Created by Fabian on 6/10/2016.
 */
var adminRoutes = [
    {
        path: 'admin',
        component: admin_component_1.AdminComponent,
        children: [
            {
                path: '',
                component: roles_component_1.RolesComponent
            },
            {
                path: 'roles',
                component: roles_component_1.RolesComponent
            },
            {
                path: 'users',
                component: users_component_1.UsersComponent
            }
        ]
    }
];
exports.adminRouting = router_1.RouterModule.forChild(adminRoutes);
//# sourceMappingURL=admin.routes.js.map