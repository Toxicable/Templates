"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('./login/login.component');
var register_component_1 = require("./register/register.component");
var auth_component_1 = require("./auth.component");
var authRoutes = [
    {
        path: 'auth',
        component: auth_component_1.AuthComponent,
        children: [
            {
                path: '',
                component: login_component_1.LoginComponent
            },
            {
                path: 'login',
                component: login_component_1.LoginComponent
            },
            {
                path: 'register',
                component: register_component_1.RegisterComponent
            }
        ]
    }
];
exports.authRouting = router_1.RouterModule.forChild(authRoutes);
//# sourceMappingURL=auth.routing.js.map