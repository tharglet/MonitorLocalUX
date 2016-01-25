'use strict';

define(
    'aofactory',// Name the Javascript module.
    ['academic-output'],
    function () {
      console.log ("Create a factory!");
      return angular.module('academic-output')
      .factory('AOStorage', function() {
        var storage = {
            AOData : {
              id : 9584,
              name : 'Diagnosis and management of primary cliairy dyskinetia',
              status: {id : 2, value: 'Accepted'},
              reason: '',
              route : {id : 3, value: 'Gold'},
              awards : [{
                id : 32,
                ref : "NEGO16003457",
                value : 'NE/GO16003/457'
              },{
                id : 37,
                ref : "NEGO89803090",
                value : 'NE/GO89803/090'
              }],
              administrator: {
                id : 653,
                name : 'Latimer Hazar'
              }
            },
            AOList : [{
              id : 1234,
              name : 'Some Academic article',
              authors : [{
                role : {
                  id : 234,
                  value : "Corresponding Author"
                },
                author : {
                  id : 754,
                  name : 'Mateusz Kasiuba'
                }
              }],
              publication : {
                id : 23,
                name : 'Non exist Journal',
              },
              publisher : {
                id : 678,
                name : 'famous publisher',
              },
              cost : 9999,
              status : {id : 35, value: 'Unpublished'},
              payment : {id : 36, value: 'Unpaid'}
            },{
              id : 9999,
              name : 'Special Article',
              authors : [{
                id : 23,
                title : 'Famous Author'
              }],
              publication : {
                id : 23,
                name : 'Non exist Journal',
              },
              publisher : {
                id : 450,
                name : 'small publisher',
              },
              cost : 123,
              status : {id : 37, value: 'Published'},
              payment : {id : 38, value: 'Unpaid'}
            }]
        };

        var deleteAward = function(key){
          delete(storage.AOData['awards'][key]);
        };

        var addAward = function(){
          storage.AOData['awards'][Date.now()] = '';
          console.log(storage.AOData['awards']);
        };

        var getStorage = function(){
          return storage;
        };

        return {
          deleteAward: deleteAward,
          addAward: addAward,
          getStorage: getStorage
        };
      });
    }
);