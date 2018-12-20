export default function setupChart(data) {
    const colorRules = [ 
        { start: 0, end: 5, color: 'green' },
        { start: 6, end: 10, color: 'yellow' },
        { start: 10, end: Infinity, color: 'red' }
     ];
    return [barsContainer(data), chartLegend(data)];

    function barsContainer(data) {
        const scalePoint = 100 / Math.max(...data);
        let container  = document.createElement('div');
        container.id = "bars-container";
        container.append(...barsCollection(data));

        return container;

        function barsCollection(data) {
            return data.map(num => makeBar(num));
            
            function makeBar(num) {
                let bar = document.createElement('div')
                const barColor = defineColor(num);

                bar.style.height = `${scalePoint * num}%`;
                bar.classList.add('bar', defineColor(num));
                return bar

                function defineColor(num) {
                    let color;
                    colorRules.forEach(rule => {
                        if ( num >= rule.start && num <= rule.end ) color = rule.color; 
                    });
                    return color;
                }
            }
        }
    }

    function chartLegend(data) {

    }
}