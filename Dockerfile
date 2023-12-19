# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the local code to the container
COPY . .

# Expose the port that Next.js will run on
EXPOSE 3000

# Run npm run dev when the container launches
CMD ["npm", "run", "dev"]
