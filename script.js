Highcharts.addEvent(
    Highcharts.Series,
    'afterSetOptions',
    function (e) {
        var colors = Highcharts.getOptions().colors,
            i = 0,
            nodes = {};
        if (
            this instanceof Highcharts.Series.types.networkgraph &&
            e.options.id === 'language-tree'
        ) {
            e.options.data.forEach(function (link) {
                nodes['DFS Platform'] = {
                    id: 'DFS Platform',
                    marker: {
                        symbol: 'url(Photos/DFS Platform.png)',
                        width: '90',
                        height: '90',
                        title: 'DFS Platfor'
                    }
                };
                nodes['APP/USSD'] = {
                    id: 'APP/USSD',
                    marker: {
                        symbol: 'url(Photos/USSD.png)',
                        width: '30',
                        height: '30',

                    }
                };
                nodes['SSL Wireless'] = {
                    id: 'SSL Wireless',
                    marker: {
                        symbol: 'url(Photos/SSL Wireless.png)',
                        width: '50',
                        height: '30',

                    }
                };
                nodes['BANK'] = {
                    id: 'BANK',
                    marker: {
                        symbol: 'url(Photos/Bank.png)',
                        width: '50',
                        height: '30',

                    }
                };
                nodes['Merchant'] = {
                    id: 'Merchant',
                    marker: {
                        symbol: 'url(Photos/Marchant.png)',
                        width: '50',
                        height: '30',

                    }
                };

                if (link[0] === 'DFS Platform') {
                    nodes['DFS Platform'] = {
                        id: 'DFS Platform',
                        marker: {
                            radius: 38
                        },
                        color: 'RED'
                    };
                    nodes[link[1]] = {
                        id: link[1],
                        marker: {
                            radius: 18
                        },
                        color: colors[i++]
                    };
                } else if (nodes[link[0]] && nodes[link[0]].color) {
                    nodes[link[1]] = {
                        id: link[1],
                        color: nodes[link[0]].color
                    };
                }
            });

            e.options.nodes = Object.keys(nodes).map(function (id) {
                return nodes[id];
            });
        }
    }
);

Highcharts.chart('container', {
    chart: {
        type: 'networkgraph',
        marginTop: 80,
        renderTo: 'container',
        //height: '100%'
    },
    title: {
        text: 'Revenue Assurance Framework DFS 1.2',
        //align: 'middle'
    },
    subtitle: {
        text: 'DFS Ecosystem & Risks'
    },
    plotOptions: {
        networkgraph: {
            keys: ['from', 'to'],
            layoutAlgorithm: {
                enableSimulation: true,
                integration: 'euler', //euler or  verlet
                friction: -0.9,
                linkLength: 50
            }
        }
    },
    series: [{
        id: 'language-tree',
        accessibility: {
            enabled: false
        },
        marker: {
            radius: 13
        },
        
        dataLabels: {
            enabled: true,
            linkTextPath: {
                attributes: {
                  dy: 10
                }
            },
            linkFormat: '{point.fromNode.name} \u2192 {point.toNode.name}',
            style: {
                fontSize: '0.8em',
                fontWeight: 'normal'
            },
            textPath: {
                enabled: true,
               /* attributes: {
                  dy: 14,
                  startOffset: '45%',
                  textLength: 80
                } */
              },
            format: 'Node: {point.name}',
            allowOverlap: false
        },

        data: [
            //link[0]
            ['DFS Platform', 'APP/USSD'],
            ['DFS Platform', 'MNO'],
            ['DFS Platform', 'Sonali Bank Govt. Disbursement'],
            ['DFS Platform', 'Middleware'],
            ['DFS Platform', 'SSL Wireless'],

            //link[1]
            ['APP/USSD', 'DSO'],
            ['APP/USSD', 'Agent'],
            ['APP/USSD', 'Customer'],
            ['Middleware', 'Merchant'],
            ['Middleware', 'Biller'],
            ['SSL Wireless', 'VISA/Mastercard'],
            ['SSL Wireless', 'BANK'],


        ],
        events: {
            click: function (event) {
                if (event.point.options.id) {
                    //alert('You clicked on ' + event.point.options.name);
                    //document.getElementById('RA_Description').innerText = "Sucessfullllllll"
                    document.getElementById('RA_Description').innerText = "Clicked on " + event.point.options.id;
                }
            }
        }
    }]
});