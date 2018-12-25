export default function setupChart(data) {
	const colorRules = [ 
		{ start: 0, end: 5, color: 'green' },
		{ start: 6, end: 10, color: 'yellow' },
		{ start: 11, end: Infinity, color: 'red' }
	];
	return [barsContainer(data), chartLegend(colorRules)];

	function barsContainer(data) {
		const scalePoint = 95 / Math.max(...data);
		let container  = newElWithId('bars-container');
		container.append(ticks(), ...barsCollection(data));

		return container;

		function barsCollection(data) {
			return data.map(val => makeBar(val));
            
			function makeBar(val) {
				let barWrapper = newElWithClass('bar-wrapper');
				let bar = newElWithClass('bar', defineColor(val));
				let sign = newElWithClass('bar-sign');
                
				bar.style.height = `${scalePoint * val}%`;
				sign.innerText = val;

				barWrapper.append(sign, bar);
				return barWrapper;

				function defineColor(val) {
					let color;
					colorRules.forEach(rule => {
						if ( val >= rule.start && val <= rule.end ) color = rule.color; 
					});
					return color;
				}
			}
		}

		function ticks() {
			let segments = defineMarginCoeffIn(colorRules);
			let ticks =  newElWithId('ticks-container');
			ticks.append(...ticksCollection(segments));
    
			return ticks;
    
			function ticksCollection(segments) {
				let orderedSegments = segments.slice(0, -1).reverse();
				return orderedSegments.map(segment => makeTick(segment));
    
				function makeTick(segment) {
					let tick = newElWithClass('tick');
					let sign = document.createElement('p');

					sign.innerText = segment.end;
					tick.style.height = `${scalePoint * segment.marginCoeff}%`;
					tick.append(sign);
					return tick;
				}
			}
			function defineMarginCoeffIn(segments) {
				for (let i = 0; i < segments.length; i++) {
					let currentLimit = segments[i].end;
					let previousLimit = segments[i-1] && segments[i-1].end;

					segments[i].marginCoeff = previousLimit ? currentLimit - previousLimit : currentLimit; 
				}
				return segments;
			}
		}
	}

	function chartLegend(data) {
		let legend = newElWithId('legend-container');
		data.forEach(rule => legend.appendChild(makeLegendItem(rule)));
		return legend;

		function makeLegendItem(rule) {
			let item = newElWithClass('legend-item');
			let itemBadge = newElWithClass('item-badge'); 
			let itemText = newElWithClass('item-text');

			itemBadge.classList.add(rule.color);
			itemText.innerText = formatItemText(rule);
			item.append(itemBadge, itemText);
			return item;

			function formatItemText(rule) {
				return rule.end === Infinity ? `>${rule.start}` : `${rule.start} - ${rule.end}`;
			}
		}
	}

	function newElWithClass() {
		let el = document.createElement('div');
		el.classList.add(...arguments);
		return el;
	}

	function newElWithId(id) {
		let el = document.createElement('div');
		el.id = id;
		return el;
	}
}