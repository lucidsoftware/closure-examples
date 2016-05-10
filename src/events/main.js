goog.provide('example.Main.events');

goog.require('example.Emitter');
goog.require('example.Receiver');

example.Main.events = function() {
    var emitter = new example.Emitter();

    var receiver = new example.Receiver(emitter);
    emitter.doStuff();
    emitter.doStuff();
    receiver.dispose();

    emitter.doStuff();
    emitter.dispose();
};

goog.exportSymbol('example.Main.events', example.Main.events);
