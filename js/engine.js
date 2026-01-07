/**
 * Fire in the Garden - Simple Game Engine
 * 軽量ビジュアルノベルエンジン
 */

const GameEngine = {
    // ゲーム状態
    state: {
        currentScene: 'Start',
        currentLine: 0,
        flags: {},
        characters: {},
        assets: {}
    },

    // DOM要素
    elements: {},

    // 初期化
    init() {
        this.elements = {
            background: document.getElementById('background'),
            characters: document.getElementById('characters'),
            textBox: document.getElementById('text-box'),
            speakerName: document.getElementById('speaker-name'),
            dialogueText: document.getElementById('dialogue-text'),
            choices: document.getElementById('choices'),
            centeredText: document.getElementById('centered-text')
        };

        // クリックで次へ
        this.elements.textBox.addEventListener('click', () => this.next());

        // 初期フラグ設定
        this.state.flags = window.gameFlags || {};
        this.state.characters = window.gameCharacters || {};
        this.state.assets = window.gameAssets || {};

        console.log('🎮 Game Engine initialized');
        console.log('Starting scene:', this.state.currentScene);

        // ゲーム開始
        this.startScene(this.state.currentScene);
    },

    // シーン開始
    startScene(sceneName) {
        console.log('▶️ Starting scene:', sceneName);
        this.state.currentScene = sceneName;
        this.state.currentLine = 0;

        const scene = window.gameScript[sceneName];
        if (!scene) {
            console.error('Scene not found:', sceneName);
            this.showCentered('エラー: シーンが見つかりません');
            return;
        }

        this.executeNext();
    },

    // 次の命令を実行
    executeNext() {
        const scene = window.gameScript[this.state.currentScene];
        if (!scene) return;

        const line = scene[this.state.currentLine];
        if (!line) {
            console.log('Scene ended');
            return;
        }

        console.log('Executing line:', this.state.currentLine, line);

        // 命令を解析・実行
        if (typeof line === 'string') {
            this.executeCommand(line);
        } else if (typeof line === 'object') {
            this.executeObject(line);
        }

        this.state.currentLine++;
    },

    // 文字列命令を実行
    executeCommand(command) {
        // 背景変更: scene <id>
        if (command.startsWith('scene ')) {
            const sceneId = command.replace('scene ', '').split(' ')[0];
            this.setBackground(sceneId);
            this.executeNext();
            return;
        }

        // キャラクター表示: show character <id>
        if (command.startsWith('show character ')) {
            const parts = command.split(' ');
            const charId = parts[2];
            this.showCharacter(charId);
            this.executeNext();
            return;
        }

        // キャラクター非表示: hide character <id>
        if (command.startsWith('hide character ')) {
            const charId = command.split(' ')[2];
            this.hideCharacter(charId);
            this.executeNext();
            return;
        }

        // ジャンプ: jump <scene>
        if (command.startsWith('jump ')) {
            const targetScene = command.replace('jump ', '');
            this.startScene(targetScene);
            return;
        }

        // 中央テキスト: centered <text>
        if (command.startsWith('centered ')) {
            const text = command.replace('centered ', '');
            this.showCentered(text);
            return;
        }

        // セリフ: <character> <text>
        const match = command.match(/^(\w+)\s+(.+)$/);
        if (match) {
            const [, charId, text] = match;
            this.showDialogue(charId, text);
            return;
        }

        // 不明な命令
        console.warn('Unknown command:', command);
        this.executeNext();
    },

    // オブジェクト命令を実行
    executeObject(obj) {
        // 選択肢
        if (obj.Choice) {
            this.showChoices(obj.Choice);
            return;
        }

        // 条件分岐
        if (obj.Conditional) {
            const result = obj.Conditional.Condition.call(this);
            const target = result ? obj.Conditional.True : obj.Conditional.False;
            if (target.startsWith('jump ')) {
                this.startScene(target.replace('jump ', ''));
            } else {
                this.executeNext();
            }
            return;
        }

        // 関数実行
        if (obj.Function) {
            obj.Function.Apply.call(this);
            this.executeNext();
            return;
        }

        // 不明なオブジェクト
        console.warn('Unknown object:', obj);
        this.executeNext();
    },

    // 背景設定
    setBackground(sceneId) {
        const asset = this.state.assets.scenes?.[sceneId];
        if (asset) {
            this.elements.background.style.backgroundImage = `url('assets/backgrounds/${asset}')`;
        } else {
            // 素材がない場合は色で代用
            const colors = {
                'start_screen': '#1e3c72',
                'garden_aftermath': '#2c3e50',
                'interrogation_room': '#34495e',
                'garden_day': '#87CEEB',
                'garden_night': '#2c3e50',
                'garden_fire': '#8B0000'
            };
            this.elements.background.style.backgroundColor = colors[sceneId] || '#000';
        }
        this.elements.background.classList.add('fade-in');
    },

    // キャラクター表示
    showCharacter(charId) {
        const char = this.state.characters[charId];
        if (!char) {
            console.warn('Character not found:', charId);
            return;
        }

        // 既存のキャラクター画像を削除
        const existing = document.getElementById(`char-${charId}`);
        if (existing) existing.remove();

        // プレースホルダー（素材がない場合）
        const charDiv = document.createElement('div');
        charDiv.id = `char-${charId}`;
        charDiv.style.cssText = `
            width: 200px;
            height: 400px;
            background: linear-gradient(135deg, ${char.color}, ${char.color}88);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2em;
            font-weight: bold;
            opacity: 0;
            transition: opacity 0.5s;
        `;
        charDiv.textContent = char.name;

        this.elements.characters.appendChild(charDiv);

        // フェードイン
        setTimeout(() => charDiv.style.opacity = '1', 10);
    },

    // キャラクター非表示
    hideCharacter(charId) {
        const charDiv = document.getElementById(`char-${charId}`);
        if (charDiv) {
            charDiv.style.opacity = '0';
            setTimeout(() => charDiv.remove(), 500);
        }
    },

    // セリフ表示
    showDialogue(charId, text) {
        const char = this.state.characters[charId];

        this.elements.centeredText.classList.add('hidden');
        this.elements.textBox.classList.remove('hidden');

        if (char) {
            this.elements.speakerName.textContent = char.name;
            this.elements.speakerName.style.color = char.color;
        } else {
            this.elements.speakerName.textContent = '';
        }

        this.elements.dialogueText.innerHTML = text.replace(/\{\{br\}\}/g, '<br>');
        this.elements.textBox.classList.add('fade-in');
    },

    // 中央テキスト表示
    showCentered(text) {
        this.elements.textBox.classList.add('hidden');
        this.elements.centeredText.classList.remove('hidden');
        this.elements.centeredText.innerHTML = text.replace(/\{\{br\}\}/g, '<br>');
        this.elements.centeredText.classList.add('fade-in');
    },

    // 選択肢表示
    showChoices(choiceData) {
        this.elements.textBox.classList.add('hidden');
        this.elements.centeredText.classList.add('hidden');
        this.elements.choices.innerHTML = '';

        // ダイアログ表示（オプション）
        if (choiceData.Dialog) {
            this.showCentered(choiceData.Dialog);
        }

        // 各選択肢
        Object.keys(choiceData).forEach(key => {
            if (key === 'Dialog') return;

            const option = choiceData[key];

            // 条件チェック
            if (option.Condition && !option.Condition.call(this)) {
                // 条件を満たさない場合はスキップまたは無効化
                return;
            }

            const button = document.createElement('button');
            button.className = 'choice-button';
            button.textContent = option.Text;
            button.onclick = () => {
                this.elements.choices.innerHTML = '';
                this.elements.centeredText.classList.add('hidden');

                if (option.Do) {
                    this.executeCommand(option.Do);
                }
            };

            this.elements.choices.appendChild(button);
        });
    },

    // 次へ
    next() {
        // 選択肢表示中は無視
        if (this.elements.choices.children.length > 0) return;

        this.executeNext();
    },

    // ゲーム終了
    end() {
        this.showCentered('ゲーム終了{{br}}ありがとうございました！');
    }
};
