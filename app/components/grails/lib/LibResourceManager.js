/** TODO: Really need to modularise this class. Make work with requirejs (if present) and add flesh out the comments **/
'use strict';
function ResourceManager ( resource, http, q, config ) {
  this.ngResource = resource;
  this.http = http;
  this.baseUrl = config.backend;
  this.q = q;
  this._initialized = this.configure();
}
ResourceManager.prototype.ngResource = null;
ResourceManager.prototype.http = null;
ResourceManager.prototype.q = null;
ResourceManager.baseUrl = null;
ResourceManager._initialized = false;
ResourceManager.prototype.config = {
  
  "__DEFAULTS__" : {
    resourceConfig : {
      defaults: { id: '@id' },
      actions: {
        'list'                : {isArray:true},
      }
    }
  }
};
ResourceManager.prototype.configure = function() {
  
  var _self = this;
  
  // HTTP request to grab the config.
  return _self.http({
    "url": this.baseUrl + "/angularHelper/resourceConfig",
    "headers": { "Accept": "application/json;charset=UTF-8" },
    "method": "GET"
  }).then(function(data) {
    // Build URLs from URIs.
    angular.forEach (data.data, function (value, key){
      if ("resourceConfig" in value && "actions" in value.resourceConfig) {
        angular.forEach (value.resourceConfig.actions, function (action){
          if ("uri" in action) {
            action.url = _self.baseUrl + action.uri;
          }
        });
      }
    });
    
    // Merge in the config.
    angular.merge( _self.config, data.data );
  });
};
ResourceManager.prototype.getConfig = function ( type ) {
  
  // Start by merging our defaults with the settings from the server.
  var conf = {};
  if ( type in this.config && 'resourceConfig' in this.config[type] ) {
    conf = angular.merge({}, this.config['__DEFAULTS__']['resourceConfig'], this.config[type]['resourceConfig']);
  }
  return conf;
};

ResourceManager.prototype.addRefdata = function ( res, conf, type ) {
  
  var _self = this;
  
  // Let's bolt on methods using the resource actions config object.
  if (res && this.baseUrl && type && conf && "refdata" in conf) {
    
    // Add the config. 
    angular.forEach(conf.refdata, function(propName) {
      res.prototype[propName + "Values"] = function() {
        return _self.http({
          "url": _self.baseUrl + "/ref/" + type + "/" + propName,
          "headers": { "Accept": "application/json;charset=UTF-8" },
          "method": "GET"
        });
      };
    });
  }
  
  return conf;
};

//ResourceManager.prototype.addCheckRules = function ( res, conf, type ) {
//  
//  var _self = this;
//  
//  // Add the method.
//  res.prototype["checkRules"] = function( ruleType ) {
//    return _self.http({
//      "url": _self.baseUrl + "/ref/checkRules/" + type + "/" +_self.id + "/" + ruleType,
//      "headers": { "Accept": "application/json;charset=UTF-8" },
//      "method": "GET"
//    });
//  }
//};

ResourceManager.prototype.addGenericLookup = function ( res, type ) {
  
  var _self = this;
  
  // Also want to bolt on the generic method to fetch nested properties
  // from the main resource.
  res.prototype["genericLookup"] = function( propName ) {
    return _self.http({
      "url": _self.baseUrl + "/ref/" + type + "/" + propName,
      "headers": { "Accept": "application/json;charset=UTF-8", "Accept-Version": "condensed" },
      "method": "GET"
    });
  };
};

ResourceManager.prototype.addLookup = function ( res, type ) {
  
  var _self = this;
  res.prototype.componentLookup  = function(propName, search, params) {
    return _self.http({
      "url": _self.baseUrl + "/ref/" + type + "/" + propName + (search ? "/" + search : ""),
      "headers": { "Accept": "application/json;charset=UTF-8", "Accept-Version": "condensed" },
      "method": "GET",
      "params": params || {},
    });
  };
};

ResourceManager.prototype.addBlankFetching = function ( res, type ) {
  
  // Reference to this as it currently stands.
  var _self = this;
  
  // Cache for fetched blanks.
  res.prototype._blanks = {};
  res.prototype.getBlankProperty  = function(propName) {
    
    // Create a deferred resonse.
    var response = _self.q.defer();
    
    // method to succeed the deferred.
    var respond = function ( data ) {
      // Always return a copy to ensure the original cached version remains unaltered.
      response.resolve ( angular.copy( data ) );
    };
    
    var cache = this._blanks;
    
    // get from cache.
    var cached = cache[propName];
    if (typeof cached === 'undefined') {
      
      _self.http({
        "url": _self.baseUrl + "/ref/blank/" + type + "/" + propName,
        "headers": { "Accept": "application/json;charset=UTF-8" },
        "method": "GET"
      }).then(function (response) {
        
        // Add to the cache and then return.
        cache[propName] = response.data;
        respond ( response.data );
      });
    } else {
      respond (cached);
    }
    
    // Return the deferred promise.
    return response.promise;
  };
};

ResourceManager.prototype.addValidateProperty = function ( res, type ) {
  
  var _self = this;
  res.prototype.validateProperty  = function(property, data, params) {
        
    return _self.http({
      "url": _self.baseUrl + "/validate/" + type + '/' + property,
      "headers" : { "Accept": "application/json;charset=UTF-8" },
      "method"  : "POST",
      "params"  : params || {},
      "data"    : data || {}
    });
  };
};

ResourceManager.prototype.resourceCache = {};
ResourceManager.prototype.r = function ( type ) {
  
  var _self = this;
  
  // Need to create a deferred object.
  var deferred = _self.q.defer();
  
  // Wait till initialized.
  _self._initialized.then(function(){
    // After initialization...
    // Get from cache.
    var res = _self.resourceCache[_self.baseUrl+type];
    
    // Lookup config and return a resource object.
    if ( !res ) {
      
      // Grab the config.
      var conf = _self.getConfig( type );
      
      if ( conf ) {
        res = _self.ngResource (_self.baseUrl + conf['uri'] , conf['defaults'] || {}, conf['actions']);
        _self.resourceCache[_self.baseUrl+type] = res;
        _self.addRefdata(res, conf, type);
        _self.addLookup(res, type);
        _self.addValidateProperty(res, type);
        _self.addBlankFetching(res, type);
        _self.addGenericLookup(res, type);
        res.prototype.$$isResource = true;
      }
    }
    
    deferred.resolve(res);
  });
  
  // Null if none found.
  return deferred.promise;
};
