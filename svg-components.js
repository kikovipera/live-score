function createField(containerId) {
    var svg = d3.select(containerId).append('svg');

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
        d: 'M 575,20 L 50,20 50,700 1100,700 1100,20 575,20 575,700 z',
        stroke: 'white',
        "stroke-width": 2,
        fill: 'green'
    });
    svg.append('circle').attr({
        cx: 575,
        cy: 360,
        r: 91.5,
        stroke: 'white',
        "stroke-width": 2,
        "fill-opacity": 0
    });
    svg.append('circle').attr({
        cx: 575,
        cy: 360,
        r: 2,
        stroke: 'white',
        fill: 'white'
    });
    svg.append('circle').attr({
        cx: 160,
        cy: 360,
        r: 2,
        stroke: 'white',
        fill: 'white'
    });
    svg.append('circle').attr({
        cx: 990,
        cy: 360,
        r: 2,
        stroke: 'white',
        fill: 'white'
    });
    svg.append('path').attr({
        d: 'M 50,324.4 L 40,324.4 40, 396.6 50 396.6 z',
        stroke: 'white',
        "stroke-width": 2,
        "fill-opacity": 0
    });
    svg.append('path').attr({
        d: 'M 1100,324.4 L 1110,324.4 1110,396.6 1100,396.6 z',
        stroke: 'white',
        "stroke-width": 2,
        "fill-opacity": 0
    });
    svg.append('path').attr({
        d: 'M 50,269.4 L 105,269.4 105,451.6 50 451.6 z',
        stroke: 'white',
        "stroke-width": 2,
        "fill-opacity": 0
    });
    svg.append('path').attr({
        d: 'M 1100,269.4 L 1045,269.4 1045,451.6 1100,451.6 z',
        stroke: 'white',
        "stroke-width": 2,
        "fill-opacity": 0
    });
    svg.append('path').attr({
        d: 'M 50,159.4 L 215,159.4 215,561.6 50 561.6 z',
        stroke: 'white',
        "stroke-width": 2,
        "fill-opacity": 0
    });
    svg.append('path').attr({
        d: 'M 1100,159.4 L 935,159.4 935,561.6 1100,561.6 z',
        stroke: 'white',
        "stroke-width": 2,
        "fill-opacity": 0
    });
    svg.append('path').attr({
        d: 'M 215,286.875 A 91.5,91.5 0 0,1 215,433.125 z',
        stroke: 'white',
        "stroke-width": 2,
        fill: 'green'
    });
    svg.append('path').attr({
        d: 'M 935,286.875 A 91.5,91.5 0 0,0 935,433.125 z',
        stroke: 'white',
        "stroke-width": 2,
        fill: 'green'
    });
    svg.append('path').attr({
        d: 'M 50,30 A 10,10 0 0,0 60,20 L 50,20 z',
        stroke: 'white',
        "stroke-width": 2,
        "fill-opacity": 0
    });
    svg.append('path').attr({
        d: 'M 60,700 A 10,10 0 0,0 50,690 L 50,700 z',
        stroke: 'white',
        "stroke-width": 2,
        "fill-opacity": 0
    });
    svg.append('path').attr({
        d: 'M 1100,690 A 10,10 0 0,0 1090,700 L 1100,700 z',
        stroke: 'white',
        "stroke-width": 2,
        "fill-opacity": 0
    });
    svg.append('path').attr({
        d: 'M 1090,20 A 10,10 0 0,0 1100,30 L 1100,20 z',
        stroke: 'white',
        "stroke-width": 2,
        "fill-opacity": 0
    });
}

function displayTShirts(teamsPositions, containerId, showTShirtNr, callbackPlayerClick) {
    var svg = d3.select(containerId).append('svg');

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

    var homeGroup = svg.append('g');

    homeGroup.selectAll('image')
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
                return (j * widthStep1 + 75) - (((i * heightSteps1[j]) + heightSteps1[j] / 2) * 1 / svgHeight * (150));
            },
            y: function(d, i, j) {
                return (i * heightSteps1[j]) + heightSteps1[j] / 2;
            },
            width: '75px',
            height: '75px',
            transform: 'translate(50, 35)'
        })
        .on('click', function(d, i, j) {
            callbackPlayerClick('home', d);
        });

    if (showTShirtNr) {
        homeGroup.selectAll('rect')
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
                    return (d < 10 ? -31 : -22) + (j * widthStep1 + 75) - (((i * heightSteps1[j]) + heightSteps1[j] / 2) * 1 / svgHeight * (150));
                },
                y: function(d, i, j) {
                    return 32 + (i * heightSteps1[j]) + heightSteps1[j] / 2;
                },
                rx: 10,
                ry: 10,
                width: 35,
                height: 35,
                transform: 'translate(50, 36)'
            });

        homeGroup.selectAll('text')
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
                    return -20 + (j * widthStep1 + 75) - (((i * heightSteps1[j]) + heightSteps1[j] / 2) * 1 / svgHeight * (150));
                },
                y: function(d, i, j) {
                    return 60 + (i * heightSteps1[j]) + heightSteps1[j] / 2;
                },
                width: '75px',
                height: '75px',
                transform: 'translate(50, 35)'
            });
    }

    var awayGroup = svg.append('g');

    awayGroup.selectAll('image')
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
                return (svgWidth - j * widthStep2 - 125) + (((i * heightSteps2[j]) + heightSteps2[j] / 2) * 1 / svgHeight * 250);
            },
            y: function(d, i, j) {
                return (i * heightSteps2[j]) + heightSteps2[j] / 2;
            },
            width: '75px',
            height: '75px',
            transform: 'translate(-130, 35)'
        })
        .on('click', function(d, i, j) {
            callbackPlayerClick('away', d);
        });

    if (showTShirtNr) {
        awayGroup.selectAll('rect')
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
                    return (d < 10 ? 30 : 20) + (svgWidth - j * widthStep2 - 125) + (((i * heightSteps2[j]) + heightSteps2[j] / 2) * 1 / svgHeight * (250));
                },
                y: function(d, i, j) {
                    return 30 + (i * heightSteps2[j]) + heightSteps2[j] / 2;
                },
                rx: 10,
                ry: 10,
                width: 35,
                height: 35,
                transform: 'translate(-90, 36)'
            });

        awayGroup.selectAll('text')
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
                    return (d < 10 ? 31 : 12) + (svgWidth - j * widthStep2 - 125) + (((i * heightSteps2[j]) + heightSteps2[j] / 2) * 1 / svgHeight * (250));
                },
                y: function(d, i, j) {
                    return 58 + (i * heightSteps2[j]) + heightSteps2[j] / 2;
                },
                width: '75px',
                height: '75px',
                transform: 'translate(-80, 35)'
            });
    }
}


function createHeatMapField(containerId, svg) {
    var fColor = 'black';
    var sWidth = 6;

    svg.append('rect').attr({
        x: 0,
        y: 0,
        width: 1150,
        height: 720,
        fill: fColor,
        'fill-opacity':0
    });
    svg.append('path').attr({
        d: 'M 575,20 L 50,20 50,700 1100,700 1100,20 575,20 575,700 z',
        stroke: fColor,
        "stroke-width": sWidth,
        fill: fColor,
        'fill-opacity': 0
    });
    svg.append('circle').attr({
        cx: 575,
        cy: 360,
        r: 91.5,
        stroke: fColor,
        "stroke-width": sWidth,
        "fill-opacity": 0
    });
    svg.append('circle').attr({
        cx: 575,
        cy: 360,
        r: 2,
        stroke: fColor,
        fill: fColor
    });
    svg.append('circle').attr({
        cx: 160,
        cy: 360,
        r: 2,
        stroke: fColor,
        fill: fColor
    });
    svg.append('circle').attr({
        cx: 990,
        cy: 360,
        r: 2,
        stroke: fColor,
        fill: fColor
    });
    svg.append('path').attr({
        d: 'M 50,324.4 L 40,324.4 40, 396.6 50 396.6 z',
        stroke: fColor,
        "stroke-width": sWidth,
        "fill-opacity": 0
    });
    svg.append('path').attr({
        d: 'M 1100,324.4 L 1110,324.4 1110,396.6 1100,396.6 z',
        stroke: fColor,
        "stroke-width": sWidth,
        "fill-opacity": 0
    });
    svg.append('path').attr({
        d: 'M 50,269.4 L 105,269.4 105,451.6 50 451.6 z',
        stroke: fColor,
        "stroke-width": sWidth,
        "fill-opacity": 0
    });
    svg.append('path').attr({
        d: 'M 1100,269.4 L 1045,269.4 1045,451.6 1100,451.6 z',
        stroke: fColor,
        "stroke-width": sWidth,
        "fill-opacity": 0
    });
    svg.append('path').attr({
        d: 'M 50,159.4 L 215,159.4 215,561.6 50 561.6 z',
        stroke: fColor,
        "stroke-width": sWidth,
        "fill-opacity": 0
    });
    svg.append('path').attr({
        d: 'M 1100,159.4 L 935,159.4 935,561.6 1100,561.6 z',
        stroke: fColor,
        "stroke-width": sWidth,
        "fill-opacity": 0
    });
    svg.append('path').attr({
        d: 'M 215,286.875 A 91.5,91.5 0 0,1 215,433.125 z',
        stroke: fColor,
        "stroke-width": sWidth,
        fill: fColor,
        'fill-opacity': 0
    });
    svg.append('path').attr({
        d: 'M 935,286.875 A 91.5,91.5 0 0,0 935,433.125 z',
        stroke: fColor,
        "stroke-width": sWidth,
        fill: fColor,
        'fill-opacity': 0
    });
    svg.append('path').attr({
        d: 'M 50,30 A 10,10 0 0,0 60,20 L 50,20 z',
        stroke: fColor,
        "stroke-width": sWidth,
        "fill-opacity": 0
    });
    svg.append('path').attr({
        d: 'M 60,700 A 10,10 0 0,0 50,690 L 50,700 z',
        stroke: fColor,
        "stroke-width": sWidth,
        "fill-opacity": 0
    });
    svg.append('path').attr({
        d: 'M 1100,690 A 10,10 0 0,0 1090,700 L 1100,700 z',
        stroke: fColor,
        "stroke-width": sWidth,
        "fill-opacity": 0
    });
    svg.append('path').attr({
        d: 'M 1090,20 A 10,10 0 0,0 1100,30 L 1100,20 z',
        stroke: fColor,
        "stroke-width": sWidth,
        "fill-opacity": 0
    });

}

function createHeatMap(containerId, data) {
    var svg = d3.select(containerId).append('svg');

    svg.attr({
        viewBox: '0 0 1150 720',
        id: 'svg-heatmap-field',
        stroke: 'black'
    });

    var widthSqNr = 60;
    var heightSqNr = 40;

    var widthConst = 1100 / widthSqNr;
    var heightConst = 700 / heightSqNr;

    var colors = ['#A67D9F', '#92799C', '#7D7295', '#696891', '#55618C'];

    var op = Math.random() + 0.3;

    for (var i = 0; i < 20; i++) {
        svg.append('circle').attr({
            cx: function() {
                return 400 - 300 *Math.random();
            },
            cy: function() {
                return 500 * Math.random() + 100;
            },
            r: function () {
                return Math.random() * 120;
            },
            width: widthConst,
            height: heightConst,
            stroke: 'green',
            'stroke-opacity': op,
            fill: colors[Math.floor(Math.random()* 4)],
            'fill-opacity': op
        });
    }

    // for (var i = 0; i < widthSqNr - 3; i++) {
    //     for (var j = 0; j < heightSqNr - 1; j++) {
    //
    //          var op = Math.random();
    //
    //         svg.append('rect').attr({
    //             x: function() {
    //                 return i * widthConst + 50;
    //             },
    //             y: function() {
    //                 return j * heightConst + 20;
    //             },
    //             width: widthConst,
    //             height: heightConst,
    //             stroke: 'green',
    //             'stroke-opacity': op,
    //             fill: colors[Math.floor(Math.random()* 4)],
    //             'fill-opacity': op
    //         });
    //     }
    // }

    createHeatMapField(containerId, svg);
}
