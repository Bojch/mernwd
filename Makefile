setup:
	docker volume create nodemodules

upgrade: 
	yarn --cwd server upgrade
	yarn --cwd client upgrade

install:
	docker-compose -f client/docker-compose.client.builder.yml run --rm install
	docker-compose -f server/docker-compose.server.builder.yml run --rm install

dev:
	docker-compose up