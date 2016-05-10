SHELL := /bin/bash

.ONESHELL:

.PHONY: all clean clean-js js js-events

all: js

clean:
	rm -fr target

clean-js:
	rm -fr target/js/events.js

js: js-events

js-events: target/js/events.js

target/js/%.js: build/closure-compiler/options target/closure-compiler/compiler.jar target/closure-library/.closure-library $(shell find src/$* target/closure-library/closure/goog -name '*.js')
	@mkdir -p $(@D)
	java -jar target/closure-compiler/compiler.jar --entry_point=example.Main.$* --flagfile $< --js_output_file=$@ 'src/$*/**.js' 'target/closure-library/closure/goog/**.js'
	@printf 'JavaScript example.Main.$* compiled to $@ (%0.1f KB gzip)\n' $$(echo $$(gzip < $@ | wc -c) / 1024 | bc -l)

target/closure-compiler/compiler.jar: build/closure-compiler/version
	@rm -fr $(@D)
	@mkdir -p $(@D)
	curl -L http://dl.google.com/closure-compiler/$$(cat $<).tar.gz | tar -mxz -C $(@D)

target/closure-library/.closure-library: build/closure-library/version
	@rm -fr $(@D)
	@mkdir -p $(@D)
	curl -L https://github.com/google/closure-library/archive/$$(cat $<).tar.gz | tar -mxz -C $(@D) --strip=1
	@> $@
