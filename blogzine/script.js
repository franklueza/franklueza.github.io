// Datos para la línea de tiempo
var items = new vis.DataSet([
    {id: 1, content: 'World Wide Web', start: '1989', className: 'red'},
    {id: 2, content: 'MSN', start: '1990'},
    {id: 3, content: 'LinkedIn', start: '2002'},
    {id: 4, content: 'MySpace', start: '2003'},
    {id: 5, content: 'Facebook', start: '2004'},
    {id: 6, content: 'YouTube', start: '2005'},
    {id: 7, content: 'Twitter', start: '2006'},
    {id: 8, content: 'WhatsApp', start: '2009'},
    {id: 9, content: 'Instagram', start: '2010'},
    {id: 10, content: 'Snapchat', start: '2011'},
    {id: 11, content: 'TikTok', start: '2016'}
]);

// Configuración de la línea de tiempo
var options = {
    width: '100%',
    height: '100%',
    margin: {
        item: 20
    },
    start: '1985',
    end: '2020',
    cluster: true // Agrupar elementos para mejorar rendimiento
};

// Crear la línea de tiempo
var container = document.getElementById('visualization');
var timeline = new vis.Timeline(container, items, options);

// Aplicar debounce a los eventos de redimensionamiento
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

window.addEventListener('resize', debounce(() => {
    timeline.redraw();
}, 100));