/**
 * Fire in the Garden - Configuration
 * ゲーム設定とフラグ
 */

// グローバル変数として定義
window.gameFlags = {
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
};

// アセット定義（将来的に使用）
window.gameAssets = {
    scenes: {
        'start_screen': 'start_screen.png',
        'garden_aftermath': 'garden_aftermath.png',
        'interrogation_room': 'interrogation_room.png',
        'garden_day': 'garden_day.png',
        'garden_night': 'garden_night.png',
        'garden_fire': 'garden_fire.png'
    },
    music: {
        'bgm_title': 'title.mp3',
        'bgm_investigation': 'investigation.mp3',
        'bgm_deduction': 'deduction.mp3',
        'bgm_truth': 'truth.mp3'
    },
    sounds: {
        'sfx_bark': 'bark.mp3',
        'sfx_bite': 'bite.mp3',
        'sfx_wrong': 'wrong.mp3',
        'sfx_correct': 'correct.mp3'
    }
};
