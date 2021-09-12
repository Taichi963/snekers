document.addEventListener('DOMContentLoaded', function () {
    // mobileメニューのインスタンス
    new MobileMenu();
    new Main();
    new HeroSlider();
});

//mainクラスを作り、その中にプライベートメソッドを格納し、処理を見やすくする。============
class Main {
    constructor() {
        //プライベートメソッドの処理＝＝＝＝＝＝＝＝＝＝＝＝＝
        //DOMのセレクター
        this.header = document.querySelector('.header');
        //サイドバーを取得
        this.sides = document.querySelectorAll('.side');
        // 配列を定義しその中にインスタンス化したScrollObserverのインスタンスを格納する
        this._observers = [];
        this._init();
    }

    //setメソッドとgetメソッド＝＝＝＝＝＝＝＝＝＝＝
    set setobservers(val) {
        this._observers.push(val);
    }

    get getobservers() {
        return this._observers;
    }
    //＝＝＝＝＝＝＝＝＝＝＝setメソッドとgetメソッド

    _init() {
        this.hero = new HeroSlider('.swiper-container');
        this._scrollInit();
    }

    _inviewAnimation(el, inview) {
        if(inview) {
            el.classList.add('inview');
        } else {
            el.classList.remove('inview');
        }
    }

    //サイドバー=================================
    _sedeAnimation(el, inview) {
        if(inview) {
            this.sides.forEach(side => side.classList.add('inview'));
        } else {
            this.sides.forEach(side => side.classList.remove('inview'));
        }
    }
    //プライベートメソッド===============================
    _navAnimation(el, inview) {
        if(inview) {
            // 処理を逆にする（画面の中に入ったらのtriggered）クラスを削除
            this.header.classList.remove('triggered');
        } else {
            // 外に出たら出たら付与する処理
            this.header.classList.add('triggered');
        }
    }

    _textAnimation(el, isIntersecting) {
        if(isIntersecting) {
            const ta = new TweenTextAnimation(el);
            ta.animate();
        }
    }

    //画面外から出たらスライドを止める処理＝＝＝＝＝＝＝＝＝＝＝
    _togglSlideAnimation(el, inview) {
        if(inview) {
        this.hero.start();
        } else {
        this.hero.stop();
        }
    }

//===========================
    _destroyObservers() {
        this._observers.forEach(ob => {
            ob.destroy();
        });
    }
    destroy() {
        this._destroyObservers();
    }
//============================
    _scrollInit() {
        // インスタンス化されたオブジェクトが_observerという配列にプッシュされる。（格納される。）
        // this._observersとするとsetメソッドを呼ぶ
        this.setobservers = new ScrollObserver('.nav-trigger', this._navAnimation.bind(this),{once:false, rootMargin: "700px 0px"}); // this._navAnimationを使用したい
        this.setobservers = new ScrollObserver('.cover-slide', this._inviewAnimation);// cover-slideに対してのインスタンス化
        // appearをinviewアニメーションで監視する。
        this.setobservers = new ScrollObserver('.card', this._inviewAnimation, {once: false, rootMargin: "-200px 0px"});
        this.setobservers = new ScrollObserver('.tween-animate-title', this._textAnimation);
        //autoplay開始させる処理(画面の外に出たらストップさせたい)
        this.setobservers = new ScrollObserver('.swiper-container', this._togglSlideAnimation.bind(this), {once: false});
        //サイドバー
        this.setobservers = new ScrollObserver('#main-content', this._sedeAnimation.bind(this), {once: false, rootMargin: "-400px 0px"});
        console.log(this._observers);　// observersの中身を確認できるようにする
    }
}
//mainクラスを作り、その中にプライベートメソッドを格納し、処理を見やすくする。============
//=========================== navのプライベートメソッド