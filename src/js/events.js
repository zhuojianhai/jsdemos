/**
 * Created by zhuojh on 2019/1/30.
 * Event 事件
 */

/**
 *
 * @type {Event}
 */
// Create the event.
var event = document.createEvent('Event');
var event = document.createEvent("Event");

// Define that the event name is 'build'.
event.initEvent('build', true, true);

// Listen for the event.
document.addEventListener('build', function (e) {
    // e.target matches document from above
}, false);

// target can be any Element or other EventTarget.
document.dispatchEvent(event);


