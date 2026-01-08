# Node.Js Alpine
FROM node:18-alpine

# Creating /app Directory 
WORKDIR /app

# Copy Package JSON ke /app
COPY package.json ./

# Install npm dependencies
RUN npm install

# Copy semua files ke /app
COPY . .

# Open Port 3000
EXPOSE 3000

# Running app
CMD ["node", "server.js"]