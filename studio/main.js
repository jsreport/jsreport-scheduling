/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ScheduleEditor = __webpack_require__(1);
	
	var _ScheduleEditor2 = _interopRequireDefault(_ScheduleEditor);
	
	var _ScheduleProperties = __webpack_require__(21);
	
	var _ScheduleProperties2 = _interopRequireDefault(_ScheduleProperties);
	
	var _DownloadButton = __webpack_require__(29);
	
	var _DownloadButton2 = _interopRequireDefault(_DownloadButton);
	
	var _jsreportStudio = __webpack_require__(4);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	_jsreportStudio2.default.initializeListeners.push(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
	  return regeneratorRuntime.wrap(function _callee$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          if (!(_jsreportStudio2.default.authentication && !_jsreportStudio2.default.authentication.user.isAdmin)) {
	            _context.next = 2;
	            break;
	          }
	
	          return _context.abrupt('return');
	
	        case 2:
	
	          _jsreportStudio2.default.addEntitySet({
	            name: 'schedules',
	            faIcon: 'fa-calendar',
	            visibleName: 'schedule',
	            entityTreePosition: 400
	          });
	          _jsreportStudio2.default.addEditorComponent('schedules', _ScheduleEditor2.default);
	          _jsreportStudio2.default.addPropertiesComponent(_ScheduleProperties2.default.title, _ScheduleProperties2.default, function (entity) {
	            return entity.__entitySet === 'schedules';
	          });
	          _jsreportStudio2.default.addToolbarComponent(_DownloadButton2.default);
	
	        case 6:
	        case 'end':
	          return _context.stop();
	      }
	    }
	  }, _callee, undefined);
	})));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactList = __webpack_require__(3);
	
	var _reactList2 = _interopRequireDefault(_reactList);
	
	var _jsreportStudio = __webpack_require__(4);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	var _debounce2 = __webpack_require__(5);
	
	var _debounce3 = _interopRequireDefault(_debounce2);
	
	var _ScheduleEditor = __webpack_require__(17);
	
	var _ScheduleEditor2 = _interopRequireDefault(_ScheduleEditor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _activeReport = void 0;
	
	var ScheduleEditor = function (_Component) {
	  _inherits(ScheduleEditor, _Component);
	
	  function ScheduleEditor() {
	    var _this2 = this;
	
	    _classCallCheck(this, ScheduleEditor);
	
	    var _this = _possibleConstructorReturn(this, (ScheduleEditor.__proto__ || Object.getPrototypeOf(ScheduleEditor)).call(this));
	
	    _this.state = { tasks: [], active: null, running: false };
	    _this.skip = 0;
	    _this.top = 50;
	    _this.pending = 0;
	    _this.updateNextRun = (0, _debounce3.default)(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
	      var response;
	      return regeneratorRuntime.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              if (!_this.props.entity.cron) {
	                _context.next = 5;
	                break;
	              }
	
	              _context.next = 3;
	              return _jsreportStudio2.default.api.get('/api/scheduling/nextRun/' + encodeURIComponent(_this.props.entity.cron));
	
	            case 3:
	              response = _context.sent;
	
	              _this.setState({ nextRun: response });
	
	            case 5:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, _this2);
	    })), 500);
	    return _this;
	  }
	
	  _createClass(ScheduleEditor, [{
	    key: 'onTabActive',
	    value: function onTabActive() {
	      this.reloadTasks();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.updateNextRun.cancel();
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.updateNextRun();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      if (this.props.entity.cron !== prevProps.entity.cron) {
	        this.updateNextRun();
	      }
	    }
	  }, {
	    key: 'openReport',
	    value: function () {
	      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(t) {
	        var reports, report;
	        return regeneratorRuntime.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                if (!(t.state === 'success')) {
	                  _context2.next = 10;
	                  break;
	                }
	
	                _context2.next = 3;
	                return _jsreportStudio2.default.api.get('/odata/reports?$filter=taskId eq \'' + t._id + '\'');
	
	              case 3:
	                reports = _context2.sent;
	                report = reports.value[0];
	
	
	                if (report.contentType === 'text/html' || report.contentType === 'text/plain' || report.contentType === 'application/pdf' || report.contentType && report.contentType.indexOf('image') !== -1) {
	                  _jsreportStudio2.default.setPreviewFrameSrc('/reports/' + report._id + '/content');
	                } else {
	                  window.open(_jsreportStudio2.default.rootUrl + '/reports/' + report._id + '/attachment', '_self');
	                }
	
	                this.setState({ active: t._id });
	                _activeReport = report;
	                _context2.next = 13;
	                break;
	
	              case 10:
	                _activeReport = null;
	                _jsreportStudio2.default.setPreviewFrameSrc('data:text/html;charset=utf-8,' + encodeURI(t.error || t.state));
	                this.setState({ active: null });
	
	              case 13:
	              case 'end':
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));
	
	      function openReport(_x) {
	        return _ref2.apply(this, arguments);
	      }
	
	      return openReport;
	    }()
	  }, {
	    key: 'reloadTasks',
	    value: function () {
	      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
	        return regeneratorRuntime.wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                this.skip = 0;
	                this.top = 50;
	                this.pending = 0;
	
	                this.lazyFetch(true);
	
	              case 4:
	              case 'end':
	                return _context3.stop();
	            }
	          }
	        }, _callee3, this);
	      }));
	
	      function reloadTasks() {
	        return _ref3.apply(this, arguments);
	      }
	
	      return reloadTasks;
	    }()
	  }, {
	    key: 'lazyFetch',
	    value: function () {
	      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(replace) {
	        var response, tasks;
	        return regeneratorRuntime.wrap(function _callee4$(_context4) {
	          while (1) {
	            switch (_context4.prev = _context4.next) {
	              case 0:
	                if (!this.loading) {
	                  _context4.next = 2;
	                  break;
	                }
	
	                return _context4.abrupt('return');
	
	              case 2:
	
	                this.loading = true;
	                _context4.next = 5;
	                return _jsreportStudio2.default.api.get('/odata/tasks?$orderby=finishDate desc&$count=true&$top=' + this.top + '&$skip=' + this.skip + '&$filter=scheduleShortid eq \'' + this.props.entity.shortid + '\'');
	
	              case 5:
	                response = _context4.sent;
	
	                this.skip += this.top;
	                this.loading = false;
	
	                tasks = void 0;
	
	
	                if (replace) {
	                  tasks = [];
	                } else {
	                  tasks = this.state.tasks;
	                }
	
	                this.setState({ tasks: tasks.concat(response.value), count: response['@odata.count'] });
	                if (this.state.tasks.length <= this.pending && response.value.length) {
	                  this.lazyFetch();
	                }
	
	              case 12:
	              case 'end':
	                return _context4.stop();
	            }
	          }
	        }, _callee4, this);
	      }));
	
	      function lazyFetch(_x2) {
	        return _ref4.apply(this, arguments);
	      }
	
	      return lazyFetch;
	    }()
	  }, {
	    key: 'runNow',
	    value: function () {
	      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
	        return regeneratorRuntime.wrap(function _callee5$(_context5) {
	          while (1) {
	            switch (_context5.prev = _context5.next) {
	              case 0:
	                this.setState({
	                  running: true
	                });
	
	                _context5.prev = 1;
	                _context5.next = 4;
	                return _jsreportStudio2.default.api.post('/api/scheduling/runNow', {
	                  data: {
	                    scheduleId: this.props.entity._id
	                  }
	                });
	
	              case 4:
	
	                this.reloadTasks();
	
	              case 5:
	                _context5.prev = 5;
	
	                this.setState({
	                  running: false
	                });
	                return _context5.finish(5);
	
	              case 8:
	              case 'end':
	                return _context5.stop();
	            }
	          }
	        }, _callee5, this, [[1,, 5, 8]]);
	      }));
	
	      function runNow() {
	        return _ref5.apply(this, arguments);
	      }
	
	      return runNow;
	    }()
	  }, {
	    key: 'tryRenderItem',
	    value: function tryRenderItem(index) {
	      var task = this.state.tasks[index];
	      if (!task) {
	        this.pending = Math.max(this.pending, index);
	        this.lazyFetch();
	        return _react2.default.createElement(
	          'tr',
	          { key: index },
	          _react2.default.createElement(
	            'td',
	            null,
	            _react2.default.createElement('i', { className: 'fa fa-spinner fa-spin fa-fw' })
	          )
	        );
	      }
	
	      return this.renderItem(task, index);
	    }
	  }, {
	    key: 'renderItem',
	    value: function renderItem(task, index) {
	      var _this3 = this;
	
	      return _react2.default.createElement(
	        'tr',
	        {
	          key: index, className: this.state.active === task._id ? 'active' : '',
	          onClick: function onClick() {
	            return _this3.openReport(task);
	          } },
	        _react2.default.createElement(
	          'td',
	          null,
	          _react2.default.createElement(
	            'span',
	            {
	              className: _ScheduleEditor2.default.state + ' ' + (task.state === 'error' ? _ScheduleEditor2.default.error : task.state === 'success' ? _ScheduleEditor2.default.success : _ScheduleEditor2.default.canceled) },
	            task.state
	          )
	        ),
	        _react2.default.createElement(
	          'td',
	          null,
	          _react2.default.createElement(
	            'span',
	            { className: _ScheduleEditor2.default.value },
	            task.creationDate ? task.creationDate.toLocaleString() : ''
	          )
	        ),
	        _react2.default.createElement(
	          'td',
	          null,
	          _react2.default.createElement(
	            'div',
	            { className: _ScheduleEditor2.default.value },
	            task.finishDate ? task.finishDate.toLocaleString() : ''
	          )
	        )
	      );
	    }
	  }, {
	    key: 'renderItems',
	    value: function renderItems(items, ref) {
	      return _react2.default.createElement(
	        'table',
	        { className: 'table', ref: ref },
	        _react2.default.createElement(
	          'thead',
	          null,
	          _react2.default.createElement(
	            'tr',
	            null,
	            _react2.default.createElement(
	              'th',
	              null,
	              'state'
	            ),
	            _react2.default.createElement(
	              'th',
	              null,
	              'start'
	            ),
	            _react2.default.createElement(
	              'th',
	              null,
	              'finish'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'tbody',
	          null,
	          items
	        )
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;
	
	      var entity = this.props.entity;
	      var _state = this.state,
	          count = _state.count,
	          nextRun = _state.nextRun;
	
	      nextRun = nextRun || entity.nextRun;
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'block custom-editor' },
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'h1',
	            null,
	            _react2.default.createElement('i', { className: 'fa fa-calendar' }),
	            ' ',
	            entity.name
	          ),
	          nextRun ? _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'span',
	              null,
	              'next run\xA0\xA0'
	            ),
	            _react2.default.createElement(
	              'small',
	              null,
	              nextRun.toLocaleString()
	            ),
	            !this.props.entity.__isNew && _react2.default.createElement(
	              'button',
	              {
	                disabled: this.state.running,
	                style: this.state.running ? { color: '#c6c6c6' } : {},
	                className: 'button confirmation',
	                onClick: function onClick() {
	                  return _this4.runNow();
	                }
	              },
	              _react2.default.createElement('i', { className: 'fa fa-play' }),
	              ' ',
	              _react2.default.createElement(
	                'span',
	                null,
	                this.state.running ? 'Running..' : 'Run now'
	              )
	            )
	          ) : _react2.default.createElement(
	            'div',
	            null,
	            'Not planned yet. Fill CRON expression and report template in the properties.'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _ScheduleEditor2.default.listContainer + ' block-item' },
	          _react2.default.createElement(_reactList2.default, {
	            type: 'uniform', itemsRenderer: this.renderItems, itemRenderer: function itemRenderer(index) {
	              return _this4.tryRenderItem(index);
	            },
	            length: count
	          })
	        )
	      );
	    }
	  }], [{
	    key: 'ActiveReport',
	    get: function get() {
	      return _activeReport;
	    }
	  }]);
	
	  return ScheduleEditor;
	}(_react.Component);
	
	exports.default = ScheduleEditor;
	
	
	ScheduleEditor.propTypes = {
	  entity: _react2.default.PropTypes.object.isRequired,
	  onUpdate: _react2.default.PropTypes.func.isRequired
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = Studio.libraries['react'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = Studio.libraries['react-list'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = Studio;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(6),
	    now = __webpack_require__(7),
	    toNumber = __webpack_require__(10);
	
	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;
	
	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	
	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;
	
	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }
	
	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }
	
	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        timeWaiting = wait - timeSinceLastCall;
	
	    return maxing
	      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
	      : timeWaiting;
	  }
	
	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;
	
	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }
	
	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }
	
	  function trailingEdge(time) {
	    timerId = undefined;
	
	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }
	
	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }
	
	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }
	
	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);
	
	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;
	
	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}
	
	module.exports = debounce;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(8);
	
	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root.Date.now();
	};
	
	module.exports = now;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(9);
	
	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	module.exports = root;


/***/ },
/* 9 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
	
	module.exports = freeGlobal;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(6),
	    isSymbol = __webpack_require__(11);
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	module.exports = toNumber;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(12),
	    isObjectLike = __webpack_require__(16);
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}
	
	module.exports = isSymbol;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(13),
	    getRawTag = __webpack_require__(14),
	    objectToString = __webpack_require__(15);
	
	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';
	
	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
	
	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}
	
	module.exports = baseGetTag;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(8);
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	module.exports = Symbol;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(13);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;
	
	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
	
	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];
	
	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}
	
	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}
	
	module.exports = getRawTag;


/***/ },
/* 15 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;
	
	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}
	
	module.exports = objectToString;


/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(18);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!./../node_modules/postcss-loader/index.js!./../node_modules/sass-loader/index.js?outputStyle=expanded&sourceMap!./ScheduleEditor.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!./../node_modules/postcss-loader/index.js!./../node_modules/sass-loader/index.js?outputStyle=expanded&sourceMap!./ScheduleEditor.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports
	
	
	// module
	exports.push([module.id, ".listContainer___aJHAE {\n  margin-top: 1rem;\n  overflow: auto;\n  position: relative;\n  padding: 1rem;\n  min-height: 0;\n  height: auto;\n}\n\n.listContainer___aJHAE > div {\n  width: 95%;\n  position: absolute !important;\n}\n\n.state___1rOi5 {\n  font-size: 0.8rem;\n  padding: 0.3rem;\n  display: inline-block;\n  text-align: center;\n  min-width: 4rem;\n}\n\n.error___3G79z {\n  background-color: #da532c;\n  color: white;\n}\n\n.cancelled___1OTeY {\n  background-color: orange;\n  color: white;\n}\n\n.success___z5MBj {\n  background-color: #4CAF50;\n  color: white;\n}\n", "", {"version":3,"sources":["/./studio/studio/ScheduleEditor.scss"],"names":[],"mappings":"AAAA;EACE,iBAAgB;EAChB,eAAc;EACd,mBAAkB;EAClB,cAAa;EACb,cAAa;EACb,aAAY;CACb;;AAED;EAEE,WAAU;EAEV,8BAA6B;CAC9B;;AAED;EACE,kBAAiB;EACjB,gBAAe;EACf,sBAAqB;EACrB,mBAAkB;EAClB,gBAAe;CAChB;;AAED;EACE,0BAAyB;EACzB,aAAY;CACb;;AAED;EACE,yBAAwB;EACxB,aAAY;CACb;;AAED;EACE,0BAAyB;EACzB,aAAY;CACb","file":"ScheduleEditor.scss","sourcesContent":[".listContainer {\n  margin-top: 1rem;\n  overflow: auto;\n  position: relative;\n  padding: 1rem;\n  min-height: 0;\n  height: auto;\n}\n\n.listContainer > div {\n  // it somehow shows the horizontal scrollbar even when no needeit, this workaround to hide it\n  width: 95%;\n  // the tabs height based on flex box is otherwise wrongly calculated\n  position: absolute !important;\n}\n\n.state {\n  font-size: 0.8rem;\n  padding: 0.3rem;\n  display: inline-block;\n  text-align: center;\n  min-width: 4rem;\n}\n\n.error {\n  background-color: #da532c;\n  color: white;\n}\n\n.cancelled {\n  background-color: orange;\n  color: white;\n}\n\n.success {\n  background-color: #4CAF50;\n  color: white;\n}\n\n"],"sourceRoot":"webpack://"}]);
	
	// exports
	exports.locals = {
		"listContainer": "listContainer___aJHAE",
		"state": "state___1rOi5",
		"error": "error___3G79z",
		"cancelled": "cancelled___1OTeY",
		"success": "success___z5MBj"
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _ordinalNumberSuffix = __webpack_require__(22);
	
	var _ordinalNumberSuffix2 = _interopRequireDefault(_ordinalNumberSuffix);
	
	var _cronBuilder = __webpack_require__(23);
	
	var _cronBuilder2 = _interopRequireDefault(_cronBuilder);
	
	var _cronstrue = __webpack_require__(24);
	
	var _cronstrue2 = _interopRequireDefault(_cronstrue);
	
	var _HourTimePicker = __webpack_require__(25);
	
	var _HourTimePicker2 = _interopRequireDefault(_HourTimePicker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ScheduleProperties = function (_Component) {
	  _inherits(ScheduleProperties, _Component);
	
	  function ScheduleProperties(props) {
	    _classCallCheck(this, ScheduleProperties);
	
	    var _this = _possibleConstructorReturn(this, (ScheduleProperties.__proto__ || Object.getPrototypeOf(ScheduleProperties)).call(this, props));
	
	    _this.state = {
	      useExpression: true,
	      showHour: false,
	      showMinute: false,
	      showDay: false,
	      showMonth: false,
	      selectedPeriod: '',
	      selectedHour: null,
	      selectedMinute: null,
	      selectedDay: null,
	      selectedMonth: null,
	      days: []
	    };
	    return _this;
	  }
	
	  _createClass(ScheduleProperties, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.normalizeUIState(this.props.entity);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.removeInvalidTemplateReferences();
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      // when component changes because another schedule is selected
	      // or when saving a new schedule
	      if (this.props.entity._id !== nextProps.entity._id) {
	        this.normalizeUIState(nextProps.entity);
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this.removeInvalidTemplateReferences();
	    }
	  }, {
	    key: 'normalizeUIState',
	    value: function normalizeUIState(entity) {
	      var cronInfo = void 0;
	
	      if (entity.__isNew || !entity.cron) {
	        cronInfo = this.onPeriodChange('', true);
	      } else {
	        cronInfo = this.getCronInformation(entity.cron);
	      }
	
	      if (cronInfo) {
	        cronInfo.useExpression = false;
	      } else {
	        // if we couldn't parse the cron for the UI
	        // reset values and enable the raw expression input.
	        // false is returned when we want to still show the value in the UI editor
	        if (cronInfo === false) {
	          cronInfo = this.onPeriodChange('', true);
	          cronInfo.useExpression = false;
	        } else {
	          cronInfo = this.onPeriodChange('', true);
	          cronInfo.useExpression = true;
	        }
	      }
	
	      this.setState(cronInfo);
	    }
	  }, {
	    key: 'getCronInformation',
	    value: function getCronInformation(cron) {
	      if (cron == null || cron === '') {
	        return false;
	      }
	
	      try {
	        var cronExp = new _cronBuilder2.default(cron);
	        var parsedCron = cronExp.getAll();
	        var cronInfo = void 0;
	        var selectedPeriod = void 0;
	        var selectedHour = void 0;
	        var selectedMinute = void 0;
	        var selectedDay = void 0;
	        var selectedMonth = void 0;
	        var selectedDayOfTheMonth = void 0;
	        var selectedDayOfTheWeek = void 0;
	
	        // our cron editor doesn't support complex values
	        if (parsedCron.dayOfTheMonth.length !== 1 || parsedCron.dayOfTheWeek.length !== 1 || parsedCron.hour.length !== 1 || parsedCron.minute.length !== 1 || parsedCron.month.length !== 1) {
	          return null;
	        }
	
	        if (parsedCron.dayOfTheMonth[0] === '*' || !isNaN(parseInt(parsedCron.dayOfTheMonth[0], 10))) {
	          selectedDayOfTheMonth = parsedCron.dayOfTheMonth[0] !== '*' ? parseInt(parsedCron.dayOfTheMonth[0], 10) : parsedCron.dayOfTheMonth[0];
	        }
	
	        if (parsedCron.dayOfTheWeek[0] === '*' || !isNaN(parseInt(parsedCron.dayOfTheWeek[0], 10))) {
	          selectedDayOfTheWeek = parsedCron.dayOfTheWeek[0] !== '*' ? parseInt(parsedCron.dayOfTheWeek[0], 10) : parsedCron.dayOfTheWeek[0];
	        }
	
	        if (parsedCron.hour[0] === '*' || !isNaN(parseInt(parsedCron.hour[0], 10))) {
	          selectedHour = parsedCron.hour[0] !== '*' ? ('0' + parsedCron.hour[0]).slice(-2) : parsedCron.hour[0];
	        }
	
	        if (parsedCron.minute[0] === '*' || !isNaN(parseInt(parsedCron.minute[0], 10))) {
	          selectedMinute = parsedCron.minute[0] !== '*' ? ('0' + parsedCron.minute[0]).slice(-2) : parsedCron.minute[0];
	        }
	
	        if (parsedCron.month[0] === '*' || !isNaN(parseInt(parsedCron.month[0], 10))) {
	          selectedMonth = parsedCron.month[0] !== '*' ? ('0' + parsedCron.month[0]).slice(-2) : parsedCron.month[0];
	        }
	
	        // return early if we don't have any value
	        if (!selectedDayOfTheMonth && !selectedDayOfTheWeek && !selectedHour && !selectedMinute && !selectedMonth) {
	          return null;
	        }
	
	        if (selectedDayOfTheWeek !== '*') {
	          selectedDay = selectedDayOfTheWeek;
	        } else {
	          selectedDay = selectedDayOfTheMonth;
	        }
	
	        if (selectedDayOfTheMonth === '*' && selectedDayOfTheWeek === '*' && selectedHour === '*' && selectedMinute === '*' && selectedMonth === '*') {
	          selectedPeriod = 'mn';
	          cronInfo = {};
	        } else if (selectedDayOfTheMonth === '*' && selectedDayOfTheWeek === '*' && selectedHour === '*' && selectedMonth === '*' && selectedMinute !== '*') {
	          selectedPeriod = 'h';
	
	          cronInfo = {
	            selectedMinute: selectedMinute
	          };
	        } else if (selectedDayOfTheMonth === '*' && selectedDayOfTheWeek === '*' && selectedMonth === '*' && selectedHour !== '*' && selectedMinute !== '*') {
	          selectedPeriod = 'd';
	
	          cronInfo = {
	            selectedHour: selectedHour,
	            selectedMinute: selectedMinute
	          };
	        } else if (selectedDayOfTheMonth === '*' && selectedMonth === '*' && selectedDayOfTheWeek !== '*' && selectedHour !== '*' && selectedMinute !== '*') {
	          selectedPeriod = 'w';
	
	          cronInfo = {
	            selectedDay: selectedDay,
	            selectedHour: selectedHour,
	            selectedMinute: selectedMinute
	          };
	        } else if (selectedDayOfTheWeek === '*' && selectedMonth === '*' && selectedDayOfTheMonth !== '*' && selectedHour !== '*' && selectedMinute !== '*') {
	          selectedPeriod = 'm';
	
	          cronInfo = {
	            selectedDay: selectedDay,
	            selectedHour: selectedHour,
	            selectedMinute: selectedMinute
	          };
	        } else if (selectedDayOfTheWeek === '*' && selectedDayOfTheMonth !== '*' && selectedMonth !== '*' && selectedHour !== '*' && selectedMinute !== '*') {
	          selectedPeriod = 'y';
	
	          cronInfo = {
	            selectedDay: selectedDay,
	            selectedMonth: selectedMonth,
	            selectedHour: selectedHour,
	            selectedMinute: selectedMinute
	          };
	        }
	
	        // if the period can't be detected just return
	        if (!selectedPeriod) {
	          return null;
	        }
	
	        cronInfo = _extends({}, this.onPeriodChange(selectedPeriod, true), cronInfo);
	
	        return cronInfo;
	      } catch (e) {
	        return null;
	      }
	    }
	  }, {
	    key: 'selectTemplates',
	    value: function selectTemplates(entities) {
	      return Object.keys(entities).filter(function (k) {
	        return entities[k].__entitySet === 'templates';
	      }).map(function (k) {
	        return entities[k];
	      });
	    }
	  }, {
	    key: 'removeInvalidTemplateReferences',
	    value: function removeInvalidTemplateReferences() {
	      var _props = this.props,
	          entity = _props.entity,
	          entities = _props.entities,
	          onChange = _props.onChange;
	
	
	      if (!entity.templateShortid) {
	        return;
	      }
	
	      var updatedTemplates = Object.keys(entities).filter(function (k) {
	        return entities[k].__entitySet === 'templates' && entities[k].shortid === entity.templateShortid;
	      });
	
	      if (updatedTemplates.length === 0) {
	        onChange({ _id: entity._id, templateShortid: null });
	      }
	    }
	  }, {
	    key: 'onUseExpressionChange',
	    value: function onUseExpressionChange(checked) {
	      var entity = this.props.entity;
	
	      var resetCron = false;
	      var uiCronInfo = void 0;
	
	      if (!checked) {
	        uiCronInfo = this.getCronInformation(entity.cron);
	
	        if (!uiCronInfo) {
	          uiCronInfo = this.onPeriodChange('', true);
	          resetCron = true;
	        }
	      } else {
	        uiCronInfo = this.onPeriodChange('', true);
	      }
	
	      this.onCronBuilderChange(_extends({
	        useExpression: checked
	      }, uiCronInfo), resetCron);
	    }
	  }, {
	    key: 'onCronBuilderChange',
	    value: function onCronBuilderChange(stateToSet, resetCron) {
	      var cronExp = new _cronBuilder2.default();
	
	      var _props2 = this.props,
	          onChange = _props2.onChange,
	          entity = _props2.entity;
	      var _state = this.state,
	          selectedPeriod = _state.selectedPeriod,
	          selectedHour = _state.selectedHour,
	          selectedMinute = _state.selectedMinute,
	          selectedDay = _state.selectedDay,
	          selectedMonth = _state.selectedMonth;
	
	
	      var cron = false;
	
	      if (stateToSet && stateToSet.selectedPeriod !== undefined) {
	        selectedPeriod = stateToSet.selectedPeriod;
	      }
	
	      if (stateToSet && stateToSet.selectedHour !== undefined) {
	        selectedHour = stateToSet.selectedHour;
	      }
	
	      if (stateToSet && stateToSet.selectedMinute !== undefined) {
	        selectedMinute = stateToSet.selectedMinute;
	      }
	
	      if (stateToSet && stateToSet.selectedDay !== undefined) {
	        selectedDay = stateToSet.selectedDay;
	      }
	
	      if (stateToSet && stateToSet.selectedMonth !== undefined) {
	        selectedMonth = stateToSet.selectedMonth;
	      }
	
	      if (selectedPeriod === 'mn') {
	        cron = '* * * * *';
	      } else if (selectedPeriod === 'h') {
	        cronExp.addValue('minute', String(parseInt(selectedMinute, 10)));
	      } else if (selectedPeriod === 'd') {
	        cronExp.addValue('hour', String(parseInt(selectedHour, 10)));
	        cronExp.addValue('minute', String(parseInt(selectedMinute, 10)));
	      } else if (selectedPeriod === 'w') {
	        cronExp.addValue('dayOfTheWeek', String(parseInt(selectedDay, 10)));
	        cronExp.addValue('hour', String(parseInt(selectedHour, 10)));
	        cronExp.addValue('minute', String(parseInt(selectedMinute, 10)));
	      } else if (selectedPeriod === 'm') {
	        cronExp.addValue('dayOfTheMonth', String(parseInt(selectedDay, 10)));
	        cronExp.addValue('hour', String(parseInt(selectedHour, 10)));
	        cronExp.addValue('minute', String(parseInt(selectedMinute, 10)));
	      } else if (selectedPeriod === 'y') {
	        cronExp.addValue('dayOfTheMonth', String(parseInt(selectedDay, 10)));
	        cronExp.addValue('hour', String(parseInt(selectedHour, 10)));
	        cronExp.addValue('minute', String(parseInt(selectedMinute, 10)));
	        cronExp.addValue('month', String(parseInt(selectedMonth, 10)));
	      } else {
	        cron = resetCron ? '' : this.props.entity.cron;
	      }
	
	      if (cron === false) {
	        cron = cronExp.build();
	      }
	
	      if (cron !== this.props.entity.cron) {
	        onChange({
	          _id: entity._id,
	          cron: cron
	        });
	      }
	
	      if (stateToSet) {
	        this.setState(stateToSet);
	      }
	    }
	  }, {
	    key: 'onPeriodChange',
	    value: function onPeriodChange(period, returnState) {
	      var newState = {
	        selectedPeriod: period
	      };
	
	      newState.days = [];
	
	      if (period === 'm' || period === 'y') {
	        for (var i = 1; i <= 31; i++) {
	          newState.days.push({
	            name: (0, _ordinalNumberSuffix2.default)(i),
	            value: i
	          });
	        }
	      }
	
	      if (period === 'mn') {
	        newState.showHour = false;
	        newState.showMinute = false;
	        newState.showDay = false;
	        newState.showMonth = false;
	        newState.selectedHour = null;
	        newState.selectedMinute = null;
	        newState.selectedDay = null;
	        newState.selectedMonth = null;
	      } else if (period === 'h') {
	        newState.showHour = false;
	        newState.showMinute = true;
	        newState.showDay = false;
	        newState.showMonth = false;
	        newState.selectedHour = null;
	        newState.selectedMinute = '00';
	        newState.selectedDay = null;
	        newState.selectedMonth = null;
	      } else if (period === 'd') {
	        newState.showHour = true;
	        newState.showMinute = true;
	        newState.showDay = false;
	        newState.showMonth = false;
	        newState.selectedHour = '12';
	        newState.selectedMinute = '00';
	        newState.selectedDay = null;
	        newState.selectedMonth = null;
	      } else if (period === 'w') {
	        newState.showHour = true;
	        newState.showMinute = true;
	        newState.showDay = true;
	        newState.showMonth = false;
	        newState.selectedHour = '12';
	        newState.selectedMinute = '00';
	        newState.selectedDay = 1;
	        newState.selectedMonth = null;
	
	        newState.days = [{
	          name: 'Monday',
	          value: 1
	        }, {
	          name: 'Tuesday',
	          value: 2
	        }, {
	          name: 'Wednesday',
	          value: 3
	        }, {
	          name: 'Thursday',
	          value: 4
	        }, {
	          name: 'Friday',
	          value: 5
	        }, {
	          name: 'Saturday',
	          value: 6
	        }, {
	          name: 'Sunday',
	          value: 0
	        }];
	      } else if (period === 'm') {
	        newState.showHour = true;
	        newState.showMinute = true;
	        newState.showDay = true;
	        newState.showMonth = false;
	        newState.selectedHour = '12';
	        newState.selectedMinute = '00';
	        newState.selectedDay = 1;
	        newState.selectedMonth = null;
	      } else if (period === 'y') {
	        newState.showHour = true;
	        newState.showMinute = true;
	        newState.showDay = true;
	        newState.showMonth = true;
	        newState.selectedHour = '12';
	        newState.selectedMinute = '00';
	        newState.selectedDay = 1;
	        newState.selectedMonth = '01';
	      } else {
	        newState.showHour = false;
	        newState.showMinute = false;
	        newState.showDay = false;
	        newState.showMonth = false;
	        newState.selectedHour = null;
	        newState.selectedMinute = null;
	        newState.selectedDay = null;
	        newState.selectedMonth = null;
	      }
	
	      if (returnState) {
	        return newState;
	      }
	
	      this.setState(newState);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _state2 = this.state,
	          useExpression = _state2.useExpression,
	          showHour = _state2.showHour,
	          showMinute = _state2.showMinute,
	          showDay = _state2.showDay,
	          showMonth = _state2.showMonth,
	          selectedPeriod = _state2.selectedPeriod,
	          selectedHour = _state2.selectedHour,
	          selectedMinute = _state2.selectedMinute,
	          selectedDay = _state2.selectedDay,
	          selectedMonth = _state2.selectedMonth,
	          days = _state2.days;
	      var _props3 = this.props,
	          entity = _props3.entity,
	          entities = _props3.entities,
	          _onChange = _props3.onChange;
	
	      var templates = this.selectTemplates(entities);
	      var cronDescription = '';
	
	      if (entity.cron) {
	        try {
	          cronDescription = _cronstrue2.default.toString(entity.cron);
	        } catch (e) {
	          cronDescription = 'Invalid cron expression';
	        }
	      }
	
	      if (!entity || entity.__entitySet !== 'schedules') {
	        return _react2.default.createElement('div', null);
	      }
	
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Template'
	          ),
	          _react2.default.createElement(
	            'select',
	            {
	              value: entity.templateShortid ? entity.templateShortid : '',
	              onChange: function onChange(v) {
	                return _onChange({ _id: entity._id, templateShortid: v.target.value !== 'empty' ? v.target.value : null });
	              } },
	            _react2.default.createElement(
	              'option',
	              { key: 'empty', value: 'empty' },
	              '- not selected -'
	            ),
	            templates.map(function (e) {
	              return _react2.default.createElement(
	                'option',
	                { key: e.shortid, value: e.shortid },
	                e.name
	              );
	            })
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'CRON'
	          ),
	          !useExpression && _react2.default.createElement(
	            'div',
	            { className: 'form-group' },
	            _react2.default.createElement(
	              'span',
	              null,
	              'Expression: ',
	              entity.cron
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'form-group' },
	            _react2.default.createElement(
	              'span',
	              null,
	              'Description: ',
	              cronDescription
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'form-group' },
	            _react2.default.createElement(
	              'label',
	              null,
	              _react2.default.createElement('input', {
	                type: 'checkbox',
	                checked: useExpression,
	                onChange: function onChange(v) {
	                  return _this2.onUseExpressionChange(v.target.checked);
	                }
	              }),
	              'Use expression'
	            ),
	            useExpression && _react2.default.createElement('input', {
	              type: 'text', value: entity.cron || '', onChange: function onChange(v) {
	                return _onChange({ _id: entity._id, cron: v.target.value });
	              } })
	          ),
	          !useExpression && _react2.default.createElement(
	            'div',
	            { className: 'form-group' },
	            _react2.default.createElement(
	              'label',
	              null,
	              'Every',
	              ' ',
	              _react2.default.createElement(
	                'select',
	                {
	                  value: selectedPeriod,
	                  onChange: function onChange(ev) {
	                    return _this2.onCronBuilderChange(_this2.onPeriodChange(ev.target.value, true));
	                  }
	                },
	                _react2.default.createElement(
	                  'option',
	                  { key: '-', value: '' },
	                  '- not selected -'
	                ),
	                _react2.default.createElement(
	                  'option',
	                  { key: 'mn', value: 'mn' },
	                  'minute'
	                ),
	                _react2.default.createElement(
	                  'option',
	                  { key: 'h', value: 'h' },
	                  'hour'
	                ),
	                _react2.default.createElement(
	                  'option',
	                  { key: 'd', value: 'd' },
	                  'day'
	                ),
	                _react2.default.createElement(
	                  'option',
	                  { key: 'w', value: 'w' },
	                  'week'
	                ),
	                _react2.default.createElement(
	                  'option',
	                  { key: 'm', value: 'm' },
	                  'month'
	                ),
	                _react2.default.createElement(
	                  'option',
	                  { key: 'y', value: 'y' },
	                  'year'
	                )
	              )
	            )
	          ),
	          !useExpression && showDay && _react2.default.createElement(
	            'div',
	            { className: 'form-group' },
	            _react2.default.createElement(
	              'label',
	              null,
	              'on' + (showMonth ? ' the' : ''),
	              ' ',
	              _react2.default.createElement(
	                'select',
	                {
	                  value: selectedDay,
	                  onChange: function onChange(ev) {
	                    return _this2.onCronBuilderChange({ selectedDay: ev.target.value });
	                  }
	                },
	                days.map(function (day) {
	                  return _react2.default.createElement(
	                    'option',
	                    { key: day.value, value: day.value },
	                    day.name
	                  );
	                })
	              )
	            )
	          ),
	          !useExpression && showMonth && _react2.default.createElement(
	            'div',
	            { className: 'form-group' },
	            _react2.default.createElement(
	              'label',
	              null,
	              'of',
	              ' ',
	              _react2.default.createElement(
	                'select',
	                {
	                  value: selectedMonth,
	                  onChange: function onChange(ev) {
	                    return _this2.onCronBuilderChange({ selectedMonth: ev.target.value });
	                  }
	                },
	                _react2.default.createElement(
	                  'option',
	                  { key: '01', value: '01' },
	                  'January'
	                ),
	                _react2.default.createElement(
	                  'option',
	                  { key: '02', value: '02' },
	                  'February'
	                ),
	                _react2.default.createElement(
	                  'option',
	                  { key: '03', value: '03' },
	                  'March'
	                ),
	                _react2.default.createElement(
	                  'option',
	                  { key: '04', value: '04' },
	                  'April'
	                ),
	                _react2.default.createElement(
	                  'option',
	                  { key: '05', value: '05' },
	                  'May'
	                ),
	                _react2.default.createElement(
	                  'option',
	                  { key: '06', value: '06' },
	                  'June'
	                ),
	                _react2.default.createElement(
	                  'option',
	                  { key: '07', value: '07' },
	                  'July'
	                ),
	                _react2.default.createElement(
	                  'option',
	                  { key: '08', value: '08' },
	                  'August'
	                ),
	                _react2.default.createElement(
	                  'option',
	                  { key: '09', value: '09' },
	                  'September'
	                ),
	                _react2.default.createElement(
	                  'option',
	                  { key: '10', value: '10' },
	                  'October'
	                ),
	                _react2.default.createElement(
	                  'option',
	                  { key: '11', value: '11' },
	                  'November'
	                ),
	                _react2.default.createElement(
	                  'option',
	                  { key: '12', value: '12' },
	                  'December'
	                )
	              )
	            )
	          ),
	          !useExpression && (showHour || showMinute) && _react2.default.createElement(
	            'div',
	            { className: 'form-group' },
	            _react2.default.createElement(
	              'div',
	              null,
	              'at',
	              ' ',
	              _react2.default.createElement(
	                'div',
	                { style: { display: 'inline-block' } },
	                showHour && _react2.default.createElement(_HourTimePicker2.default, {
	                  type: 'hour',
	                  value: selectedHour,
	                  onChange: function onChange(val) {
	                    return _this2.onCronBuilderChange({ selectedHour: val });
	                  }
	                }),
	                showHour && showMinute && ' : ',
	                showMinute && _react2.default.createElement(_HourTimePicker2.default, {
	                  type: 'minute',
	                  value: selectedMinute,
	                  onChange: function onChange(val) {
	                    return _this2.onCronBuilderChange({ selectedMinute: val });
	                  }
	                })
	              )
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Enabled'
	          ),
	          _react2.default.createElement('input', { type: 'checkbox', checked: entity.enabled !== false, onChange: function onChange(v) {
	              return _onChange({ _id: entity._id, enabled: v.target.checked });
	            } })
	        )
	      );
	    }
	  }], [{
	    key: 'title',
	    value: function title(entity, entities) {
	      var templates = Object.keys(entities).map(function (k) {
	        return entities[k];
	      }).filter(function (t) {
	        return t.__entitySet === 'templates' && t.shortid === entity.templateShortid;
	      });
	
	      if (!templates.length) {
	        return 'schedule (select template...)';
	      }
	
	      return 'schedule (' + templates[0].name + ') ' + (entity.enabled !== true && entity.enabled != null ? '(disabled)' : '');
	    }
	  }]);
	
	  return ScheduleProperties;
	}(_react.Component);
	
	exports.default = ScheduleProperties;

/***/ },
/* 22 */
/***/ function(module, exports) {

	
	/**
	 * Get the ordinal number with suffix from `n`
	 *
	 * @api public
	 * @param {Number} n
	 * @return {String}
	 */
	exports = module.exports = function (n) {
	  return n + exports.suffix(+n);
	};
	
	/**
	 * Get the suffix for the given `n`
	 *
	 * @api private
	 * @param {Number} n
	 * @return {String}
	 */
	exports.suffix = function (n) {
	  return Math.floor(n / 10) === 1
	      ? 'th'
	      : (n % 10 === 1
	        ? 'st'
	        : (n % 10 === 2
	          ? 'nd'
	          : (n % 10 === 3
	            ? 'rd'
	            : 'th')));
	};


/***/ },
/* 23 */
/***/ function(module, exports) {

	var DEFAULT_INTERVAL = ['*'];
	
	var CronValidator = (function() {
	    /**
	     * Contains the position-to-name mapping of the cron expression
	     * @type {Object}
	     * @const
	     */
	    var MeasureOfTimeMap = {
	            0: 'minute',
	            1: 'hour',
	            2: 'dayOfTheMonth',
	            3: 'month',
	            4: 'dayOfTheWeek'
	        },
	        /**
	         * contains every permissible 'measureOfTime' string constant
	         * @const
	         * @type {Array}
	         */
	        MeasureOfTimeValues = Object.keys(MeasureOfTimeMap).map(function (key) {
	            return MeasureOfTimeMap[key];
	        });
	
	    /**
	     * validates a given cron expression (object) for length, then calls validateValue on each value
	     * @param {!{
	        minute: Array.string,
	        hour: Array.string,
	        dayOfTheMonth: Array.string,
	        month: Array.string,
	        dayOfTheWeek: Array.string,
	     * }} expression - rich object containing the state of the cron expression
	     * @throws {Error} if expression contains more than 5 keys
	     */
	    var validateExpression = function(expression) {
	        // don't care if it's less than 5, we'll just set those to the default '*'
	        if (Object.keys(expression).length > 5) {
	            throw new Error('Invalid cron expression; limited to 5 values.');
	        }
	
	        for (var measureOfTime in expression) {
	            if (expression.hasOwnProperty(measureOfTime)) {
	                this.validateValue(measureOfTime, expression[measureOfTime]);
	            }
	        }
	    },
	
	    /**
	     * validates a given cron expression (string) for length, then calls validateValue on each value
	     * @param {!String} expression - an optionally empty string containing at most 5 space delimited expressions.
	     * @throws {Error} if the string contains more than 5 space delimited parts.
	     */
	    validateString = function(expression) {
	        var splitExpression = expression.split(' ');
	
	        if (splitExpression.length > 5) {
	            throw new Error('Invalid cron expression; limited to 5 values.');
	        }
	
	        for (var i = 0; i < splitExpression.length; i++) {
	            this.validateValue(MeasureOfTimeMap[i], splitExpression[i]);
	        }
	    },
	
	    /**
	     * validates any given measureOfTime and corresponding value
	     * @param {!String} measureOfTime - as expected
	     * @param {!String} value - the cron-ish interval specifier
	     * @throws {Error} if measureOfTime is bogus
	     * @throws {Error} if value contains an unsupported character
	     */
	    validateValue = function(measureOfTime, value) {
	        var validatorObj = {
	                minute:        {min: 0, max: 59},
	                hour:          {min: 0, max: 23},
	                dayOfTheMonth: {min: 1, max: 31},
	                month:         {min: 1, max: 12},
	                dayOfTheWeek:  {min: 1, max: 7}
	            },
	            range,
	            validChars = /^[0-9*-]/;
	
	        if (!validatorObj[measureOfTime]) {
	            throw new Error('Invalid measureOfTime; Valid options are: ' + MeasureOfTimeValues.join(', '));
	        }
	
	        if (!validChars.test(value)) {
	            throw new Error('Invalid value; Only numbers 0-9, "-", and "*" chars are allowed');
	        }
	
	        if (value !== '*') {
	            // check to see if value is within range if value is not '*'
	            if (value.indexOf('-') >= 0) {
	                // value is a range and must be split into high and low
	                range = value.split('-');
	                if (!range[0] || range[0] < validatorObj[measureOfTime].min) {
	                    throw new Error('Invalid value; bottom of range is not valid for "' + measureOfTime + '". Limit is ' + validatorObj[measureOfTime].min + '.');
	                }
	
	                if (!range[1] || range[1] > validatorObj[measureOfTime].max) {
	                    throw new Error('Invalid value; top of range is not valid for "' + measureOfTime + '". Limit is ' + validatorObj[measureOfTime].max + '.');
	                }
	            } else {
	
	                if (parseInt(value) < validatorObj[measureOfTime].min) {
	                    throw new Error('Invalid value; given value is not valid for "' + measureOfTime + '". Minimum value is "' + validatorObj[measureOfTime].min + '".');
	                }
	                if (parseInt(value) > validatorObj[measureOfTime].max) {
	                    throw new Error('Invalid value; given value is not valid for "' + measureOfTime + '". Maximum value is "' + validatorObj[measureOfTime].max + '".');
	                }
	            }
	        }
	    };
	
	
	    return {
	        measureOfTimeValues: MeasureOfTimeValues,
	        validateExpression: validateExpression,
	        validateString: validateString,
	        validateValue: validateValue
	    }
	}());
	
	
	/**
	 * Initializes a CronBuilder with an optional initial cron expression.
	 * @param {String=} initialExpression - if provided, it must be up to 5 space delimited parts
	 * @throws {Error} if the initialExpression is bogus
	 * @constructor
	 */
	var CronBuilder = (function() {
	    function CronBuilder(initialExpression) {
	        var splitExpression,
	            expression;
	
	        if (initialExpression) {
	            CronValidator.validateString(initialExpression);
	
	            splitExpression = initialExpression.split(' ');
	            // check to see if initial expression is valid
	
	            expression = {
	                minute:        splitExpression[0] ? [splitExpression[0]] : DEFAULT_INTERVAL,
	                hour:          splitExpression[1] ? [splitExpression[1]] : DEFAULT_INTERVAL,
	                dayOfTheMonth: splitExpression[2] ? [splitExpression[2]] : DEFAULT_INTERVAL,
	                month:         splitExpression[3] ? [splitExpression[3]] : DEFAULT_INTERVAL,
	                dayOfTheWeek:  splitExpression[4] ? [splitExpression[4]] : DEFAULT_INTERVAL,
	            };
	        } else {
	            expression = {
	                minute: DEFAULT_INTERVAL,
	                hour: DEFAULT_INTERVAL,
	                dayOfTheMonth: DEFAULT_INTERVAL,
	                month: DEFAULT_INTERVAL,
	                dayOfTheWeek: DEFAULT_INTERVAL,
	            };
	        }
	
	        /**
	         * builds a working cron expression based on the state of the cron object
	         * @returns {string} - working cron expression
	         */
	        this.build = function () {
	            return [
	                expression.minute.join(','),
	                expression.hour.join(','),
	                expression.dayOfTheMonth.join(','),
	                expression.month.join(','),
	                expression.dayOfTheWeek.join(','),
	            ].join(' ');
	        };
	
	        /**
	         * adds a value to what exists currently (builds)
	         * @param {!String} measureOfTime
	         * @param {!Number} value
	         * @throws {Error} if measureOfTime or value fail validation
	         */
	        this.addValue = function (measureOfTime, value) {
	            CronValidator.validateValue(measureOfTime, value);
	
	            if (expression[measureOfTime].length === 1 && expression[measureOfTime][0] === '*') {
	                expression[measureOfTime] = [value];
	            } else {
	                if (expression[measureOfTime].indexOf(value) < 0) {
	                    expression[measureOfTime].push(value);
	                }
	            }
	        };
	
	        /**
	         * removes a single explicit value (subtracts)
	         * @param {!String} measureOfTime - as you might guess
	         * @param {!String} value - the offensive value
	         * @throws {Error} if measureOfTime is bogus.
	         */
	        this.removeValue = function (measureOfTime, value) {
	            if (!expression[measureOfTime]) {
	                throw new Error('Invalid measureOfTime: Valid options are: ' + CronValidator.measureOfTimeValues.join(', '));
	            }
	
	            if (expression[measureOfTime].length === 1 && expression[measureOfTime][0] === '*') {
	                return 'The value for "' + measureOfTime + '" is already at the default value of "*" - this is a no-op.';
	            }
	
	            expression[measureOfTime] = expression[measureOfTime].filter(function (timeValue) {
	               return value !== timeValue;
	            });
	
	            if (!expression[measureOfTime].length) {
	                expression[measureOfTime] = DEFAULT_INTERVAL;
	            }
	        };
	
	        /**
	         * returns the current state of a given measureOfTime
	         * @param {!String} measureOfTime one of "minute", "hour", etc
	         * @returns {!String} comma separated blah blah
	         * @throws {Error} if the measureOfTime is not one of the permitted values.
	         */
	        this.get = function (measureOfTime) {
	            if (!expression[measureOfTime]) {
	                throw new Error('Invalid measureOfTime: Valid options are: ' + CronValidator.measureOfTimeValues.join(', '));
	            }
	
	            return expression[measureOfTime].join(',');
	        };
	
	        /**
	         * sets the state of a given measureOfTime
	         * @param {!String} measureOfTime - yup
	         * @param {!Array.<String>} value - the 5 tuple array of values to set
	         * @returns {!String} the comma separated version of the value that you passed in
	         * @throws {Error} if your "value" is not an Array&lt;String&gt;
	         * @throws {Error} when any item in your value isn't a legal cron-ish descriptor
	         */
	        this.set = function (measureOfTime, value) {
	            if (!Array.isArray(value)) {
	                throw new Error('Invalid value; Value must be in the form of an Array.');
	            }
	
	            for(var i = 0; i < value.length; i++) {
	                CronValidator.validateValue(measureOfTime, value[i]);
	            }
	
	            expression[measureOfTime] = value;
	
	            return expression[measureOfTime].join(',');
	        };
	
	        /**
	         * Returns a rich object that describes the current state of the cron expression.
	         * @returns {!{
	            minute: Array.string,
	            hour: Array.string,
	            dayOfTheMonth: Array.string,
	            month: Array.string,
	            dayOfTheWeek: Array.string,
	         * }}
	         */
	        this.getAll = function () {
	            return expression;
	        };
	
	        /**
	         * sets the state for the entire cron expression
	         * @param {!{
	            minute: Array.string,
	            hour: Array.string,
	            dayOfTheMonth: Array.string,
	            month: Array.string,
	            dayOfTheWeek: Array.string,
	         * }} expToSet - the entirety of the cron expression.
	         * @throws {Error} as usual
	         */
	        this.setAll = function (expToSet) {
	            CronValidator.validateExpression(expToSet);
	
	            expression = expToSet;
	        };
	    }
	
	    return CronBuilder;
	}());
	
	module.exports = CronBuilder;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["cronstrue"] = factory();
		else
			root["cronstrue"] = factory();
	})(typeof self !== 'undefined' ? self : this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId]) {
	/******/ 			return installedModules[moduleId].exports;
	/******/ 		}
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			i: moduleId,
	/******/ 			l: false,
	/******/ 			exports: {}
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.l = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// define getter function for harmony exports
	/******/ 	__webpack_require__.d = function(exports, name, getter) {
	/******/ 		if(!__webpack_require__.o(exports, name)) {
	/******/ 			Object.defineProperty(exports, name, {
	/******/ 				configurable: false,
	/******/ 				enumerable: true,
	/******/ 				get: getter
	/******/ 			});
	/******/ 		}
	/******/ 	};
	/******/
	/******/ 	// getDefaultExport function for compatibility with non-harmony modules
	/******/ 	__webpack_require__.n = function(module) {
	/******/ 		var getter = module && module.__esModule ?
	/******/ 			function getDefault() { return module['default']; } :
	/******/ 			function getModuleExports() { return module; };
	/******/ 		__webpack_require__.d(getter, 'a', getter);
	/******/ 		return getter;
	/******/ 	};
	/******/
	/******/ 	// Object.prototype.hasOwnProperty.call
	/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(__webpack_require__.s = 4);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", { value: true });
	var stringUtilities_1 = __webpack_require__(1);
	var cronParser_1 = __webpack_require__(2);
	var ExpressionDescriptor = (function () {
	    function ExpressionDescriptor(expression, options) {
	        this.expression = expression;
	        this.options = options;
	        this.expressionParts = new Array(5);
	        if (ExpressionDescriptor.locales[options.locale]) {
	            this.i18n = ExpressionDescriptor.locales[options.locale];
	        }
	        else {
	            console.warn("Locale '" + options.locale + "' could not be found; falling back to 'en'.");
	            this.i18n = ExpressionDescriptor.locales["en"];
	        }
	        if (options.use24HourTimeFormat === undefined) {
	            options.use24HourTimeFormat = this.i18n.use24HourTimeFormatByDefault();
	        }
	    }
	    ExpressionDescriptor.toString = function (expression, _a) {
	        var _b = _a === void 0 ? {} : _a, _c = _b.throwExceptionOnParseError, throwExceptionOnParseError = _c === void 0 ? true : _c, _d = _b.verbose, verbose = _d === void 0 ? false : _d, _e = _b.dayOfWeekStartIndexZero, dayOfWeekStartIndexZero = _e === void 0 ? true : _e, use24HourTimeFormat = _b.use24HourTimeFormat, _f = _b.locale, locale = _f === void 0 ? "en" : _f;
	        var options = {
	            throwExceptionOnParseError: throwExceptionOnParseError,
	            verbose: verbose,
	            dayOfWeekStartIndexZero: dayOfWeekStartIndexZero,
	            use24HourTimeFormat: use24HourTimeFormat,
	            locale: locale
	        };
	        var descripter = new ExpressionDescriptor(expression, options);
	        return descripter.getFullDescription();
	    };
	    ExpressionDescriptor.initialize = function (localesLoader) {
	        ExpressionDescriptor.specialCharacters = ["/", "-", ",", "*"];
	        localesLoader.load(ExpressionDescriptor.locales);
	    };
	    ExpressionDescriptor.prototype.getFullDescription = function () {
	        var description = "";
	        try {
	            var parser = new cronParser_1.CronParser(this.expression, this.options.dayOfWeekStartIndexZero);
	            this.expressionParts = parser.parse();
	            var timeSegment = this.getTimeOfDayDescription();
	            var dayOfMonthDesc = this.getDayOfMonthDescription();
	            var monthDesc = this.getMonthDescription();
	            var dayOfWeekDesc = this.getDayOfWeekDescription();
	            var yearDesc = this.getYearDescription();
	            description += timeSegment + dayOfMonthDesc + dayOfWeekDesc + monthDesc + yearDesc;
	            description = this.transformVerbosity(description, this.options.verbose);
	            description = description.charAt(0).toLocaleUpperCase() + description.substr(1);
	        }
	        catch (ex) {
	            if (!this.options.throwExceptionOnParseError) {
	                description = this.i18n.anErrorOccuredWhenGeneratingTheExpressionD();
	            }
	            else {
	                throw "" + ex;
	            }
	        }
	        return description;
	    };
	    ExpressionDescriptor.prototype.getTimeOfDayDescription = function () {
	        var secondsExpression = this.expressionParts[0];
	        var minuteExpression = this.expressionParts[1];
	        var hourExpression = this.expressionParts[2];
	        var description = "";
	        if (!stringUtilities_1.StringUtilities.containsAny(minuteExpression, ExpressionDescriptor.specialCharacters) &&
	            !stringUtilities_1.StringUtilities.containsAny(hourExpression, ExpressionDescriptor.specialCharacters) &&
	            !stringUtilities_1.StringUtilities.containsAny(secondsExpression, ExpressionDescriptor.specialCharacters)) {
	            description += this.i18n.atSpace() + this.formatTime(hourExpression, minuteExpression, secondsExpression);
	        }
	        else if (minuteExpression.indexOf("-") > -1 &&
	            !(minuteExpression.indexOf(",") > -1) &&
	            !stringUtilities_1.StringUtilities.containsAny(hourExpression, ExpressionDescriptor.specialCharacters)) {
	            var minuteParts = minuteExpression.split("-");
	            description += stringUtilities_1.StringUtilities.format(this.i18n.everyMinutebetweenX0AndX1(), this.formatTime(hourExpression, minuteParts[0], ""), this.formatTime(hourExpression, minuteParts[1], ""));
	        }
	        else if (hourExpression.indexOf(",") > -1 &&
	            hourExpression.indexOf("-") == -1 && hourExpression.indexOf("/") == -1 &&
	            !stringUtilities_1.StringUtilities.containsAny(minuteExpression, ExpressionDescriptor.specialCharacters)) {
	            var hourParts = hourExpression.split(",");
	            description += this.i18n.at();
	            for (var i = 0; i < hourParts.length; i++) {
	                description += " ";
	                description += this.formatTime(hourParts[i], minuteExpression, "");
	                if (i < hourParts.length - 2) {
	                    description += ",";
	                }
	                if (i == hourParts.length - 2) {
	                    description += this.i18n.spaceAnd();
	                }
	            }
	        }
	        else {
	            var secondsDescription = this.getSecondsDescription();
	            var minutesDescription = this.getMinutesDescription();
	            var hoursDescription = this.getHoursDescription();
	            description += secondsDescription;
	            if (description.length > 0) {
	                description += ", ";
	            }
	            description += minutesDescription;
	            if (description.length > 0) {
	                description += ", ";
	            }
	            description += hoursDescription;
	        }
	        return description;
	    };
	    ExpressionDescriptor.prototype.getSecondsDescription = function () {
	        var _this = this;
	        var description = this.getSegmentDescription(this.expressionParts[0], this.i18n.everysecond(), function (s) {
	            return s;
	        }, function (s) {
	            return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Seconds(), s);
	        }, function (s) {
	            return _this.i18n.secondsX0ThroughX1PastTheMinute();
	        }, function (s) {
	            return s == "0"
	                ? ""
	                : parseInt(s) < 20
	                    ? _this.i18n.atX0SecondsPastTheMinute()
	                    : _this.i18n.atX0SecondsPastTheMinuteGt20() || _this.i18n.atX0SecondsPastTheMinute();
	        });
	        return description;
	    };
	    ExpressionDescriptor.prototype.getMinutesDescription = function () {
	        var _this = this;
	        var description = this.getSegmentDescription(this.expressionParts[1], this.i18n.everyMinute(), function (s) {
	            return s;
	        }, function (s) {
	            return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Minutes(), s);
	        }, function (s) {
	            return _this.i18n.minutesX0ThroughX1PastTheHour();
	        }, function (s) {
	            try {
	                return s == "0"
	                    ? ""
	                    : parseInt(s) < 20
	                        ? _this.i18n.atX0MinutesPastTheHour()
	                        : _this.i18n.atX0MinutesPastTheHourGt20() || _this.i18n.atX0MinutesPastTheHour();
	            }
	            catch (e) {
	                return _this.i18n.atX0MinutesPastTheHour();
	            }
	        });
	        return description;
	    };
	    ExpressionDescriptor.prototype.getHoursDescription = function () {
	        var _this = this;
	        var expression = this.expressionParts[2];
	        var description = this.getSegmentDescription(expression, this.i18n.everyHour(), function (s) {
	            return _this.formatTime(s, "0", "");
	        }, function (s) {
	            return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Hours(), s);
	        }, function (s) {
	            return _this.i18n.betweenX0AndX1();
	        }, function (s) {
	            return _this.i18n.atX0();
	        });
	        return description;
	    };
	    ExpressionDescriptor.prototype.getDayOfWeekDescription = function () {
	        var _this = this;
	        var daysOfWeekNames = this.i18n.daysOfTheWeek();
	        var description = null;
	        if (this.expressionParts[5] == "*") {
	            description = "";
	        }
	        else {
	            description = this.getSegmentDescription(this.expressionParts[5], this.i18n.commaEveryDay(), function (s) {
	                var exp = s;
	                if (s.indexOf("#") > -1) {
	                    exp = s.substr(0, s.indexOf("#"));
	                }
	                else if (s.indexOf("L") > -1) {
	                    exp = exp.replace("L", "");
	                }
	                return daysOfWeekNames[parseInt(exp)];
	            }, function (s) {
	                return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0daysOfTheWeek(), s);
	            }, function (s) {
	                return _this.i18n.commaX0ThroughX1();
	            }, function (s) {
	                var format = null;
	                if (s.indexOf("#") > -1) {
	                    var dayOfWeekOfMonthNumber = s.substring(s.indexOf("#") + 1);
	                    var dayOfWeekOfMonthDescription = null;
	                    switch (dayOfWeekOfMonthNumber) {
	                        case "1":
	                            dayOfWeekOfMonthDescription = _this.i18n.first();
	                            break;
	                        case "2":
	                            dayOfWeekOfMonthDescription = _this.i18n.second();
	                            break;
	                        case "3":
	                            dayOfWeekOfMonthDescription = _this.i18n.third();
	                            break;
	                        case "4":
	                            dayOfWeekOfMonthDescription = _this.i18n.fourth();
	                            break;
	                        case "5":
	                            dayOfWeekOfMonthDescription = _this.i18n.fifth();
	                            break;
	                    }
	                    format = _this.i18n.commaOnThe() + dayOfWeekOfMonthDescription + _this.i18n.spaceX0OfTheMonth();
	                }
	                else if (s.indexOf("L") > -1) {
	                    format = _this.i18n.commaOnTheLastX0OfTheMonth();
	                }
	                else {
	                    format = _this.i18n.commaOnlyOnX0();
	                }
	                return format;
	            });
	        }
	        return description;
	    };
	    ExpressionDescriptor.prototype.getMonthDescription = function () {
	        var _this = this;
	        var monthNames = this.i18n.monthsOfTheYear();
	        var description = this.getSegmentDescription(this.expressionParts[4], "", function (s) {
	            return monthNames[parseInt(s) - 1];
	        }, function (s) {
	            return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0Months(), s);
	        }, function (s) {
	            return _this.i18n.commaMonthX0ThroughMonthX1() || _this.i18n.commaX0ThroughX1();
	        }, function (s) {
	            return _this.i18n.commaOnlyInX0();
	        });
	        return description;
	    };
	    ExpressionDescriptor.prototype.getDayOfMonthDescription = function () {
	        var _this = this;
	        var description = null;
	        var expression = this.expressionParts[3];
	        switch (expression) {
	            case "L":
	                description = this.i18n.commaOnTheLastDayOfTheMonth();
	                break;
	            case "WL":
	            case "LW":
	                description = this.i18n.commaOnTheLastWeekdayOfTheMonth();
	                break;
	            default:
	                var weekDayNumberMatches = expression.match(/(\d{1,2}W)|(W\d{1,2})/);
	                if (weekDayNumberMatches) {
	                    var dayNumber = parseInt(weekDayNumberMatches[0].replace("W", ""));
	                    var dayString = dayNumber == 1
	                        ? this.i18n.firstWeekday()
	                        : stringUtilities_1.StringUtilities.format(this.i18n.weekdayNearestDayX0(), dayNumber.toString());
	                    description = stringUtilities_1.StringUtilities.format(this.i18n.commaOnTheX0OfTheMonth(), dayString);
	                    break;
	                }
	                else {
	                    var lastDayOffSetMatches = expression.match(/L-(\d{1,2})/);
	                    if (lastDayOffSetMatches) {
	                        var offSetDays = lastDayOffSetMatches[1];
	                        description = stringUtilities_1.StringUtilities.format(this.i18n.commaDaysBeforeTheLastDayOfTheMonth(), offSetDays);
	                        break;
	                    }
	                    else {
	                        description = this.getSegmentDescription(expression, this.i18n.commaEveryDay(), function (s) {
	                            return s == "L" ? _this.i18n.lastDay() : s;
	                        }, function (s) {
	                            return s == "1" ? _this.i18n.commaEveryDay() : _this.i18n.commaEveryX0Days();
	                        }, function (s) {
	                            return _this.i18n.commaBetweenDayX0AndX1OfTheMonth();
	                        }, function (s) {
	                            return _this.i18n.commaOnDayX0OfTheMonth();
	                        });
	                    }
	                    break;
	                }
	        }
	        return description;
	    };
	    ExpressionDescriptor.prototype.getYearDescription = function () {
	        var _this = this;
	        var description = this.getSegmentDescription(this.expressionParts[6], "", function (s) {
	            return /^\d+$/.test(s) ? new Date(parseInt(s), 1).getFullYear().toString() : s;
	        }, function (s) {
	            return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0Years(), s);
	        }, function (s) {
	            return _this.i18n.commaYearX0ThroughYearX1() || _this.i18n.commaX0ThroughX1();
	        }, function (s) {
	            return _this.i18n.commaOnlyInX0();
	        });
	        return description;
	    };
	    ExpressionDescriptor.prototype.getSegmentDescription = function (expression, allDescription, getSingleItemDescription, getIntervalDescriptionFormat, getBetweenDescriptionFormat, getDescriptionFormat) {
	        var _this = this;
	        var description = null;
	        if (!expression) {
	            description = "";
	        }
	        else if (expression === "*") {
	            description = allDescription;
	        }
	        else if (!stringUtilities_1.StringUtilities.containsAny(expression, ["/", "-", ","])) {
	            description = stringUtilities_1.StringUtilities.format(getDescriptionFormat(expression), getSingleItemDescription(expression));
	        }
	        else if (expression.indexOf("/") > -1) {
	            var segments = expression.split("/");
	            description = stringUtilities_1.StringUtilities.format(getIntervalDescriptionFormat(segments[1]), getSingleItemDescription(segments[1]));
	            if (segments[0].indexOf("-") > -1) {
	                var betweenSegmentDescription = this.generateBetweenSegmentDescription(segments[0], getBetweenDescriptionFormat, getSingleItemDescription);
	                if (betweenSegmentDescription.indexOf(", ") != 0) {
	                    description += ", ";
	                }
	                description += betweenSegmentDescription;
	            }
	            else if (!stringUtilities_1.StringUtilities.containsAny(segments[0], ["*", ","])) {
	                var rangeItemDescription = stringUtilities_1.StringUtilities.format(getDescriptionFormat(segments[0]), getSingleItemDescription(segments[0]));
	                rangeItemDescription = rangeItemDescription.replace(", ", "");
	                description += stringUtilities_1.StringUtilities.format(this.i18n.commaStartingX0(), rangeItemDescription);
	            }
	        }
	        else if (expression.indexOf(",") > -1) {
	            var segments = expression.split(",");
	            var descriptionContent = "";
	            for (var i = 0; i < segments.length; i++) {
	                if (i > 0 && segments.length > 2) {
	                    descriptionContent += ",";
	                    if (i < segments.length - 1) {
	                        descriptionContent += " ";
	                    }
	                }
	                if (i > 0 && segments.length > 1 && (i == segments.length - 1 || segments.length == 2)) {
	                    descriptionContent += this.i18n.spaceAndSpace();
	                }
	                if (segments[i].indexOf("-") > -1) {
	                    var betweenSegmentDescription = this.generateBetweenSegmentDescription(segments[i], function (s) {
	                        return _this.i18n.commaX0ThroughX1();
	                    }, getSingleItemDescription);
	                    betweenSegmentDescription = betweenSegmentDescription.replace(", ", "");
	                    descriptionContent += betweenSegmentDescription;
	                }
	                else {
	                    descriptionContent += getSingleItemDescription(segments[i]);
	                }
	            }
	            description = stringUtilities_1.StringUtilities.format(getDescriptionFormat(expression), descriptionContent);
	        }
	        else if (expression.indexOf("-") > -1) {
	            description = this.generateBetweenSegmentDescription(expression, getBetweenDescriptionFormat, getSingleItemDescription);
	        }
	        return description;
	    };
	    ExpressionDescriptor.prototype.generateBetweenSegmentDescription = function (betweenExpression, getBetweenDescriptionFormat, getSingleItemDescription) {
	        var description = "";
	        var betweenSegments = betweenExpression.split("-");
	        var betweenSegment1Description = getSingleItemDescription(betweenSegments[0]);
	        var betweenSegment2Description = getSingleItemDescription(betweenSegments[1]);
	        betweenSegment2Description = betweenSegment2Description.replace(":00", ":59");
	        var betweenDescriptionFormat = getBetweenDescriptionFormat(betweenExpression);
	        description += stringUtilities_1.StringUtilities.format(betweenDescriptionFormat, betweenSegment1Description, betweenSegment2Description);
	        return description;
	    };
	    ExpressionDescriptor.prototype.formatTime = function (hourExpression, minuteExpression, secondExpression) {
	        var hour = parseInt(hourExpression);
	        var period = "";
	        if (!this.options.use24HourTimeFormat) {
	            period = hour >= 12 ? " PM" : " AM";
	            if (hour > 12) {
	                hour -= 12;
	            }
	            if (hour === 0) {
	                hour = 12;
	            }
	        }
	        var minute = minuteExpression;
	        var second = "";
	        if (secondExpression) {
	            second = ":" + ("00" + secondExpression).substring(secondExpression.length);
	        }
	        return ("00" + hour.toString()).substring(hour.toString().length) + ":" + ("00" + minute.toString()).substring(minute.toString().length) + second + period;
	    };
	    ExpressionDescriptor.prototype.transformVerbosity = function (description, useVerboseFormat) {
	        if (!useVerboseFormat) {
	            description = description.replace(new RegExp(this.i18n.commaEveryMinute(), "g"), "");
	            description = description.replace(new RegExp(this.i18n.commaEveryHour(), "g"), "");
	            description = description.replace(new RegExp(this.i18n.commaEveryDay(), "g"), "");
	        }
	        return description;
	    };
	    ExpressionDescriptor.locales = {};
	    return ExpressionDescriptor;
	}());
	exports.ExpressionDescriptor = ExpressionDescriptor;
	
	
	/***/ }),
	/* 1 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", { value: true });
	var StringUtilities = (function () {
	    function StringUtilities() {
	    }
	    StringUtilities.format = function (template) {
	        var values = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            values[_i - 1] = arguments[_i];
	        }
	        return template.replace(/%s/g, function () {
	            return values.shift();
	        });
	    };
	    StringUtilities.containsAny = function (text, searchStrings) {
	        return searchStrings.some(function (c) {
	            return text.indexOf(c) > -1;
	        });
	    };
	    return StringUtilities;
	}());
	exports.StringUtilities = StringUtilities;
	
	
	/***/ }),
	/* 2 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", { value: true });
	var CronParser = (function () {
	    function CronParser(expression, dayOfWeekStartIndexZero) {
	        if (dayOfWeekStartIndexZero === void 0) { dayOfWeekStartIndexZero = true; }
	        this.expression = expression;
	        this.dayOfWeekStartIndexZero = dayOfWeekStartIndexZero;
	    }
	    CronParser.prototype.parse = function () {
	        var parsed = this.extractParts(this.expression);
	        this.normalize(parsed);
	        this.validate(parsed);
	        return parsed;
	    };
	    CronParser.prototype.extractParts = function (expression) {
	        if (!this.expression) {
	            throw new Error("Expression is empty");
	        }
	        var parsed = expression.trim().split(" ");
	        if (parsed.length < 5) {
	            throw new Error("Expression has only " + parsed.length + " part" + (parsed.length == 1 ? "" : "s") + ". At least 5 parts are required.");
	        }
	        else if (parsed.length == 5) {
	            parsed.unshift("");
	            parsed.push("");
	        }
	        else if (parsed.length == 6) {
	            if (/\d{4}$/.test(parsed[5])) {
	                parsed.unshift("");
	            }
	            else {
	                parsed.push("");
	            }
	        }
	        else if (parsed.length > 7) {
	            throw new Error("Expression has " + parsed.length + " parts; too many!");
	        }
	        return parsed;
	    };
	    CronParser.prototype.normalize = function (expressionParts) {
	        var _this = this;
	        expressionParts[3] = expressionParts[3].replace("?", "*");
	        expressionParts[5] = expressionParts[5].replace("?", "*");
	        if (expressionParts[0].indexOf("0/") == 0) {
	            expressionParts[0] = expressionParts[0].replace("0/", "*/");
	        }
	        if (expressionParts[1].indexOf("0/") == 0) {
	            expressionParts[1] = expressionParts[1].replace("0/", "*/");
	        }
	        if (expressionParts[2].indexOf("0/") == 0) {
	            expressionParts[2] = expressionParts[2].replace("0/", "*/");
	        }
	        if (expressionParts[3].indexOf("1/") == 0) {
	            expressionParts[3] = expressionParts[3].replace("1/", "*/");
	        }
	        if (expressionParts[4].indexOf("1/") == 0) {
	            expressionParts[4] = expressionParts[4].replace("1/", "*/");
	        }
	        if (expressionParts[5].indexOf("1/") == 0) {
	            expressionParts[5] = expressionParts[5].replace("1/", "*/");
	        }
	        if (expressionParts[6].indexOf("1/") == 0) {
	            expressionParts[6] = expressionParts[6].replace("1/", "*/");
	        }
	        expressionParts[5] = expressionParts[5].replace(/(^\d)|([^#/\s]\d)/g, function (t) {
	            var dowDigits = t.replace(/\D/, "");
	            var dowDigitsAdjusted = dowDigits;
	            if (_this.dayOfWeekStartIndexZero) {
	                if (dowDigits == "7") {
	                    dowDigitsAdjusted = "0";
	                }
	            }
	            else {
	                dowDigitsAdjusted = (parseInt(dowDigits) - 1).toString();
	            }
	            return t.replace(dowDigits, dowDigitsAdjusted);
	        });
	        if (expressionParts[5] == "L") {
	            expressionParts[5] = "6";
	        }
	        if (expressionParts[3] == "?") {
	            expressionParts[3] = "*";
	        }
	        if (expressionParts[3].indexOf("W") > -1 &&
	            (expressionParts[3].indexOf(",") > -1 || expressionParts[3].indexOf("-") > -1)) {
	            throw new Error("The 'W' character can be specified only when the day-of-month is a single day, not a range or list of days.");
	        }
	        var days = {
	            SUN: 0,
	            MON: 1,
	            TUE: 2,
	            WED: 3,
	            THU: 4,
	            FRI: 5,
	            SAT: 6
	        };
	        for (var day in days) {
	            expressionParts[5] = expressionParts[5].replace(new RegExp(day, "gi"), days[day].toString());
	        }
	        var months = {
	            JAN: 1,
	            FEB: 2,
	            MAR: 3,
	            APR: 4,
	            MAY: 5,
	            JUN: 6,
	            JUL: 7,
	            AUG: 8,
	            SEP: 9,
	            OCT: 10,
	            NOV: 11,
	            DEC: 12
	        };
	        for (var month in months) {
	            expressionParts[4] = expressionParts[4].replace(new RegExp(month, "gi"), months[month].toString());
	        }
	        if (expressionParts[0] == "0") {
	            expressionParts[0] = "";
	        }
	        for (var i = 0; i < expressionParts.length; i++) {
	            if (expressionParts[i] == "*/1") {
	                expressionParts[i] = "*";
	            }
	            if (expressionParts[i].indexOf("/") > -1 && !/^\*|\-|\,/.test(expressionParts[i])) {
	                var stepRangeThrough = null;
	                switch (i) {
	                    case 4:
	                        stepRangeThrough = "12";
	                        break;
	                    case 5:
	                        stepRangeThrough = "6";
	                        break;
	                    case 6:
	                        stepRangeThrough = "9999";
	                        break;
	                    default:
	                        stepRangeThrough = null;
	                        break;
	                }
	                if (stepRangeThrough != null) {
	                    var parts = expressionParts[i].split("/");
	                    expressionParts[i] = parts[0] + "-" + stepRangeThrough + "/" + parts[1];
	                }
	            }
	        }
	    };
	    CronParser.prototype.validate = function (parsed) {
	        this.assertNoInvalidCharacters("DOW", parsed[5]);
	        this.assertNoInvalidCharacters("DOM", parsed[3]);
	    };
	    CronParser.prototype.assertNoInvalidCharacters = function (partDescription, expression) {
	        var invalidChars = expression.match(/[A-KM-VX-Z]+/gi);
	        if (invalidChars && invalidChars.length) {
	            throw new Error(partDescription + " part contains invalid values: '" + invalidChars.toString() + "'");
	        }
	    };
	    return CronParser;
	}());
	exports.CronParser = CronParser;
	
	
	/***/ }),
	/* 3 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", { value: true });
	var en = (function () {
	    function en() {
	    }
	    en.prototype.atX0SecondsPastTheMinuteGt20 = function () {
	        return null;
	    };
	    en.prototype.atX0MinutesPastTheHourGt20 = function () {
	        return null;
	    };
	    en.prototype.commaMonthX0ThroughMonthX1 = function () {
	        return null;
	    };
	    en.prototype.commaYearX0ThroughYearX1 = function () {
	        return null;
	    };
	    en.prototype.use24HourTimeFormatByDefault = function () {
	        return false;
	    };
	    en.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
	        return "An error occured when generating the expression description.  Check the cron expression syntax.";
	    };
	    en.prototype.everyMinute = function () {
	        return "every minute";
	    };
	    en.prototype.everyHour = function () {
	        return "every hour";
	    };
	    en.prototype.atSpace = function () {
	        return "At ";
	    };
	    en.prototype.everyMinutebetweenX0AndX1 = function () {
	        return "Every minute between %s and %s";
	    };
	    en.prototype.at = function () {
	        return "At";
	    };
	    en.prototype.spaceAnd = function () {
	        return " and";
	    };
	    en.prototype.everysecond = function () {
	        return "every second";
	    };
	    en.prototype.everyX0Seconds = function () {
	        return "every %s seconds";
	    };
	    en.prototype.secondsX0ThroughX1PastTheMinute = function () {
	        return "seconds %s through %s past the minute";
	    };
	    en.prototype.atX0SecondsPastTheMinute = function () {
	        return "at %s seconds past the minute";
	    };
	    en.prototype.everyX0Minutes = function () {
	        return "every %s minutes";
	    };
	    en.prototype.minutesX0ThroughX1PastTheHour = function () {
	        return "minutes %s through %s past the hour";
	    };
	    en.prototype.atX0MinutesPastTheHour = function () {
	        return "at %s minutes past the hour";
	    };
	    en.prototype.everyX0Hours = function () {
	        return "every %s hours";
	    };
	    en.prototype.betweenX0AndX1 = function () {
	        return "between %s and %s";
	    };
	    en.prototype.atX0 = function () {
	        return "at %s";
	    };
	    en.prototype.commaEveryDay = function () {
	        return ", every day";
	    };
	    en.prototype.commaEveryX0daysOfTheWeek = function () {
	        return ", every %s days of the week";
	    };
	    en.prototype.commaX0ThroughX1 = function () {
	        return ", %s through %s";
	    };
	    en.prototype.first = function () {
	        return "first";
	    };
	    en.prototype.second = function () {
	        return "second";
	    };
	    en.prototype.third = function () {
	        return "third";
	    };
	    en.prototype.fourth = function () {
	        return "fourth";
	    };
	    en.prototype.fifth = function () {
	        return "fifth";
	    };
	    en.prototype.commaOnThe = function () {
	        return ", on the ";
	    };
	    en.prototype.spaceX0OfTheMonth = function () {
	        return " %s of the month";
	    };
	    en.prototype.lastDay = function () {
	        return "the last day";
	    };
	    en.prototype.commaOnTheLastX0OfTheMonth = function () {
	        return ", on the last %s of the month";
	    };
	    en.prototype.commaOnlyOnX0 = function () {
	        return ", only on %s";
	    };
	    en.prototype.commaEveryX0Months = function () {
	        return ", every %s months";
	    };
	    en.prototype.commaOnlyInX0 = function () {
	        return ", only in %s";
	    };
	    en.prototype.commaOnTheLastDayOfTheMonth = function () {
	        return ", on the last day of the month";
	    };
	    en.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
	        return ", on the last weekday of the month";
	    };
	    en.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
	        return ", %s days before the last day of the month";
	    };
	    en.prototype.firstWeekday = function () {
	        return "first weekday";
	    };
	    en.prototype.weekdayNearestDayX0 = function () {
	        return "weekday nearest day %s";
	    };
	    en.prototype.commaOnTheX0OfTheMonth = function () {
	        return ", on the %s of the month";
	    };
	    en.prototype.commaEveryX0Days = function () {
	        return ", every %s days";
	    };
	    en.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
	        return ", between day %s and %s of the month";
	    };
	    en.prototype.commaOnDayX0OfTheMonth = function () {
	        return ", on day %s of the month";
	    };
	    en.prototype.spaceAndSpace = function () {
	        return " and ";
	    };
	    en.prototype.commaEveryMinute = function () {
	        return ", every minute";
	    };
	    en.prototype.commaEveryHour = function () {
	        return ", every hour";
	    };
	    en.prototype.commaEveryX0Years = function () {
	        return ", every %s years";
	    };
	    en.prototype.commaStartingX0 = function () {
	        return ", starting %s";
	    };
	    en.prototype.daysOfTheWeek = function () {
	        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	    };
	    en.prototype.monthsOfTheYear = function () {
	        return [
	            "January",
	            "February",
	            "March",
	            "April",
	            "May",
	            "June",
	            "July",
	            "August",
	            "September",
	            "October",
	            "November",
	            "December"
	        ];
	    };
	    return en;
	}());
	exports.en = en;
	
	
	/***/ }),
	/* 4 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", { value: true });
	var expressionDescriptor_1 = __webpack_require__(0);
	var enLocaleLoader_1 = __webpack_require__(5);
	expressionDescriptor_1.ExpressionDescriptor.initialize(new enLocaleLoader_1.enLocaleLoader());
	exports.default = expressionDescriptor_1.ExpressionDescriptor;
	var toString = expressionDescriptor_1.ExpressionDescriptor.toString;
	exports.toString = toString;
	
	
	/***/ }),
	/* 5 */
	/***/ (function(module, exports, __webpack_require__) {
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", { value: true });
	var en_1 = __webpack_require__(3);
	var enLocaleLoader = (function () {
	    function enLocaleLoader() {
	    }
	    enLocaleLoader.prototype.load = function (availableLocales) {
	        availableLocales["en"] = new en_1.en();
	    };
	    return enLocaleLoader;
	}());
	exports.enLocaleLoader = enLocaleLoader;
	
	
	/***/ })
	/******/ ]);
	});

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _jsreportStudio = __webpack_require__(4);
	
	var _HourTimeSelect = __webpack_require__(26);
	
	var _HourTimeSelect2 = _interopRequireDefault(_HourTimeSelect);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var HourTimePicker = function (_Component) {
	  _inherits(HourTimePicker, _Component);
	
	  function HourTimePicker(props) {
	    _classCallCheck(this, HourTimePicker);
	
	    var _this = _possibleConstructorReturn(this, (HourTimePicker.__proto__ || Object.getPrototypeOf(HourTimePicker)).call(this, props));
	
	    _this.state = {
	      editing: false
	    };
	
	    _this.onSelect = _this.onSelect.bind(_this);
	    return _this;
	  }
	
	  _createClass(HourTimePicker, [{
	    key: 'onSelect',
	    value: function onSelect(val) {
	      this.setState({ editing: false });
	      this.props.onChange(val);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var editing = this.state.editing;
	      var _props = this.props,
	          type = _props.type,
	          value = _props.value;
	
	
	      return _react2.default.createElement(
	        'div',
	        { style: { display: 'inline-block' } },
	        _react2.default.createElement('input', {
	          type: 'text',
	          readOnly: true,
	          style: { width: '30px', cursor: 'pointer' },
	          value: value,
	          onClick: function onClick() {
	            return _this2.setState({ editing: true });
	          }
	        }),
	        _react2.default.createElement(
	          _jsreportStudio.Popover,
	          {
	            wrapper: false,
	            open: editing,
	            onClose: function onClose() {
	              return _this2.setState({ editing: false });
	            }
	          },
	          _react2.default.createElement(_HourTimeSelect2.default, {
	            type: type,
	            value: value,
	            onSelect: this.onSelect
	          })
	        )
	      );
	    }
	  }]);
	
	  return HourTimePicker;
	}(_react.Component);
	
	exports.default = HourTimePicker;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _HourTimeSelect = __webpack_require__(27);
	
	var _HourTimeSelect2 = _interopRequireDefault(_HourTimeSelect);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var HourTimeSelectItem = function (_Component) {
	  _inherits(HourTimeSelectItem, _Component);
	
	  function HourTimeSelectItem(props) {
	    _classCallCheck(this, HourTimeSelectItem);
	
	    var _this = _possibleConstructorReturn(this, (HourTimeSelectItem.__proto__ || Object.getPrototypeOf(HourTimeSelectItem)).call(this, props));
	
	    _this.onClick = _this.onClick.bind(_this);
	    return _this;
	  }
	
	  _createClass(HourTimeSelectItem, [{
	    key: 'onClick',
	    value: function onClick() {
	      this.props.onClick(this.props.value);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          value = _props.value,
	          active = _props.active;
	
	
	      return _react2.default.createElement(
	        'div',
	        {
	          className: _HourTimeSelect2.default.item + ' ' + (active ? _HourTimeSelect2.default.itemSelected : ''),
	          onClick: this.onClick
	        },
	        value
	      );
	    }
	  }]);
	
	  return HourTimeSelectItem;
	}(_react.Component);
	
	var HourTimeSelect = function (_Component2) {
	  _inherits(HourTimeSelect, _Component2);
	
	  function HourTimeSelect(props) {
	    _classCallCheck(this, HourTimeSelect);
	
	    var _this2 = _possibleConstructorReturn(this, (HourTimeSelect.__proto__ || Object.getPrototypeOf(HourTimeSelect)).call(this, props));
	
	    _this2.onItemClick = _this2.onItemClick.bind(_this2);
	    return _this2;
	  }
	
	  _createClass(HourTimeSelect, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.itemsContainer.focus();
	    }
	  }, {
	    key: 'onItemClick',
	    value: function onItemClick(value) {
	      this.props.onSelect(value);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;
	
	      var _props$type = this.props.type,
	          type = _props$type === undefined ? 'hour' : _props$type;
	
	      var title = 'Time: ' + (type[0].toUpperCase() + type.slice(1));
	      var maxItems = void 0;
	      var columnLimit = 6;
	      var rowCount = 0;
	      var items = [];
	      var maxRowCount = void 0;
	
	      if (type === 'hour') {
	        maxItems = 24;
	      } else if (type === 'minute') {
	        maxItems = 60;
	      }
	
	      maxRowCount = maxItems / columnLimit;
	
	      while (rowCount < maxRowCount) {
	        var value = rowCount;
	        var cols = [];
	
	        for (var i = 0; i < columnLimit; i++) {
	          cols.push(value + maxRowCount * i);
	        }
	
	        items = items.concat(cols.map(function (colValue) {
	          var valueItem = String(colValue).length === 1 ? '0' + colValue : String(colValue);
	
	          return _react2.default.createElement(HourTimeSelectItem, {
	            key: colValue,
	            active: _this3.props.value === valueItem,
	            value: valueItem,
	            onClick: _this3.onItemClick
	          });
	        }));
	
	        rowCount++;
	      }
	
	      return _react2.default.createElement(
	        'div',
	        {
	          className: _HourTimeSelect2.default.container,
	          style: {
	            width: '150px'
	          }
	        },
	        _react2.default.createElement(
	          'div',
	          {
	            className: _HourTimeSelect2.default.title
	          },
	          title
	        ),
	        _react2.default.createElement(
	          'div',
	          {
	            className: _HourTimeSelect2.default.list,
	            ref: function ref(itemsContainer) {
	              _this3.itemsContainer = itemsContainer;
	            },
	            tabIndex: '-1'
	          },
	          items
	        )
	      );
	    }
	  }]);
	
	  return HourTimeSelect;
	}(_react.Component);
	
	exports.default = HourTimeSelect;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(28);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!./../node_modules/postcss-loader/index.js!./../node_modules/sass-loader/index.js?outputStyle=expanded&sourceMap!./HourTimeSelect.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!./../node_modules/postcss-loader/index.js!./../node_modules/sass-loader/index.js?outputStyle=expanded&sourceMap!./HourTimeSelect.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports
	
	
	// module
	exports.push([module.id, ".container___K1u5_ {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);\n  border-radius: 4px;\n}\n\n.title___fzfhv {\n  background-color: #ccc;\n  font-size: 0.85rem;\n  text-align: center;\n  padding: 2px 0px;\n}\n\n.list___V0IoC {\n  font-size: 0.75rem;\n  max-height: 66px;\n  overflow-y: scroll;\n}\n\n.item___QmESg {\n  cursor: pointer;\n  display: inline-block;\n  padding: 0.35rem;\n  text-align: center;\n  width: 21.60px;\n}\n\n.item___QmESg:hover, .itemSelected___1GR6Z {\n  background-color: #3B99FC;\n  color: #fff;\n}\n", "", {"version":3,"sources":["/./studio/studio/HourTimeSelect.scss"],"names":[],"mappings":"AACA;EACE,iBAAgB;EAChB,qCAAiC;EACjC,2CAAuC;EACvC,mBAAkB;CACnB;;AAED;EACE,uBAAsB;EACtB,mBAAkB;EAClB,mBAAkB;EAClB,iBAAgB;CACjB;;AAED;EACE,mBAAkB;EAClB,iBAAgB;EAChB,mBAAkB;CACnB;;AAED;EACE,gBAAe;EACf,sBAAqB;EACrB,iBAAgB;EAChB,mBAAkB;EAClB,eAAc;CAMf;;AAXD;EAQI,0BAAyB;EACzB,YAAW;CACZ","file":"HourTimeSelect.scss","sourcesContent":["\n.container {\n  background: #fff;\n  border: 1px solid rgba(0,0,0,0.2);\n  box-shadow: 0 3px 12px rgba(0,0,0,0.15);\n  border-radius: 4px;\n}\n\n.title {\n  background-color: #ccc;\n  font-size: 0.85rem;\n  text-align: center;\n  padding: 2px 0px;\n}\n\n.list {\n  font-size: 0.75rem;\n  max-height: 66px;\n  overflow-y: scroll;\n}\n\n.item {\n  cursor: pointer;\n  display: inline-block;\n  padding: 0.35rem;\n  text-align: center;\n  width: 21.60px;\n\n  &:hover, &Selected {\n    background-color: #3B99FC;\n    color: #fff;\n  }\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports
	exports.locals = {
		"container": "container___K1u5_",
		"title": "title___fzfhv",
		"list": "list___V0IoC",
		"item": "item___QmESg",
		"itemSelected": "itemSelected___1GR6Z"
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _ScheduleEditor = __webpack_require__(1);
	
	var _ScheduleEditor2 = _interopRequireDefault(_ScheduleEditor);
	
	var _jsreportStudio = __webpack_require__(4);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DownloadButton = function (_Component) {
	  _inherits(DownloadButton, _Component);
	
	  function DownloadButton() {
	    _classCallCheck(this, DownloadButton);
	
	    return _possibleConstructorReturn(this, (DownloadButton.__proto__ || Object.getPrototypeOf(DownloadButton)).apply(this, arguments));
	  }
	
	  _createClass(DownloadButton, [{
	    key: 'download',
	    value: function download() {
	      if (_ScheduleEditor2.default.ActiveReport) {
	        window.open(_jsreportStudio2.default.rootUrl + '/reports/' + _ScheduleEditor2.default.ActiveReport._id + '/attachment', '_self');
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      if (!this.props.tab || !this.props.tab.entity || this.props.tab.entity.__entitySet !== 'schedules' || !_ScheduleEditor2.default.ActiveReport) {
	        return _react2.default.createElement('div', null);
	      }
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'toolbar-button', onClick: function onClick() {
	            return _this2.download();
	          } },
	        _react2.default.createElement('i', { className: 'fa fa-download' }),
	        'Download'
	      );
	    }
	  }]);
	
	  return DownloadButton;
	}(_react.Component);
	
	exports.default = DownloadButton;
	
	
	DownloadButton.propTypes = {
	  tab: _react2.default.PropTypes.object,
	  onUpdate: _react2.default.PropTypes.func.isRequired
	};

/***/ }
/******/ ]);