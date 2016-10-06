"use strict";
/**
 * Created by Fabian on 24/09/2016.
 */
require('core-js/es6');
require('core-js/es7/reflect');
//import 'reflect-metadata';
require('zone.js/dist/zone');
if (process.env.ENV === 'production') {
}
else {
    require('zone.js/dist/long-stack-trace-zone');
    Error['stackTraceLimit'] = Infinity;
}
//# sourceMappingURL=polyfills.js.map