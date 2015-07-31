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
