/**
 * Fire in the Garden - Characters
 * キャラクター定義
 *
 * 元データ: src/domain/characters.json
 */

monogatari.characters({
    // 警察（パートナー）
    'police': {
        name: '警察',
        color: '#4169E1',
        directory: 'police',
        sprites: {
            default: 'police_default.png'
        },
        default_expression: 'default'
    },

    // 探偵
    'detective': {
        name: '探偵',
        color: '#2F4F4F',
        directory: 'detective',
        sprites: {
            default: 'detective_default.png'
        },
        default_expression: 'default'
    },

    // 探偵助手
    'assistant': {
        name: '探偵助手',
        color: '#8B008B',
        directory: 'assistant',
        sprites: {
            default: 'assistant_default.png'
        },
        default_expression: 'default'
    },

    // 庭園の主
    'master': {
        name: '庭園の主',
        color: '#DAA520',
        directory: 'master',
        sprites: {
            default: 'master_default.png'
        },
        default_expression: 'default'
    },

    // 消防士
    'firefighter': {
        name: '消防士',
        color: '#DC143C',
        directory: 'firefighter',
        sprites: {
            default: 'firefighter_default.png'
        },
        default_expression: 'default'
    },

    // 庭師
    'gardener': {
        name: '庭師',
        color: '#228B22',
        directory: 'gardener',
        sprites: {
            default: 'gardener_default.png'
        },
        default_expression: 'default'
    },

    // 画家
    'painter': {
        name: '画家',
        color: '#4B0082',
        directory: 'painter',
        sprites: {
            default: 'painter_default.png'
        },
        default_expression: 'default'
    },

    // 画家見習い
    'apprentice': {
        name: '画家見習い',
        color: '#FF8C00',
        directory: 'apprentice',
        sprites: {
            default: 'apprentice_default.png'
        },
        default_expression: 'default'
    },

    // 白い花
    'white_flower': {
        name: '白い花',
        color: '#FFFFFF',
        directory: 'white_flower',
        sprites: {
            default: 'white_flower_default.png'
        },
        default_expression: 'default'
    }
});
