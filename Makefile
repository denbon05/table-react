install:
	npm install

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