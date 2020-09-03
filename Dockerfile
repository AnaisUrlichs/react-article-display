# Pull official base image
FROM node:latest as build-deps

# A directory within the virtualized Docker environment
# Becomes more relevant when using Docker Compose later
WORKDIR /app
 
# Copies package.json and package-lock.json to Docker environment
COPY package.json yarn.lock ./
 
# Installs all node packages
RUN npm install
 
# Copies everything over to Docker environment
COPY . ./

# Installs all node packages
RUN npm run build

# the base image for this is an alpine based nginx image
FROM nginx:latest

# copy the build folder from react to the root of nginx (www)
COPY --from=build-deps /app/public /usr/share/nginx/html

# expose port 80 to the outer world
EXPOSE 80

# start nginx 
CMD ["nginx", "-g", "daemon off;"]
