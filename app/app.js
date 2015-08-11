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

function displayTShirts(teamsPositions, elementId) {
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
                return (j * widthStep1 + 75) - (((i * heightSteps1[j]) + heightSteps1[j] / 2)  * 1/svgHeight * (150));
                // return (j * widthStep1 - widthStep1/4) - ((teamsPositions.t1ShirtNrArr.length - j ) * (0.3) * ((i) / teamsPositions.t1ShirtNrArr[j].length - 0.5) * 250) - (j === 0 ? 100 : 0);
                // return (j * widthStep1) - ((teamsPositions.t1ShirtNrArr.length - j) * (0.3) * (i / teamsPositions.t1ShirtNrArr[j].length) * 250);
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
                return (d < 10 ? -30 : -20) + (j * widthStep1 + 75) - (((i * heightSteps1[j]) + heightSteps1[j] / 2)  * 1/svgHeight * (150));
            },
            y: function(d, i, j) {
                return 30 + (i * heightSteps1[j]) + heightSteps1[j] / 2;
            },
            width: 35,
            height: 35,
            transform: 'translate(50, 36)'
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
                return -20 + (j * widthStep1 + 75) - (((i * heightSteps1[j]) + heightSteps1[j] / 2)  * 1/svgHeight * (150));
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
                return (svgWidth - j * widthStep2 - 125) + (((i * heightSteps2[j]) + heightSteps2[j] / 2)  * 1/svgHeight * 250);
                // return (svgWidth - j * widthStep2 + widthStep2/4) + ((teamsPositions.t2ShirtNrArr.length - j ) * (0.3) * ((i) / teamsPositions.t2ShirtNrArr[j].length - 0.5) * 250) + (j === 0 ? 120 : 0);
                // return (svgWidth - j * widthStep2 - widthStep2/2);// + (i / teamsPositions.t2ShirtNrArr[j].length ) * 250 - ( (j) / teamsPositions.t2ShirtNrArr.length ) * 150;
            },
            y: function(d, i, j) {
                return (i * heightSteps2[j]) + heightSteps2[j] / 2;
            },
            width: '75px',
            height: '75px',
            transform: 'translate(-130, 35)'
        })
        .on('click', function (d, i ,j) {
            playerClickHandler('away', d, i, j);
        });

        // g2tmp.append('foreignObject')
        // .attr({
        //     x: function(d, i, j) {
        //         return (svgWidth - j * widthStep2 - 125) + (((i * heightSteps2[j]) + heightSteps2[j] / 2)  * 1/svgHeight * 250);
        //         // return (svgWidth - j * widthStep2 + widthStep2/4) + ((teamsPositions.t2ShirtNrArr.length - j ) * (0.3) * ((i) / teamsPositions.t2ShirtNrArr[j].length - 0.5) * 250) + (j === 0 ? 120 : 0);
        //         // return (svgWidth - j * widthStep2 - widthStep2/2);// + (i / teamsPositions.t2ShirtNrArr[j].length ) * 250 - ( (j) / teamsPositions.t2ShirtNrArr.length ) * 150;
        //     },
        //     y: function(d, i, j) {
        //         return (i * heightSteps2[j]) + heightSteps2[j] / 2;
        //     },
        //     width: 200,
        //     height: 200
        // }).append("xhtml:body")
        //     .style("font", "14px 'Helvetica Neue'")
        //         .html("<h1>An HTML Foreign Object in SVG</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
        //


        g2.selectAll('rect')
            .data(teamsPositions.t2ShirtNrArr)
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
                    return (d < 10 ? 30 : 20) + (svgWidth - j * widthStep2 - 125) + (((i * heightSteps2[j]) + heightSteps2[j] / 2)  * 1/svgHeight * (250));
                },
                y: function(d, i, j) {
                    return 30 + (i * heightSteps2[j]) + heightSteps2[j] / 2;
                },
                width: 35,
                height: 35,
                transform: 'translate(-90, 36)'
            });

        g2.selectAll('text')
            .data(teamsPositions.t2ShirtNrArr)
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
                    return (d < 10 ? 30 : 10) + (svgWidth - j * widthStep2 - 125) + (((i * heightSteps2[j]) + heightSteps2[j] / 2)  * 1/svgHeight * (250));
                },
                y: function(d, i, j) {
                    return 60 + (i * heightSteps2[j]) + heightSteps2[j] / 2;
                },
                width: '75px',
                height: '75px',
                transform: 'translate(-80, 35)'
            });
}

function playerClickHandler(team, tShirtNr, x, y) {
    // React.render(React.createElement(Tooltip, {}), document.body);
    playerTooltipData.text = team + ' -- ' + tShirtNr;

    Tooltip.forceUpdate();

    console.log(playerTooltipData);
    $('#player-popup').show();
    $('#player-popup').css('left', x*50);
    $('#player-popup').css('top', x*50);
}


var playerTooltipData = {
    text: 'giig'
};

function createField(containerID) {
    var svg = d3.select(containerID).append('svg');

    svg.attr({
        viewBox: '0 0 1150 720',
        id: 'svg-field',
        stroke: 'black'
    });

    svg.append('rect').attr({
        x: 0,
        y: 0,
        width: 1150,
        height: 720,
        fill: 'green'
    });
    svg.append('path').attr({
        d : 'M 575,20 L 50,20 50,700 1100,700 1100,20 575,20 575,700 z',
        stroke : 'white',
        "stroke-width" : 2,
        fill : 'green'
    });
    svg.append('circle').attr({
        cx: 575,
        cy: 360,
        r: 91.5,
        stroke: 'white',
        "stroke-width" : 2,
        "fill-opacity" : 0
    });
    svg.append('circle').attr({
        cx: 575,
        cy: 360,
        r: 2,
        stroke: 'white',
        fill : 'white'
    });
    svg.append('circle').attr({
        cx: 160,
        cy: 360,
        r: 2,
        stroke: 'white',
        fill : 'white'
    });
    svg.append('circle').attr({
        cx: 990,
        cy: 360,
        r: 2,
        stroke: 'white',
        fill : 'white'
    });
    svg.append('path').attr({
        d : 'M 50,324.4 L 40,324.4 40, 396.6 50 396.6 z',
        stroke : 'white',
        "stroke-width" : 2,
        "fill-opacity" : 0
    });
    svg.append('path').attr({
        d : 'M 1100,324.4 L 1110,324.4 1110,396.6 1100,396.6 z',
        stroke : 'white',
        "stroke-width" : 2,
        "fill-opacity" : 0
    });
    svg.append('path').attr({
        d : 'M 50,269.4 L 105,269.4 105,451.6 50 451.6 z',
        stroke : 'white',
        "stroke-width" : 2,
        "fill-opacity" : 0
    });
    svg.append('path').attr({
        d : 'M 1100,269.4 L 1045,269.4 1045,451.6 1100,451.6 z',
        stroke : 'white',
        "stroke-width" : 2,
        "fill-opacity" : 0
    });
    svg.append('path').attr({
        d : 'M 50,159.4 L 215,159.4 215,561.6 50 561.6 z',
        stroke : 'white',
        "stroke-width" : 2,
        "fill-opacity" : 0
    });
    svg.append('path').attr({
        d : 'M 1100,159.4 L 935,159.4 935,561.6 1100,561.6 z',
        stroke : 'white',
        "stroke-width" : 2,
        "fill-opacity" : 0
    });
    svg.append('path').attr({
        d : 'M 215,286.875 A 91.5,91.5 0 0,1 215,433.125 z',
        stroke : 'white',
        "stroke-width" : 2,
        fill : 'green'
    });
    svg.append('path').attr({
        d : 'M 935,286.875 A 91.5,91.5 0 0,0 935,433.125 z',
        stroke : 'white',
        "stroke-width" : 2,
        fill : 'green'
    });
    svg.append('path').attr({
        d : 'M 50,30 A 10,10 0 0,0 60,20 L 50,20 z',
        stroke : 'white',
        "stroke-width" : 2,
        "fill-opacity" : 0
    });
    svg.append('path').attr({
        d : 'M 60,700 A 10,10 0 0,0 50,690 L 50,700 z',
        stroke : 'white',
        "stroke-width" : 2,
        "fill-opacity" : 0
    });
    svg.append('path').attr({
        d : 'M 1100,690 A 10,10 0 0,0 1090,700 L 1100,700 z',
        stroke : 'white',
        "stroke-width" : 2,
        "fill-opacity" : 0
    });
    svg.append('path').attr({
        d : 'M 1090,20 A 10,10 0 0,0 1100,30 L 1100,20 z',
        stroke : 'white',
        "stroke-width" : 2,
        "fill-opacity" : 0
    });
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
}
