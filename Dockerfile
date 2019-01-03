#==================== Building Stage ================================================ 

# Create the image based on the official Node 8.9.0 image from Dockerhub
FROM node:8.12 as node

# Create a directory where our app will be placed. This might not be necessary
RUN mkdir -p /app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Get all the code needed to run the app
COPY ./dist /app

# Expose the port the app runs in
EXPOSE 4200


#==================== Setting up stage ==================== 
# Create image based on the official nginx - Alpine image
FROM nginx:1.13.7-alpine

COPY --from=node /app /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf