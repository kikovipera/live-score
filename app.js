/*
example: a 1-4-4-2 layout
tShirtNrArr : [['1'], ['3','15', '12', '5'], ['6', '4', '11', '10'], ['24', '8']]

var teamsPositions = {
    t1ShirtImg : 'imgName.png',
    t1ShirtNrArr : [['1'], ['3','15', '12', '5'], ['6', '4', '11', '10'], ['24', '8']],
    t2ShirtImg : 'imgName.png',
    t2ShirtNrArr : [['1'], ['3','15', '12', '5'], ['6', '4', '11', '10'], ['24', '8']]
};

startFrom: 'left' or 'right'
*/

function displayTShirts(teamsPositions, elementId, maxWidth, maxHeight) {
    var svg = d3.select(elementId).append('svg');

    svg.attr({
        viewBox: '0 0 1150 720',
        id: 'svg-names'
    });

    var svgWidth = 1150;
    var svgHeight = 550;

    var halfSvgWidth = svgWidth / 2;

    var widthStep1 = halfSvgWidth / teamsPositions.t1ShirtNrArr.length;
    var widthStep2 = halfSvgWidth / teamsPositions.t2ShirtNrArr.length;

    var heightSteps1 = teamsPositions.t1ShirtNrArr.map(function(elem) {
        return parseInt(svgHeight / (elem.length));
    });
    var heightSteps2 = teamsPositions.t2ShirtNrArr.map(function(elem) {
        return parseInt(svgHeight / (elem.length));
    });

    console.log(heightSteps1);

    var g1 = svg.append('g');

    g1.selectAll('image')
        .data(teamsPositions.t1ShirtNrArr)
        .enter()
        .append('g')
        .selectAll('image')
        .data(function(d, i, j) {
            return d;
        })
        .enter()
        .append('image')
        .attr('xlink:href', teamsPositions.t1ShirtImg)
        .attr({
            x: function(d, i, j) {
                return (j * widthStep1) - ((teamsPositions.t1ShirtNrArr.length - j) * (0.3) * (i / teamsPositions.t1ShirtNrArr[j].length) * 250);
            },
            y: function(d, i, j) {
                return (i * heightSteps1[j]) + heightSteps1[j] / 2;
            },
            width: '75px',
            height: '75px',
            transform: 'translate(50, 35)'
        });

    g1.selectAll('rect')
        .data(teamsPositions.t1ShirtNrArr)
        .enter()
        .append('g')
        .selectAll('rect')
        .data(function(d, i, j) {
            return d;
        })
        .enter()
        .append('rect')
        .attr({
            fill: 'black',
            x: function(d, i, j) {
                return (d < 10 ? -30 : -20) + (j * widthStep1) - ((teamsPositions.t1ShirtNrArr.length - j) * (0.3) * (i / teamsPositions.t1ShirtNrArr[j].length) * 250);
            },
            y: function(d, i, j) {
                return 30 + (i * heightSteps1[j]) + heightSteps1[j] / 2;
            },
            width: 35,
            height: 35,
            transform: 'translate(50, 35)'
        });

    g1.selectAll('text')
        .data(teamsPositions.t1ShirtNrArr)
        .enter()
        .append('g')
        .selectAll('text')
        .data(function(d, i, j) {
            return d;
        })
        .enter()
        .append('text')
        .text(function(d) {
            return d;
        })
        .attr({
            fill: 'white',
            x: function(d, i, j) {
                return -20 + (j * widthStep1) - ((teamsPositions.t1ShirtNrArr.length - j) * (0.3) * (i / teamsPositions.t1ShirtNrArr[j].length) * 250);
            },
            y: function(d, i, j) {
                return 60 + (i * heightSteps1[j]) + heightSteps1[j] / 2;
            },
            width: '75px',
            height: '75px',
            transform: 'translate(50, 35)'
        });



    var g2 = svg.append('g');

    g2.selectAll('image')
        .data(teamsPositions.t2ShirtNrArr)
        .enter()
        .append('g')
        .selectAll('image')
        .data(function(d, i, j) {
            return d;
        })
        .enter()
        .append('image')
        .attr('xlink:href', teamsPositions.t2ShirtImg)
        .attr({
            x: function(d, i, j) {
                return (svgWidth - j * widthStep2) + ((teamsPositions.t2ShirtNrArr.length - j) * (0.3) * (i / teamsPositions.t2ShirtNrArr[j].length) * 250);
            },
            y: function(d, i, j) {
                return (i * heightSteps2[j]) + heightSteps2[j] / 2;
            },
            width: '75px',
            height: '75px',
            transform: 'translate(-130, 35)'
        });
}

function main() {
    var teamsPositions = {
        t1ShirtImg: 'barcelona-tshirt.png',
        t1ShirtNrArr: [
            ['1'],
            ['3', '15', '12', '5'],
            ['6', '4', '11', '10'],
            ['24', '8']
        ],
        t2ShirtImg: 'real-tshirt.png',
        t2ShirtNrArr: [
            ['71'],
            ['3', '15'],
            ['28', '12', '5'],
            ['6', '4', '11', '10', '33'],
            ['8']
        ]
    };

    displayTShirts(teamsPositions, '#svg-holder');

}

//event types: goal, yellow card, red card, substitution

var match = {
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
        team: 0,
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
}
