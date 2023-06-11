const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// Khai báo các elements
const playBtn = $('#Play_Ms');
const playerIcon = $('#Play_Ms .fa-solid');
const nextBtn = $('.fa-forward');
const prevBtn = $('.fa-backward');
const progress = $('#progress');
const cdThumd = $('.poster');
const ranDom = $('.fa-shuffle');
const comeBack = $('.fa-arrow-rotate-right');
const playlist =  $('#playlist');

const app = {
   currentIndex: 0,
   isPlaying: false,
   isRandom: false,
   isComback: false,
   songs: [
    {
        name: 'Cô Gái Này Là Của Ai ',
        singer: 'Câu Chuyện「Chàng Trai」Đứng Dừng Đèn Đỏ',
        path: './assets/music/song1.mp3',
        images: './assets/img/song1.jpg'
    },
    {
        name: 'Hoa Cỏ Lau ',
        singer: 'Phong Max「Cukak Remix」Audio Lyrics',
        path: './assets/music/song2.mp3',
        images: './assets/img/song2.jpg'
    },
    {
        name: 'Thu Cuối  ',
        singer: 'Mr T X Yanbi X Hằng (Bingz Remix)',
        path: './assets/music/song3.mp3',
        images: './assets/img/song3.jpg'
    },
    {
        name: 'Khuê Mộc Lang ',
        singer: 'Hương Ly ft. Jombie「Cukak Remix」',
        path: './assets/music/song4.mp3',
        images: './assets/img/song4.jpg'
    },
    {
        name: 'Say Em Mất Rồi ',
        singer: 'Đình Trọng (T2K4) ft. Xuân Quỳnh| ',
        path: './assets/music/song5.mp3',
        images: './assets/img/song5.jpg'
    },
    {
        name: 'Anh Thương Em Nhất Mà ',
        singer: 'Lã. x Log x TiB / OFFICIAL ',
        path: './assets/music/song7.mp3',
        images: './assets/img/song7.jpg'
    },
    {
        name: 'Đường Tôi Chở Em Về ',
        singer: 'Buitruonglinh「Cukak Remix」/ Audio ',
        path: './assets/music/song8.mp3',
        images: './assets/img/song8.jpg'
    },
    {
        name: ' Vị Thần Gọi Gió  ',
        singer: 'Mons x TMinx ( TDMX Mix ) ',
        path: './assets/music/song9.mp3',
        images: './assets/img/song9.jpg'
    },
    {
        name: 'Bạn Tình Ơi ',
        singer: '( Eric T-J REMIX ) - Yuni Boo ft. Goctoi Mixer  ',
        path: './assets/music/song10.mp3',
        images: './assets/img/song10.jpg'
    },
    {
        name: '♬ TÚY ÂM ',
        singer: 'Xesi x Masew x NhatNguyen (Đạt Miss Remix) ',
        path: './assets/music/song11.mp3',
        images: './assets/img/song11.jpg'
    },
    {
        name: 'Im Not Her ',
        singer: 'I am mine, before i am ever anyone else ',
        path: './assets/music/song12.mp3',
        images: './assets/img/song12.jpg'
    },
    {
        name: 'Có Hẹn Với Thanh Xuân ',
        singer: 'Monstar x AnhVu「Remix Version by 1 9 6 7」 ',
        path: './assets/music/song13.mp3',
        images: './assets/img/song13.jpg'
    }
   ],

   render: function() {
    const htmls = this.songs.map((song, index) => {
        return `
            <div class="card_music 
            ${index === this.currentIndex ? 'active' : '' }"data-index="${index}">
                <img src="${song.images}">
                <div class="content">
                    <div class="title_music"> ${song.name} </div>
                    <div class="descriptions"> ${song.singer} </div>
                </div>
                <button>
                    <i class="fa-solid fa-ellipsis"></i>
                </button>
            </div>
        `;
    });
       playlist.innerHTML = htmls.join('')
    },
        defineProperties: function() {
            Object.defineProperty(this, 'currentSong', {
                get: function() {
                    return this.songs[this.currentIndex];
                }
            });
        },
        handleEvents: function() {
            const _this = this;
            
            const cdThumdWidth = cdThumd.offsetWidth;
            const cdThumdAnimation = cdThumd.animate(
              [
                { transform: 'rotate(0deg)' },
                { transform: 'rotate(360deg)' }
              ],
              {
                duration: 10000,
                iterations: Infinity
              }
            );
            cdThumdAnimation.pause();
            
            // Rotate poster
            
            playBtn.onclick = function() {
              if (_this.isPlaying) {
                audio.pause();
              } else {
                audio.play();
              }
            };
            
            audio.onplay = function() {
              _this.isPlaying = true;
              playerIcon.classList.remove('fa-play');
              playerIcon.classList.add('fa-pause');
              cdThumdAnimation.play();
            };
            
            audio.onpause = function() {
              _this.isPlaying = false;
              playerIcon.classList.remove('fa-pause');
              playerIcon.classList.add('fa-play');
              cdThumdAnimation.pause();
            };

            audio.ontimeupdate = function() {
              if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
              }
            }

            audio.onended = function() {
              if(_this.isComback) {
                audio.play()
              } else {
                nextBtn.click()
              }
            }
            playlist.onclick = function(e) {
                // chuyển song click
                const songNode = e.target.closest('.card_music:not(.active)');

                if(e.target.closest('.card_music:not(.active)')
                || e.target.closest('.fa-ellipsis')) {
                    if(e.target.closest('.card_music:not(.active)')) {
                        _this.currentIndex = Number(songNode.dataset.index)
                        _this.loadCurrentSong()
                        _this.render()
                        audio.play()
                    }
                }
            },

            progress.onchange = function(e) {
                const seekTime = audio.duration / 100 * e.target.value
                audio.currentTime = seekTime
            }

            nextBtn.onclick = function() {
                app.nextSong()
                audio.play()
                cdThumdAnimation.play()
                _this.render()
            }

            prevBtn.onclick = function() {
                app.prevSong()
                audio.play()
                cdThumdAnimation.play()
                _this.render()
            }

            ranDom.onclick = function(e) {
                _this.isRandom = !_this.isRandom
                ranDom.classList.toggle('active', _this.isRandom);
                app.playRandomsong()
            }

            comeBack.onclick = function(e) {
                _this.isComback = !_this.isComback
                comeBack.classList.toggle('active', _this.isComback);
            }
    },

    // Funciton
    nextSong: function() {
        this.currentIndex++
        if(this.currentIndex > this.songs.length - 1) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    playRandomsong: function() {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);
      
        this.currentIndex = newIndex;
        this.loadCurrentSong();
        audio.play();
      },      
    loadCurrentSong: function() {
        const heading = $('.player__name')
        const cdThumd = $('.poster');
        const audio = $('#audio');

        heading.textContent = this.currentSong.name
        cdThumd.style.backgroundImage = `url('${this.currentSong.images}')`;
        audio.src = this.currentSong.path
    },


   start: function() {
    // Object constructor
    this.defineProperties();
    // Listeners Play
    this.handleEvents();
    // Load Songs
    this.loadCurrentSong();
    // Render Songs
    this.render();
   }
};

app.start();