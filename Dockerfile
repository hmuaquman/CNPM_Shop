# Sử dụng Node.js làm base image
FROM node:18-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ code source vào container
COPY . .

# Build ứng dụng (nếu cần)
RUN npm run build --if-present

# Expose port mà ứng dụng sẽ chạy
EXPOSE 3000

# Khởi chạy ứng dụng
CMD ["npm", "start"]