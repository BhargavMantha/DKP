const express = require('express');
const scraper = require('./2-scraper');
const app = express();
const pool = require('./3-database');

const column1 = "select Planet,Date,Nakshatra_Number,Nakshatra,Place,Time from BasedOnDatePlaceAndTime where Nakshatra_Number=3 or Nakshatra_Number=16 or Nakshatra_Number=17 or Nakshatra_Number=2";
const column2 = "select Planet,Date,Nakshatra_Number,Nakshatra,Place,Time from BasedOnDatePlaceAndTime where Nakshatra_Number=4 or Nakshatra_Number=15 or Nakshatra_Number=18 or Nakshatra_Number=1";
const column3 = "select Planet,Date,Nakshatra_Number,Nakshatra,Place,Time from BasedOnDatePlaceAndTime where Nakshatra_Number=5 or Nakshatra_Number=14 or Nakshatra_Number=19 or Nakshatra_Number=28";
const column4 = "select Planet,Date,Nakshatra_Number,Nakshatra,Place,Time from BasedOnDatePlaceAndTime where Nakshatra_Number=6 or Nakshatra_Number=13 or Nakshatra_Number=20 or Nakshatra_Number=27";
const column5 = "select Planet,Date,Nakshatra_Number,Nakshatra,Place,Time from BasedOnDatePlaceAndTime where Nakshatra_Number=7 or Nakshatra_Number=12 or Nakshatra_Number=21 or Nakshatra_Number=26";
const column6 = "select Planet,Date,Nakshatra_Number,Nakshatra,Place,Time from BasedOnDatePlaceAndTime where Nakshatra_Number=8 or Nakshatra_Number=11 or Nakshatra_Number=22 or Nakshatra_Number=25";
const column7 = "select Planet,Date,Nakshatra_Number,Nakshatra,Place,Time from BasedOnDatePlaceAndTime where Nakshatra_Number=9 or Nakshatra_Number=10 or Nakshatra_Number=23 or Nakshatra_Number=24";


let startcol = new Date();
app.get('/insertplanetandtimeintocolumns', async (req, res, next) => {
    


    try {
        console.log("in insert Columns 1");
        await selectPlanets(column1, "Column1");

    }
    catch (e) {
        console.log(e);
    }

    await res.write("Planet and Time Data inserted for column 1");
    next();
}, async (req, res, next) => {
    try { 
        await selectPlanets(column2, "Column2");
    } catch (e) 
    {
        console.log(e)
    }
    await res.write("Planet and Time Data inserted for column 2");
next();
},async (req, res, next) => {
    try { 
        await selectPlanets(column3, "Column3"); 
    } catch (e) 
    {
        console.log(e)
    }
    await res.write("Planet and Time Data inserted for column 3");
next();
}, async (req, res, next) => {
    try { 
        await selectPlanets(column4, "Column4");
    } catch (e) 
    {
        console.log(e)
    }
    await res.write("Planet and Time Data inserted for column 4");
next();
}, async (req, res, next) => {
    try { 
        await selectPlanets(column5, "Column5");
    } catch (e) 
    {
        console.log(e)
    }
    await res.write("Planet and Time Data inserted for column 5");
next();
}, async (req, res, next) => {
    try { 
        await selectPlanets(column6, "Column6"); 
    } catch (e) 
    {
        console.log(e)
    }
    await res.write("Planet and Time Data inserted for column 6");
next();
}, async (req, res, next) => {
    try { 
        await selectPlanets(column7, "Column7"); 
    } catch (e) 
    {
        console.log(e)
    }
    await res.write("Planet and Time Data inserted for column 7");
next();
}, async (req, res) => {
    res.write("inserting tinto column 1......7")
    // await pool.query(`${batch1}`, function (err, result, fields) {
    //     if (err) throw err;
    //     for (b = 0; b < result.length; b++) {
    //         console.log("Number of records inserted: " + result.affectedRows);
    //     }
    // });
    console.log(batch1);
    await res.write("inserted............ into columns");
    await res.end();
    var end2 = new Date() - startcol;
    console.log('Execution time: %dms', end2)
})
async function selectPlanets(selectQuery, insertTableName) {
    let arrayresult1 = [];
    await pool.query(selectQuery, async function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            for (c = 0; c < result.length; c++) {
                console.log(c);
                arrayresult1.push(result[c]);
            }
            console.log("In Else");
            await queryformation(arrayresult1, insertTableName);
        }
        console.log(arrayresult1);
    })
}
function queryformation(arrayresult1, insertTableName) {
    for (i in arrayresult1) {
        let sqlforbasedonnumbers = `insert into ${insertTableName} (Planet,Date,Nakshatra_Number,Nakshatra,Place,Time) values (${arrayresult1[i].planet}, ${arrayresult1[i].date}, ${arrayresult1[i].Nakshatra_Number}, ${arrayresult1[i].Nakshatra},${arrayresult1[i].Time})`;
        batch1 = batch1.concat(`${sqlforbasedonnumbers};`);
    }
    console.log("end of query");
    //return batch1;
}
