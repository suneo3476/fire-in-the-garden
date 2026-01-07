/**
 * Fire in the Garden - Script
 * シナリオスクリプト
 *
 * 元データ: src/domain/scenarios/*.json
 */

// 背景定義
monogatari.assets('scenes', {
    'start_screen': 'start_screen.png',
    'garden_aftermath': 'garden_aftermath.png',
    'interrogation_room': 'interrogation_room.png',
    'garden_day': 'garden_day.png',
    'garden_night': 'garden_night.png',
    'garden_fire': 'garden_fire.png'
});

// BGM定義
monogatari.assets('music', {
    'bgm_title': 'title.mp3',
    'bgm_investigation': 'investigation.mp3',
    'bgm_deduction': 'deduction.mp3',
    'bgm_truth': 'truth.mp3'
});

// 効果音定義
monogatari.assets('sounds', {
    'sfx_bark': 'bark.mp3',
    'sfx_bite': 'bite.mp3',
    'sfx_wrong': 'wrong.mp3',
    'sfx_correct': 'correct.mp3'
});

// ==========================================
// スタート画面
// ==========================================
monogatari.script({
    'Start': [
        'scene start_screen with fadeIn',
        'play music bgm_title',
        'show character police default at center with fadeIn',

        // ランダムセリフ機能（カスタム実装が必要）
        // 一旦、固定セリフで実装
        'police さあ相棒、出勤命令ですよ。',

        {
            'Choice': {
                'Dialog': 'あなたは警察犬のヨウ・デンジャー・ドッグです。',
                'Start': {
                    'Text': '出勤',
                    'Do': 'jump Intro'
                }
            }
        }
    ],

    // ==========================================
    // 導入
    // ==========================================
    'Intro': [
        'stop music bgm_title',
        'scene garden_aftermath with fadeIn',
        'play music bgm_investigation',

        'centered あなたは警察犬のヨウ・デンジャー・ドッグです。警察と協力しながら事件を解決に導いてください。',

        'show character police default at center',
        'police 相棒！準備はいいですか？それじゃあ、行きますよ。',

        // クレジット表示
        'hide character police',
        {
            'Function': {
                'Apply': function() {
                    // クレジット画面を表示
                    const creditScreen = document.createElement('div');
                    creditScreen.className = 'credit-screen';
                    creditScreen.innerHTML = `
                        <h1 class="credit-title">Fire in the Garden</h1>
                        <p class="credit-subtitle">ある豪邸の庭園で火事が起きた。犯人は何を目的に庭園を燃やしたのか。</p>
                    `;
                    document.body.appendChild(creditScreen);

                    // 3秒後にフェードアウト
                    setTimeout(() => {
                        creditScreen.style.animation = 'fadeOut 1s';
                        setTimeout(() => {
                            creditScreen.remove();
                        }, 1000);
                    }, 3000);
                },
                'Reverse': function() {
                    // ロールバック処理（必要なら）
                }
            }
        },

        'wait 4000',
        'jump Chapter1Intro'
    ],

    // ==========================================
    // 第1章 導入
    // ==========================================
    'Chapter1Intro': [
        'scene interrogation_room with fadeIn',
        'show character detective default at left',
        'detective Thank you for requesting！{{br}}豪邸の庭園が燃えた事件。{{br}}美しく、珍しい草花は根こそぎ焼失。{{br}}言っておくが今回は{{br}}あなたもあなたもあなたもあなたも{{br}}すべてが疑わしい。{{br}}君さえもね。',

        'hide character detective',
        'show character assistant default at right',
        'assistant 何言ってんの？{{br}}私は助手ですよ。{{br}}さて、この難問を解く鍵は。{{br}}あなたは何を知っている？{{br}}なぜ笑うのかも教えてほしい。',

        'hide character assistant',
        'show character police default at center',
        'police 楽しいから笑うのですよ。{{br}}愉快な事件、ですからね。{{br}}捜査の結果、{{br}}金品、一切奪われておらず。{{br}}怪我人、負傷者、1人もおらず。{{br}}犯人の目的はなんでしょう？{{br}}相棒が探し当ててくれるでしょう。',

        'jump InterrogationSelect'
    ],

    // ==========================================
    // 第1章 事情聴取選択
    // ==========================================
    'InterrogationSelect': [
        'hide character police',
        'centered 事情聴取する相手を選んでください',

        {
            'Choice': {
                'Dialog': '誰に話を聞く？',
                'Master': {
                    'Text': '庭園の主',
                    'Do': 'jump InterrogationMaster',
                    'Condition': function() {
                        return !this.storage.flags.interrogated_master;
                    }
                },
                'Firefighter': {
                    'Text': '消防士',
                    'Do': 'jump InterrogationFirefighter',
                    'Condition': function() {
                        return !this.storage.flags.interrogated_firefighter;
                    }
                },
                'Gardener': {
                    'Text': '庭師',
                    'Do': 'jump InterrogationGardener',
                    'Condition': function() {
                        return !this.storage.flags.interrogated_gardener;
                    }
                },
                'Painter': {
                    'Text': '画家',
                    'Do': 'jump InterrogationPainter',
                    'Condition': function() {
                        return !this.storage.flags.interrogated_painter;
                    }
                },
                'Apprentice': {
                    'Text': '画家見習い',
                    'Do': 'jump InterrogationApprentice',
                    'Condition': function() {
                        return !this.storage.flags.interrogated_apprentice;
                    }
                }
            }
        }
    ],

    // ==========================================
    // 事情聴取: 庭園の主（サンプル）
    // ==========================================
    'InterrogationMaster': [
        'show character police default at left',
        'show character master default at right',

        'police この庭園の主さんですね。{{br}}今回はお気の毒に。{{br}}火事の原因…{{br}}心当たりはありませんか？',

        'master タバコも吸わないし料理もしない。{{br}}俺自身が火を使うことはない。',

        'police では、やはり放火で間違いなさそうですね。{{br}}放火されるような心当たりは？',

        'master ここは俺の家だが、{{br}}植物園としても開放している。{{br}}ちょっと珍しい植物を育ててるから{{br}}来客は多いかな。',

        'police 珍しい植物？',

        'master 人型植物だ。{{br}}人と変わらない見た目をしている。{{br}}だから不気味がるやつも多くてね。{{br}}わざわざ見に来ておいて{{br}}悪く言うやつがいるもんで。',

        'police いるもんで？',

        'master …「お前なんか植物の養分にでもなれ」{{br}}悪く言われたときは、そんなふうに{{br}}言い返したり。',

        'police ワハハっ！',

        'master ただ、恨みを買いやすいのは昔から。{{br}}来客の中の誰かが犯人だとしても{{br}}俺には見当もつかないよ。',

        // フラグ設定
        {
            'Function': {
                'Apply': function() {
                    this.storage.flags.interrogated_master = true;
                    console.log('庭園の主の聴取完了');
                },
                'Reverse': function() {
                    this.storage.flags.interrogated_master = false;
                }
            }
        },

        'hide character police',
        'hide character master',

        // 全員聴取したかチェック
        {
            'Conditional': {
                'Condition': function() {
                    const flags = this.storage.flags;
                    return flags.interrogated_master &&
                           flags.interrogated_firefighter &&
                           flags.interrogated_gardener &&
                           flags.interrogated_painter &&
                           flags.interrogated_apprentice;
                },
                'True': 'jump Chapter2Intro',
                'False': 'jump InterrogationSelect'
            }
        }
    ],

    // ==========================================
    // プレースホルダー（他の事情聴取シーン）
    // ==========================================
    'InterrogationFirefighter': [
        'centered 消防士の聴取（実装予定）',
        {
            'Function': {
                'Apply': function() {
                    this.storage.flags.interrogated_firefighter = true;
                }
            }
        },
        'jump InterrogationSelect'
    ],

    'InterrogationGardener': [
        'centered 庭師の聴取（実装予定）',
        {
            'Function': {
                'Apply': function() {
                    this.storage.flags.interrogated_gardener = true;
                }
            }
        },
        'jump InterrogationSelect'
    ],

    'InterrogationPainter': [
        'centered 画家の聴取（実装予定）',
        {
            'Function': {
                'Apply': function() {
                    this.storage.flags.interrogated_painter = true;
                }
            }
        },
        'jump InterrogationSelect'
    ],

    'InterrogationApprentice': [
        'centered 画家見習いの聴取（実装予定）',
        {
            'Function': {
                'Apply': function() {
                    this.storage.flags.interrogated_apprentice = true;
                }
            }
        },
        'jump InterrogationSelect'
    ],

    // ==========================================
    // 第2章（プレースホルダー）
    // ==========================================
    'Chapter2Intro': [
        'centered 第2章 推理パート（実装予定）',
        'centered BITE!システムで有力な証拠を集めよう',
        'end'
    ]
});

// CSS追加（クレジット用fadeOut）
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);
