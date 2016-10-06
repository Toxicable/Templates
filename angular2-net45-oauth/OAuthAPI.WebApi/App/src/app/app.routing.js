/**
 * Created by Fabian on 26/09/2016.
 */
"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require("./home/home.component");
var not_found_component_1 = require("./not-found/not-found.component");
var appRoutes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    },
    {
        path: 'home',
        component: home_component_1.HomeComponent
    },
    {
        path: '**',
        component: not_found_component_1.NotFoundComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map