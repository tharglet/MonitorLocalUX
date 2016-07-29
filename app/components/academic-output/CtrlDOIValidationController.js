'use strict';

define (
  ['app'],
  function(app) {
    app.registerController('DOIValidationController', [ '$scope', '$http', '$filter', 'appConfig', function($scope, $http, $filter, appConfig) {

      console.log("DOIValidationController");
      
      // Need to set to existing value, if present or fetch a blank.
      var ns = "doi";

      // Data object for the lookup. We'll make the structure match that of the AO.
      // This should mean a simple "angular.merge" operation adds the necessary vals on confirmation.
      $scope.doi_data = {
        identifiers: angular.copy(($filter('filter')($scope.context.identifiers, { identifier : { namespace : { value: ( ns ) } } }, false)))
      };
      
      // If there isn't an entry then we should create one.
      if ($scope.doi_data['identifiers'].length < 1) {
        
        // Create a blank one.
        $scope.getBlank('identifiers').then(function (data) {
          // Set the namespace and add to the list.
          data.identifier.namespace.value = ns;
          
          // Set the value.
          data.identifier.value = '';
          
          // Also directly set our entry here.
//          angular.copy (data, doi_data);
          $scope.doi_data['identifiers'].push(data);
        });
      }
      
      $scope.item_container_title = 'Unknown';
      $scope.item_type = 'Unknown';
      $scope.valid = null;

      $scope.validate = function(){
        console.log("validate");

        // Config for http. Remove our custom header 'binding-source' and also flag satelizer to not add authorization headers.
        var config = {
            skipAuthorization: true,
            headers :{
              "binding-source" : undefined
            }
        };

        
        // A/B Switching of different DOI lookup methods
        if ( 1==1 ) {
          // Talk to the Monitor app instead of going directly to crossref
          $http.post(appConfig.backend+'/application/crossrefLookup', {doi:$scope.doi_data['identifiers'][0].identifier.value}).
            then(function(response) {
              console.log("DOI Lookup response %o",response);
              if ( response.data.containerTitle ) {
                $scope.item_container_title = response.data.containerTitle;
                $scope.doi_data['name'] = response.data.itemTitle;
                $scope.doi_data['publicationTitle'] = response.data.containerTitle;
                $scope.doi_data['outputType'] = response.data.type; // refdata item type
                var publication_info = { id:response.data.publication_id, identifiers:[], name:response.data.containerTitle };
                $scope.doi_data['publishedIn'] = publication_info;
                $scope.item_title = response.data.itemTitle;
                $scope.item_type = response.data.containerType;
                $scope.item_identifiers = response.data.identifiers;
                $scope.item_authors = response.data.authorNames;
                $scope.message = response.data.message;
                
                // Import the names.
                var names = "";
                angular.forEach (response.data.authorNames, function (author) {
                  names += (author['given'] + ' ' + author['family']) + "\n";
                });
              
                $scope.doi_data['authorNameList'] = names.replace(/^\s+|\s+$/gm,'');
                $scope.valid = true;

                // Add each member of response.data.identifiers to $scope.doi_data['identifiers'] IF it's not already present
                angular.forEach(response.data.identifiers, function(entry) {
                  // this.push(key + ': ' + value);
                  console.log("Consider %o",entry);
                  var present = false
                  angular.forEach($scope.doi_data['identifiers'], function(li) {
                    publication_info.identifiers.push( { identifier : { namespace : { value :  entry.namespace }, value: entry.value } } );
                  }, null);
                }, null);
              }
            });
        }
        else {
          // $http.get('http://api.crossref.org/works/'+'10.1037/0003-066X.59.1.29', config)
          $http.get('http://api.crossref.org/works/'+ $scope.doi_data['identifiers'][0].identifier.value, config)
            .then(function success(response) {
            console.log("OK %o",response);
            $scope.item_container_title = response.data.message['container-title'][0];
            $scope.doi_data['name'] = response.data.message.title[0];
            $scope.item_type = response.data.message.type;
            $scope.item_identifiers = response.data.message.ISSN;
            $scope.item_authors = response.data.message.author;
          
            // Also add a simple list.
            // SO: This will need to change to create, or match names.
            var names = "";
            angular.forEach (response.data.message.author, function (author) {
              names += (author['given'] + ' ' + author['family']) + "\n";
            });
          
            $scope.doi_data['authorNameList'] = names.replace(/^\s+|\s+$/gm,'');
            $scope.valid = true;
          }, 
          function error(response) {
            console.log("Error");
            $scope.valid = false;
          });
        }


      };

      // Validate by cross ref : issue GET to http://api.crossref.org/works/ + DOI -- eg "10.1037/0003-066X.59.1.29"

    }]);
  }
);
