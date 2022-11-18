FROM node:12-alpine as develop-stage
	# Adding build tools to make yarn install work on Apple silicon / arm64 machines
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .

FROM develop-stage as build-stage
RUN yarn build

FROM nginx:1.15.7-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]