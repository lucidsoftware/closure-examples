goog.provide('example.Emitter');
goog.provide('example.Emitter.EventType');
goog.provide('example.Emitter.WinLotteryEvent');


goog.require('goog.events');
goog.require('goog.events.Event');
goog.require('goog.events.EventTarget');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
example.Emitter = function() {  
};
goog.inherits(example.Emitter, goog.events.EventTarget);

example.Emitter.prototype.doStuff = function() {
    this.dispatchEvent(example.Emitter.EventType.FALL_DOWN);
    this.dispatchEvent(new example.Emitter.WinLotteryEvent(1e6));
};

/**
 * @const
 */
example.Emitter.EventType = {
    /** @const {!goog.events.EventId<example.Emitter.WinLotteryEvent>} */
    WIN_LOTTERY: new goog.events.EventId(goog.events.getUniqueId('winLottery')), // typed with data
    FALL_DOWN: goog.events.getUniqueId('fallDown'), // without data
};

/**
 * @constructor
 * @extends {goog.events.Event}
 * @param {number} amount
 * @final
 */
example.Emitter.WinLotteryEvent = function(amount) {
    goog.base(this, example.Emitter.EventType.WIN_LOTTERY);

    /**
     * @const {number}
     */
    this.amount = amount;
};
goog.inherits(example.Emitter.WinLotteryEvent, goog.events.Event);
