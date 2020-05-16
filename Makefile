setup:
	docker volume create nodemodules

install:
	docker-compose -f client/docker-compose.client.builder.yml run --rm install
	docker-compose -f server/docker-compose.server.builder.yml run --rm install

dev:
	docker-compose up