var map = L.map('map').setView([53.52, 102.56], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
    {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

var data =[
    { "id" : { "$oid" : "55282f3b5c0dd1178d37f7a6" },
    "date" : { "$date" : 1428707691703 },
    "location" : { "type" : "Polygon", "coordinates" : [
        [[102.567062, 53.520141],
            [102.567346, 53.520294],
            [102.567458, 53.520094],
            [102.5672, 53.519969],
            [102.567062, 53.520141]]] }},
];

var featureArr = [];


for(var i in data){
    var geojsonFeature = {
        "type": "Feature",
        "geometry": data[i].location,
        "customizeView":Math.floor(Math.random()*2)
    };
    //TODO: получать properties от сервера
    geojsonFeature.popupContent = `
        <div>
            <table class="table table-hover" style="max-height: 189px; overflow: auto; font-size: 11px; display: block; width: 100%">
                <tbody>
                    <tr>
                        <th>tip_contur</th>
                        <td>Граница лесосеки по материалам отвода</td>
                    </tr>
                    <tr>
                        <th>ploshad</th>
                        <td>0.1</td>
                    </tr>
                    <tr>
                        <th>subject</th>
                        <td>Иркутская область</td>
                    </tr>
                    <tr>
                        <th>lesnichestv</th>
                        <td>Заларинское</td>
                    </tr>
                    <tr>
                        <th>uch_lecnic</th>
                        <td>Тыретское</td>
                    </tr>
                    <tr>
                        <th>vid_inspols</th>
                        <td>Заготовка древесины</td>
                    </tr>
                    <tr>
                        <th>vid_polzov</th>
                        <td>Лесопользователь</td>
                    </tr>
                    <tr>
                        <th>arendator</th>
                        <td>Гаврилова Нина Анатольевна</td>
                    </tr>
                    <tr>
                        <th>zasitnost</th>
                        <td>Леса, не являющиеся защитными</td>
                    </tr>
                    <tr>
                        <th>OZU</th>
                        <td>Леса, не относящиеся к особо защитным участкам леса</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    featureArr.push(geojsonFeature);
}

function onEachFeature(feature, layer) {
    if(feature.hasOwnProperty('popupContent'))
        layer.bindPopup(feature.popupContent);
}


L.geoJson(featureArr, {
    onEachFeature: onEachFeature,

}).addTo(map);


var properties = $('.leaflet-interactive');

$('.leaflet-interactive').on('click', function () {
    $.ajax({
        url: 'query_properties'
    }).done(function (data) {
        $.each(data, function (key, value) {
            properties.append(`
                <div>${key}</div>
            `);
            console.log(key + ' | ' + value);
        });
    })
});