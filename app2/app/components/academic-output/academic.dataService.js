angular.module('uiMonitorLocal.academic.service', [])
// A RESTful factory for retrieving academic output from 'academic.json'
.factory('academic', ['$http', 'utils', function ($http, utils) {
  var path = 'assets/academic.json';
  // We can separate it by then errorCallback and successCallback (do not use success and error - depricated!)
  var academic = $http.get(path).then(function (resp) {
    return resp.data.academic;
  });

  var factory = {};
  factory.all = function () {
    return academic;
  };
  factory.get = function (id) {
    return academic.then(function(){
      return utils.findById(academic, id);
    })
  };
  return factory;
}]);
