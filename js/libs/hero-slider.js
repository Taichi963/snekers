class HeroSlider {
    constructor(el) {
        this.el = el;
        // this.swiperにswiperのインスタンスが入っている
        this.swiper =  this._initSwiper();
    }
    _initSwiper() {
        return new Swiper('.swiper-container', {
            loop: true,
            // hoverしたときのCursor
            grabCursor: true,
            // effect: 'coverflow',
            // centeredSlidesで画像を中央揃えにする
            centeredSlides: true,
            slidesPerView: 5,
            speed: 1000,
            // window幅によって表示枚数を決める
            // breakpoints: {
            //     1024: {
                    // 1024px以上で３枚になる　真ん中が１で左右が0.5
            //         slidesPerView: 2,
            //     }
            // },
            // 自動でスライドさせたい　
            autoplay: {
                // ４秒
                delay: 4000,
                // マウスでスライドさせたあとに、また自動でスライドさせるための処理
                disableOnInteraction: false,
            }
        });
    }

// startを実行した際に変更できるようにする　
// デフォルト値を空のオブジェクトにする　options = {}
    start(options = {}) {
         options = Object.assign({
            // ４秒
            delay: 4000,
            // マウスでスライドさせたあとに、また自動でスライドさせるための処理
            disableOnInteraction: false,
        }, options);

        // this.swiperにswiperのインスタンスが入っている
        this.swiper.params.autoplay = options;
        //sutopolayに格納されているstartを呼び出す
        this.swiper.autoplay.start();
    }
    //stopの処理
    stop() {
        this.swiper.autoplay.stop();
    }
}