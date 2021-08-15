import { useRef, useState, useEffect } from 'react';
import _clone from 'lodash/clone';

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/**
 * 定时器组件
 * 使用方式为传入child方式
 * endTime, 结束时间的毫秒
 * nowTime, 当前时间的毫秒
 * endCallback 结束事件
 */

var CoutDown = function CoutDown(props) {
  // tree shaking
  _clone(props);

  var start = props.start;
  var endTime = props.endTime,
      nowTime = props.nowTime,
      endCallback = props.endCallback;
  var startFrom = {
    days: 1,
    hour: 2
  };
  var time = endTime - nowTime;
  var timeRef = useRef(time);

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      days = _useState2[0],
      setDays = _useState2[1];

  var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      hour = _useState4[0],
      setHour = _useState4[1];

  var _useState5 = useState(''),
      _useState6 = _slicedToArray(_useState5, 2),
      minute = _useState6[0],
      setMinute = _useState6[1];

  var _useState7 = useState(''),
      _useState8 = _slicedToArray(_useState7, 2),
      second = _useState8[0],
      setSecond = _useState8[1];

  var timer = null;

  var setToEnd = function setToEnd() {
    setDays(0);
    setHour(0);
    setMinute(0);
    setSecond(0);
  };

  var calcLeftTimes = function calcLeftTimes() {
    var leftTimes = timeRef.current;

    if (leftTimes <= 0) {
      console.log('end');
      setToEnd();
      endCallback && endCallback();
      clearInterval(timer);
      return;
    }

    if (start && startFrom[start]) {
      if (start === 'days') {
        var _days = Math.floor(leftTimes / (24 * 60 * 60 * 1000));

        leftTimes -= _days * (24 * 60 * 60 * 1000);
        setDays(_days);
      }
    }

    var hour = Math.floor(leftTimes / (60 * 60 * 1000));
    leftTimes -= hour * (60 * 60 * 1000);
    setHour(hour);
    var minute = Math.floor(leftTimes / (60 * 1000));
    leftTimes -= minute * (60 * 1000);
    setMinute(minute);
    var second = Math.floor(leftTimes / 1000);
    leftTimes -= second * 1000;
    setSecond(second);
    timeRef.current -= 1000;
  };

  useEffect(function () {
    timer = setInterval(function () {
      calcLeftTimes();
    }, 1000);
    return function () {
      clearInterval(timer);
    };
  }, []);
  return props.children(days, hour, minute, second);
};

export { CoutDown as default };
