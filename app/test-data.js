var scoreTestData = {
    home: 2,
    away: 1
};

var timeTestData = {
    time: '88\''
};

var eventsTestData = {
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
    }]
};

var testData = {
    teams: {
        names: ['Barcelona', 'Real Madrid'],
        logos: ['assets/fcb.png', 'assets/rm.png']
    },
    field: {
        t1ShirtImg: 'assets/barcelona-tshirt.png',
        t1ShirtNrArr: [
            ['1'],
            ['2', '5', '3', '22'],
            ['6', '16', '8', '9', '10'],
            ['4']
        ],
        t2ShirtImg: 'assets/real-tshirt.png',
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

var playerBioTestData = {
    name: 'Lionel Messi',
    imgUrl: 'assets/messi.jpg',
    shirtNr: '10',
    nationalityFlagUrl: '',
    data: [
        // {
        //     key: 'Position',
        //     value: 'Forward'
        // },
        {
            key: 'Age',
            value: '28'
        },
        {
            key: 'Height',
            value: '170 cm'
        },
        {
            key: 'Weight',
            value: '72 kg'
        },
        {
            key: 'Nationality',
            value: 'Argentina'
        },
    ]
};

var playerStatsTestData = {
    data: [
        {
            key: 'Total Goals',
            value: '1'
        },
        {
            key: 'Goal Assists',
            value: '1'
        },
        {
            key: 'Shots On Target',
            value: '3'
        },
        {
            key: 'Total Shots',
            value: '3'
        },
        {
            key: 'Fouls Committed',
            value: '1'
        },
        {
            key: 'Fouls Suffered',
            value: '2'
        },
        {
            key: 'Red Cards',
            value: '0'
        },
        {
            key: 'Yellow Cards',
            value: '1'
        },
    ]
};

var playerHeatMapTestData = {
    data: []
}

var possessionTestData = {
    playerId: 1234,
    data : [{
    	min: 1,
    	poss: 0
    },
    {
    	min: 2,
    	poss: 0.99
    },
    {
    	min: 3,
    	poss: 0.96
    },
    {
    	min: 4,
    	poss: 0.96
    },
    {
    	min: 5,
    	poss: 0
    },
    {
    	min: 6,
    	poss: 0
    },
    {
    	min: 7,
    	poss: 0
    },
    {
    	min: 8,
    	poss: 0
    },
    {
    	min: 9,
    	poss: 0.85
    },
    {
    	min: 10,
    	poss: 0.73
    },
    {
    	min: 11,
    	poss: 0
    },
    {
    	min: 12,
    	poss: 0
    },
    {
    	min: 13,
    	poss: 0
    },
    {
    	min: 14,
    	poss: 0
    },
    {
    	min: 15,
    	poss: 0
    },
    {
    	min: 16,
    	poss: 0
    },
    {
    	min: 17,
    	poss: 0
    },
    {
    	min: 18,
    	poss: 0
    },
    {
    	min: 19,
    	poss: 0.92
    },
    {
    	min: 20,
    	poss: 0
    },
    {
    	min: 21,
    	poss: 0
    },
    {
    	min: 22,
    	poss: 0
    },
    {
    	min: 23,
    	poss: 0
    },
    {
    	min: 24,
    	poss: 0
    },
    {
    	min: 25,
    	poss: 0
    },
    {
    	min: 26,
    	poss: 0
    },
    {
    	min: 27,
    	poss: 0
    },
    {
    	min: 28,
    	poss: 0
    },
    {
    	min: 29,
    	poss: 0.96
    },
    {
    	min: 30,
    	poss: 0
    },
    {
    	min: 31,
    	poss: 0.76
    },
    {
    	min: 32,
    	poss: 0
    },
    {
    	min: 33,
    	poss: 0.77
    },
    {
    	min: 34,
    	poss: 0
    },
    {
    	min: 35,
    	poss: 0
    },
    {
    	min: 36,
    	poss: 0
    },
    {
    	min: 37,
    	poss: 0.85
    },
    {
    	min: 38,
    	poss: 0.99
    },
    {
    	min: 39,
    	poss: 0.75
    },
    {
    	min: 40,
    	poss: 0.72
    },
    {
    	min: 41,
    	poss: 0
    },
    {
    	min: 42,
    	poss: 0
    },
    {
    	min: 43,
    	poss: 0
    },
    {
    	min: 44,
    	poss: 0
    },
    {
    	min: 45,
    	poss: 0
    },
    {
    	min: 46,
    	poss: 0
    },
    {
    	min: 47,
    	poss: 0.70
    },
    {
    	min: 48,
    	poss: 0.97
    },
    {
    	min: 49,
    	poss: 0
    },
    {
    	min: 50,
    	poss: 0.64
    },
    {
    	min: 51,
    	poss: 0.97
    },
    {
    	min: 52,
    	poss: 0
    },
    {
    	min: 53,
    	poss: 0
    },
    {
    	min: 54,
    	poss: 0.89
    },
    {
    	min: 55,
    	poss: 1.00
    },
    {
    	min: 56,
    	poss: 0.68
    },
    {
    	min: 57,
    	poss: 0.87
    },
    {
    	min: 58,
    	poss: 0.86
    },
    {
    	min: 59,
    	poss: 0
    },
    {
    	min: 60,
    	poss: 0.93
    },
    {
    	min: 61,
    	poss: 0
    },
    {
    	min: 62,
    	poss: 0.70
    },
    {
    	min: 63,
    	poss: 0.88
    },
    {
    	min: 64,
    	poss: 0
    },
    {
    	min: 65,
    	poss: 0
    },
    {
    	min: 66,
    	poss: 0
    },
    {
    	min: 67,
    	poss: 0
    },
    {
    	min: 68,
    	poss: 0.64
    },
    {
    	min: 69,
    	poss: 0.66
    },
    {
    	min: 70,
    	poss: 0
    },
    {
    	min: 71,
    	poss: 0.97
    },
    {
    	min: 72,
    	poss: 0
    },
    {
    	min: 73,
    	poss: 0
    },
    {
    	min: 74,
    	poss: 0
    },
    {
    	min: 75,
    	poss: 0
    },
    {
    	min: 76,
    	poss: 0
    },
    {
    	min: 77,
    	poss: 0.88
    },
    {
    	min: 78,
    	poss: 0
    },
    {
    	min: 79,
    	poss: 0
    },
    {
    	min: 80,
    	poss: 0.82
    },
    {
    	min: 81,
    	poss: 0
    },
    {
    	min: 82,
    	poss: 0
    },
    {
    	min: 83,
    	poss: 0
    },
    {
    	min: 84,
    	poss: 0
    },
    {
    	min: 85,
    	poss: 0
    },
    {
    	min: 86,
    	poss: 0
    },
    {
    	min: 87,
    	poss: 0
    },
    {
    	min: 88,
    	poss: 0
    },
    {
    	min: 89,
    	poss: 0
    },
    {
    	min: 90,
    	poss: 0
    }
    ]
}

var playerMatchEventsTestData = {
    playerId : 1234,
    data : [
        {
            min: 10,
            event: 'yellow-card'
        },
        {
            min: 58,
            event: 'goal'
        },
        {
            min: 80,
            event: 'change',
            by: 'Xavi'
        }
    ]
}
