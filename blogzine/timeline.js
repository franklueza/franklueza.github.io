// timeline.js

// Datos de las redes sociales
const items = new vis.DataSet([
    {id: 1, content: 'MSN', start: '1990-01-01'},
    {id: 2, content: 'LinkedIn', start: '2002-05-05'},
    {id: 3, content: 'MySpace', start: '2003-08-01'},
    {id: 4, content: 'Facebook', start: '2004-02-04'},
    {id: 5, content: 'YouTube', start: '2005-02-14'},
    {id: 6, content: 'Twitter', start: '2006-03-21'},
    {id: 7, content: 'WhatsApp', start: '2009-01-01'},
    {id: 8, content: 'Instagram', start: '2010-10-06'},
    {id: 9, content: 'Snapchat', start: '2011-09-01'},
    {id: 10, content: 'TikTok', start: '2016-09-01'},
    {id: 11, content: 'Threads', start: '2023-01-01'}
]);

// Configuración de la visualización
const options = {
    width: '100%',
    height: '100%',
    margin: {
        item: 20
    },
    start: '1989-01-01',
    end: '2025-12-31',
    zoomMin: 31536000000,  // 1 year in milliseconds
    zoomMax: 1576800000000  // 50 years in milliseconds
};

// Crear una instancia de la visualización
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('visualization');
    const timeline = new vis.Timeline(container, items, options);
});
