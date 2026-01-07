/**
 * Fire in the Garden - Configuration
 * ゲーム設定
 */

const monogatari = new Monogatari();

// ゲーム設定
monogatari.configuration('Player', {
    Name: 'ヨウ・デンジャー・ドッグ',
    Color: '#8B4513'
});

// アセットパス設定
monogatari.configuration('AssetsPath', {
    root: 'assets',
    characters: 'assets/characters',
    backgrounds: 'assets/backgrounds',
    music: 'assets/bgm',
    sounds: 'assets/sfx',
    ui: 'assets/ui'
});

// 画面設定（スマホ縦画面優先）
monogatari.configuration('Screen', {
    Width: 1080,
    Height: 1920
});

// 言語設定
monogatari.configuration('Language', 'Japanese');

// セーブスロット
monogatari.configuration('SaveSlots', 10);

// ストレージ（ブラウザローカルストレージ）
monogatari.storage({
    adapter: 'LocalStorage'
});

// ラベル（日本語化）
monogatari.translation('Japanese', {
    'Start': '出勤',
    'Load': 'ロード',
    'Settings': '設定',
    'Help': 'ヘルプ',
    'Save': 'セーブ',
    'Quit': '終了',
    'Back': '戻る',
    'AutoPlay': 'オート',
    'Skip': 'スキップ',
    'Continue': '続ける'
});

// 初期フラグ設定
monogatari.storage({
    player: {
        name: 'ヨウ・デンジャー・ドッグ'
    },
    flags: {
        // ゲーム進行フラグ
        game_started: false,
        chapter1_started: false,
        interrogated_master: false,
        interrogated_firefighter: false,
        interrogated_gardener: false,
        interrogated_painter: false,
        interrogated_apprentice: false,
        all_interrogations_done: false,

        // 推理パート
        chapter2_started: false,
        bite_life: 3,
        key_evidence_count: 0,

        // 証拠発見フラグ
        candle_strap_discovered: false,
        gardener_bag_discovered: false,
        human_plant_journal_discovered: false,
        painter_diary_discovered: false,
        branches_discovered: false,
        sand_discovered: false,

        // エンディング
        chapter3_started: false,
        game_cleared: false,
        game_failed: false
    }
});

// デバッグモード（開発時のみ有効）
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    monogatari.configuration('Debug', true);
    console.log('🐕 Fire in the Garden - Debug Mode Enabled');
}
