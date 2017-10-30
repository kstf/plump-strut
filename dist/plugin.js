"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compose(o, services, funs) {
    return function (initial) {
        if (initial === void 0) { initial = {}; }
        return funs
            .map(function (f) { return f(o, services); })
            .reduce(function (acc, v) { return v(acc); }, initial);
    };
}
function plugin(ctrl, routeOptions, services) {
    function p(server, _, next) {
        var routes = [];
        ctrl.attributes.forEach(function (action) {
            var o = Object.assign({}, routeOptions, {
                kind: 'attributes',
                action: action,
            });
            routes.push(compose(o, services, ctrl.generators)());
        });
        Object.keys(routeOptions.model.schema.relationships).forEach(function (relationship) {
            ctrl.relationships.forEach(function (action) {
                var o = Object.assign({}, routeOptions, {
                    kind: 'relationship',
                    action: action,
                    relationship: relationship,
                });
                routes.push(compose(o, services, ctrl.generators)());
            });
        });
        ctrl.other.forEach(function (action) {
            var o = Object.assign({}, routeOptions, {
                kind: 'other',
                action: action,
            });
            routes.push(compose(o, services, ctrl.generators)());
        });
        server.route(routes.filter(function (v) { return !!v; }));
        next();
    }
    p['attributes'] = Object.assign({}, {
        version: '1.0.0',
        name: routeOptions.model.type,
    });
    return p;
}
exports.plugin = plugin;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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dXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsLCBNb2RlbERhdGEsIE1vZGVsUmVmZXJlbmNlIH0gZnJvbSAncGx1bXAnO1xuaW1wb3J0ICogYXMgSGFwaSBmcm9tICdoYXBpJztcbmltcG9ydCB7XG4gIFRyYW5zZm9ybWVyLFxuICBSb3V0ZUdlbmVyYXRvcixcbiAgU2VnbWVudEdlbmVyYXRvcixcbiAgQmFzaWNSb3V0ZU9wdGlvbnMsXG4gIFN0cnV0Um91dGVDb25maWd1cmF0aW9uLFxuICBSb3V0ZU9wdGlvbnMsXG4gIFN0cnV0U2VydmljZXMsXG4gIFJvdXRlQ29udHJvbGxlcixcbn0gZnJvbSAnLi9kYXRhVHlwZXMnO1xuXG5mdW5jdGlvbiBjb21wb3NlKFxuICBvOiBSb3V0ZU9wdGlvbnMsXG4gIHNlcnZpY2VzOiBTdHJ1dFNlcnZpY2VzLFxuICBmdW5zOiBTZWdtZW50R2VuZXJhdG9yW11cbikge1xuICByZXR1cm4gKGluaXRpYWw6IFBhcnRpYWw8U3RydXRSb3V0ZUNvbmZpZ3VyYXRpb24+ID0ge30pID0+XG4gICAgZnVuc1xuICAgICAgLm1hcChmID0+IGYobywgc2VydmljZXMpKVxuICAgICAgLnJlZHVjZSgoYWNjLCB2KSA9PiB2KGFjYyksIGluaXRpYWwpIGFzIFN0cnV0Um91dGVDb25maWd1cmF0aW9uO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGx1Z2luKFxuICBjdHJsOiBSb3V0ZUNvbnRyb2xsZXIsXG4gIC8vIGdlbjogU2VnbWVudEdlbmVyYXRvcltdLFxuICByb3V0ZU9wdGlvbnM6IEJhc2ljUm91dGVPcHRpb25zLFxuICBzZXJ2aWNlczogU3RydXRTZXJ2aWNlc1xuKSB7XG4gIGZ1bmN0aW9uIHAoc2VydmVyOiBIYXBpLlNlcnZlciwgXywgbmV4dCkge1xuICAgIGNvbnN0IHJvdXRlczogSGFwaS5Sb3V0ZUNvbmZpZ3VyYXRpb25bXSA9IFtdO1xuICAgIGN0cmwuYXR0cmlidXRlcy5mb3JFYWNoKGFjdGlvbiA9PiB7XG4gICAgICBjb25zdCBvID0gT2JqZWN0LmFzc2lnbih7fSwgcm91dGVPcHRpb25zLCB7XG4gICAgICAgIGtpbmQ6ICdhdHRyaWJ1dGVzJyxcbiAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICB9KSBhcyBSb3V0ZU9wdGlvbnM7XG4gICAgICByb3V0ZXMucHVzaChjb21wb3NlKG8sIHNlcnZpY2VzLCBjdHJsLmdlbmVyYXRvcnMpKCkpO1xuICAgIH0pO1xuICAgIE9iamVjdC5rZXlzKFxuICAgICAgcm91dGVPcHRpb25zLm1vZGVsLnNjaGVtYS5yZWxhdGlvbnNoaXBzXG4gICAgKS5mb3JFYWNoKHJlbGF0aW9uc2hpcCA9PiB7XG4gICAgICBjdHJsLnJlbGF0aW9uc2hpcHMuZm9yRWFjaChhY3Rpb24gPT4ge1xuICAgICAgICBjb25zdCBvID0gT2JqZWN0LmFzc2lnbih7fSwgcm91dGVPcHRpb25zLCB7XG4gICAgICAgICAga2luZDogJ3JlbGF0aW9uc2hpcCcsXG4gICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgcmVsYXRpb25zaGlwOiByZWxhdGlvbnNoaXAsXG4gICAgICAgIH0pIGFzIFJvdXRlT3B0aW9ucztcbiAgICAgICAgcm91dGVzLnB1c2goY29tcG9zZShvLCBzZXJ2aWNlcywgY3RybC5nZW5lcmF0b3JzKSgpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGN0cmwub3RoZXIuZm9yRWFjaChhY3Rpb24gPT4ge1xuICAgICAgY29uc3QgbyA9IE9iamVjdC5hc3NpZ24oe30sIHJvdXRlT3B0aW9ucywge1xuICAgICAgICBraW5kOiAnb3RoZXInLFxuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgIH0pIGFzIFJvdXRlT3B0aW9ucztcbiAgICAgIHJvdXRlcy5wdXNoKGNvbXBvc2Uobywgc2VydmljZXMsIGN0cmwuZ2VuZXJhdG9ycykoKSk7XG4gICAgfSk7XG4gICAgc2VydmVyLnJvdXRlKHJvdXRlcy5maWx0ZXIodiA9PiAhIXYpKTtcbiAgICBuZXh0KCk7XG4gIH1cbiAgcFsnYXR0cmlidXRlcyddID0gT2JqZWN0LmFzc2lnbihcbiAgICB7fSxcbiAgICB7XG4gICAgICB2ZXJzaW9uOiAnMS4wLjAnLFxuICAgICAgbmFtZTogcm91dGVPcHRpb25zLm1vZGVsLnR5cGUsXG4gICAgfVxuICApO1xuICByZXR1cm4gcDtcbn1cbiJdfQ==
