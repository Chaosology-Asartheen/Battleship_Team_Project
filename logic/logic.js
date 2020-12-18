const VERTICAL = 'vertical';
const HORIZONTAL = 'horizontal'
const random = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;
const random_boolean = () => Math.random() < 0.5;

const RUSSIAN = 'RUSSIAN';
const FRENCH = 'FRENCH';

// const SEA = 'SEA';
const SEA = 'SEA';
const SHIPS = [{
    name: 'S1',
    length: 3,
    ship_parts: [{
        ship_index: 0,
        x: 2,
        y: 1,
        is_hit: false
    },
    {
        ship_index: 0,
        x: 2,
        y: 2,
        is_hit: false
    },
    {
        ship_index: 0,
        x: 2,
        y: 3,
        is_hit: false
    }],
    direction: VERTICAL,
    is_sunk: false
},
{
    name: 'S2',
    ship_parts: [{
        ship_index: 1,
        x: 0,
        y: 1,
        is_hit: false
    },
    {
        ship_index: 1,
        x: 0,
        y: 2,
        is_hit: false
    },
    {
        ship_index: 1,
        x: 0,
        y: 3,
        is_hit: false
    }],
    length: 3,
    direction: HORIZONTAL,
    is_sunk: false
},];
const MISS = 'MISS';
const HIT = 'HIT';
const SINK = 'SINK';
const AROUND_SINK = 'AROUND_SINK';
const SHIP_PART = 'SHIP_PART';
const exmpBoard =
    [[SEA, SHIPS[1].ship_parts[0], SHIPS[1].ship_parts[1], SHIPS[1].ship_parts[2], SEA, SEA, SEA, SEA, SEA, SEA],
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA],
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA],
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA],
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA],
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA],
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA],
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA],
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA],
    [SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA, SEA]
    ]

const update_board_square_around_sink = (board, x, y) => {
    const new_board = [...board];
    if (new_board[x][y].value !== MISS)
        new_board[x][y].value = AROUND_SINK;
    return new_board;
}

const update_board_around_sink = (board, ship) => {
    if (ship.direction = HORIZONTAL){
        switch (ship.ship_parts[0].x) {
            case 0:
                switch (ship.ship_parts[0].y) {
                    case 0:
                        exmpBoard = update_board_square_around_sink(board, (x + 1), (y + 1));
                        break;
                    case 9:
                        exmpBoard = update_board_square_around_sink(board, (x + 1), (y - 1));
                        break;
    
                    default:
                        exmpBoard = update_board_square_around_sink(board, (x + 1), (y + 1));
                        exmpBoard = update_board_square_around_sink(board, (x + 1), (y - 1));
                        break;
                }
                break;
    
            case 9:
                switch (ship.ship_parts[0].y) {
                    case 0:
                        exmpBoard = update_board_square_around_sink(board, (x - 1), (y + 1));
    
                        break;
                    case 9:
                        exmpBoard = update_board_square_around_sink(board, (x - 1), (y - 1));
    
                        break;
    
                    default:
                        exmpBoard = update_board_square_around_sink(board, (x - 1), (y + 1));
                        exmpBoard = update_board_square_around_sink(board, (xx - 1), (y - 1));
                        break;
                }
                break;
    
            default:
                exmpBoard = update_board_square_around_sink(board, (x + 1), (y + 1));
                exmpBoard = update_board_square_around_sink(board, (x + 1), (y - 1));
                exmpBoard = update_board_square_around_sink(board, (x - 1), (y + 1));
                exmpBoard = update_board_square_around_sink(board, (x - 1), (y - 1));
    
                break;
        }
    }
}

const update_board_hit = (x = 0, y = 3, ship_index, Board = exmpBoard, ships) => {
    const new_SHIPS = { ...ships };
    const new_board = [...board];
    new_SHIPS[ship_index].ship_parts.filter((part) => part.x === x && part.y === y)[0].is_hit = true;

    const is_ship_sunk = true;
    for (const ship_part of new_SHIPS[ship_index].ship_parts) {
        if (!ship_part.is_hit)
            is_ship_sunk = false;
    }

    if (is_ship_sunk) {
        new_SHIPS[ship_index].is_sunk = is_ship_sunk;
        new_SHIPS = update_board_around_sink(new_board, new_SHIPS)

    }

    const is_win = true;
    for (const ship of new_SHIPS) {
        if (!ship.is_sunk)
            is_win = false;
    }

    new_board[x][y].is_hit = true;

    switch (x) {
        case 0:
            switch (y) {
                case 0:
                    exmpBoard = update_board_square_around_sink(board, (x + 1), (y + 1));
                    break;
                case 9:
                    exmpBoard = update_board_square_around_sink(board, (x + 1), (y - 1));
                    break;

                default:
                    exmpBoard = update_board_square_around_sink(board, (x + 1), (y + 1));
                    exmpBoard = update_board_square_around_sink(board, (x + 1), (y - 1));
                    break;
            }
            break;

        case 9:
            switch (y) {
                case 0:
                    exmpBoard = update_board_square_around_sink(board, (x - 1), (y + 1));

                    break;
                case 9:
                    exmpBoard = update_board_square_around_sink(board, (x - 1), (y - 1));

                    break;

                default:
                    exmpBoard = update_board_square_around_sink(board, (x - 1), (y + 1));
                    exmpBoard = update_board_square_around_sink(board, (xx - 1), (y - 1));
                    break;
            }
            break;

        default:
            exmpBoard = update_board_square_around_sink(board, (x + 1), (y + 1));
            exmpBoard = update_board_square_around_sink(board, (x + 1), (y - 1));
            exmpBoard = update_board_square_around_sink(board, (x - 1), (y + 1));
            exmpBoard = update_board_square_around_sink(board, (x - 1), (y - 1));

            break;
    }

    if (is_ship_sunk)
        if (is_win)
            return 'WIN';
        else
            return { board: new_board, ships: new_SHIPS };
    else
        return { board: new_board };

}

const inspect_hit = (board, x, y) => {
    if (board[x][y].value === SEA) {
        return MISS;
    }
    else if(board[x][y].value === SHIP_PART){
        return HIT;
    }
    return `err in index x:${x} y:${y}`;
}

const update_board_miss = (board, x, y) => {
    const new_board = [...board];
    new_board[x][y].value = MISS;
    return new_board;
}

const place_ships = (board, ships) => {

    const new_board = [... board];
    const new_ships = [... ships];
    new_ships.forEach((ship, index_of_ship) => {
        let needs_placing = true;
        let ship_head_x = null;
        let ship_head_y = null;

        re_place_ship: while (needs_placing) {
            
            if (ship.direction === HORIZONTAL) {
                ship_head_x = random(9);
                ship_head_y = random(9 - ship.length);
                
                for (let i = 0; i < ship.length; i++) {
                    
                    if (new_board[ship_head_x][ship_head_y + i].around_ship !== false) {
                        continue re_place_ship;
                    }
                }
                for (let i = 0; i < ship.length; i++) {
                    const new_ship_part = {
                        ship_index: index_of_ship,
                        x: ship_head_x,
                        y: ship_head_y + i,
                        is_hit: false,
                        value: SHIP_PART
                    }

                    ship.ship_parts.push(new_ship_part);

                    new_board[ship_head_x][ship_head_y + i] = new_ship_part;
                }
                console.log(index_of_ship);
            }

            if (ship.direction === VERTICAL) {
                ship_head_x = random(9 - ship.length);
                ship_head_y = random(9);
                for (let i = 0; i < ship.length; i++) {
                    if (new_board[ship_head_x + i][ship_head_y].around_ship !== false) {
                        continue re_place_ship;
                    }

                }
                for (let i = 0; i < ship.length; i++) {
                    const new_ship_part = {
                        ship_index: index_of_ship,
                        x: ship_head_x + i,
                        y: ship_head_y,
                        is_hit: false,
                        value: SHIP_PART
                    }

                    ship.ship_parts.push(new_ship_part);

                    new_board[ship_head_x + i][ship_head_y] = new_ship_part;

                }
                console.log(index_of_ship);
            }
            // console.log(new_board);
            needs_placing = false;

        }
    });

    return {board: new_board, ships: new_ships};
}


const initial_game_board = (board = [[], [], [], [], [], [], [], [], [], []]) => {
    const new_board = [...board]
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            new_board[j].push({
                x: j,
                y: i,
                value: SEA,
                around_ship: false
            })

        }

    }
    return new_board;
}


const initial_ships = (game_type = RUSSIAN) => {

    if (game_type === RUSSIAN) {
        return [{
            name: 'S1',
            length: 4,
            ship_parts: [],
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S2',
            ship_parts: [],
            length: 3,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S3',
            ship_parts: [],
            length: 3,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S4',
            ship_parts: [],
            length: 2,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S5',
            ship_parts: [],
            length: 2,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S6',
            ship_parts: [],
            length: 2,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S7',
            ship_parts: [],
            length: 1,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S8',
            ship_parts: [],
            length: 1,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S9',
            ship_parts: [],
            length: 1,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S10',
            ship_parts: [],
            length: 1,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        ];
    }

    if (game_type === FRENCH) {
        return [{
            name: 'S1',
            length: 5,
            ship_parts: [],
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S2',
            ship_parts: [],
            length: 4,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S3',
            ship_parts: [],
            length: 3,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S4',
            ship_parts: [],
            length: 3,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        },
        {
            name: 'S5',
            ship_parts: [],
            length: 2,
            direction: random_boolean() ? VERTICAL : HORIZONTAL,
            is_sunk: false
        }
        ];
    }

    else
        return 'err, game type is non existing/unsuported'
}

console.log( place_ships(initial_game_board(),initial_ships()));