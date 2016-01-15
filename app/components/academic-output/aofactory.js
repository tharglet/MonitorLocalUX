'use strict';

define(
  function () {
    console.log ("Create a factory!");
    return angular.module('aofactory', ['ui.router'])
    .factory('AOStorage', function() {
        var storage = {
          AOData : [{
          	ref : '9584',
        	title : 'Diagnosis and management of primary cliairy dyskinetia',
        	status: 'Accepted',
        	reason: '',
        	route : 'Gold',
        	awards : {NEGO16003457 : 'NE/GO16003/457', NEGO89803090 :'NE/GO89803/090'},
        	administrator: 'Latimer Hazar'
          }]
        };
        
        var deleteAward = function(key){
        	delete(storage.AOData['awards'][key]);
    		console.log( scope['academicOutput']['awards']);
        }
        
        var addAward = function(award){
        	storage.AOData['awards'][Date.now()] = award;
            console.log(storage.AOData['awards']);
        }
        
        var getStorage = function(){
        	return storage;
        }
        
        return {
            deleteAward: deleteAward,
            addAward: addAward,
            getStorage: getStorage
          };
        });
  }
);