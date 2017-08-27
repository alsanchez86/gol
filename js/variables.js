/*
    Variables
*/
var cycle       = {
    current:    0,
    limit:      10,
    time:       1000
};

var plateau     = {
    rows:       60,
    columns:    60,
    cells:      []
};

var colindantesAxis = [
    {
        id: 1,
        x:  -1,
        y:  -1
    },
    {
        id: 2,
        x:  0,
        y:  -1
    },
    {
        id: 3,
        x:  +1,
        y:  -1
    },
    {
        id: 4,
        x:  -1,
        y:  0
    },
    {
        id: 5,
        x:  +1,
        y:  0
    },
    {
        id: 6,
        x:  -1,
        y:  +1
    },
    {
        id: 7,
        x:  0,
        y:  +1
    },
    {
        id: 8,
        x:  +1,
        y:  +1
    }
];