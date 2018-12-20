import setupChart from '../src/js/chart_bar';
import '../src/css/index.css';

const data = [5,8,2,1,15,2,3,5,9,11,10,4,3,14,1,7,10,3,2,13];

let container = document.getElementById('bar-chart');
container.append(...setupChart(data));