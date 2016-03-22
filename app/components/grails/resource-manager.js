function ResourceManager ( resource ) {
  this.ngResource = resource;
}
ResourceManager.prototype.ngResource = null;
ResourceManager.prototype.config = {
  
  "__DEFAULTS__" : {
    resourceConfig : {
      defaults: { id: '@id' },
      actions: {
        'get'   : {"headers" : {"Content-Type": "application/json;charset=UTF-8", "Accept": "application/json;charset=UTF-8"}},
        'list'  : {"headers" : {"Content-Type": "application/json;charset=UTF-8", "Accept": "application/json;charset=UTF-8"}, isArray:true},
        'query' : {"headers" : {"Content-Type": "application/json;charset=UTF-8", "Accept": "application/json;charset=UTF-8"}, isArray:false},
        'save'  : {"headers" : {"Content-Type": "application/json;charset=UTF-8", "Accept": "application/json;charset=UTF-8"}},
        'update': {"headers" : {"Content-Type": "application/json;charset=UTF-8", "Accept": "application/json;charset=UTF-8"}, "method": "PUT"},
        'remove': {"headers" : {"Content-Type": "application/json;charset=UTF-8", "Accept": "application/json;charset=UTF-8"}},
        'delete': {"headers" : {"Content-Type": "application/json;charset=UTF-8", "Accept": "application/json;charset=UTF-8"}},
      }
    }
  },
  
  AcademicOutput : {
    resourceConfig : {
      uri : "ao/:id",
      actions: {
        // Add the query method for searches too.
        query : {
          "method" : "GET"
        }
      }
    }
  }  
};
  
ResourceManager.prototype.resourceCache = {};
ResourceManager.prototype.r = function ( baseUrl, type ) {
  
  // Get from cache.
  var res = this.resourceCache[baseUrl+type];
  
  // Lookup config and return a resource object.
  if ( !res && type in this.config && 'resourceConfig' in this.config[type] ) {
    var conf = angular.merge({}, this.config['__DEFAULTS__']['resourceConfig'], this.config[type]['resourceConfig']);
    res = this.ngResource (baseUrl + '/' + conf['uri'] , conf['defaults'] || {}, conf['actions']);
    this.resourceCache[baseUrl+type] = res;
  }
  
  // Null if none found.
  return res ? res : null;
};
