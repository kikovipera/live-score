var testData = {
    id: 1234,
    teams: {
        names: ['Barcelona', 'Real Madrid'],
        logos: ['fcb.png', 'rm.png']
    },
    score: {
        home: 2,
        away: 1
    },
    time : '88\'',
    events: [{
        type: 0,
        time: '11',
        team: 1,
        players: ['C. Ronaldo']
    }, {
        type: 1,
        time: '17',
        team: 1,
        players: ['Pepe']
    }, {
        type: 1,
        time: '20',
        team: 0,
        players: ['G. Pique']
    }, {
        type: 0,
        time: '49',
        team: 0,
        players: ['C. Puyol']
    }, {
        type: 1,
        time: '56',
        team: 0,
        players: ['S. Busquets']
    }, {
        type: 1,
        time: '59',
        team: 1,
        players: ['F. Coentrao']
    }, {
        type: 1,
        time: '68',
        team: 1,
        players: ['J. Callejon']
    }, {
        type: 0,
        time: '77',
        team: 0,
        players: ['E. Abidal']
    }, {
        type: 1,
        time: '79',
        team: 0,
        players: ['C. Puyol']
    }, {
        type: 3,
        time: '83',
        team: 1,
        players: ['J. Callejon', 'K. Benzema']
    }, {
        type: 1,
        time: '87',
        team: 0,
        players: ['R. Carvalho']
    }],
    field: {
        t1ShirtImg: 'barcelona-tshirt.png',
        t1ShirtNrArr: [
            ['1'],
            ['2', '5', '3', '22'],
            ['6', '16', '8', '9', '10'],
            ['4']
        ],
        t2ShirtImg: 'real-tshirt.png',
        t2ShirtNrArr: [
            ['1'],
            ['15', '3', '4', '12'],
            ['24', '14'],
            ['22', '10', '7'],
            ['9']
        ]
        // t2ShirtNrArr: [
        //     ['1'],
        //     ['15', '3', '4', '12', '22'],
        //     ['24'],
        //     ['22', '10', '7'],
        //     ['9']
        // ]
    },
    players: {
        homePlayers: ['V. Valdez', 'D. Alves', 'C. Puyol', 'G. Pique', 'E. Abidal', 'Xavi', 'S. Busquets', 'A. Iniesta', 'A. Sanchez', 'L. Messi', 'F. Fabregas'],
        homePlayersNr: ['1', '2', '5', '3', '22', '6', '16', '8', '9', '10', '4'],
        awayPlayers: ['I. Cassilas', 'F. Coentrao', 'Pepe', 'S. Ramos', 'Marcelo', 'L. Diarra', 'X. Alonso', 'A. D. Maria', 'M. Ozil', 'C. Ronaldo', 'K. Benzema'],
        awayPlayersNr: ['1', '15', '3', '4', '12', '24', '14', '22', '10', '7', '9']
    },
    stats: [
        {
            name: 'Total Shots',
            home: '17',
            away: '12'
        },
        {
            name: 'Shots on Target',
            home: '5',
            away: '7'
        },
        {
            name: 'Pass Accuracy',
            home: '75%',
            away: '86%'
        },
        {
            name: 'Aerial Won',
            home: '70%',
            away: '30%'
        },
        {
            name: 'Offsides',
            home: '2',
            away: '3'
        },
        {
            name: 'Fouls',
            home: '22',
            away: '13'
        },
        {
            name: 'Corners',
            home: '3',
            away: '5'
        },
        {
            name: 'Throwns',
            home: '23',
            away: '24'
        },
        {
            name: 'Dribbles Won',
            home: '10',
            away: '17'
        },
        {
            name: 'Tackles',
            home: '36',
            away: '28'
        }
    ]
};
