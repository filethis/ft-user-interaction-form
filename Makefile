# Some simple targets that do useful things


# Project configuration

NAME=ft-user-interaction-form
TYPE=element
PORT=3001


# Boilerplate targets

.PHONY: build
build:
	if [ "${TYPE}" = "element" ]; then \
		echo Cannot build an element project; \
		exit 1; \
	fi; \
	polymer build

.PHONY: lint
lint:
	if [ "${TYPE}" = "element" ]; then \
		polymer lint --input ${NAME}.html; \
	else \
		polymer lint --root src/ --input ${NAME}/${NAME}.html; \
	fi;

.PHONY: push
push:
	git push origin

.PHONY: pull
pull:
	git pull origin

.PHONY: register
register:
	bower register ${NAME} git://github.com/filethis/${NAME}.git

.PHONY: serve
serve:
	polymer serve --port ${PORT}

.PHONY: open-app
open-app:
	open http://localhost:${PORT}

.PHONY: open-demo
open-demo:
	open http://localhost:${PORT}/demo/

.PHONY: open-docs
open-docs:
	open http://localhost:${PORT}/components/${NAME}

.PHONY: test
test:
	polymer test

.PHONY: test-chrome
test-chrome:
	polymer test -l chrome

.PHONY: test-firefox
test-firefox:
	polymer test -l firefox

.PHONY: test-safari
test-safari:
	polymer test -l safari

.PHONY: test-interactive
test-interactive:
	open http://localhost:${PORT}/components/${NAME}/test/${NAME}_test.html
