import axios from 'axios'
import cheerio from 'cheerio'

const primbon = {
    sifatbisnis: async (tgl, bln, thn) => {
        return new Promise((resolve, reject) => {
            axios({
                url: 'https://primbon.com/'+'sifat_usaha_bisnis.php',
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: new URLSearchParams(Object.entries({
                    "tgl": tgl, "bln": bln, "thn": thn, "submit": " Submit! "
                }))
            }).then(({ data }) => {
                let $ = cheerio.load(data)
                let fetchText = $('#body').text()
                let hasil
                try {
                    hasil = {
                        status: true,
                        message: {
                            hari_lahir: fetchText.split('Hari Lahir Anda: ')[1].split(thn)[0],
                            usaha: fetchText.split(thn)[1].split('< Hitung Kembali')[0],
                            catatan: 'Setiap manusia memiliki sifat atau karakter yang berbeda-beda dalam menjalankan bisnis atau usaha. Dengan memahami sifat bisnis kita, rekan kita, atau bahkan kompetitor kita, akan membantu kita memperbaiki diri atau untuk menjalin hubungan kerjasama yang lebih baik. Para ahli primbon di tanah Jawa sejak jaman dahulu telah merumuskan karakter atau sifat bisnis seseorang berdasarkan weton hari kelahirannya. Hasil perhitungannya bisa dijadikan referensi untuk memilih bidang usaha atau rekan bisnis yang cocok bagi kita.'
                        }
                    }
                } catch {
                    hasil = {
                        status: false,
                        message: 'Error, Mungkin Input Yang Anda Masukkan Salah'
                    }
                }
                resolve(hasil)
            })
        })
    },
    rejekihoki: async (tgl, bln, thn) => {
        return new Promise((resolve, reject) => {
            axios({
                url: 'https://primbon.com/'+'rejeki_hoki_weton.php',
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: new URLSearchParams(Object.entries({
                    "tgl": tgl, "bln": bln, "thn": thn, "submit": " Submit! "
                }))
            }).then(({
                    data
                }) => {
                let $ = cheerio.load(data)
                let fetchText = $('#body').text()
                let hasil
                try {
                    hasil = {
                        status: true,
                        message: {
                            hari_lahir: fetchText.split('Hari Lahir: ')[1].split(thn)[0],
                            rejeki: fetchText.split(thn)[1].split('< Hitung Kembali')[0],
                            catatan: 'Rejeki itu bukan lah tentang ramalan tetapi tentang usaha dan ikhtiar seseorang. From Admin'
                        }
                    }
                } catch {
                    hasil = {
                        status: false,
                        message: 'Error, Mungkin Input Yang Anda Masukkan Salah'
                    }
                }
                resolve(hasil)
            })
        })
    },
    tanggalnikah: async (tgl, bln, thn) => {
        return new Promise((resolve, reject) => {
            axios.get('https://primbon.com/tanggal_jadian_pernikahan.php?tgl='+tgl+'&bln='+bln+'&thn='+thn+'&proses=+Submit%21+')
            .then(({ data }) => {
                let $ = cheerio.load(data)
                let fetchText = $('#body').text()
                let hasil
                try {
                    hasil = {
                        status: true,
                        message: {
                            tanggal: fetchText.split('Tanggal: ')[1].split('Karakteristik: ')[0],
                            karakteristik: fetchText.split('Karakteristik: ')[1].split('< Hitung Kembali')[0],
                            catatan: 'Untuk melihat kecocokan jodoh dengan pasangan, dapat dikombinasikan dengan primbon Ramalan Jodoh (Jawa), Ramalan Jodoh (Bali), numerologi Kecocokan Cinta, tingkat keserasian Nama Pasangan, dan Ramalan Perjalanan Hidup Suami Istri.'
                        }
                    }
                } catch {
                    hasil = {
                        status: false,
                        message: 'Error, Mungkin Input Yang Anda Masukkan Salah'
                    }
                }
                resolve(hasil)
            })
        })
    },
    kecocokan: async (nama1, nama2) => {
        return new Promise((resolve, reject) => {
            axios.get('https://primbon.com/kecocokan_nama_pasangan.php?nama1='+nama1+'&nama2='+nama2+'&proses=+Submit%21+')
            .then(({ data }) => {
                let $ = cheerio.load(data)
                let fetchText = $("#body").text()
                let hasil
                try {
                    hasil = {
                        status: true,
                        message: {
                            nama_anda: nama1,
                            nama_pasangan: nama2,
                            sisi_positif: fetchText.split('Sisi Positif Anda: ')[1].split('Sisi Negatif Anda: ')[0],
                            sisi_negatif: fetchText.split('Sisi Negatif Anda: ')[1].split('< Hitung Kembali')[0],
                            gambar: 'https://primbon.com/ramalan_kecocokan_cinta2.png',
                            catatan: 'Untuk melihat kecocokan jodoh dengan pasangan, dapat dikombinasikan dengan primbon Ramalan Jodoh (Jawa), Ramalan Jodoh (Bali), numerologi Kecocokan Cinta, Ramalan Perjalanan Hidup Suami Istri, dan makna dari Tanggal Jadian/Pernikahan.'
                        }
                    }
                } catch {
                    hasil = {
                        status: false,
                        message: 'Error, Mungkin Input Yang Anda Masukkan Salah'
                    }
                }
                resolve(hasil)
            })
        })
    },
    mimpi: async (value) => {
        return new Promise((resolve, reject) => {
            axios.get('https://primbon.com/tafsir_mimpi.php?mimpi='+value+'&submit=+Submit+')
            .then(({ data }) => {
                let $ = cheerio.load(data)
                let fetchText = $('#body').text()
                let hasil
                try {
                    hasil = {
                        status: true,
                        message: {
                            mimpi: value,
                            arti: fetchText.split(`Hasil pencarian untuk kata kunci: ${value}`)[1].split('\n')[0],
                            solusi: fetchText.split('Solusi -')[1].trim()
                        }
                    }
                } catch {
                    hasil = {
                        status: false,
                        message: `Tidak ditemukan tafsir mimpi "${value}" Cari dengan kata kunci yang lain.`
                    }
                }
                resolve(hasil)
            })
        })
    },
    artinama: async (value) => {
        return new Promise((resolve, reject) => {
            axios.get('https://primbon.com/arti_nama.php?nama1='+value+'&proses=+Submit%21+')
            .then(({ data }) => {
                let $ = cheerio.load(data)
                let fetchText = $('#body').text()
                let hasil
                try {
                    hasil = {
                        status: true,
                        message: {
                            nama: value,
                            arti: fetchText.split('memiliki arti: ')[1].split('Nama:')[0].trim(),
                            catatan: 'Gunakan juga aplikasi numerologi Kecocokan Nama, untuk melihat sejauh mana keselarasan nama anda dengan diri anda.'
                        }
                    }
                } catch {
                    hasil = {
                        status: false,
                        message: `Tidak ditemukan arti nama "${value}" Cari dengan kata kunci yang lain.`
                    }
                }
                resolve(hasil)
            })
        })
    }
}

export {
    primbon
}