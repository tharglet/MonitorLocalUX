requirejs.config({
  paths: {
    globals: "../globals",
    angular: "../bower_components/angular/angular",
    "angular-animate": "../bower_components/angular-animate/angular-animate",
    "angular-aria": "../bower_components/angular-aria/angular-aria",
    "angular-couch-potato": "../bower_components/angular-couch-potato/dist/angular-couch-potato",
    "angular-mocks": "../bower_components/angular-mocks/angular-mocks",
    "angular-resource": "../bower_components/angular-resource/angular-resource",
    "angular-ui-router": "../bower_components/angular-ui-router/release/angular-ui-router",
    satellizer: "../bower_components/satellizer/satellizer",
    html5shiv: "../bower_components/html5shiv/dist/html5shiv",
    "jisc-patterns-head": "https://ux.jisc.ac.uk/1.2.0/js/ux.jisc-1.2.0.script-head.min",
    "jisc-patterns-foot": "https://ux.jisc.ac.uk/1.2.0/js/ux.jisc-1.2.0.script-foot.min",
    jquery: "../bower_components/jquery/dist/jquery",
    "jquery-touchswipe": "../bower_components/jquery-touchswipe/jquery.touchSwipe",
    "bootstrap-js": "../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.min",
    "deep-diff": "../bower_components/deep-diff/index",
    "datatables.net": "../bower_components/datatables.net/js/jquery.dataTables",
    "datatables.net-bs": "../bower_components/datatables.net-bs/js/dataTables.bootstrap",
    ngRAMLResources: "../globals/ngRAMLResources",
    "raml-parser": "../bower_components/raml-parser/dist/*",
    "responsive-bootstrap-toolkit": "../bower_components/responsive-bootstrap-toolkit/dist/bootstrap-toolkit",
    "angular-ui-sortable": "../bower_components/angular-ui-sortable/sortable",
    "jquery-ui": "../bower_components/jquery-ui/jquery-ui",
    "angular-xeditable": "../bower_components/angular-xeditable/dist/js/xeditable",
    "ui-select": "../bower_components/ui-select/dist/select",
    select2: "../bower_components/select2/dist/js/select2",
    "angular-sanitize": "../bower_components/angular-sanitize/angular-sanitize",
    pnotify: "../bower_components/pnotify/dist/pnotify",
    "pnotify.animate": "../bower_components/pnotify/dist/pnotify.animate",
    "pnotify.desktop": "../bower_components/pnotify/dist/pnotify.desktop",
    "pnotify.history": "../bower_components/pnotify/dist/pnotify.history",
    "pnotify.buttons": "../bower_components/pnotify/dist/pnotify.buttons",
    "pnotify.mobile": "../bower_components/pnotify/dist/pnotify.mobile",
    "pnotify.confirm": "../bower_components/pnotify/dist/pnotify.confirm",
    "pnotify.nonblock": "../bower_components/pnotify/dist/pnotify.nonblock",
    "pnotify.callbacks": "../bower_components/pnotify/dist/pnotify.callbacks"
  },
  baseUrl: "components",
  packages: [
    "app",
    "grails",
    "search",
    "academic-output",
    "notifications",
    "auth"
  ],
  shim: {
    angular: {
      deps: [
        "jquery"
      ]
    },
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
    satellizer: {
      deps: [
        "angular"
      ]
    },
    "angular-couch-potato": {
      deps: [
        "angular"
      ]
    },
    "jquery-touchswipe": {
      deps: [
        "jquery"
      ]
    },
    "jisc-patterns-foot": {
      deps: [
        "jquery-touchswipe",
        "jisc-patterns-head"
      ]
    },
    "bootstrap-js": {
      deps: [
        "jquery"
      ]
    },
    "datatables.net": {
      deps: [
        "jquery"
      ]
    },
    "datatables.net-bs": {
      deps: [
        "datatables.net",
        "jquery"
      ]
    },
    ngRAMLResources: {
      deps: [
        "angular-resource",
        "raml-parser"
      ]
    },
    "responsive-bootstrap-toolkit": {
      deps: [
        "jquery",
        "bootstrap-js"
      ]
    },
    "angular-ui-sortable": {
      deps: [
        "angular",
        "jquery-ui"
      ]
    },
    "angular-xeditable": {
      deps: [
        "angular"
      ]
    },
    "ui-select": {
      deps: [
        "angular"
      ]
    },
    "angular-sanitize": {
      deps: [
        "angular"
      ]
    },
    pnotify: {
      deps: [
        "jquery"
      ]
    },
    "pnotify.animate": {
      deps: [
         "pnotify"
      ]
    },
    "pnotify.desktop":  {
      deps: [
        "pnotify"
      ]
    },
    "pnotify.buttons":  {
      deps: [
        "pnotify"
      ]
    },
    "pnotify.confirm":  {
      deps: [
        "pnotify"
      ]
    },
    "pnotify.nonblock":  {
      deps: [
        "pnotify"
      ]
    },
    "pnotify.callbacks":  {
      deps: [
        "pnotify"
      ]
    },
  }
});
