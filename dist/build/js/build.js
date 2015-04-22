(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./dist/src/js/App.js":[function(require,module,exports){
var AddStoreItem = require('./StoreComponent/AddStoreItem');
var StoreContainer = require('./StoreComponent/StoreContainer');

React.render(
    React.createElement(StoreContainer, null),
    document.getElementById('StoreItems')
);

React.render(
    React.createElement(AddStoreItem, null),
    document.getElementById('AddStoreItem')
);

},{"./StoreComponent/AddStoreItem":"/Users/roilan/WebDev/react-cart/dist/src/js/StoreComponent/AddStoreItem.js","./StoreComponent/StoreContainer":"/Users/roilan/WebDev/react-cart/dist/src/js/StoreComponent/StoreContainer.js"}],"/Users/roilan/WebDev/react-cart/dist/src/js/StoreComponent/AddStoreItem.js":[function(require,module,exports){
var request = require('reqwest');

var AddStoreItem = React.createClass({displayName: "AddStoreItem",
    getInitialState: function() {
      return {
          itemName: '',
          itemPrice: '',
          itemDescription: ''
      }
    },
    addToStore: function(e) {
        e.preventDefault();

        if(this.state.itemDescription && this.state.itemName && this.state.itemPrice !== '') {
            request({
                url: 'http://104.236.200.153:3000/api/items',
                method: 'POST',
                data: {
                    price: this.state.itemPrice,
                    name: this.state.itemName,
                    description: this.state.itemDescription
                },
                success: function(response) {
                    console.log(response);

                }
            });
        }
    },
    updateCurrentState: function(key) {
        var update = {};

        return function(e) {
            update[key] = e.target.value;
            this.setState(update);
        }.bind(this)
    },
    render: function() {
       return (
           React.createElement("div", {className: "col-sm-12"}, 
               React.createElement("form", null, 
                   React.createElement("ul", null, 
                       React.createElement("li", {className: "row list-inline"}, 
                           React.createElement("label", {htmlFor: "itemName"}, "Name:"), 
                           React.createElement("input", {type: "text", id: "itemName", 
                               defaultValue: this.state.itemName, 
                               onChange: this.updateCurrentState('itemName')}
                           ), 

                           React.createElement("label", {htmlFor: "itemPrice"}, "Price:"), 
                           React.createElement("input", {type: "number", id: "itemPrice", 
                               defaultValue: this.state.itemPrice, 
                               onChange: this.updateCurrentState('itemPrice')}
                           ), 

                           React.createElement("label", {htmlFor: "itemDescription"}, "Description:"), 
                           React.createElement("input", {type: "text", id: "itemDescription", 
                               defaultValue: this.state.itemDescription, 
                               onChange: this.updateCurrentState('itemDescription')}
                           ), 

                           React.createElement("button", {id: "cartAddBtn", className: "btn btn-primary", onClick: this.addToStore}, 
                               "Add"
                           )
                       ), 

                       React.createElement("li", null, 
                           React.createElement("span", null, this.state.itemName), " ", React.createElement("br", null), 
                           React.createElement("span", null, this.state.itemPrice), " ", React.createElement("br", null), 
                           React.createElement("span", null, this.state.itemDescription)
                       )
                   )
               )
           )
       )
    }
});

module.exports = AddStoreItem;

},{"reqwest":"/Users/roilan/WebDev/react-cart/node_modules/reqwest/reqwest.js"}],"/Users/roilan/WebDev/react-cart/dist/src/js/StoreComponent/StoreContainer.js":[function(require,module,exports){
var request = require('reqwest');
var StoreItems = require('./StoreItems');

var StoreContainer = React.createClass({displayName: "StoreContainer",
    getInitialState: function() {
        return {
            items: []
        }
    },
    componentDidMount: function() {
        this.updateStoreItems();
    },
    updateStoreItems: function() {
        request({
            url: 'http://104.236.200.153:3000/api/items',
            method: 'GET',
            success: function(response) {
                this.setState({
                    items: response
                });
            }.bind(this)
        });
    },
    render: function() {
        return (
            React.createElement(StoreItems, {items: this.state.items})
        )
    }
});

module.exports = StoreContainer;

},{"./StoreItems":"/Users/roilan/WebDev/react-cart/dist/src/js/StoreComponent/StoreItems.js","reqwest":"/Users/roilan/WebDev/react-cart/node_modules/reqwest/reqwest.js"}],"/Users/roilan/WebDev/react-cart/dist/src/js/StoreComponent/StoreItems.js":[function(require,module,exports){
var ItemList = React.createClass({displayName: "ItemList",
    render: function() {
        var items = this.props.items.map(function(item, i) {
            return (
                React.createElement("li", {className: "row list-inline items-row", key: i}, 
                    React.createElement("form", null, 
                        React.createElement("input", {type: "number", className: "itemAmt", defaultValue: item.id}), 
                        React.createElement("span", {className: "itemName"}, item.name), 
                        React.createElement("button", {className: "btn btn-primary btn-sm btn-cart"}, "Add"), 
                        React.createElement("span", {className: "itemPrice"}, item.price)
                    )
                )
            )
        });

        return (
            React.createElement("ul", null, 
                React.createElement("li", {className: "row list-inline item-title"}, 
                    React.createElement("span", null, "Amt"), 
                    React.createElement("span", null, "Name"), 
                    React.createElement("span", null, "Price")
                ), 

                items
            )
        )
    }
});

var StoreItems = React.createClass({displayName: "StoreItems",
    render: function() {
        return(
            React.createElement("div", {className: "col-sm-12 text-left"}, 
                React.createElement(ItemList, {items: this.props.items})
            )
        );
    }
});

module.exports = StoreItems;

},{}],"/Users/roilan/WebDev/react-cart/node_modules/reqwest/reqwest.js":[function(require,module,exports){
/*!
  * Reqwest! A general purpose XHR connection manager
  * license MIT (c) Dustin Diaz 2014
  * https://github.com/ded/reqwest
  */

!function (name, context, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(definition)
  else context[name] = definition()
}('reqwest', this, function () {

  var win = window
    , doc = document
    , httpsRe = /^http/
    , protocolRe = /(^\w+):\/\//
    , twoHundo = /^(20\d|1223)$/ //http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
    , byTag = 'getElementsByTagName'
    , readyState = 'readyState'
    , contentType = 'Content-Type'
    , requestedWith = 'X-Requested-With'
    , head = doc[byTag]('head')[0]
    , uniqid = 0
    , callbackPrefix = 'reqwest_' + (+new Date())
    , lastValue // data stored by the most recent JSONP callback
    , xmlHttpRequest = 'XMLHttpRequest'
    , xDomainRequest = 'XDomainRequest'
    , noop = function () {}

    , isArray = typeof Array.isArray == 'function'
        ? Array.isArray
        : function (a) {
            return a instanceof Array
          }

    , defaultHeaders = {
          'contentType': 'application/x-www-form-urlencoded'
        , 'requestedWith': xmlHttpRequest
        , 'accept': {
              '*':  'text/javascript, text/html, application/xml, text/xml, */*'
            , 'xml':  'application/xml, text/xml'
            , 'html': 'text/html'
            , 'text': 'text/plain'
            , 'json': 'application/json, text/javascript'
            , 'js':   'application/javascript, text/javascript'
          }
      }

    , xhr = function(o) {
        // is it x-domain
        if (o['crossOrigin'] === true) {
          var xhr = win[xmlHttpRequest] ? new XMLHttpRequest() : null
          if (xhr && 'withCredentials' in xhr) {
            return xhr
          } else if (win[xDomainRequest]) {
            return new XDomainRequest()
          } else {
            throw new Error('Browser does not support cross-origin requests')
          }
        } else if (win[xmlHttpRequest]) {
          return new XMLHttpRequest()
        } else {
          return new ActiveXObject('Microsoft.XMLHTTP')
        }
      }
    , globalSetupOptions = {
        dataFilter: function (data) {
          return data
        }
      }

  function succeed(r) {
    var protocol = protocolRe.exec(r.url);
    protocol = (protocol && protocol[1]) || window.location.protocol;
    return httpsRe.test(protocol) ? twoHundo.test(r.request.status) : !!r.request.response;
  }

  function handleReadyState(r, success, error) {
    return function () {
      // use _aborted to mitigate against IE err c00c023f
      // (can't read props on aborted request objects)
      if (r._aborted) return error(r.request)
      if (r._timedOut) return error(r.request, 'Request is aborted: timeout')
      if (r.request && r.request[readyState] == 4) {
        r.request.onreadystatechange = noop
        if (succeed(r)) success(r.request)
        else
          error(r.request)
      }
    }
  }

  function setHeaders(http, o) {
    var headers = o['headers'] || {}
      , h

    headers['Accept'] = headers['Accept']
      || defaultHeaders['accept'][o['type']]
      || defaultHeaders['accept']['*']

    var isAFormData = typeof FormData === 'function' && (o['data'] instanceof FormData);
    // breaks cross-origin requests with legacy browsers
    if (!o['crossOrigin'] && !headers[requestedWith]) headers[requestedWith] = defaultHeaders['requestedWith']
    if (!headers[contentType] && !isAFormData) headers[contentType] = o['contentType'] || defaultHeaders['contentType']
    for (h in headers)
      headers.hasOwnProperty(h) && 'setRequestHeader' in http && http.setRequestHeader(h, headers[h])
  }

  function setCredentials(http, o) {
    if (typeof o['withCredentials'] !== 'undefined' && typeof http.withCredentials !== 'undefined') {
      http.withCredentials = !!o['withCredentials']
    }
  }

  function generalCallback(data) {
    lastValue = data
  }

  function urlappend (url, s) {
    return url + (/\?/.test(url) ? '&' : '?') + s
  }

  function handleJsonp(o, fn, err, url) {
    var reqId = uniqid++
      , cbkey = o['jsonpCallback'] || 'callback' // the 'callback' key
      , cbval = o['jsonpCallbackName'] || reqwest.getcallbackPrefix(reqId)
      , cbreg = new RegExp('((^|\\?|&)' + cbkey + ')=([^&]+)')
      , match = url.match(cbreg)
      , script = doc.createElement('script')
      , loaded = 0
      , isIE10 = navigator.userAgent.indexOf('MSIE 10.0') !== -1

    if (match) {
      if (match[3] === '?') {
        url = url.replace(cbreg, '$1=' + cbval) // wildcard callback func name
      } else {
        cbval = match[3] // provided callback func name
      }
    } else {
      url = urlappend(url, cbkey + '=' + cbval) // no callback details, add 'em
    }

    win[cbval] = generalCallback

    script.type = 'text/javascript'
    script.src = url
    script.async = true
    if (typeof script.onreadystatechange !== 'undefined' && !isIE10) {
      // need this for IE due to out-of-order onreadystatechange(), binding script
      // execution to an event listener gives us control over when the script
      // is executed. See http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
      script.htmlFor = script.id = '_reqwest_' + reqId
    }

    script.onload = script.onreadystatechange = function () {
      if ((script[readyState] && script[readyState] !== 'complete' && script[readyState] !== 'loaded') || loaded) {
        return false
      }
      script.onload = script.onreadystatechange = null
      script.onclick && script.onclick()
      // Call the user callback with the last value stored and clean up values and scripts.
      fn(lastValue)
      lastValue = undefined
      head.removeChild(script)
      loaded = 1
    }

    // Add the script to the DOM head
    head.appendChild(script)

    // Enable JSONP timeout
    return {
      abort: function () {
        script.onload = script.onreadystatechange = null
        err({}, 'Request is aborted: timeout', {})
        lastValue = undefined
        head.removeChild(script)
        loaded = 1
      }
    }
  }

  function getRequest(fn, err) {
    var o = this.o
      , method = (o['method'] || 'GET').toUpperCase()
      , url = typeof o === 'string' ? o : o['url']
      // convert non-string objects to query-string form unless o['processData'] is false
      , data = (o['processData'] !== false && o['data'] && typeof o['data'] !== 'string')
        ? reqwest.toQueryString(o['data'])
        : (o['data'] || null)
      , http
      , sendWait = false

    // if we're working on a GET request and we have data then we should append
    // query string to end of URL and not post data
    if ((o['type'] == 'jsonp' || method == 'GET') && data) {
      url = urlappend(url, data)
      data = null
    }

    if (o['type'] == 'jsonp') return handleJsonp(o, fn, err, url)

    // get the xhr from the factory if passed
    // if the factory returns null, fall-back to ours
    http = (o.xhr && o.xhr(o)) || xhr(o)

    http.open(method, url, o['async'] === false ? false : true)
    setHeaders(http, o)
    setCredentials(http, o)
    if (win[xDomainRequest] && http instanceof win[xDomainRequest]) {
        http.onload = fn
        http.onerror = err
        // NOTE: see
        // http://social.msdn.microsoft.com/Forums/en-US/iewebdevelopment/thread/30ef3add-767c-4436-b8a9-f1ca19b4812e
        http.onprogress = function() {}
        sendWait = true
    } else {
      http.onreadystatechange = handleReadyState(this, fn, err)
    }
    o['before'] && o['before'](http)
    if (sendWait) {
      setTimeout(function () {
        http.send(data)
      }, 200)
    } else {
      http.send(data)
    }
    return http
  }

  function Reqwest(o, fn) {
    this.o = o
    this.fn = fn

    init.apply(this, arguments)
  }

  function setType(header) {
    // json, javascript, text/plain, text/html, xml
    if (header.match('json')) return 'json'
    if (header.match('javascript')) return 'js'
    if (header.match('text')) return 'html'
    if (header.match('xml')) return 'xml'
  }

  function init(o, fn) {

    this.url = typeof o == 'string' ? o : o['url']
    this.timeout = null

    // whether request has been fulfilled for purpose
    // of tracking the Promises
    this._fulfilled = false
    // success handlers
    this._successHandler = function(){}
    this._fulfillmentHandlers = []
    // error handlers
    this._errorHandlers = []
    // complete (both success and fail) handlers
    this._completeHandlers = []
    this._erred = false
    this._responseArgs = {}

    var self = this

    fn = fn || function () {}

    if (o['timeout']) {
      this.timeout = setTimeout(function () {
        timedOut()
      }, o['timeout'])
    }

    if (o['success']) {
      this._successHandler = function () {
        o['success'].apply(o, arguments)
      }
    }

    if (o['error']) {
      this._errorHandlers.push(function () {
        o['error'].apply(o, arguments)
      })
    }

    if (o['complete']) {
      this._completeHandlers.push(function () {
        o['complete'].apply(o, arguments)
      })
    }

    function complete (resp) {
      o['timeout'] && clearTimeout(self.timeout)
      self.timeout = null
      while (self._completeHandlers.length > 0) {
        self._completeHandlers.shift()(resp)
      }
    }

    function success (resp) {
      var type = o['type'] || resp && setType(resp.getResponseHeader('Content-Type')) // resp can be undefined in IE
      resp = (type !== 'jsonp') ? self.request : resp
      // use global data filter on response text
      var filteredResponse = globalSetupOptions.dataFilter(resp.responseText, type)
        , r = filteredResponse
      try {
        resp.responseText = r
      } catch (e) {
        // can't assign this in IE<=8, just ignore
      }
      if (r) {
        switch (type) {
        case 'json':
          try {
            resp = win.JSON ? win.JSON.parse(r) : eval('(' + r + ')')
          } catch (err) {
            return error(resp, 'Could not parse JSON in response', err)
          }
          break
        case 'js':
          resp = eval(r)
          break
        case 'html':
          resp = r
          break
        case 'xml':
          resp = resp.responseXML
              && resp.responseXML.parseError // IE trololo
              && resp.responseXML.parseError.errorCode
              && resp.responseXML.parseError.reason
            ? null
            : resp.responseXML
          break
        }
      }

      self._responseArgs.resp = resp
      self._fulfilled = true
      fn(resp)
      self._successHandler(resp)
      while (self._fulfillmentHandlers.length > 0) {
        resp = self._fulfillmentHandlers.shift()(resp)
      }

      complete(resp)
    }

    function timedOut() {
      self._timedOut = true
      self.request.abort()      
    }

    function error(resp, msg, t) {
      resp = self.request
      self._responseArgs.resp = resp
      self._responseArgs.msg = msg
      self._responseArgs.t = t
      self._erred = true
      while (self._errorHandlers.length > 0) {
        self._errorHandlers.shift()(resp, msg, t)
      }
      complete(resp)
    }

    this.request = getRequest.call(this, success, error)
  }

  Reqwest.prototype = {
    abort: function () {
      this._aborted = true
      this.request.abort()
    }

  , retry: function () {
      init.call(this, this.o, this.fn)
    }

    /**
     * Small deviation from the Promises A CommonJs specification
     * http://wiki.commonjs.org/wiki/Promises/A
     */

    /**
     * `then` will execute upon successful requests
     */
  , then: function (success, fail) {
      success = success || function () {}
      fail = fail || function () {}
      if (this._fulfilled) {
        this._responseArgs.resp = success(this._responseArgs.resp)
      } else if (this._erred) {
        fail(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t)
      } else {
        this._fulfillmentHandlers.push(success)
        this._errorHandlers.push(fail)
      }
      return this
    }

    /**
     * `always` will execute whether the request succeeds or fails
     */
  , always: function (fn) {
      if (this._fulfilled || this._erred) {
        fn(this._responseArgs.resp)
      } else {
        this._completeHandlers.push(fn)
      }
      return this
    }

    /**
     * `fail` will execute when the request fails
     */
  , fail: function (fn) {
      if (this._erred) {
        fn(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t)
      } else {
        this._errorHandlers.push(fn)
      }
      return this
    }
  , 'catch': function (fn) {
      return this.fail(fn)
    }
  }

  function reqwest(o, fn) {
    return new Reqwest(o, fn)
  }

  // normalize newline variants according to spec -> CRLF
  function normalize(s) {
    return s ? s.replace(/\r?\n/g, '\r\n') : ''
  }

  function serial(el, cb) {
    var n = el.name
      , t = el.tagName.toLowerCase()
      , optCb = function (o) {
          // IE gives value="" even where there is no value attribute
          // 'specified' ref: http://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-862529273
          if (o && !o['disabled'])
            cb(n, normalize(o['attributes']['value'] && o['attributes']['value']['specified'] ? o['value'] : o['text']))
        }
      , ch, ra, val, i

    // don't serialize elements that are disabled or without a name
    if (el.disabled || !n) return

    switch (t) {
    case 'input':
      if (!/reset|button|image|file/i.test(el.type)) {
        ch = /checkbox/i.test(el.type)
        ra = /radio/i.test(el.type)
        val = el.value
        // WebKit gives us "" instead of "on" if a checkbox has no value, so correct it here
        ;(!(ch || ra) || el.checked) && cb(n, normalize(ch && val === '' ? 'on' : val))
      }
      break
    case 'textarea':
      cb(n, normalize(el.value))
      break
    case 'select':
      if (el.type.toLowerCase() === 'select-one') {
        optCb(el.selectedIndex >= 0 ? el.options[el.selectedIndex] : null)
      } else {
        for (i = 0; el.length && i < el.length; i++) {
          el.options[i].selected && optCb(el.options[i])
        }
      }
      break
    }
  }

  // collect up all form elements found from the passed argument elements all
  // the way down to child elements; pass a '<form>' or form fields.
  // called with 'this'=callback to use for serial() on each element
  function eachFormElement() {
    var cb = this
      , e, i
      , serializeSubtags = function (e, tags) {
          var i, j, fa
          for (i = 0; i < tags.length; i++) {
            fa = e[byTag](tags[i])
            for (j = 0; j < fa.length; j++) serial(fa[j], cb)
          }
        }

    for (i = 0; i < arguments.length; i++) {
      e = arguments[i]
      if (/input|select|textarea/i.test(e.tagName)) serial(e, cb)
      serializeSubtags(e, [ 'input', 'select', 'textarea' ])
    }
  }

  // standard query string style serialization
  function serializeQueryString() {
    return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments))
  }

  // { 'name': 'value', ... } style serialization
  function serializeHash() {
    var hash = {}
    eachFormElement.apply(function (name, value) {
      if (name in hash) {
        hash[name] && !isArray(hash[name]) && (hash[name] = [hash[name]])
        hash[name].push(value)
      } else hash[name] = value
    }, arguments)
    return hash
  }

  // [ { name: 'name', value: 'value' }, ... ] style serialization
  reqwest.serializeArray = function () {
    var arr = []
    eachFormElement.apply(function (name, value) {
      arr.push({name: name, value: value})
    }, arguments)
    return arr
  }

  reqwest.serialize = function () {
    if (arguments.length === 0) return ''
    var opt, fn
      , args = Array.prototype.slice.call(arguments, 0)

    opt = args.pop()
    opt && opt.nodeType && args.push(opt) && (opt = null)
    opt && (opt = opt.type)

    if (opt == 'map') fn = serializeHash
    else if (opt == 'array') fn = reqwest.serializeArray
    else fn = serializeQueryString

    return fn.apply(null, args)
  }

  reqwest.toQueryString = function (o, trad) {
    var prefix, i
      , traditional = trad || false
      , s = []
      , enc = encodeURIComponent
      , add = function (key, value) {
          // If value is a function, invoke it and return its value
          value = ('function' === typeof value) ? value() : (value == null ? '' : value)
          s[s.length] = enc(key) + '=' + enc(value)
        }
    // If an array was passed in, assume that it is an array of form elements.
    if (isArray(o)) {
      for (i = 0; o && i < o.length; i++) add(o[i]['name'], o[i]['value'])
    } else {
      // If traditional, encode the "old" way (the way 1.3.2 or older
      // did it), otherwise encode params recursively.
      for (prefix in o) {
        if (o.hasOwnProperty(prefix)) buildParams(prefix, o[prefix], traditional, add)
      }
    }

    // spaces should be + according to spec
    return s.join('&').replace(/%20/g, '+')
  }

  function buildParams(prefix, obj, traditional, add) {
    var name, i, v
      , rbracket = /\[\]$/

    if (isArray(obj)) {
      // Serialize array item.
      for (i = 0; obj && i < obj.length; i++) {
        v = obj[i]
        if (traditional || rbracket.test(prefix)) {
          // Treat each array item as a scalar.
          add(prefix, v)
        } else {
          buildParams(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, traditional, add)
        }
      }
    } else if (obj && obj.toString() === '[object Object]') {
      // Serialize object item.
      for (name in obj) {
        buildParams(prefix + '[' + name + ']', obj[name], traditional, add)
      }

    } else {
      // Serialize scalar item.
      add(prefix, obj)
    }
  }

  reqwest.getcallbackPrefix = function () {
    return callbackPrefix
  }

  // jQuery and Zepto compatibility, differences can be remapped here so you can call
  // .ajax.compat(options, callback)
  reqwest.compat = function (o, fn) {
    if (o) {
      o['type'] && (o['method'] = o['type']) && delete o['type']
      o['dataType'] && (o['type'] = o['dataType'])
      o['jsonpCallback'] && (o['jsonpCallbackName'] = o['jsonpCallback']) && delete o['jsonpCallback']
      o['jsonp'] && (o['jsonpCallback'] = o['jsonp'])
    }
    return new Reqwest(o, fn)
  }

  reqwest.ajaxSetup = function (options) {
    options = options || {}
    for (var k in options) {
      globalSetupOptions[k] = options[k]
    }
  }

  return reqwest
});

},{}]},{},["./dist/src/js/App.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcm9pbGFuL1dlYkRldi9yZWFjdC1jYXJ0L2Rpc3Qvc3JjL2pzL0FwcC5qcyIsIi9Vc2Vycy9yb2lsYW4vV2ViRGV2L3JlYWN0LWNhcnQvZGlzdC9zcmMvanMvU3RvcmVDb21wb25lbnQvQWRkU3RvcmVJdGVtLmpzIiwiL1VzZXJzL3JvaWxhbi9XZWJEZXYvcmVhY3QtY2FydC9kaXN0L3NyYy9qcy9TdG9yZUNvbXBvbmVudC9TdG9yZUNvbnRhaW5lci5qcyIsIi9Vc2Vycy9yb2lsYW4vV2ViRGV2L3JlYWN0LWNhcnQvZGlzdC9zcmMvanMvU3RvcmVDb21wb25lbnQvU3RvcmVJdGVtcy5qcyIsIm5vZGVfbW9kdWxlcy9yZXF3ZXN0L3JlcXdlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FBQztBQUM1RCxJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQzs7QUFFaEUsS0FBSyxDQUFDLE1BQU07SUFDUixvQkFBQyxjQUFjLEVBQUEsSUFBQSxDQUFHLENBQUE7SUFDbEIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUM7QUFDekMsQ0FBQyxDQUFDOztBQUVGLEtBQUssQ0FBQyxNQUFNO0lBQ1Isb0JBQUMsWUFBWSxFQUFBLElBQUEsQ0FBRyxDQUFBO0lBQ2hCLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDO0NBQzFDOzs7QUNYRCxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRWpDLElBQUksa0NBQWtDLDRCQUFBO0lBQ2xDLGVBQWUsRUFBRSxXQUFXO01BQzFCLE9BQU87VUFDSCxRQUFRLEVBQUUsRUFBRTtVQUNaLFNBQVMsRUFBRSxFQUFFO1VBQ2IsZUFBZSxFQUFFLEVB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQWRkU3RvcmVJdGVtID0gcmVxdWlyZSgnLi9TdG9yZUNvbXBvbmVudC9BZGRTdG9yZUl0ZW0nKTtcbnZhciBTdG9yZUNvbnRhaW5lciA9IHJlcXVpcmUoJy4vU3RvcmVDb21wb25lbnQvU3RvcmVDb250YWluZXInKTtcblxuUmVhY3QucmVuZGVyKFxuICAgIDxTdG9yZUNvbnRhaW5lciAvPixcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnU3RvcmVJdGVtcycpXG4pO1xuXG5SZWFjdC5yZW5kZXIoXG4gICAgPEFkZFN0b3JlSXRlbSAvPixcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnQWRkU3RvcmVJdGVtJylcbik7IiwidmFyIHJlcXVlc3QgPSByZXF1aXJlKCdyZXF3ZXN0Jyk7XG5cbnZhciBBZGRTdG9yZUl0ZW0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICAgaXRlbU5hbWU6ICcnLFxuICAgICAgICAgIGl0ZW1QcmljZTogJycsXG4gICAgICAgICAgaXRlbURlc2NyaXB0aW9uOiAnJ1xuICAgICAgfVxuICAgIH0sXG4gICAgYWRkVG9TdG9yZTogZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYodGhpcy5zdGF0ZS5pdGVtRGVzY3JpcHRpb24gJiYgdGhpcy5zdGF0ZS5pdGVtTmFtZSAmJiB0aGlzLnN0YXRlLml0ZW1QcmljZSAhPT0gJycpIHtcbiAgICAgICAgICAgIHJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIHVybDogJ2h0dHA6Ly8xMDQuMjM2LjIwMC4xNTM6MzAwMC9hcGkvaXRlbXMnLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJpY2U6IHRoaXMuc3RhdGUuaXRlbVByaWNlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnN0YXRlLml0ZW1OYW1lLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5zdGF0ZS5pdGVtRGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB1cGRhdGVDdXJyZW50U3RhdGU6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICB2YXIgdXBkYXRlID0ge307XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHVwZGF0ZVtrZXldID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHVwZGF0ZSk7XG4gICAgICAgIH0uYmluZCh0aGlzKVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICByZXR1cm4gKFxuICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sLXNtLTEyJz5cbiAgICAgICAgICAgICAgIDxmb3JtPlxuICAgICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT0ncm93IGxpc3QtaW5saW5lJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPSdpdGVtTmFtZSc+TmFtZTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGlkPSdpdGVtTmFtZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMuc3RhdGUuaXRlbU5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMudXBkYXRlQ3VycmVudFN0YXRlKCdpdGVtTmFtZScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9J2l0ZW1QcmljZSc+UHJpY2U6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdudW1iZXInIGlkPSdpdGVtUHJpY2UnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXt0aGlzLnN0YXRlLml0ZW1QcmljZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy51cGRhdGVDdXJyZW50U3RhdGUoJ2l0ZW1QcmljZScpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9J2l0ZW1EZXNjcmlwdGlvbic+RGVzY3JpcHRpb246PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0naXRlbURlc2NyaXB0aW9uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17dGhpcy5zdGF0ZS5pdGVtRGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMudXBkYXRlQ3VycmVudFN0YXRlKCdpdGVtRGVzY3JpcHRpb24nKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9J2NhcnRBZGRCdG4nIGNsYXNzTmFtZT0nYnRuIGJ0bi1wcmltYXJ5J29uQ2xpY2s9e3RoaXMuYWRkVG9TdG9yZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWRkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cblxuICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57dGhpcy5zdGF0ZS5pdGVtTmFtZX08L3NwYW4+IDxiciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3RoaXMuc3RhdGUuaXRlbVByaWNlfTwvc3Bhbj4gPGJyIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57dGhpcy5zdGF0ZS5pdGVtRGVzY3JpcHRpb259PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgIDwvZGl2PlxuICAgICAgIClcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBZGRTdG9yZUl0ZW07IiwidmFyIHJlcXVlc3QgPSByZXF1aXJlKCdyZXF3ZXN0Jyk7XG52YXIgU3RvcmVJdGVtcyA9IHJlcXVpcmUoJy4vU3RvcmVJdGVtcycpO1xuXG52YXIgU3RvcmVDb250YWluZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU3RvcmVJdGVtcygpO1xuICAgIH0sXG4gICAgdXBkYXRlU3RvcmVJdGVtczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiAnaHR0cDovLzEwNC4yMzYuMjAwLjE1MzozMDAwL2FwaS9pdGVtcycsXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFN0b3JlSXRlbXMgaXRlbXM9e3RoaXMuc3RhdGUuaXRlbXN9Lz5cbiAgICAgICAgKVxuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0b3JlQ29udGFpbmVyOyIsInZhciBJdGVtTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaXRlbXMgPSB0aGlzLnByb3BzLml0ZW1zLm1hcChmdW5jdGlvbihpdGVtLCBpKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9J3JvdyBsaXN0LWlubGluZSBpdGVtcy1yb3cnIGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgIDxmb3JtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J251bWJlcicgY2xhc3NOYW1lPSdpdGVtQW10JyBkZWZhdWx0VmFsdWU9e2l0ZW0uaWR9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2l0ZW1OYW1lJz57aXRlbS5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidG4gYnRuLXByaW1hcnkgYnRuLXNtIGJ0bi1jYXJ0Jz5BZGQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0naXRlbVByaWNlJz57aXRlbS5wcmljZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgKVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJyb3cgbGlzdC1pbmxpbmUgaXRlbS10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5BbXQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPk5hbWU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlByaWNlPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbGk+XG5cbiAgICAgICAgICAgICAgICB7aXRlbXN9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICApXG4gICAgfVxufSk7XG5cbnZhciBTdG9yZUl0ZW1zID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb2wtc20tMTIgdGV4dC1sZWZ0Jz5cbiAgICAgICAgICAgICAgICA8SXRlbUxpc3QgaXRlbXM9e3RoaXMucHJvcHMuaXRlbXN9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdG9yZUl0ZW1zOyIsIi8qIVxuICAqIFJlcXdlc3QhIEEgZ2VuZXJhbCBwdXJwb3NlIFhIUiBjb25uZWN0aW9uIG1hbmFnZXJcbiAgKiBsaWNlbnNlIE1JVCAoYykgRHVzdGluIERpYXogMjAxNFxuICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9kZWQvcmVxd2VzdFxuICAqL1xuXG4hZnVuY3Rpb24gKG5hbWUsIGNvbnRleHQsIGRlZmluaXRpb24pIHtcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSBkZWZpbmUoZGVmaW5pdGlvbilcbiAgZWxzZSBjb250ZXh0W25hbWVdID0gZGVmaW5pdGlvbigpXG59KCdyZXF3ZXN0JywgdGhpcywgZnVuY3Rpb24gKCkge1xuXG4gIHZhciB3aW4gPSB3aW5kb3dcbiAgICAsIGRvYyA9IGRvY3VtZW50XG4gICAgLCBodHRwc1JlID0gL15odHRwL1xuICAgICwgcHJvdG9jb2xSZSA9IC8oXlxcdyspOlxcL1xcLy9cbiAgICAsIHR3b0h1bmRvID0gL14oMjBcXGR8MTIyMykkLyAvL2h0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTAwNDY5NzIvbXNpZS1yZXR1cm5zLXN0YXR1cy1jb2RlLW9mLTEyMjMtZm9yLWFqYXgtcmVxdWVzdFxuICAgICwgYnlUYWcgPSAnZ2V0RWxlbWVudHNCeVRhZ05hbWUnXG4gICAgLCByZWFkeVN0YXRlID0gJ3JlYWR5U3RhdGUnXG4gICAgLCBjb250ZW50VHlwZSA9ICdDb250ZW50LVR5cGUnXG4gICAgLCByZXF1ZXN0ZWRXaXRoID0gJ1gtUmVxdWVzdGVkLVdpdGgnXG4gICAgLCBoZWFkID0gZG9jW2J5VGFnXSgnaGVhZCcpWzBdXG4gICAgLCB1bmlxaWQgPSAwXG4gICAgLCBjYWxsYmFja1ByZWZpeCA9ICdyZXF3ZXN0XycgKyAoK25ldyBEYXRlKCkpXG4gICAgLCBsYXN0VmFsdWUgLy8gZGF0YSBzdG9yZWQgYnkgdGhlIG1vc3QgcmVjZW50IEpTT05QIGNhbGxiYWNrXG4gICAgLCB4bWxIdHRwUmVxdWVzdCA9ICdYTUxIdHRwUmVxdWVzdCdcbiAgICAsIHhEb21haW5SZXF1ZXN0ID0gJ1hEb21haW5SZXF1ZXN0J1xuICAgICwgbm9vcCA9IGZ1bmN0aW9uICgpIHt9XG5cbiAgICAsIGlzQXJyYXkgPSB0eXBlb2YgQXJyYXkuaXNBcnJheSA9PSAnZnVuY3Rpb24nXG4gICAgICAgID8gQXJyYXkuaXNBcnJheVxuICAgICAgICA6IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICByZXR1cm4gYSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgfVxuXG4gICAgLCBkZWZhdWx0SGVhZGVycyA9IHtcbiAgICAgICAgICAnY29udGVudFR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgICAsICdyZXF1ZXN0ZWRXaXRoJzogeG1sSHR0cFJlcXVlc3RcbiAgICAgICAgLCAnYWNjZXB0Jzoge1xuICAgICAgICAgICAgICAnKic6ICAndGV4dC9qYXZhc2NyaXB0LCB0ZXh0L2h0bWwsIGFwcGxpY2F0aW9uL3htbCwgdGV4dC94bWwsICovKidcbiAgICAgICAgICAgICwgJ3htbCc6ICAnYXBwbGljYXRpb24veG1sLCB0ZXh0L3htbCdcbiAgICAgICAgICAgICwgJ2h0bWwnOiAndGV4dC9odG1sJ1xuICAgICAgICAgICAgLCAndGV4dCc6ICd0ZXh0L3BsYWluJ1xuICAgICAgICAgICAgLCAnanNvbic6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L2phdmFzY3JpcHQnXG4gICAgICAgICAgICAsICdqcyc6ICAgJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQsIHRleHQvamF2YXNjcmlwdCdcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAsIHhociA9IGZ1bmN0aW9uKG8pIHtcbiAgICAgICAgLy8gaXMgaXQgeC1kb21haW5cbiAgICAgICAgaWYgKG9bJ2Nyb3NzT3JpZ2luJ10gPT09IHRydWUpIHtcbiAgICAgICAgICB2YXIgeGhyID0gd2luW3htbEh0dHBSZXF1ZXN0XSA/IG5ldyBYTUxIdHRwUmVxdWVzdCgpIDogbnVsbFxuICAgICAgICAgIGlmICh4aHIgJiYgJ3dpdGhDcmVkZW50aWFscycgaW4geGhyKSB7XG4gICAgICAgICAgICByZXR1cm4geGhyXG4gICAgICAgICAgfSBlbHNlIGlmICh3aW5beERvbWFpblJlcXVlc3RdKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFhEb21haW5SZXF1ZXN0KClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCcm93c2VyIGRvZXMgbm90IHN1cHBvcnQgY3Jvc3Mtb3JpZ2luIHJlcXVlc3RzJylcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAod2luW3htbEh0dHBSZXF1ZXN0XSkge1xuICAgICAgICAgIHJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTEhUVFAnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgLCBnbG9iYWxTZXR1cE9wdGlvbnMgPSB7XG4gICAgICAgIGRhdGFGaWx0ZXI6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgcmV0dXJuIGRhdGFcbiAgICAgICAgfVxuICAgICAgfVxuXG4gIGZ1bmN0aW9uIHN1Y2NlZWQocikge1xuICAgIHZhciBwcm90b2NvbCA9IHByb3RvY29sUmUuZXhlYyhyLnVybCk7XG4gICAgcHJvdG9jb2wgPSAocHJvdG9jb2wgJiYgcHJvdG9jb2xbMV0pIHx8IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbDtcbiAgICByZXR1cm4gaHR0cHNSZS50ZXN0KHByb3RvY29sKSA/IHR3b0h1bmRvLnRlc3Qoci5yZXF1ZXN0LnN0YXR1cykgOiAhIXIucmVxdWVzdC5yZXNwb25zZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVJlYWR5U3RhdGUociwgc3VjY2VzcywgZXJyb3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gdXNlIF9hYm9ydGVkIHRvIG1pdGlnYXRlIGFnYWluc3QgSUUgZXJyIGMwMGMwMjNmXG4gICAgICAvLyAoY2FuJ3QgcmVhZCBwcm9wcyBvbiBhYm9ydGVkIHJlcXVlc3Qgb2JqZWN0cylcbiAgICAgIGlmIChyLl9hYm9ydGVkKSByZXR1cm4gZXJyb3Ioci5yZXF1ZXN0KVxuICAgICAgaWYgKHIuX3RpbWVkT3V0KSByZXR1cm4gZXJyb3Ioci5yZXF1ZXN0LCAnUmVxdWVzdCBpcyBhYm9ydGVkOiB0aW1lb3V0JylcbiAgICAgIGlmIChyLnJlcXVlc3QgJiYgci5yZXF1ZXN0W3JlYWR5U3RhdGVdID09IDQpIHtcbiAgICAgICAgci5yZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG5vb3BcbiAgICAgICAgaWYgKHN1Y2NlZWQocikpIHN1Y2Nlc3Moci5yZXF1ZXN0KVxuICAgICAgICBlbHNlXG4gICAgICAgICAgZXJyb3Ioci5yZXF1ZXN0KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEhlYWRlcnMoaHR0cCwgbykge1xuICAgIHZhciBoZWFkZXJzID0gb1snaGVhZGVycyddIHx8IHt9XG4gICAgICAsIGhcblxuICAgIGhlYWRlcnNbJ0FjY2VwdCddID0gaGVhZGVyc1snQWNjZXB0J11cbiAgICAgIHx8IGRlZmF1bHRIZWFkZXJzWydhY2NlcHQnXVtvWyd0eXBlJ11dXG4gICAgICB8fCBkZWZhdWx0SGVhZGVyc1snYWNjZXB0J11bJyonXVxuXG4gICAgdmFyIGlzQUZvcm1EYXRhID0gdHlwZW9mIEZvcm1EYXRhID09PSAnZnVuY3Rpb24nICYmIChvWydkYXRhJ10gaW5zdGFuY2VvZiBGb3JtRGF0YSk7XG4gICAgLy8gYnJlYWtzIGNyb3NzLW9yaWdpbiByZXF1ZXN0cyB3aXRoIGxlZ2FjeSBicm93c2Vyc1xuICAgIGlmICghb1snY3Jvc3NPcmlnaW4nXSAmJiAhaGVhZGVyc1tyZXF1ZXN0ZWRXaXRoXSkgaGVhZGVyc1tyZXF1ZXN0ZWRXaXRoXSA9IGRlZmF1bHRIZWFkZXJzWydyZXF1ZXN0ZWRXaXRoJ11cbiAgICBpZiAoIWhlYWRlcnNbY29udGVudFR5cGVdICYmICFpc0FGb3JtRGF0YSkgaGVhZGVyc1tjb250ZW50VHlwZV0gPSBvWydjb250ZW50VHlwZSddIHx8IGRlZmF1bHRIZWFkZXJzWydjb250ZW50VHlwZSddXG4gICAgZm9yIChoIGluIGhlYWRlcnMpXG4gICAgICBoZWFkZXJzLmhhc093blByb3BlcnR5KGgpICYmICdzZXRSZXF1ZXN0SGVhZGVyJyBpbiBodHRwICYmIGh0dHAuc2V0UmVxdWVzdEhlYWRlcihoLCBoZWFkZXJzW2hdKVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0Q3JlZGVudGlhbHMoaHR0cCwgbykge1xuICAgIGlmICh0eXBlb2Ygb1snd2l0aENyZWRlbnRpYWxzJ10gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBodHRwLndpdGhDcmVkZW50aWFscyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGh0dHAud2l0aENyZWRlbnRpYWxzID0gISFvWyd3aXRoQ3JlZGVudGlhbHMnXVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbmVyYWxDYWxsYmFjayhkYXRhKSB7XG4gICAgbGFzdFZhbHVlID0gZGF0YVxuICB9XG5cbiAgZnVuY3Rpb24gdXJsYXBwZW5kICh1cmwsIHMpIHtcbiAgICByZXR1cm4gdXJsICsgKC9cXD8vLnRlc3QodXJsKSA/ICcmJyA6ICc/JykgKyBzXG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVKc29ucChvLCBmbiwgZXJyLCB1cmwpIHtcbiAgICB2YXIgcmVxSWQgPSB1bmlxaWQrK1xuICAgICAgLCBjYmtleSA9IG9bJ2pzb25wQ2FsbGJhY2snXSB8fCAnY2FsbGJhY2snIC8vIHRoZSAnY2FsbGJhY2snIGtleVxuICAgICAgLCBjYnZhbCA9IG9bJ2pzb25wQ2FsbGJhY2tOYW1lJ10gfHwgcmVxd2VzdC5nZXRjYWxsYmFja1ByZWZpeChyZXFJZClcbiAgICAgICwgY2JyZWcgPSBuZXcgUmVnRXhwKCcoKF58XFxcXD98JiknICsgY2JrZXkgKyAnKT0oW14mXSspJylcbiAgICAgICwgbWF0Y2ggPSB1cmwubWF0Y2goY2JyZWcpXG4gICAgICAsIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxuICAgICAgLCBsb2FkZWQgPSAwXG4gICAgICAsIGlzSUUxMCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignTVNJRSAxMC4wJykgIT09IC0xXG5cbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIGlmIChtYXRjaFszXSA9PT0gJz8nKSB7XG4gICAgICAgIHVybCA9IHVybC5yZXBsYWNlKGNicmVnLCAnJDE9JyArIGNidmFsKSAvLyB3aWxkY2FyZCBjYWxsYmFjayBmdW5jIG5hbWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNidmFsID0gbWF0Y2hbM10gLy8gcHJvdmlkZWQgY2FsbGJhY2sgZnVuYyBuYW1lXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IHVybGFwcGVuZCh1cmwsIGNia2V5ICsgJz0nICsgY2J2YWwpIC8vIG5vIGNhbGxiYWNrIGRldGFpbHMsIGFkZCAnZW1cbiAgICB9XG5cbiAgICB3aW5bY2J2YWxdID0gZ2VuZXJhbENhbGxiYWNrXG5cbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnXG4gICAgc2NyaXB0LnNyYyA9IHVybFxuICAgIHNjcmlwdC5hc3luYyA9IHRydWVcbiAgICBpZiAodHlwZW9mIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgIT09ICd1bmRlZmluZWQnICYmICFpc0lFMTApIHtcbiAgICAgIC8vIG5lZWQgdGhpcyBmb3IgSUUgZHVlIHRvIG91dC1vZi1vcmRlciBvbnJlYWR5c3RhdGVjaGFuZ2UoKSwgYmluZGluZyBzY3JpcHRcbiAgICAgIC8vIGV4ZWN1dGlvbiB0byBhbiBldmVudCBsaXN0ZW5lciBnaXZlcyB1cyBjb250cm9sIG92ZXIgd2hlbiB0aGUgc2NyaXB0XG4gICAgICAvLyBpcyBleGVjdXRlZC4gU2VlIGh0dHA6Ly9qYXVib3VyZy5uZXQvMjAxMC8wNy9sb2FkaW5nLXNjcmlwdC1hcy1vbmNsaWNrLWhhbmRsZXItb2YuaHRtbFxuICAgICAgc2NyaXB0Lmh0bWxGb3IgPSBzY3JpcHQuaWQgPSAnX3JlcXdlc3RfJyArIHJlcUlkXG4gICAgfVxuXG4gICAgc2NyaXB0Lm9ubG9hZCA9IHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoKHNjcmlwdFtyZWFkeVN0YXRlXSAmJiBzY3JpcHRbcmVhZHlTdGF0ZV0gIT09ICdjb21wbGV0ZScgJiYgc2NyaXB0W3JlYWR5U3RhdGVdICE9PSAnbG9hZGVkJykgfHwgbG9hZGVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgICAgc2NyaXB0Lm9ubG9hZCA9IHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsXG4gICAgICBzY3JpcHQub25jbGljayAmJiBzY3JpcHQub25jbGljaygpXG4gICAgICAvLyBDYWxsIHRoZSB1c2VyIGNhbGxiYWNrIHdpdGggdGhlIGxhc3QgdmFsdWUgc3RvcmVkIGFuZCBjbGVhbiB1cCB2YWx1ZXMgYW5kIHNjcmlwdHMuXG4gICAgICBmbihsYXN0VmFsdWUpXG4gICAgICBsYXN0VmFsdWUgPSB1bmRlZmluZWRcbiAgICAgIGhlYWQucmVtb3ZlQ2hpbGQoc2NyaXB0KVxuICAgICAgbG9hZGVkID0gMVxuICAgIH1cblxuICAgIC8vIEFkZCB0aGUgc2NyaXB0IHRvIHRoZSBET00gaGVhZFxuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KVxuXG4gICAgLy8gRW5hYmxlIEpTT05QIHRpbWVvdXRcbiAgICByZXR1cm4ge1xuICAgICAgYWJvcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsXG4gICAgICAgIGVycih7fSwgJ1JlcXVlc3QgaXMgYWJvcnRlZDogdGltZW91dCcsIHt9KVxuICAgICAgICBsYXN0VmFsdWUgPSB1bmRlZmluZWRcbiAgICAgICAgaGVhZC5yZW1vdmVDaGlsZChzY3JpcHQpXG4gICAgICAgIGxvYWRlZCA9IDFcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRSZXF1ZXN0KGZuLCBlcnIpIHtcbiAgICB2YXIgbyA9IHRoaXMub1xuICAgICAgLCBtZXRob2QgPSAob1snbWV0aG9kJ10gfHwgJ0dFVCcpLnRvVXBwZXJDYXNlKClcbiAgICAgICwgdXJsID0gdHlwZW9mIG8gPT09ICdzdHJpbmcnID8gbyA6IG9bJ3VybCddXG4gICAgICAvLyBjb252ZXJ0IG5vbi1zdHJpbmcgb2JqZWN0cyB0byBxdWVyeS1zdHJpbmcgZm9ybSB1bmxlc3Mgb1sncHJvY2Vzc0RhdGEnXSBpcyBmYWxzZVxuICAgICAgLCBkYXRhID0gKG9bJ3Byb2Nlc3NEYXRhJ10gIT09IGZhbHNlICYmIG9bJ2RhdGEnXSAmJiB0eXBlb2Ygb1snZGF0YSddICE9PSAnc3RyaW5nJylcbiAgICAgICAgPyByZXF3ZXN0LnRvUXVlcnlTdHJpbmcob1snZGF0YSddKVxuICAgICAgICA6IChvWydkYXRhJ10gfHwgbnVsbClcbiAgICAgICwgaHR0cFxuICAgICAgLCBzZW5kV2FpdCA9IGZhbHNlXG5cbiAgICAvLyBpZiB3ZSdyZSB3b3JraW5nIG9uIGEgR0VUIHJlcXVlc3QgYW5kIHdlIGhhdmUgZGF0YSB0aGVuIHdlIHNob3VsZCBhcHBlbmRcbiAgICAvLyBxdWVyeSBzdHJpbmcgdG8gZW5kIG9mIFVSTCBhbmQgbm90IHBvc3QgZGF0YVxuICAgIGlmICgob1sndHlwZSddID09ICdqc29ucCcgfHwgbWV0aG9kID09ICdHRVQnKSAmJiBkYXRhKSB7XG4gICAgICB1cmwgPSB1cmxhcHBlbmQodXJsLCBkYXRhKVxuICAgICAgZGF0YSA9IG51bGxcbiAgICB9XG5cbiAgICBpZiAob1sndHlwZSddID09ICdqc29ucCcpIHJldHVybiBoYW5kbGVKc29ucChvLCBmbiwgZXJyLCB1cmwpXG5cbiAgICAvLyBnZXQgdGhlIHhociBmcm9tIHRoZSBmYWN0b3J5IGlmIHBhc3NlZFxuICAgIC8vIGlmIHRoZSBmYWN0b3J5IHJldHVybnMgbnVsbCwgZmFsbC1iYWNrIHRvIG91cnNcbiAgICBodHRwID0gKG8ueGhyICYmIG8ueGhyKG8pKSB8fCB4aHIobylcblxuICAgIGh0dHAub3BlbihtZXRob2QsIHVybCwgb1snYXN5bmMnXSA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWUpXG4gICAgc2V0SGVhZGVycyhodHRwLCBvKVxuICAgIHNldENyZWRlbnRpYWxzKGh0dHAsIG8pXG4gICAgaWYgKHdpblt4RG9tYWluUmVxdWVzdF0gJiYgaHR0cCBpbnN0YW5jZW9mIHdpblt4RG9tYWluUmVxdWVzdF0pIHtcbiAgICAgICAgaHR0cC5vbmxvYWQgPSBmblxuICAgICAgICBodHRwLm9uZXJyb3IgPSBlcnJcbiAgICAgICAgLy8gTk9URTogc2VlXG4gICAgICAgIC8vIGh0dHA6Ly9zb2NpYWwubXNkbi5taWNyb3NvZnQuY29tL0ZvcnVtcy9lbi1VUy9pZXdlYmRldmVsb3BtZW50L3RocmVhZC8zMGVmM2FkZC03NjdjLTQ0MzYtYjhhOS1mMWNhMTliNDgxMmVcbiAgICAgICAgaHR0cC5vbnByb2dyZXNzID0gZnVuY3Rpb24oKSB7fVxuICAgICAgICBzZW5kV2FpdCA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgaHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBoYW5kbGVSZWFkeVN0YXRlKHRoaXMsIGZuLCBlcnIpXG4gICAgfVxuICAgIG9bJ2JlZm9yZSddICYmIG9bJ2JlZm9yZSddKGh0dHApXG4gICAgaWYgKHNlbmRXYWl0KSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaHR0cC5zZW5kKGRhdGEpXG4gICAgICB9LCAyMDApXG4gICAgfSBlbHNlIHtcbiAgICAgIGh0dHAuc2VuZChkYXRhKVxuICAgIH1cbiAgICByZXR1cm4gaHR0cFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxd2VzdChvLCBmbikge1xuICAgIHRoaXMubyA9IG9cbiAgICB0aGlzLmZuID0gZm5cblxuICAgIGluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0VHlwZShoZWFkZXIpIHtcbiAgICAvLyBqc29uLCBqYXZhc2NyaXB0LCB0ZXh0L3BsYWluLCB0ZXh0L2h0bWwsIHhtbFxuICAgIGlmIChoZWFkZXIubWF0Y2goJ2pzb24nKSkgcmV0dXJuICdqc29uJ1xuICAgIGlmIChoZWFkZXIubWF0Y2goJ2phdmFzY3JpcHQnKSkgcmV0dXJuICdqcydcbiAgICBpZiAoaGVhZGVyLm1hdGNoKCd0ZXh0JykpIHJldHVybiAnaHRtbCdcbiAgICBpZiAoaGVhZGVyLm1hdGNoKCd4bWwnKSkgcmV0dXJuICd4bWwnXG4gIH1cblxuICBmdW5jdGlvbiBpbml0KG8sIGZuKSB7XG5cbiAgICB0aGlzLnVybCA9IHR5cGVvZiBvID09ICdzdHJpbmcnID8gbyA6IG9bJ3VybCddXG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbFxuXG4gICAgLy8gd2hldGhlciByZXF1ZXN0IGhhcyBiZWVuIGZ1bGZpbGxlZCBmb3IgcHVycG9zZVxuICAgIC8vIG9mIHRyYWNraW5nIHRoZSBQcm9taXNlc1xuICAgIHRoaXMuX2Z1bGZpbGxlZCA9IGZhbHNlXG4gICAgLy8gc3VjY2VzcyBoYW5kbGVyc1xuICAgIHRoaXMuX3N1Y2Nlc3NIYW5kbGVyID0gZnVuY3Rpb24oKXt9XG4gICAgdGhpcy5fZnVsZmlsbG1lbnRIYW5kbGVycyA9IFtdXG4gICAgLy8gZXJyb3IgaGFuZGxlcnNcbiAgICB0aGlzLl9lcnJvckhhbmRsZXJzID0gW11cbiAgICAvLyBjb21wbGV0ZSAoYm90aCBzdWNjZXNzIGFuZCBmYWlsKSBoYW5kbGVyc1xuICAgIHRoaXMuX2NvbXBsZXRlSGFuZGxlcnMgPSBbXVxuICAgIHRoaXMuX2VycmVkID0gZmFsc2VcbiAgICB0aGlzLl9yZXNwb25zZUFyZ3MgPSB7fVxuXG4gICAgdmFyIHNlbGYgPSB0aGlzXG5cbiAgICBmbiA9IGZuIHx8IGZ1bmN0aW9uICgpIHt9XG5cbiAgICBpZiAob1sndGltZW91dCddKSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGltZWRPdXQoKVxuICAgICAgfSwgb1sndGltZW91dCddKVxuICAgIH1cblxuICAgIGlmIChvWydzdWNjZXNzJ10pIHtcbiAgICAgIHRoaXMuX3N1Y2Nlc3NIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBvWydzdWNjZXNzJ10uYXBwbHkobywgYXJndW1lbnRzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvWydlcnJvciddKSB7XG4gICAgICB0aGlzLl9lcnJvckhhbmRsZXJzLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICBvWydlcnJvciddLmFwcGx5KG8sIGFyZ3VtZW50cylcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKG9bJ2NvbXBsZXRlJ10pIHtcbiAgICAgIHRoaXMuX2NvbXBsZXRlSGFuZGxlcnMucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9bJ2NvbXBsZXRlJ10uYXBwbHkobywgYXJndW1lbnRzKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb21wbGV0ZSAocmVzcCkge1xuICAgICAgb1sndGltZW91dCddICYmIGNsZWFyVGltZW91dChzZWxmLnRpbWVvdXQpXG4gICAgICBzZWxmLnRpbWVvdXQgPSBudWxsXG4gICAgICB3aGlsZSAoc2VsZi5fY29tcGxldGVIYW5kbGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHNlbGYuX2NvbXBsZXRlSGFuZGxlcnMuc2hpZnQoKShyZXNwKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN1Y2Nlc3MgKHJlc3ApIHtcbiAgICAgIHZhciB0eXBlID0gb1sndHlwZSddIHx8IHJlc3AgJiYgc2V0VHlwZShyZXNwLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKSkgLy8gcmVzcCBjYW4gYmUgdW5kZWZpbmVkIGluIElFXG4gICAgICByZXNwID0gKHR5cGUgIT09ICdqc29ucCcpID8gc2VsZi5yZXF1ZXN0IDogcmVzcFxuICAgICAgLy8gdXNlIGdsb2JhbCBkYXRhIGZpbHRlciBvbiByZXNwb25zZSB0ZXh0XG4gICAgICB2YXIgZmlsdGVyZWRSZXNwb25zZSA9IGdsb2JhbFNldHVwT3B0aW9ucy5kYXRhRmlsdGVyKHJlc3AucmVzcG9uc2VUZXh0LCB0eXBlKVxuICAgICAgICAsIHIgPSBmaWx0ZXJlZFJlc3BvbnNlXG4gICAgICB0cnkge1xuICAgICAgICByZXNwLnJlc3BvbnNlVGV4dCA9IHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gY2FuJ3QgYXNzaWduIHRoaXMgaW4gSUU8PTgsIGp1c3QgaWdub3JlXG4gICAgICB9XG4gICAgICBpZiAocikge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnanNvbic6XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3AgPSB3aW4uSlNPTiA/IHdpbi5KU09OLnBhcnNlKHIpIDogZXZhbCgnKCcgKyByICsgJyknKVxuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yKHJlc3AsICdDb3VsZCBub3QgcGFyc2UgSlNPTiBpbiByZXNwb25zZScsIGVycilcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnanMnOlxuICAgICAgICAgIHJlc3AgPSBldmFsKHIpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnaHRtbCc6XG4gICAgICAgICAgcmVzcCA9IHJcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICd4bWwnOlxuICAgICAgICAgIHJlc3AgPSByZXNwLnJlc3BvbnNlWE1MXG4gICAgICAgICAgICAgICYmIHJlc3AucmVzcG9uc2VYTUwucGFyc2VFcnJvciAvLyBJRSB0cm9sb2xvXG4gICAgICAgICAgICAgICYmIHJlc3AucmVzcG9uc2VYTUwucGFyc2VFcnJvci5lcnJvckNvZGVcbiAgICAgICAgICAgICAgJiYgcmVzcC5yZXNwb25zZVhNTC5wYXJzZUVycm9yLnJlYXNvblxuICAgICAgICAgICAgPyBudWxsXG4gICAgICAgICAgICA6IHJlc3AucmVzcG9uc2VYTUxcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNlbGYuX3Jlc3BvbnNlQXJncy5yZXNwID0gcmVzcFxuICAgICAgc2VsZi5fZnVsZmlsbGVkID0gdHJ1ZVxuICAgICAgZm4ocmVzcClcbiAgICAgIHNlbGYuX3N1Y2Nlc3NIYW5kbGVyKHJlc3ApXG4gICAgICB3aGlsZSAoc2VsZi5fZnVsZmlsbG1lbnRIYW5kbGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJlc3AgPSBzZWxmLl9mdWxmaWxsbWVudEhhbmRsZXJzLnNoaWZ0KCkocmVzcClcbiAgICAgIH1cblxuICAgICAgY29tcGxldGUocmVzcClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0aW1lZE91dCgpIHtcbiAgICAgIHNlbGYuX3RpbWVkT3V0ID0gdHJ1ZVxuICAgICAgc2VsZi5yZXF1ZXN0LmFib3J0KCkgICAgICBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlcnJvcihyZXNwLCBtc2csIHQpIHtcbiAgICAgIHJlc3AgPSBzZWxmLnJlcXVlc3RcbiAgICAgIHNlbGYuX3Jlc3BvbnNlQXJncy5yZXNwID0gcmVzcFxuICAgICAgc2VsZi5fcmVzcG9uc2VBcmdzLm1zZyA9IG1zZ1xuICAgICAgc2VsZi5fcmVzcG9uc2VBcmdzLnQgPSB0XG4gICAgICBzZWxmLl9lcnJlZCA9IHRydWVcbiAgICAgIHdoaWxlIChzZWxmLl9lcnJvckhhbmRsZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2VsZi5fZXJyb3JIYW5kbGVycy5zaGlmdCgpKHJlc3AsIG1zZywgdClcbiAgICAgIH1cbiAgICAgIGNvbXBsZXRlKHJlc3ApXG4gICAgfVxuXG4gICAgdGhpcy5yZXF1ZXN0ID0gZ2V0UmVxdWVzdC5jYWxsKHRoaXMsIHN1Y2Nlc3MsIGVycm9yKVxuICB9XG5cbiAgUmVxd2VzdC5wcm90b3R5cGUgPSB7XG4gICAgYWJvcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuX2Fib3J0ZWQgPSB0cnVlXG4gICAgICB0aGlzLnJlcXVlc3QuYWJvcnQoKVxuICAgIH1cblxuICAsIHJldHJ5OiBmdW5jdGlvbiAoKSB7XG4gICAgICBpbml0LmNhbGwodGhpcywgdGhpcy5vLCB0aGlzLmZuKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNtYWxsIGRldmlhdGlvbiBmcm9tIHRoZSBQcm9taXNlcyBBIENvbW1vbkpzIHNwZWNpZmljYXRpb25cbiAgICAgKiBodHRwOi8vd2lraS5jb21tb25qcy5vcmcvd2lraS9Qcm9taXNlcy9BXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBgdGhlbmAgd2lsbCBleGVjdXRlIHVwb24gc3VjY2Vzc2Z1bCByZXF1ZXN0c1xuICAgICAqL1xuICAsIHRoZW46IGZ1bmN0aW9uIChzdWNjZXNzLCBmYWlsKSB7XG4gICAgICBzdWNjZXNzID0gc3VjY2VzcyB8fCBmdW5jdGlvbiAoKSB7fVxuICAgICAgZmFpbCA9IGZhaWwgfHwgZnVuY3Rpb24gKCkge31cbiAgICAgIGlmICh0aGlzLl9mdWxmaWxsZWQpIHtcbiAgICAgICAgdGhpcy5fcmVzcG9uc2VBcmdzLnJlc3AgPSBzdWNjZXNzKHRoaXMuX3Jlc3BvbnNlQXJncy5yZXNwKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9lcnJlZCkge1xuICAgICAgICBmYWlsKHRoaXMuX3Jlc3BvbnNlQXJncy5yZXNwLCB0aGlzLl9yZXNwb25zZUFyZ3MubXNnLCB0aGlzLl9yZXNwb25zZUFyZ3MudClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2Z1bGZpbGxtZW50SGFuZGxlcnMucHVzaChzdWNjZXNzKVxuICAgICAgICB0aGlzLl9lcnJvckhhbmRsZXJzLnB1c2goZmFpbClcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYGFsd2F5c2Agd2lsbCBleGVjdXRlIHdoZXRoZXIgdGhlIHJlcXVlc3Qgc3VjY2VlZHMgb3IgZmFpbHNcbiAgICAgKi9cbiAgLCBhbHdheXM6IGZ1bmN0aW9uIChmbikge1xuICAgICAgaWYgKHRoaXMuX2Z1bGZpbGxlZCB8fCB0aGlzLl9lcnJlZCkge1xuICAgICAgICBmbih0aGlzLl9yZXNwb25zZUFyZ3MucmVzcClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2NvbXBsZXRlSGFuZGxlcnMucHVzaChmbilcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYGZhaWxgIHdpbGwgZXhlY3V0ZSB3aGVuIHRoZSByZXF1ZXN0IGZhaWxzXG4gICAgICovXG4gICwgZmFpbDogZnVuY3Rpb24gKGZuKSB7XG4gICAgICBpZiAodGhpcy5fZXJyZWQpIHtcbiAgICAgICAgZm4odGhpcy5fcmVzcG9uc2VBcmdzLnJlc3AsIHRoaXMuX3Jlc3BvbnNlQXJncy5tc2csIHRoaXMuX3Jlc3BvbnNlQXJncy50KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZXJyb3JIYW5kbGVycy5wdXNoKGZuKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICwgJ2NhdGNoJzogZnVuY3Rpb24gKGZuKSB7XG4gICAgICByZXR1cm4gdGhpcy5mYWlsKGZuKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcXdlc3QobywgZm4pIHtcbiAgICByZXR1cm4gbmV3IFJlcXdlc3QobywgZm4pXG4gIH1cblxuICAvLyBub3JtYWxpemUgbmV3bGluZSB2YXJpYW50cyBhY2NvcmRpbmcgdG8gc3BlYyAtPiBDUkxGXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZShzKSB7XG4gICAgcmV0dXJuIHMgPyBzLnJlcGxhY2UoL1xccj9cXG4vZywgJ1xcclxcbicpIDogJydcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlcmlhbChlbCwgY2IpIHtcbiAgICB2YXIgbiA9IGVsLm5hbWVcbiAgICAgICwgdCA9IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKVxuICAgICAgLCBvcHRDYiA9IGZ1bmN0aW9uIChvKSB7XG4gICAgICAgICAgLy8gSUUgZ2l2ZXMgdmFsdWU9XCJcIiBldmVuIHdoZXJlIHRoZXJlIGlzIG5vIHZhbHVlIGF0dHJpYnV0ZVxuICAgICAgICAgIC8vICdzcGVjaWZpZWQnIHJlZjogaHR0cDovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTMtQ29yZS9jb3JlLmh0bWwjSUQtODYyNTI5MjczXG4gICAgICAgICAgaWYgKG8gJiYgIW9bJ2Rpc2FibGVkJ10pXG4gICAgICAgICAgICBjYihuLCBub3JtYWxpemUob1snYXR0cmlidXRlcyddWyd2YWx1ZSddICYmIG9bJ2F0dHJpYnV0ZXMnXVsndmFsdWUnXVsnc3BlY2lmaWVkJ10gPyBvWyd2YWx1ZSddIDogb1sndGV4dCddKSlcbiAgICAgICAgfVxuICAgICAgLCBjaCwgcmEsIHZhbCwgaVxuXG4gICAgLy8gZG9uJ3Qgc2VyaWFsaXplIGVsZW1lbnRzIHRoYXQgYXJlIGRpc2FibGVkIG9yIHdpdGhvdXQgYSBuYW1lXG4gICAgaWYgKGVsLmRpc2FibGVkIHx8ICFuKSByZXR1cm5cblxuICAgIHN3aXRjaCAodCkge1xuICAgIGNhc2UgJ2lucHV0JzpcbiAgICAgIGlmICghL3Jlc2V0fGJ1dHRvbnxpbWFnZXxmaWxlL2kudGVzdChlbC50eXBlKSkge1xuICAgICAgICBjaCA9IC9jaGVja2JveC9pLnRlc3QoZWwudHlwZSlcbiAgICAgICAgcmEgPSAvcmFkaW8vaS50ZXN0KGVsLnR5cGUpXG4gICAgICAgIHZhbCA9IGVsLnZhbHVlXG4gICAgICAgIC8vIFdlYktpdCBnaXZlcyB1cyBcIlwiIGluc3RlYWQgb2YgXCJvblwiIGlmIGEgY2hlY2tib3ggaGFzIG5vIHZhbHVlLCBzbyBjb3JyZWN0IGl0IGhlcmVcbiAgICAgICAgOyghKGNoIHx8IHJhKSB8fCBlbC5jaGVja2VkKSAmJiBjYihuLCBub3JtYWxpemUoY2ggJiYgdmFsID09PSAnJyA/ICdvbicgOiB2YWwpKVxuICAgICAgfVxuICAgICAgYnJlYWtcbiAgICBjYXNlICd0ZXh0YXJlYSc6XG4gICAgICBjYihuLCBub3JtYWxpemUoZWwudmFsdWUpKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgaWYgKGVsLnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ3NlbGVjdC1vbmUnKSB7XG4gICAgICAgIG9wdENiKGVsLnNlbGVjdGVkSW5kZXggPj0gMCA/IGVsLm9wdGlvbnNbZWwuc2VsZWN0ZWRJbmRleF0gOiBudWxsKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChpID0gMDsgZWwubGVuZ3RoICYmIGkgPCBlbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGVsLm9wdGlvbnNbaV0uc2VsZWN0ZWQgJiYgb3B0Q2IoZWwub3B0aW9uc1tpXSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICAvLyBjb2xsZWN0IHVwIGFsbCBmb3JtIGVsZW1lbnRzIGZvdW5kIGZyb20gdGhlIHBhc3NlZCBhcmd1bWVudCBlbGVtZW50cyBhbGxcbiAgLy8gdGhlIHdheSBkb3duIHRvIGNoaWxkIGVsZW1lbnRzOyBwYXNzIGEgJzxmb3JtPicgb3IgZm9ybSBmaWVsZHMuXG4gIC8vIGNhbGxlZCB3aXRoICd0aGlzJz1jYWxsYmFjayB0byB1c2UgZm9yIHNlcmlhbCgpIG9uIGVhY2ggZWxlbWVudFxuICBmdW5jdGlvbiBlYWNoRm9ybUVsZW1lbnQoKSB7XG4gICAgdmFyIGNiID0gdGhpc1xuICAgICAgLCBlLCBpXG4gICAgICAsIHNlcmlhbGl6ZVN1YnRhZ3MgPSBmdW5jdGlvbiAoZSwgdGFncykge1xuICAgICAgICAgIHZhciBpLCBqLCBmYVxuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0YWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmYSA9IGVbYnlUYWddKHRhZ3NbaV0pXG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgZmEubGVuZ3RoOyBqKyspIHNlcmlhbChmYVtqXSwgY2IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBlID0gYXJndW1lbnRzW2ldXG4gICAgICBpZiAoL2lucHV0fHNlbGVjdHx0ZXh0YXJlYS9pLnRlc3QoZS50YWdOYW1lKSkgc2VyaWFsKGUsIGNiKVxuICAgICAgc2VyaWFsaXplU3VidGFncyhlLCBbICdpbnB1dCcsICdzZWxlY3QnLCAndGV4dGFyZWEnIF0pXG4gICAgfVxuICB9XG5cbiAgLy8gc3RhbmRhcmQgcXVlcnkgc3RyaW5nIHN0eWxlIHNlcmlhbGl6YXRpb25cbiAgZnVuY3Rpb24gc2VyaWFsaXplUXVlcnlTdHJpbmcoKSB7XG4gICAgcmV0dXJuIHJlcXdlc3QudG9RdWVyeVN0cmluZyhyZXF3ZXN0LnNlcmlhbGl6ZUFycmF5LmFwcGx5KG51bGwsIGFyZ3VtZW50cykpXG4gIH1cblxuICAvLyB7ICduYW1lJzogJ3ZhbHVlJywgLi4uIH0gc3R5bGUgc2VyaWFsaXphdGlvblxuICBmdW5jdGlvbiBzZXJpYWxpemVIYXNoKCkge1xuICAgIHZhciBoYXNoID0ge31cbiAgICBlYWNoRm9ybUVsZW1lbnQuYXBwbHkoZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgICBpZiAobmFtZSBpbiBoYXNoKSB7XG4gICAgICAgIGhhc2hbbmFtZV0gJiYgIWlzQXJyYXkoaGFzaFtuYW1lXSkgJiYgKGhhc2hbbmFtZV0gPSBbaGFzaFtuYW1lXV0pXG4gICAgICAgIGhhc2hbbmFtZV0ucHVzaCh2YWx1ZSlcbiAgICAgIH0gZWxzZSBoYXNoW25hbWVdID0gdmFsdWVcbiAgICB9LCBhcmd1bWVudHMpXG4gICAgcmV0dXJuIGhhc2hcbiAgfVxuXG4gIC8vIFsgeyBuYW1lOiAnbmFtZScsIHZhbHVlOiAndmFsdWUnIH0sIC4uLiBdIHN0eWxlIHNlcmlhbGl6YXRpb25cbiAgcmVxd2VzdC5zZXJpYWxpemVBcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJyID0gW11cbiAgICBlYWNoRm9ybUVsZW1lbnQuYXBwbHkoZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgICBhcnIucHVzaCh7bmFtZTogbmFtZSwgdmFsdWU6IHZhbHVlfSlcbiAgICB9LCBhcmd1bWVudHMpXG4gICAgcmV0dXJuIGFyclxuICB9XG5cbiAgcmVxd2VzdC5zZXJpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiAnJ1xuICAgIHZhciBvcHQsIGZuXG4gICAgICAsIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApXG5cbiAgICBvcHQgPSBhcmdzLnBvcCgpXG4gICAgb3B0ICYmIG9wdC5ub2RlVHlwZSAmJiBhcmdzLnB1c2gob3B0KSAmJiAob3B0ID0gbnVsbClcbiAgICBvcHQgJiYgKG9wdCA9IG9wdC50eXBlKVxuXG4gICAgaWYgKG9wdCA9PSAnbWFwJykgZm4gPSBzZXJpYWxpemVIYXNoXG4gICAgZWxzZSBpZiAob3B0ID09ICdhcnJheScpIGZuID0gcmVxd2VzdC5zZXJpYWxpemVBcnJheVxuICAgIGVsc2UgZm4gPSBzZXJpYWxpemVRdWVyeVN0cmluZ1xuXG4gICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGFyZ3MpXG4gIH1cblxuICByZXF3ZXN0LnRvUXVlcnlTdHJpbmcgPSBmdW5jdGlvbiAobywgdHJhZCkge1xuICAgIHZhciBwcmVmaXgsIGlcbiAgICAgICwgdHJhZGl0aW9uYWwgPSB0cmFkIHx8IGZhbHNlXG4gICAgICAsIHMgPSBbXVxuICAgICAgLCBlbmMgPSBlbmNvZGVVUklDb21wb25lbnRcbiAgICAgICwgYWRkID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAvLyBJZiB2YWx1ZSBpcyBhIGZ1bmN0aW9uLCBpbnZva2UgaXQgYW5kIHJldHVybiBpdHMgdmFsdWVcbiAgICAgICAgICB2YWx1ZSA9ICgnZnVuY3Rpb24nID09PSB0eXBlb2YgdmFsdWUpID8gdmFsdWUoKSA6ICh2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZSlcbiAgICAgICAgICBzW3MubGVuZ3RoXSA9IGVuYyhrZXkpICsgJz0nICsgZW5jKHZhbHVlKVxuICAgICAgICB9XG4gICAgLy8gSWYgYW4gYXJyYXkgd2FzIHBhc3NlZCBpbiwgYXNzdW1lIHRoYXQgaXQgaXMgYW4gYXJyYXkgb2YgZm9ybSBlbGVtZW50cy5cbiAgICBpZiAoaXNBcnJheShvKSkge1xuICAgICAgZm9yIChpID0gMDsgbyAmJiBpIDwgby5sZW5ndGg7IGkrKykgYWRkKG9baV1bJ25hbWUnXSwgb1tpXVsndmFsdWUnXSlcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWYgdHJhZGl0aW9uYWwsIGVuY29kZSB0aGUgXCJvbGRcIiB3YXkgKHRoZSB3YXkgMS4zLjIgb3Igb2xkZXJcbiAgICAgIC8vIGRpZCBpdCksIG90aGVyd2lzZSBlbmNvZGUgcGFyYW1zIHJlY3Vyc2l2ZWx5LlxuICAgICAgZm9yIChwcmVmaXggaW4gbykge1xuICAgICAgICBpZiAoby5oYXNPd25Qcm9wZXJ0eShwcmVmaXgpKSBidWlsZFBhcmFtcyhwcmVmaXgsIG9bcHJlZml4XSwgdHJhZGl0aW9uYWwsIGFkZClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzcGFjZXMgc2hvdWxkIGJlICsgYWNjb3JkaW5nIHRvIHNwZWNcbiAgICByZXR1cm4gcy5qb2luKCcmJykucmVwbGFjZSgvJTIwL2csICcrJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1aWxkUGFyYW1zKHByZWZpeCwgb2JqLCB0cmFkaXRpb25hbCwgYWRkKSB7XG4gICAgdmFyIG5hbWUsIGksIHZcbiAgICAgICwgcmJyYWNrZXQgPSAvXFxbXFxdJC9cblxuICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgIC8vIFNlcmlhbGl6ZSBhcnJheSBpdGVtLlxuICAgICAgZm9yIChpID0gMDsgb2JqICYmIGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdiA9IG9ialtpXVxuICAgICAgICBpZiAodHJhZGl0aW9uYWwgfHwgcmJyYWNrZXQudGVzdChwcmVmaXgpKSB7XG4gICAgICAgICAgLy8gVHJlYXQgZWFjaCBhcnJheSBpdGVtIGFzIGEgc2NhbGFyLlxuICAgICAgICAgIGFkZChwcmVmaXgsIHYpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnVpbGRQYXJhbXMocHJlZml4ICsgJ1snICsgKHR5cGVvZiB2ID09PSAnb2JqZWN0JyA/IGkgOiAnJykgKyAnXScsIHYsIHRyYWRpdGlvbmFsLCBhZGQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9iaiAmJiBvYmoudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgIC8vIFNlcmlhbGl6ZSBvYmplY3QgaXRlbS5cbiAgICAgIGZvciAobmFtZSBpbiBvYmopIHtcbiAgICAgICAgYnVpbGRQYXJhbXMocHJlZml4ICsgJ1snICsgbmFtZSArICddJywgb2JqW25hbWVdLCB0cmFkaXRpb25hbCwgYWRkKVxuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNlcmlhbGl6ZSBzY2FsYXIgaXRlbS5cbiAgICAgIGFkZChwcmVmaXgsIG9iailcbiAgICB9XG4gIH1cblxuICByZXF3ZXN0LmdldGNhbGxiYWNrUHJlZml4ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBjYWxsYmFja1ByZWZpeFxuICB9XG5cbiAgLy8galF1ZXJ5IGFuZCBaZXB0byBjb21wYXRpYmlsaXR5LCBkaWZmZXJlbmNlcyBjYW4gYmUgcmVtYXBwZWQgaGVyZSBzbyB5b3UgY2FuIGNhbGxcbiAgLy8gLmFqYXguY29tcGF0KG9wdGlvbnMsIGNhbGxiYWNrKVxuICByZXF3ZXN0LmNvbXBhdCA9IGZ1bmN0aW9uIChvLCBmbikge1xuICAgIGlmIChvKSB7XG4gICAgICBvWyd0eXBlJ10gJiYgKG9bJ21ldGhvZCddID0gb1sndHlwZSddKSAmJiBkZWxldGUgb1sndHlwZSddXG4gICAgICBvWydkYXRhVHlwZSddICYmIChvWyd0eXBlJ10gPSBvWydkYXRhVHlwZSddKVxuICAgICAgb1snanNvbnBDYWxsYmFjayddICYmIChvWydqc29ucENhbGxiYWNrTmFtZSddID0gb1snanNvbnBDYWxsYmFjayddKSAmJiBkZWxldGUgb1snanNvbnBDYWxsYmFjayddXG4gICAgICBvWydqc29ucCddICYmIChvWydqc29ucENhbGxiYWNrJ10gPSBvWydqc29ucCddKVxuICAgIH1cbiAgICByZXR1cm4gbmV3IFJlcXdlc3QobywgZm4pXG4gIH1cblxuICByZXF3ZXN0LmFqYXhTZXR1cCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgICBmb3IgKHZhciBrIGluIG9wdGlvbnMpIHtcbiAgICAgIGdsb2JhbFNldHVwT3B0aW9uc1trXSA9IG9wdGlvbnNba11cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVxd2VzdFxufSk7XG4iXX0=
