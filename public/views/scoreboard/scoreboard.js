import Block from '../baseview';
import './scoreboard.scss';
//import UserService from '../../servises/user-service'
//import u from '../../modules/http'
//const score= new UserService();


const rowValues = [`Username`,`Frags`,`Gold`]
//  const buttons = [`first`,`second`,`third`,`four`];
// const data  = [{username:'gamer',gold:0,frags:0},{username:'lammer',gold:110,frags:8989},{username:'lammer96',gold:1680,frags:1560}]

class Scoreboard extends Block {
    constructor() {
        super('div', ['score'], {});
    }

    creation() {
        const wrape = document.querySelector('div.wrapper');

        if (document.querySelector('div.menu') !== undefined) {
            document.querySelector('div.menu').remove();
        }
        wrape.appendChild(this._element);
        const arrows = document.createElement('div');
        arrows.style.width = '25%';
        arrows.style.margin = 'auto';
        const img1 = document.createElement('img');
        const img2 = document.createElement('img');
        img1.src = '../images/arrow.png';
        img2.src = '../images/arrow.png';
        img1.className = 'arrow';
        img2.className = 'arrow';
        img2.style.float = 'left';
        img2.style.transform = 'scale(-1, 1)';
        arrows.appendChild(img1);
        arrows.appendChild(img2);
        wrape.appendChild(arrows);
        this.appendChildBlock('table', new Block('table', ['table']));

        let fun1 = function() {
            let arr = document.getElementsByTagName('tr');
            let lastDisplay;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].style.display !== 'none' && arr[i].id) {
                    lastDisplay = arr[i];
                    break;
                }
            }
            if (lastDisplay) {
                while(true) {
                    if (+lastDisplay.id - 1 == 0 || document.getElementById(+lastDisplay.id - 1).style.display === 'none') {
                        break;
                    } else {
                        lastDisplay = document.getElementById(+lastDisplay.id - 1);
                    }
                }
                for (let i = +lastDisplay.id - 1; i > +lastDisplay - 6 && i > 0; i--) {
                    document.getElementById(i).style.display = 'table-cell';
                }
                for (let i = +lastDisplay; i < +lastDisplay + 5; i++) {
                    let x = document.getElementById(i);
                    if (x) {
                        x.style.display = 'none';
                    } else {
                        break;
                    }
                }
            }
        };

        let fun2 = function() {
            let arr = document.getElementsByTagName('tr');
            let lastDisplay;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].style.display !== 'none' && arr[i].id) {
                    lastDisplay = arr[i];
                    break;
                }
            }
            if (lastDisplay) {
                while(true) {
                    let x = document.getElementById(+lastDisplay.id + 1);
                    console.log(x);
                    console.log(x.style.display);
                    if (x && x.style.display == 'none') {
                        break;
                    } else {
                        lastDisplay = x;
                    }
                }
                for (let i = +lastDisplay.id + 1; document.getElementById(i) && i < +lastDisplay + 6; i++) {
                    document.getElementById(i).style.display = 'table-cell';
                }
                for (let i = +lastDisplay; i > 0 && document.getElementById(i).style.display !== 'none'; i--) {
                    let x = document.getElementById(i);
                    if (x) {
                        x.style.display = 'none';
                    } else {
                        break;
                    }
                }
            }
        };

        img1.onclick = fun2;
        img2.onclick = fun1;

        const table = new Block(document.querySelector('table.table'));


        const url = ('https://kvvartet2017.herokuapp.com' || `${window.location.protocol}//${window.location.host}`) + '/scoreboard';
        if (typeof window.fetch !== 'undefined') {

            fetch(url, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include'
            })
                .then(function (response) {

                    let json = response.json();
                    console.log(json);
                    if (response.status >= 400) {

                        return json.then(response => {
                            throw response;
                        });
                    }
                    json.then(function (data) {
                        console.log(data);
                        for (let i = 0; i < data.length +1; ++i) {
                            table.appendChildBlock('data', new Block('tr', ['data']))
                        }
                        const array = document.getElementsByTagName('tr');
                        let value = array[0];
                        for (let i = 0; i < 3; ++i) {
                            value.appendChild(document.createElement('th'));
                            document.querySelector('tr.data').childNodes[i].innerHTML = `${rowValues[i]}`;
                        }

                        for (let k = 0; k < Math.ceil(data.length/5); k++) {
                            for (let i = 1 + k*5; i <= data.length && i <= (k + 1)*5; ++i) {
                                array[i].id = i;
                                for (let j = 0; j < 3; ++j) {
                                    let el = document.createElement('td');
                                    if (i > 5) {
                                        el.style.display = 'none';
                                    }
                                    array[i].appendChild(el);
                                    if (j === 1) {
                                        array[i].childNodes[j].innerHTML = `${data[i - 1].gold}`;
                                        continue;
                                    }
                                    else if (j === 2) {
                                        array[i].childNodes[j].innerHTML = `${data[i - 1].frags}`;
                                        continue;
                                    }
                                    array[i].childNodes[j].innerHTML = `${data[i - 1].username}`;
                                }
                            }
                        }
                    });
                });

        }

    }

}
export default Scoreboard;
