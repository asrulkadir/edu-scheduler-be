# Menggunakan Node.js sebagai base image
FROM node:lts-alpine

# Menentukan direktori kerja di dalam container
WORKDIR /app

# Menyalin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Menginstal dependencies
RUN npm install
# Menyalin seluruh kode aplikasi ke dalam container
COPY . .

RUN npx prisma generate

# Menyediakan port yang akan digunakan aplikasi
EXPOSE 4000

# Menjalankan aplikasi
CMD ["npm", "run", "start:migrate"]