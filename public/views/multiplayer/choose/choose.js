import './choose.scss'
import Custom from '../../custom-module/custom-module'
import Router from '../../../modules/router'

const classes  = [`single`,`multi`]
const wrape = document.querySelector('div.wrapper');

export default class GameType {
    creation() {
        let variant = wrape.appendChild(document.createElement("div"));
        variant.setAttribute('class', 'variant')

        for (let i = 0; i < 2; ++i) {
            variant.appendChild(document.createElement("a"));
        }
        let buttons = document.getElementsByTagName('a');

        for (let i = 0; i < 2; ++i) {
            buttons[i].setAttribute('class', classes[i])
            buttons[i].innerHTML = button[i];
        }
        document.querySelector('a.multi').addEventListener('click',() =>{
            new Custom().creation('Coming soon....')
        })

        document.querySelector('a.single').addEventListener('click',() =>{
            new Router().go('/singleplay')
        })
    }
}
