const fetch = require('node-fetch');
const cheerio = require('cheerio');
const url = 'https://www.drikpanchang.com/tables/planetary-positions-sidereal.html?date=';
const cityUrl = "https://www.drikpanchang.com/dkphp/dp-geo/dp-city-srch.php?search="
const citySearchUrl = "https://www.drikpanchang.com/tables/planetary-positions-sidereal.html?geoname-id="

async function searchByCityDateTime(city, searchdate, time) {
    try {
        let cityjson = await fetch(`${cityUrl}${city}`);
        cityjson = await cityjson.json();
        let cityids = [];
        let citynames = [];
        let citystate = [];
        let countryname = [];
        for (let i in cityjson.geonames) {
            // console.log(cityjson.geonames[i].dpcity_id);
            // console.log(cityjson.geonames[i].city_name);
            cityids.push(cityjson.geonames[i].dpcity_id);
            citynames.push(cityjson.geonames[i].city_name);
            citystate.push(cityjson.geonames[i].city_state);
            countryname.push(cityjson.geonames[i].cntry_name);
        }
        //console.log(citynames[0] + "," + cityids[0]);
        const result = fetch(`${citySearchUrl}${cityids[0]}&date=${searchdate}&time=${time}`)
            .then(response => response.text()).
            then(body => {
                const results = [];
                const $ = cheerio.load(body);
                //console.log(`${citySearchUrl}${cityids[0]}&date=${searchdate}&time=${time}`);
                for (let i = 1; i < 16; i++) {
                    column0 = $('.hinduTable tbody').find('tr').eq(`${i}`).find('td').eq(0).text().replace(/[\t]/g, '').trim();
                    column1 = $('.hinduTable tbody').find('tr').eq(`${i}`).find('td').eq(1).text().replace(/[\t]/g, '').trim();
                    column2 = $('.hinduTable tbody').find('tr').eq(`${i}`).find('td').eq(2).text().replace(/[\t]/g, '').trim();
                    column3 = $('.hinduTable tbody').find('tr').eq(`${i}`).find('td').eq(3).text().replace(/[\t]/g, '').trim();
                    column4 = $('.hinduTable tbody').find('tr').eq(`${i}`).find('td').eq(4).text().replace(/[\t]/g, '').trim();
                    column5 = $('.hinduTable tbody').find('tr').eq(`${i}`).find('td').eq(5).text().replace(/[\t]/g, '').trim();

                    results.push(column0);
                    results.push(column1);
                    results.push(column2);
                    results.push(column3);
                    results.push(column4);
                    results.push(column5);
                    results.push(cityids[0]);
                    results.push(citynames[0]);
                    results.push(`${searchdate}`);
                    results.push(`${time}`);
                    results.push(citystate[0]);
                    results.push(countryname[0]);
                }
                return (results);
            });
        return result;
    } catch (e) {
    }
}
module.exports = {
    searchByCityDateTime
}