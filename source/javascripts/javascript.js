
var view = {
    displayValue: function (id, value) {
        let cell = document.getElementById(id);
        let cell_num = cell.querySelector('.num');
        cell_num.innerHTML = value;
    },

    hideAllValues: function () {
        let list = document.getElementsByClassName('num');
        for (cell of list) {
            cell.innerHTML = '';
        }
    },

    displayCyanCells: function (list_id) {
        for (id of list_id) {
            let cell = document.getElementById(id);
            cell.classList.add('cell-cyan');
        }
    },

    displayBlueCell: function (cell_id) {
        let cell = document.getElementById(cell_id);
        cell.classList.add('cell-blue');
    },

    displayWhiteAllCells: function () {
        let list_cell = document.getElementsByClassName('cell')
        for (cell of list_cell) {
            cell.classList.remove('cell-cyan');
            cell.classList.remove('cell-blue');
        }
    },

    displayCountLives: function (value) {
        let count_lives = document.getElementById('all-heart');
        count_lives.innerHTML = repeat(value, "&#x2764;&#xfe0f;");
    },

    animPulseHeart: function () {
        let count_lives = document.getElementById('lost-heart');
        count_lives.innerHTML = "&#x2764;&#xfe0f;";
        count_lives.classList.remove('animPulseHeart');
        count_lives.offsetWidth;
        count_lives.classList.add('animPulseHeart');
    },

    game_over: function () {
        let screenGameover = document.getElementById('screen-gameover');
        screenGameover.style.display = 'block';
    },

    game_win: function () {
        let screenWin = document.getElementById('screen-win');
        screenWin.style.display = 'block';
    },

    game_start: function () {
        let screenStart = document.getElementById('screen-start');
        screenStart.style.display = 'none';
    },

    open_menu: function () {
        let screenStart = document.getElementById('screen-start');
        screenStart.style.display = 'block';

        let screenGameover = document.getElementById('screen-gameover');
        screenGameover.style.display = 'none';

        let screenWin = document.getElementById('screen-win');
        screenWin.style.display = 'none';
    },

    displayRedBorder: function (element) {
        element.style.borderColor = 'rgb(219, 101, 101)';
    },

    displayDefaultAllBorders: function () {
        let list_nine_cells = document.getElementsByClassName('nine_cells');
        for (cell of list_nine_cells) {
            cell.style.borderColor = '';
        }
    }
}

let sudoku_spawner = {
    field: [['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['4', '5', '6', '7', '8', '9', '1', '2', '3'],
    ['7', '8', '9', '1', '2', '3', '4', '5', '6'],
    ['2', '3', '4', '5', '6', '7', '8', '9', '1'],
    ['5', '6', '7', '8', '9', '1', '2', '3', '4'],
    ['8', '9', '1', '2', '3', '4', '5', '6', '7'],
    ['3', '4', '5', '6', '7', '8', '9', '1', '2'],
    ['6', '7', '8', '9', '1', '2', '3', '4', '5'],
    ['9', '1', '2', '3', '4', '5', '6', '7', '8']],

    visible_field: [[false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false]],

    standart: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],

    default_visible_field: function () {
        for (line of this.visible_field) {
            for (let i = 0; i < 9; i++) {
                line[i] = false;
            }
        }
    },

    get_cell_field: function (id) {
        let x = id[0];
        let y = id[1];

        return this.field[y][x];
    },

    get_cell_visible_field: function (id) {
        let x = id[0];
        let y = id[1];

        return this.visible_field[y][x];
    },

    set_cell_visible_field: function (id, value) {
        let x = id[0];
        let y = id[1];

        this.visible_field[y][x] = value;
    },

    random_procent: function (procent) {
        return procent >= randint(0, 100);
    },

    random_open: function (count) {
        for (let i = 0; i < count; i++) {
            while (true) {
                let x = randint(0, 8);
                let y = randint(0, 8);
                if (!this.visible_field[y][x]) {
                    this.visible_field[y][x] = true;
                    break;
                }
            }
            model.keep_to_win--;
        }

    },

    check_lines: function () {
        for (line of this.field) {
            let set = new Set(line);
            let bool = this.standart.every(el => set.has(el));
            if (!bool) {
                return false;
            }
        }
        return true;
    },

    get_line: function (value, field = this.field) {
        return field[value];
    },

    check_columns: function () {
        for (let i = 0; i < 9; i++) {
            let set = new Set(this.get_column(i));

            let bool = this.standart.every(el => set.has(el));
            if (!bool) {
                return false;
            }
        }
        return true;
    },

    get_column: function (value, field = this.field) {
        let column = [];
        for (let i = 0; i < 9; i++) {
            column.push(field[i][value]);
        }
        return column;
    },

    check_boxs: function () {
        for (let j_box = 0; j_box < 3; j_box++) {
            for (let i_box = 0; i_box < 3; i_box++) {
                let set = new Set(this.get_box(i_box, j_box));
                let bool = this.standart.every(el => set.has(el));
                if (!bool) {
                    return false;
                }
            }
        }
        return true;
    },

    get_box: function (i_box, j_box, field = this.field) {
        let box = [];
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
                box.push(field[j + j_box * 3][i + i_box * 3])
            }
        }
        return box;
    },

    mix_lines: function () {
        num_box = randint(0, 2);
        first_line = randint(0, 2);
        second_line = randint(1, 2) % 3;

        save_line = this.field[second_line + num_box * 3];
        this.field[second_line + num_box * 3] = this.field[first_line + num_box * 3];
        this.field[first_line + num_box * 3] = save_line;
    },

    mix_columns: function () {
        num_box = randint(0, 2);
        first_column = randint(0, 2);
        second_column = randint(1, 2) % 3;

        for (let i = 0; i < 9; i++) {
            save_symbol = this.field[i][second_column + num_box * 3];
            this.field[i][second_column + num_box * 3] = this.field[i][first_column + num_box * 3];
            this.field[i][first_column + num_box * 3] = save_symbol;
        }
    },

    random_mix: function (value) {
        for (let i = 0; i < value; i++) {
            this.mix_lines();
            this.mix_columns();
        }
    },
}

function randint(first, second) {
    return Math.floor(Math.random() * (second + 1 - first)) + first;
}

let model = {
    count_lives: 3,
    keep_to_win: 81,

    init: function (count) {
        this.count_lives = 3;
        this.keep_to_win = 81;
        view.hideAllValues();
        sudoku_spawner.default_visible_field();
        sudoku_spawner.random_mix(500);

        if (!(sudoku_spawner.check_lines ||
            sudoku_spawner.check_columns ||
            sudoku_spawner.check_boxs)) {
            alert("ERROR!!!")
        }

        sudoku_spawner.random_open(count);

        this.collect_sudoku();

        view.displayCountLives(model.count_lives);
        view.displayWhiteAllCells();
        view.displayDefaultAllBorders();
    },

    collect_sudoku: function () {
        for (let j = 0; j < 9; j++) {
            for (let i = 0; i < 9; i++) {
                if (sudoku_spawner.visible_field[j][i]) {
                    let id = `${i}${j}`;
                    view.displayValue(id, sudoku_spawner.field[j][i]);
                }
            }
        }
    },

    get_damage: function () {
        this.count_lives--;
        if (this.count_lives > 0) {
            view.displayCountLives(this.count_lives)
            view.animPulseHeart();
        }
        else {
            view.game_over();
        }
    },

    get_id_line: function (num_line) {
        let list_id = [];
        for (let i = 0; i < 9; i++) {
            list_id.push(`${num_line}${i}`);
        }
        return list_id;
    },

    get_id_column: function (num_col) {
        let list_id = [];
        for (let i = 0; i < 9; i++) {
            list_id.push(`${i}${num_col}`);
        }
        return list_id;
    },

    get_id_square: function (id_cell) {
        let x = Math.floor(id_cell[0] / 3);
        let y = Math.floor(id_cell[1] / 3);

        let list_id = [];
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
                list_id.push(`${x * 3 + i}${y * 3 + j}`)
            }
        }
        return list_id;
    },

    get_parent: function (id_cell) {
        let cell = document.getElementById(id_cell);
        return cell.closest('.nine_cells');
    },

    open_cell: function (value) {
        view.displayValue(controller.target_cell.id, value);
        sudoku_spawner.set_cell_visible_field(controller.target_cell.id, true);
        this.keep_to_win--
        if (!this.keep_to_win) {
            view.game_win();
        }
    },
}

let controller = {
    target_cell: '',

    click_btn: function (value) {
        if (!this.target_cell) {
            return false;
        }
        if (sudoku_spawner.get_cell_visible_field(this.target_cell.id)) {
            return false;
        }

        let value_field = sudoku_spawner.get_cell_field(this.target_cell.id);
        if (value == value_field) {
            model.open_cell(value);
        }
        else {
            model.get_damage();
        }
    },

    click_start_game: function () {
        model.init(40);
        view.game_start();
    },

    click_to_menu: function () {
        view.open_menu();
    },

    click_cell: function (id) {
        this.target_cell = document.getElementById(id);

        view.displayDefaultAllBorders();
        view.displayRedBorder(model.get_parent(id));

        view.displayWhiteAllCells();
        view.displayCyanCells(model.get_id_line(id[0]));
        view.displayCyanCells(model.get_id_column(id[1]));
        view.displayBlueCell(id);
    },
}

function repeat(value, text) {
    let new_text = "";
    for (; value > 0; value--) {
        new_text = new_text + text;
    }
    return new_text;
}

function init_site() {
    // document.addEventListener('contextmenu', event => event.preventDefault());
}


init_site();








