const express = require('express');
const scraper = require('./2-scraper');
const app = express();
const pool = require('./3-database');
const cityArrayFile = require("./15-cities")
const cityarray = cityArrayFile.indiancities;
const async = require("async");
const datesarrayfile = require('./5-datesarrayfile');
const datesarray = datesarrayfile.datesArray;
// const datesarray = ["16/6/2013"];
const cityarrayfile1 = require('./4-cityarrayfile');
const cityarray1 = cityarrayfile1.indiancities;
const cityarrayfile2 = require('./5-cityarrayfile');
const cityarray2 = cityarrayfile2.indiancities;
const cityarrayfile3 = require('./6-cityarrayfile');
const cityarray3 = cityarrayfile3.indiancities;
const cityarrayfile4 = require('./7-cityarrayfile');
const cityarray4 = cityarrayfile4.indiancities;
const cityarrayfile5 = require('./8-cityarrayfile');
const cityarray5 = cityarrayfile5.indiancities;
const cityarrayfile6 = require('./9-cityarrayfile');
const cityarray6 = cityarrayfile6.indiancities;
const cityarrayfile7 = require('./13-cityarrayfile');
const cityarray7 = cityarrayfile7.indiancities;
// const cityarray1 = ["Mumbai"];
// const cityarray2 = ["Mumbai"];
// const cityarray3 = ["Mumbai"];
// const cityarray4 = ["Mumbai"];
// const cityarray5 = ["Mumbai"];
// const cityarray6 = ["Mumbai"];
// const cityarray7 = ["Mumbai"];
const os= require('cluster');
const os=require('os');
let start = new Date();
let batch = "";
let batchupdatenakshatranumber = "";
let i, j, k, l, b, c, d;
const timearray = ["19:18:00"];
let batchArray = [];
app.get('/', (req, res) => {
    res.send("scrappin");
})

app.get('/truncate', async (req, res) => {
    await pool.query(`TRUNCATE BasedOnDatePlaceAndTime;`, function (error, results, fields) {
        if (error) throw error;
        for (i = 0; i < results.length; i++)
            console.log(".........................................................." + results[i]);
    })
    res.send("Truncating...");
})
let obj1 = [];
let obj2 = [];
let obj3 = [];
let obj4 = [];
let obj5 = [];
let obj6 = [];
let obj7 = [];
let promiseStack = [];
app.get('/searchbyplacedateandtime', async (req, res, next) => {

    console.log("started scrapping...");
    await res.write("data inserting.............");
    next();
}, async (req, res, next) => {

    for (i = 0; i < cityarray1.length; i++) {
        for (d = 0; d < datesarray.length; d++) {
            for (j = 0; j < timearray.length; j++) {
                try {
                    //await insertIntoDaysCityAndTimeTable(cityarray1[i], datesarray[d], timearray[j], i, d);
                    obj1.push({
                        city: cityarray1[i],
                        date: datesarray[d],
                        time: timearray[j]
                    })
                } catch (e) {
                    console.log(e);
                }
            }
            res.write(d + "..");
        }

        try { await res.write(cityarray1[i]); } catch (e) {
            console.log(e)
        }

    }
    console.log("loading");


    for (let j = 0; j < obj1.length; j++) {
        process.stdout.write('.');
        promiseStack.push(insertIntoDaysCityAndTimeTable(obj1[j].city, obj1[j].date, obj1[j].time))
    }
    await res.write(".....data inserted 1.....");
    next();
}, async (req, res, next) => {
    for (i = 0; i < cityarray2.length; i++) {
        for (d = 0; d < datesarray.length; d++) {
            for (j = 0; j < timearray.length; j++) {
                try {
                    obj2.push({
                        city: cityarray2[i],
                        date: datesarray[d],
                        time: timearray[j]
                    })
                } catch (e) {
                    console.log(e);
                }
            }
            res.write(d + "..");
        }

        try { await res.write(cityarray2[i]); } catch (e) {
            console.log(e)
        }

    }
    console.log("loading");


    for (let j = 0; j < obj2.length; j++) {
        process.stdout.write('.');
        promiseStack.push(insertIntoDaysCityAndTimeTable(obj2[j].city, obj2[j].date, obj2[j].time))
    }
    await res.write("....data inserted 2....");
    next();
}, async (req, res, next) => {
    for (i = 0; i < cityarray3.length; i++) {
        for (d = 0; d < datesarray.length; d++) {
            for (j = 0; j < timearray.length; j++) {
                try {
                    //await insertIntoDaysCityAndTimeTable(cityarray1[i], datesarray[d], timearray[j], i, d);
                    obj3.push({
                        city: cityarray3[i],
                        date: datesarray[d],
                        time: timearray[j]
                    })
                } catch (e) {
                    console.log(e);
                }
            }
            res.write(d + "..");
        }

        try { await res.write(cityarray3[i]); } catch (e) {
            console.log(e)
        }

    }
    console.log("loading");


    for (let j = 0; j < obj3.length; j++) {
        process.stdout.write('.');
        promiseStack.push(insertIntoDaysCityAndTimeTable(obj3[j].city, obj3[j].date, obj3[j].time))
    }
    await res.write("....data inserted 3....");
    next();
}, async (req, res, next) => {
    for (i = 0; i < cityarray4.length; i++) {
        for (d = 0; d < datesarray.length; d++) {
            for (j = 0; j < timearray.length; j++) {
                try {
                    //await insertIntoDaysCityAndTimeTable(cityarray1[i], datesarray[d], timearray[j], i, d);
                    obj4.push({
                        city: cityarray4[i],
                        date: datesarray[d],
                        time: timearray[j]
                    })
                } catch (e) {
                    console.log(e);
                }
            }
            res.write(d + "..");
        }

        try { await res.write(cityarray4[i]); } catch (e) {
            console.log(e)
        }

    }
    console.log("loading");


    for (let j = 0; j < obj4.length; j++) {
        process.stdout.write('.');
        promiseStack.push(insertIntoDaysCityAndTimeTable(obj4[j].city, obj4[j].date, obj4[j].time))
    }
    await res.write("....data inserting 4....");
    next();
}, async (req, res, next) => {
    for (i = 0; i < cityarray5.length; i++) {
        for (d = 0; d < datesarray.length; d++) {
            for (j = 0; j < timearray.length; j++) {
                try {
                    //await insertIntoDaysCityAndTimeTable(cityarray1[i], datesarray[d], timearray[j], i, d);
                    obj5.push({
                        city: cityarray5[i],
                        date: datesarray[d],
                        time: timearray[j]
                    })
                } catch (e) {
                    console.log(e);
                }
            }
            res.write(d + "..");
        }

    }
    console.log("loading");


    for (let j = 0; j < obj5.length; j++) {
        process.stdout.write('.');
        promiseStack.push(insertIntoDaysCityAndTimeTable(obj5[j].city, obj5[j].date, obj5[j].time))
    }
    await res.write(".....data inserting 5.....");
    next();
}, async (req, res, next) => {
    for (i = 0; i < cityarray6.length; i++) {
        for (d = 0; d < datesarray.length; d++) {
            for (j = 0; j < timearray.length; j++) {
                try {
                    //await insertIntoDaysCityAndTimeTable(cityarray1[i], datesarray[d], timearray[j], i, d);
                    obj6.push({
                        city: cityarray6[i],
                        date: datesarray[d],
                        time: timearray[j],
                        i: i,
                        d: d
                    })
                } catch (e) {
                    console.log(e);
                }
            }
            res.write(d + "..");
        }

    }
    console.log("loading");


    for (let j = 0; j < obj6.length; j++) {
        process.stdout.write('.');
        promiseStack.push(insertIntoDaysCityAndTimeTable(obj6[j].city, obj6[j].date, obj6[j].time))
    }
    await res.write("....data inserting 7....");
    next();
}, async (req, res, next) => {
    for (i = 0; i < cityarray7.length; i++) {
        for (d = 0; d < datesarray.length; d++) {
            for (j = 0; j < timearray.length; j++) {
                try {
                    //await insertIntoDaysCityAndTimeTable(cityarray1[i], datesarray[d], timearray[j], i, d);
                    obj7.push({
                        city: cityarray7[i],
                        date: datesarray[d],
                        time: timearray[j]
                    })
                } catch (e) {
                    console.log(e);
                }
            }
            res.write(d + "..");
        }

        try { await res.write(cityarray7[i]); } catch (e) {
            console.log(e)
        }

    }
    console.log("loading");


    for (let j = 0; j < obj7.length; j++) {
        process.stdout.write('.');
        promiseStack.push(insertIntoDaysCityAndTimeTable(obj7[j].city, obj7[j].date, obj7[j].time))
    }
    await res.write("....data inserting 7....");
    next();
}, (req, res) => {
    console.log("Started Insertion...");
    Promise.all(promiseStack).then(() => {
        async.mapSeries(batchArray, (data, callback) => {
            //console.log(data);
            pool.query(data, (err, result) => {
                if (err) {
                    console.error('error: ' + err.stack);
                    callback(err);
                } else {
                    callback(null, result);
                }
            });
        }, (err, results) => {
            var end1 = new Date() - start;
            console.log("<<<<<<<<<<<<<Data inserted>>>>>>>>>>>>>>")
            res.write("**************************data Inserted*********************");
            res.end();
            console.log(results.length);
            if (err) {
                console.log(`Error: ${err}`);
            }
            console.log('Execution time: %dms', end1)
        });
    })
    res.write("Batch..................Inserted");
});

function insertIntoDaysCityAndTimeTable(city, date, time) {
    return new Promise((resolve, reject) => {
        resolve(

            scraper
                .searchByCityDateTime(city, date, time, i, j)
                .then((data, err) => {
                    if (err) {
                        reject(err);
                    }
                    return data;
                }).then(function (data) {
                    for (k = 0; k < 180; k = k + 12) {
                        const sql = `insert into BasedOnDatePlaceAndTime (Planet, Degrees, Nakshatra, Padam, Nakshatra_Lord, Full_Degrees,place_id,place,date,time,state,country) values(${pool.escape(data[k + 0])},${pool.escape(data[k + 1])},${pool.escape(data[k + 2])},${pool.escape(data[k + 3])},${pool.escape(data[k + 4])},${pool.escape(data[k + 5])},${pool.escape(data[k + 6])},${pool.escape(data[k + 7])},${pool.escape(data[k + 8])},${pool.escape(data[k + 9])},
                        ${pool.escape(data[k + 10])},${pool.escape(data[k + 11])});`;
                        batchArray.push(sql);
                    }
                    process.stdout.write('^');
                    return batch;
                }).catch(function (e) {
                    console.log("in index");
                    reject(e)
                }))
    })

}
//////////////////////////////////////////
app.get('/updateNakshatrafor', async (req, res, next) => {
    try {
        console.log("in update");
        await updateNakshatra();
    }
    catch (e) {
        console.log(e);
    }

    res.write("Data updating...");
    next();

}, async (req, res) => {
    pool.query(`${batchupdatenakshatranumber}`, function (err, result, fields) {
        if (err) {
            console.log(err);
        }
        else
            for (let a = 0; a < 28; a++) {
                console.log("Number of records updates: " + result[a].affectedRows);
            }
    });
    var end2 = new Date() - start;
    console.log('Execution time: %dms', end2);
    res.write("data inserted...");
    res.end("updated............");
})
async function updateNakshatra() {
    Nakshatra = ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha", "Ardra", "Punarvasu",
        "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati",
        "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishtha", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati", "Abhijit"];
    for (l = 0; l < 28; l++) {
        let sql_nakshatra_number = `update BasedOnDatePlaceAndTime set Nakshatra_Number=${l + 1} where Nakshatra like '${Nakshatra[l]}'`;
        batchupdatenakshatranumber = batchupdatenakshatranumber.concat(`${sql_nakshatra_number};`);
    }

}

//////////////////////////////////////////////////////////

const column1 = "select Planet,Date,Nakshatra_Number,Nakshatra,Place,Time,State,Country from BasedOnDatePlaceAndTime where Nakshatra_Number=3 or Nakshatra_Number=16 or Nakshatra_Number=17 or Nakshatra_Number=2";
const column2 = "select Planet,Date,Nakshatra_Number,Nakshatra,Place,Time,State,Country from BasedOnDatePlaceAndTime where Nakshatra_Number=4 or Nakshatra_Number=15 or Nakshatra_Number=18 or Nakshatra_Number=1";
const column3 = "select Planet,Date,Nakshatra_Number,Nakshatra,Place,Time,State,Country from BasedOnDatePlaceAndTime where Nakshatra_Number=5 or Nakshatra_Number=14 or Nakshatra_Number=19 or Nakshatra_Number=28";
const column4 = "select Planet,Date,Nakshatra_Number,Nakshatra,Place,Time,State,Country from BasedOnDatePlaceAndTime where Nakshatra_Number=6 or Nakshatra_Number=13 or Nakshatra_Number=20 or Nakshatra_Number=27";
const column5 = "select Planet,Date,Nakshatra_Number,Nakshatra,Place,Time,State,Country from BasedOnDatePlaceAndTime where Nakshatra_Number=7 or Nakshatra_Number=12 or Nakshatra_Number=21 or Nakshatra_Number=26";
const column6 = "select Planet,Date,Nakshatra_Number,Nakshatra,Place,Time,State,Country from BasedOnDatePlaceAndTime where Nakshatra_Number=8 or Nakshatra_Number=11 or Nakshatra_Number=22 or Nakshatra_Number=25";
const column7 = "select Planet,Date,Nakshatra_Number,Nakshatra,Place,Time,State,Country from BasedOnDatePlaceAndTime where Nakshatra_Number=9 or Nakshatra_Number=10 or Nakshatra_Number=23 or Nakshatra_Number=24";



app.get('/insertplanetandtimeintocolumns', (req, res, next) => {
    console.log("in insert Columns 1");
    selectPlanets(`${column1}`, "Column1");
    res.write("...1")
    next();
}, (req, res, next) => {
    selectPlanets(`${column2}`, "Column2");
    console.log("in insert Columns 2");
    res.write("...2")
    next();
}, (req, res, next) => {
    selectPlanets(`${column3}`, "Column3");
    console.log("in insert Columns 3");
    res.write("...3")
    next();
}, (req, res, next) => {
    console.log("in insert Columns 4");
    selectPlanets(`${column4}`, "Column4");
    res.write("...4")
    next();
}, (req, res, next) => {
    console.log("in insert Columns 5");
    selectPlanets(`${column5}`, "Column5");
    res.write("...5")
    next();
}, (req, res, next) => {
    console.log("in insert Columns 6");
    selectPlanets(`${column6}`, "Column6");
    res.write("...6")
    next();
}, (req, res) => {
    console.log("in insert Columns 7");
    selectPlanets(`${column7}`, "Column7");
    console.log("<<<<<<<<<<<<<<<<<Finished Insertion Into Columns>>>>>>>>>>>>>>>")
    res.write("...7")
    res.end();
})


async function selectPlanets(selectQuery, insertTableName) {

    await pool.query(selectQuery, async function (err, result) {
        let arrayresult1 = [];
        if (err) {
            console.log(err);
        }
        else {

            console.log(insertTableName);
            for (c = 0; c < result.length; c++) {
                //console.log(c);
                arrayresult1.push(result[c]);
            }
            console.log(`in else`);
        }
        console.log(`in pool`);
        queryformation(arrayresult1, insertTableName);
        console.log("Data Inserted");
    })

}

async function queryformation(arrayresult1, insertTableName) {
    console.log("in queryFormation");
    let batch1 = [];
    for (let e = 0; e < arrayresult1.length; e++) {
        let sqlforbasedonnumbers = `insert into ${insertTableName} (Planet,Date,Nakshatra_Number,Nakshatra,Place,Time,State,Country) values (${pool.escape(arrayresult1[e].Planet)}, ${pool.escape(arrayresult1[e].Date)}, ${pool.escape(arrayresult1[e].Nakshatra_Number)}, ${pool.escape(arrayresult1[e].Nakshatra)},${pool.escape(arrayresult1[e].Place)},${pool.escape(arrayresult1[e].Time)},${pool.escape(arrayresult1[e].State)},${pool.escape(arrayresult1[e].Country)});`;
        batch1 .push(`${sqlforbasedonnumbers}`);
        //console.log(sqlforbasedonnumbers);
    }
    async.mapSeries(batch1, (data, callback) => {
        //console.log(data);
        let i=0;
        pool.query(data, (err, result) => {
            if (err) {
                console.error('error: ' + err.stack);
                callback(err);
            } else {
                console.log("num -"+i);
                i++;
                callback(null, result);
            }
        });
    }, (err, results) => {
        var end1 = new Date() - start;
        console.log("<<<<<<<<<<<<<Data inserted into Columns>>>>>>>>>>>>>>")
        console.log(results.length);
        if (err) {
            console.log(`Error: ${err}`);
        }
        console.log('Execution time: %dms', end1)
    });
    
}

///////////////////////////////////////////////////////////////



app.get('/insertmelaficplanetanddatecol/:number', async (req, res) => {
    const number = req.params.number;
    createBatchSqlQuery(`Column${number}`, number);
    console.log("column" + number);
    res.send("Planet and Date Data inserted of col" + number);
})
function createBatchSqlQuery(tablename, number) {
    //console.log(arrayresultofdatesforcolumn1);
    let start2 = new Date();
    let batch_sql_of_melaficplanets = "";
    for (j = 0; j < cityarray.length; j++) {
        for (d = 0; d < datesarray.length; d++) {
            for (i = 0; i < timearray.length; i++) {
                let sql = `select planet,Nakshatra,time,place,date,state,country from ${tablename} where time like '${timearray[i]}' and place like '${cityarray[j]}' and date like '${datesarray[d]}';`;
                selectMelaficPlanets(sql, number);

                //batch_sql_of_melaficplanets = batch_sql_of_melaficplanets.concat(`${sql}`)
            }
        }
    }
    var end2 = new Date() - start2;
    console.log('Execution time: %dms', end2)

}
async function selectMelaficPlanets(batchsql1, number) {
    await pool.query(batchsql1, async function (err, result4, fields) {
        if (err) {
            console.log(err);
            return;
        }
        else {
            const planetarray = [];
            const nakshatraarray = [];
            const placearray = [];
            const incoltimearray = [];
            const incoldatearray = [];
            let incolstatearray = [];
            let incolcountryaray = []
            for (let j = 0; j < result4.length; j++) {
                planetarray.push(result4[j].planet);
                nakshatraarray.push(result4[j].Nakshatra);
                placearray.push(result4[j].place);
                incoltimearray.push(result4[j].time);
                incoldatearray.push(result4[j].date);
                incolstatearray.push(result4[j].state);
                incolcountryaray.push(result4[j].country);
                //console.log(result4[j]);
            }

            let melaficplanetname = [];
            let melaficNakshatraname = [];
            let melafiPlacename = [];
            let melaficTime = [];
            let melaficDate = [];
            let melaficcountry = [];
            let melaficstate = [];
            for (let k = 0; k < 3; k++) {
                if (planetarray[k] == 'Ketu (Ke)') {
                    //console.log(`Ketu [${i}].......[${j}]`)
                    melaficplanetname.push(planetarray[k]);
                    melaficNakshatraname.push(nakshatraarray[k]);
                    melafiPlacename.push(placearray[k]);
                    melaficTime.push(incoltimearray[k]);
                    melaficDate.push(incoldatearray[k]);
                    melaficcountry.push(incolcountryaray[k]);
                    melaficstate.push(incolstatearray[k]);
                    // console.log(planetarray[k]);
                    // console.log(nakshatraarray[k]);
                    // console.log(placearray[k]);
                    // console.log(incoltimearray[k]);
                    // console.log(incoldatearray[k]);
                }
                if (planetarray[k] == 'Rahu (Ra)') {
                    //console.log(`Rahu [${i}].......[${j}]`)
                    melaficplanetname.push(planetarray[k]);
                    melaficNakshatraname.push(nakshatraarray[k]);
                    melafiPlacename.push(placearray[k]);
                    melaficTime.push(incoltimearray[k]);
                    melaficDate.push(incoldatearray[k]);
                    melaficcountry.push(incolcountryaray[k]);
                    melaficstate.push(incolstatearray[k]);
                    // console.log(planetarray[k]);
                    // console.log(nakshatraarray[k]);
                    // console.log(placearray[k]);
                    // console.log(incoltimearray[k]);
                    // console.log(incoldatearray[k]);
                }
                if (planetarray[k] == 'Sun (Su)') {
                    //console.log(`sun [${i}].......[${j}]`)
                    melaficplanetname.push(planetarray[k]);
                    melaficNakshatraname.push(nakshatraarray[k]);
                    melafiPlacename.push(placearray[k]);
                    melaficTime.push(incoltimearray[k]);
                    melaficDate.push(incoldatearray[k]);
                    melaficcountry.push(incolcountryaray[k]);
                    melaficstate.push(incolstatearray[k]);
                    // console.log(planetarray[k]);
                    // console.log(nakshatraarray[k]);
                    // console.log(placearray[k]);
                    // console.log(incoltimearray[k]);
                    // console.log(incoldatearray[k]);
                }
                if (planetarray[k] == 'Saturn (Sa)') {
                    //console.log(`Saturn [${i}].......[${j}]`)
                    melaficplanetname.push(planetarray[k]);
                    melaficNakshatraname.push(nakshatraarray[k]);
                    melafiPlacename.push(placearray[k]);
                    melaficTime.push(incoltimearray[k]);
                    melaficDate.push(incoldatearray[k]);
                    melaficcountry.push(incolcountryaray[k]);
                    melaficstate.push(incolstatearray[k]);
                    // console.log(planetarray[k]);
                    // console.log(nakshatraarray[k]);
                    // console.log(placearray[k]);
                    // console.log(incoltimearray[k]);
                    // console.log(incoldatearray[k]);
                }
                if (planetarray[k] == 'Mars (Ma)') {
                    //console.log(`Mars [${i}].......[${j}]`)
                    melaficplanetname.push(planetarray[k]);
                    melaficNakshatraname.push(nakshatraarray[k]);
                    melafiPlacename.push(placearray[k]);
                    melaficTime.push(incoltimearray[k]);
                    melaficDate.push(incoldatearray[k]);
                    melaficcountry.push(incolcountryaray[k]);
                    melaficstate.push(incolstatearray[k]);
                    // console.log(planetarray[k]);
                    // console.log(nakshatraarray[k]);
                    // console.log(placearray[k]);
                    // console.log(incoltimearray[k]);
                    // console.log(incoldatearray[k]);

                }
            }

            if (melaficplanetname.length == 2) {
                for (a = 0; a < melaficplanetname.length; a++) {
                    //console.log(a);
                    //console.log(`3orMore[${a}]:${melaficplanetname[a]} ${melaficNakshatraname[a]} ${melafiPlacename[a]} ${melaficTime[a]}`);
                    sql3 = `insert into MelaficColumn${number} (Planet, Nakshatra ,Place ,Time,count,date,country,state) values (${pool.escape(melaficplanetname[a])}, ${pool.escape(melaficNakshatraname[a])}, ${pool.escape(melafiPlacename[a])}, ${pool.escape(melaficTime[a])},${melaficplanetname.length},${pool.escape(melaficDate[a])},${pool.escape(melaficcountry[a])},${pool.escape(melaficstate[a])});`;
                    //batchmelaficplanets = batchmelaficplanets.concat(`${sql3};`);
                    //console.log(sql3);
                    await pool.query(sql3, function (err, result7, fields) {
                        if (err)
                            console.log(err);
                        //for (b = 0; b < result.length; b++) {
                        console.log("Number of records inserted: " + result7.affectedRows);
                        //}
                    });
                }


            }

        }
        //console.log(batchmelaficplanets);

    });
    console.log("<<<<<<<<<<<<<<<<<Finished Insertion Into MelaficColumns >>>>>>>>>>>>>>>")
}
// console.log(batchmelaficplanets);
// 





//server connection
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`listening on ${port}`)
    console.log("http://localhost:8080/searchbyplacedateandtime");
    console.log("http://localhost:8080/updateNakshatrafor");
    console.log("http://localhost:8080/insertplanetandtimeintocolumns");
    console.log("http://localhost:8080/insertmelaficplanetanddatecol/1");
    console.log("http://localhost:8080/insertmelaficplanetanddatecol/2");
    console.log("http://localhost:8080/insertmelaficplanetanddatecol/3");
    console.log("http://localhost:8080/insertmelaficplanetanddatecol/4");
    console.log("http://localhost:8080/insertmelaficplanetanddatecol/5");
    console.log("http://localhost:8080/insertmelaficplanetanddatecol/6");
    console.log("http://localhost:8080/insertmelaficplanetanddatecol/7");


});