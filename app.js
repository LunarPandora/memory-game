// DOMContentLoaded adalah event yang akan dijalankan ketika
// Halaman HTML telah selesai di-load.
// Namun event ini akan mengabaikan konten seperti stylesheets (CSS)
// dan Image yang belum selesai di load.

// Kita akan menambahkan EventListener untuk mengeksekusi
// perintah saat page HTML telah selesai di-load
// dengan addEventListener("DOMContentLoaded").

document.addEventListener("DOMContentLoaded", () => {
    // Kita akan mulai membuat list kartu disini.
    // List kartu akan disimpan dalam Object
    // yang akan di-store kedalam array.

    // Perhatikan dengan baik, bahwa di dalam array ini
    // Setiap kartu WAJIB memiliki pasangan-nya
    // (kartu yang sama, misalnya didalam array ini ada 2 kartu A).
    const cardArray = [
        {
            name : 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        }
    ]

    // Lalu kita acak list isi kartu
    cardArray.sort(() => 0.5 - Math.random())

    // Sekarang, kita akan mulai mengerjakan bagian kotak permainannya.
    // Kotak permainan
    const grid = document.querySelector('.grid') 

    // Skor
    const resultDisplay = document.querySelector('#result') 

    let cardsChosen = [] // Array untuk menampung kartu yang dipilih.
    let cardsChosenId = [] // Array untuk menampung ID dari kartu yang dipilih.
    let cardsWon = [] // Array untuk menampung kartu yang sudah ditemukan pasangannya.

    // Sekarang, kita akan membuat function untuk membuat papan permainannya.
    function createBoard(){

        // Loop sampai semua kartu di cardArray terpanggil
        for(let i = 0; i < cardArray.length; i++){
            // Untuk setiap kartu, kita akan membuat element <img>.
            const card = document.createElement('img')

            // Kita akan menambahkan attribute dari tag element <img> diatas.
            card.setAttribute('src', 'images/blank.png') // Untuk menambahkan source foto.
            card.setAttribute('data-id', i) // Untuk memberi id ke setiap kartu.

            // Supaya kita dapat mengecek jenis kartu saat diklik
            // Maka kita akan menambahkan EventListener
            // untuk mengeksekusi function flipCard() saat kartu ini diklik.
            card.addEventListener('click', flipCard) 

            // Setelah semuanya selesai, maka kita akan memasukkan element ini
            // kedalam papan permainan.
            grid.appendChild(card)
        }
    }

    // Sekarang, kita akan membuat function untuk mengecek
    // apakah kartu pertama sama dengan kartu kedua.
    function checkForMatch(){
        // Kita akan mengambil semua kartu yang ada dipapan.
        const cards = document.querySelectorAll("img")

        // Setelah itu, kita akan mengambil 2 kartu yang telah terpilih.
        const cardOneId = cardsChosenId[0]
        const cardTwoId = cardsChosenId[1]

        // Jika kedua kartu adalah kartu yang telah diklik
        // dan diklik lagi (kartu yang sama di klik 2 kali)
        if(cardOneId == cardTwoId){
            cards[cardOneId].setAttribute('src', 'images/blank.png')
            cards[cardTwoId].setAttribute('src', 'images/blank.png')

            alert('You have clicked the same image!')
        }
        // Jika kartu pertama dan kartu kedua adalah
        // kartu yang sama (gambar nya cocok)
        else if(cardsChosen[0] === cardsChosen[1]){
            alert("You found a match!")

            // Ubah gambar kartu menjadi putih
            cards[cardOneId].setAttribute('src', 'images/white.png')
            cards[cardTwoId].setAttribute('src', 'images/white.png')

            // Hapus EventListener "click" supaya kartu
            // tidak akan menjalankan function apapun lagi saat diklik.
            cards[cardOneId].removeEventListener('click', flipCard)
            cards[cardTwoId].removeEventListener('click', flipCard)

            // Masukkan kedua kartu tersebut ke array kartu yang sudah
            // memiliki pasangan.
            cardsWon.push(cardsChosen)
        }
        // Jika kedua kartu adalah kartu yang berbeda
        // atau tidak cocok
        else{
            cards[cardOneId].setAttribute('src', 'images/blank.png')
            cards[cardTwoId].setAttribute('src', 'images/blank.png')

            alert('Sorry, try again!')
        }

        // Setelah melakukan pengecekan,
        // Kosongkan array kartu yang terpilih (cardsChosen)
        // dan array ID dari kartu yang terpilih (cardsChosenId)
        cardsChosen = []
        cardsChosenId = []

        // Setelah itu, tampilkan hasil skor.
        resultDisplay.textContent = cardsWon.length

        // Jika jumlah kartu pada array kartu yang sudah ditemukan
        // pasangannya sama dengan 1/2 dari list kartu yang ada
        // (Dibagi dengan 2 karena list kartu sebenarnya terdiri dari
        // beberapa 2 pasang kartu yang sama), Maka game telah selesai.
        if(cardsWon.length === cardArray.length/2){
            resultDisplay.textContent = "Congratulations! You found them all!"
        }
    }

    // Terakhir, kita akan membuat function untuk memutar kartu
    // pada papan permainan. Function ini akan berjalan setiap kali
    // sebuah kartu diklik pada papan tersebut.
    function flipCard(){
        // Ambil ID dari kartu yang diklik.
        let cardId = this.getAttribute('data-id')

        // Masukkan kartu kedalam array kartu yang terpilih
        cardsChosen.push(cardArray[cardId].name)

        // Masukkan ID kartu kedalam array ID kartu yang terpilih
        cardsChosenId.push(cardId)

        // Setelah itu, tampilkan gambar dari kartu ini.
        this.setAttribute('src', cardArray[cardId].img)

        // Jika 2 kartu telah terpilih, jalankan
        // function checkForMatch() untuk mengecek
        // Apakah 2 kartu tersebut sama atau tidak.
        if(cardsChosen.length === 2){
            setTimeout(checkForMatch, 500)
        }
    }

    // Setelah semua function telah kita siapkan,
    // maka jalankan createBoard()
    // untuk memulai permainan.
    createBoard()
})