const fs = require('fs');
const main_view = fs.readFileSync('./index.html');
const orderlist_view = fs.readFileSync('./orderlist.html');

const mariadb = require('./database/connect/mariadb');
const { isUtf8 } = require('buffer');

function main(response){
    console.log('main');
    
    mariadb.query('SELECT * FROM product', function(err, rows){
        console.log(rows);
    })

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(main_view);
    response.end();
}
function favicon(response) {
    console.log("favicon");
   }
function redRacket(response){
    fs.readFile('./img/redRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}
function BlueRacket(response){
    fs.readFile('./img/blueRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}

function BlackRacket(response){
    fs.readFile('./img/blackRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    })
}
function order(response, productId){
    response.writeHead(200, {'Content-Type' : 'text/html'});
    
    mariadb.query("INSERT INTO orderlist VALUES("+ productId +",'" + new Date().toLocaleDateString() + "');", function(err, rows){
        console.log(rows);
    })

    response.write('order page');
    response.end();
}

function orderlist(response){
    console.log('orderlist');

    response.writeHead(200,{'Content-Type' : 'text/html'});

    mariadb.query("SELECT * FROM orderlist", function(err,rows){
        response.write(orderlist_view);

        rows.forEach(element => {
            response.write("<tr>"
                + "<th>" + element.product_id+"</th>"
                + "<th>" + element.order_date+"</th>"
                + "</tr>"); 
        });

        response.write("</table>");
        response.end();
    })
}


let handle = {};// key:value -> 딕셔너리 형식인듯
handle['/'] = main;
handle["/favicon.ico"] = favicon;
handle['/order'] = order;
handle['/orderlist.html'] = orderlist;

/* image directoryt */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = BlueRacket;
handle['/img/blackRacket.png'] = BlackRacket;


exports.handle = handle;