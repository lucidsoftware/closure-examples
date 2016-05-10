goog.provide('example.Receiver');

goog.require('goog.Disposable');
goog.require('goog.events.EventHandler');

/**
 * @constructor
 * @extends {goog.Disposable}
 * @param {!example.Emitter} emitter
 */
example.Receiver = function(emitter) {
    /**
     * @const
     * @private {!goog.events.EventHandler}
     */
    this.eventHandler = new goog.events.EventHandler(this);
    this.registerDisposable(this.eventHandler);

    this.eventHandler.listenOnce(emitter, example.Emitter.EventType.WIN_LOTTERY, function(e) {
        console.log('Won: $' + (e.amount / 1000) + 'k'); // e.amount is typed
        this.moveToFiji();
    });

    this.eventHandler.listen(emitter, example.Emitter.EventType.FALL_DOWN, function() {
        console.log('Ouch');
    });
};
goog.inherits(example.Receiver, goog.Disposable);

/**
 * @private
 */
example.Receiver.prototype.moveToFiji = function() {
    console.log('Helloooo Fiji');
};
