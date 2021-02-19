install: install-deps

install-deps:
	npm ci

start:
	npm run start

fix:
	npx eslint --fix .

format:
	npx prettier --write .

test:
	npm run test

build:
	npm run build

PHONY: test