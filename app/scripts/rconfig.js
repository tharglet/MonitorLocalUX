requirejs.config({
  paths: {
    globals: "../globals",
    angular: "../../bower_components/angular/angular",
    "angular-animate": "../../bower_components/angular-animate/angular-animate",
    "angular-aria": "../../bower_components/angular-aria/angular-aria",
    "angular-couch-potato": "../../bower_components/angular-couch-potato/dist/angular-couch-potato",
    "angular-mocks": "../../bower_components/angular-mocks/angular-mocks",
    "angular-resource": "../../bower_components/angular-resource/angular-resource",
    "angular-ui-router": "../../bower_components/angular-ui-router/release/angular-ui-router",
    satellizer: "../../bower_components/satellizer/satellizer"
  },
  baseUrl: "components",
  packages: [
    "app",
    "search",
    "academic-output",
    "auth",
    "monitor-user-services"
  ],
  shim: {
    "angular-animate": {
      deps: [
        "angular"
      ]
    },
    "angular-aria": {
      deps: [
        "angular"
      ]
    },
    "angular-mocks": {
      deps: [
        "angular"
      ]
    },
    "angular-resource": {
      deps: [
        "angular"
      ]
    },
    "angular-ui-router": {
      deps: [
        "angular"
      ]
    },
    "satellizer": {
      deps: [
        "angular"
      ]
    },
    "angular-couch-potato": {
      deps: [
        "angular"
      ]
    }
  }
});
