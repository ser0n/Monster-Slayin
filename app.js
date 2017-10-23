new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        playerMana: 100,
        monsterMana: 100,
        gameIsRunning: false,
        turns: [],
        round: 1
    },
    methods: {
        startNewGame: function () {
            window.location.href = 'index.html';
            this.startGame();
        },
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.playerMana = 100;
            this.monsterMana = 100;
            this.turns = [];
        },
        attack: function () {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                playerType: 'human',
                text: 'Player hits monster for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
            this.appendCurrentRounds();
        },

        specialAttack: function () {
            if (this.playerMana >= 25) {
                this.playerMana -= 25;
                var damage = this.calculateDamage(10, 20);
                this.monsterHealth -= damage;
                this.turns.unshift({
                    playerType: 'human',
                    text: 'Player hits monster hard for ' + damage
                });
                if (this.checkWin()) {
                    return;
                }
            }
            else {
                this.turns.unshift({
                    playerType: 'human',
                    text: 'Player doesn\'t have enough mana!'
                });
            }
            this.monsterAttacks();
            this.appendCurrentRounds();
        },

        heal: function () {

            if (this.playerMana - 10 >= 0) {
                this.playerMana -= 10;

                var heal = this.calculateDamage(5, 20);
                if (this.playerHealth <= 90) {
                    this.playerHealth += heal;
                } else {
                    this.playerHealth = 100;
                }
                if (this.playerMana - 10 >= 0) {
                    this.playerMana -= 10;
                }

                this.turns.unshift({
                    playerType: 'human',
                    text: 'Player heals for ' + heal
                });
            } else {
                this.turns.unshift({
                    playerType: 'human',
                    text: 'Player doesn\'t have enough mana!'
                });
            }

            this.monsterAttacks();
            this.appendCurrentRounds();
        },

        giveUp: function () {
            this.gameIsRunning = false;
            this.startNewGame();
        },

        monsterAttacks: function () {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                playerType: 'monster',
                text: 'Monster hits player for ' + damage
            });
        },

        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },

        checkWin: function () {
            if (this.monsterHealth <= 0) {
                window.location.href = 'victory.html';
                return true;
            } else if (this.playerHealth <= 0) {
                window.location.href = 'defeat.html';
                return true;
            }
            return false;
        },

        appendCurrentRounds: function () {
            this.turns.unshift({
                playerType: 'log',
                text: 'Round: #' + this.round
            });
            this.round++;
        }
    }
});