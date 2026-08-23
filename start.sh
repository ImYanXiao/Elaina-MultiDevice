#!/bin/bash

# Threshold batas penuh
MAX_DISK=90
MAX_MEM=90

# Fungsi hapus file yang ditentukan
clean_files() {
    echo "Mulai pembersihan file sampah..."

    # Hapus folder .cache beserta isinya
    if [ -d ".cache" ]; then
        rm -rf .cache
        echo "Folder .cache dihapus."
    fi

    # Hapus semua isi folder tmp (tapi tidak hapus foldernya)
    if [ -d "tmp" ]; then
        rm -rf tmp/*
        echo "Isi folder tmp dihapus."
    fi

    # Hapus file database.json.tmp
    if [ -f "database.json.tmp" ]; then
        rm -f database.json.tmp
        echo "File database.json.tmp dihapus."
    fi

    echo "Pembersihan selesai."
}

# Fungsi cek penggunaan disk
check_disk() {
    USAGE=$(df -h /home/container | awk 'NR==2 {print $5}' | sed 's/%//')
    echo "Disk Usage: $USAGE%"
    if [ "$USAGE" -ge "$MAX_DISK" ]; then
        echo "Disk usage over $MAX_DISK%, menjalankan pembersihan..."
        clean_files
    fi
}

# Fungsi cek penggunaan memory
check_memory() {
    USAGE=$(free | awk '/Mem:/ {printf("%.0f"), $3/$2 * 100}')
    echo "Memory Usage: $USAGE%"
    if [ "$USAGE" -ge "$MAX_MEM" ]; then
        echo "Memory usage over $MAX_MEM%, menjalankan pembersihan..."
        clean_files
    fi
}

# Jalankan pengecekan sebelum start server
check_disk
check_memory

# Start server
echo "Menjalankan semua server..."
npm start