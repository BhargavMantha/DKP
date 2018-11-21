const express = require('express');
const app = express();
const pool = require('./3-database');
let batchsql1 = "";
//1
app.get('/DistinctPlacesAndTimeForMelaficColumn/:num', (req, res) => {
    common(req.params.num);
    res.send("Inserted common Place");
});
function common(number) {
    let array = [];
    const sql1 = `insert into DistinctPlacesAndTimeForMelaficColumn${number}(Place,Time,Date,State,COuntry) select  Place,Time,Date,State,Country from MelaficColumn${number}`;
    pool.query(sql1, function (err, resultofcommonplaces) {
        if (err) {
            console.log(err);
        }
        else {
            for (i = 0; i < resultofcommonplaces.length; i++) {
                //array.push(result[i].place);
                console.log(resultofcommonplaces[i]);
            }
            console.log("Number of records inserted into sameplace: " + resultofcommonplaces.affectedRows);

        }
    })
}

//2
app.get("/insertDistinctplaceandtimecol/:num", (req, res) => {
    distinctPlanetAndTime(req.params.num);
    res.send("distinct planets inserted for col"+req.params.num);
})
function distinctPlanetAndTime(number) {
    const sql1 = `insert into DistinctPlacesAndTimeforcol${number}(place,time,Date,State,country) SELECT distinctrow Place,Time,Date,State,Country FROM DistinctPlacesAndTimeForMelaficColumn${number};`;
    pool.query(sql1, function (err, resultofcommonplaces) {
        if (err) {
            console.log(err);
        }
        else {
            for (i = 0; i < resultofcommonplaces.length; i++) {
                //array.push(result[i].place);
                console.log(resultofcommonplaces[i]);
            }
            console.log(`Number of records inserted into sameplace ${number}:`  + resultofcommonplaces.affectedRows);

        }
    })
}

//3
app.get('/insertvaluesintoascendentandmoonreference/:num', async (req, res) => {
    const number = req.params.num;
    const sql = `select Place,time,date,State,Country from DistinctPlacesAndTimeforcol` + number;
    pool.query(sql,async function (err, result) {
        if (err) {
            console.log(err)
        }
        else {

            for (let i = 0; i < result.length; i++) {
                let sql1 = `insert into SameAscendentNakshatraAsMoonReference${number}(Planet,Degrees,Nakshatra,Padam,Nakshatra_Lord,Full_Degrees,place_id,place,date,Nakshatra_Number,Time,State,Country) select Planet,Degrees,Nakshatra,Padam,Nakshatra_Lord,Full_Degrees,place_id,place,date,Nakshatra_Number,Time,State,Country from BasedOnDatePlaceAndTime where place like '${result[i].Place}' and time like '${result[i].time}' and date like '${result[i].date}'`;
                batchsql1 = batchsql1.concat(`${sql1};`)
                //console.log(sql1);
            }

            // }

            //console.log(batchsql1);
            //console.log(`${array}`);
            await pool.query(`${batchsql1}`, function (err, result1) {
                if (err)
                    console.log(err)
                else {
                    console.log(`Rows Inserted into SameAscendentNakshatraAsMoonReference${number}`+result1.length);

                }
            })
        }
    })

    //console.log(batchsql1);
    res.send(`inserting into SameAscendentNakshatraAsMoonReference${number} Table in Process`)
})

app.get('/insertIntoAscendentAndMoonTable/:num', (req, res) => {
    insertIntoAscendentAndMoonTable(req.params.num);
    res.send("Inserted Asendent and Moon values");
})
function insertIntoAscendentAndMoonTable(number) {
    const sql = `insert into AscendentAndMoon${number}(Planet,Degrees,Nakshatra,Padam,Nakshatra_Lord,Full_Degrees,place_id,place,date,Nakshatra_Number,Time,State,Country) select Planet,Degrees,Nakshatra,Padam,Nakshatra_Lord,Full_Degrees,place_id,place,date,Nakshatra_Number,Time,State,Country from SameAscendentNakshatraAsMoonReference${number} where planet like 'Ascendant (As)' or planet like 'Moon (Mo)'`;
    pool.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Number of records inserted: " + result.affectedRows);
            return result.affectedRows;
        }
    })
}
app.get('/insertcommonvaluesintoascendentandmoon/:num',async (req, res) => {
    const number = req.params.num;
    const sql = `select Place,time,date,State,Country from DistinctPlacesAndTimeforcol${number}`;
    //console.log(sql);
    pool.query(sql,async function (err, result) {
        if (err) {
            console.log(err)
        }
        else {
            for (let i = 0; i < result.length; i++) {
                let sql1 = `SELECT count(distinct Nakshatra) as cn from AscendentAndMoon${number} where place like '${result[i].Place}' and time like '${result[i].time}' and date like '${result[i].date}'`;
                //console.log(sql1);
                let FLAG = true;
                await pool.query(sql1, function (err, result1) {
                    if (err)
                        console.log(err)
                    else {

                        let l = JSON.stringify(result1);
                        //console.log(l);
                        if (l[7] == "2") {
                            FLAG = false;
                            let sql1 = `insert into SameAscendentNakshatraAsMoon${number}(Planet,Degrees,Nakshatra,Padam,Nakshatra_Lord,Full_Degrees,place_id,place,date,Nakshatra_Number,Time,State,Country) select Planet,Degrees,Nakshatra,Padam,Nakshatra_Lord,Full_Degrees,place_id,place,date,Nakshatra_Number,Time,State,Country from SameAscendentNakshatraAsMoonReference${number} where place like '${result[i].Place}' and time like '${result[i].time}'and date like '${result[i].date}';`;
                            // batchsql2 = batchsql2.concat(`${sql1};`)
                            //console.log(`${result[i].Place} ${result[i].time} ${result[i].date}`)
                            pool.query(sql1, function (err, result2) {
                                if (err)
                                    console.log(err)
                                else {
                                    console.log("effected rows on table SameAscendentNakshatraAsMoon" + result2.affectedRows);
                                }
                            });
                            let sql2 = `insert into SameAscendentAndMoonForColumn${number}PlaceAndTime(Place,Time,Date,State,Country) values('${result[i].Place}', '${result[i].time}','${result[i].date}','${result[i].State}','${result[i].Country}');`
                            pool.query(sql2, function (err, result3) {
                                if (err)
                                    console.log(err)
                                else {
                                    console.log(`effected rows on table SameAscendentAndMoonForColumn${number}PlaceAndTime ${result3.affectedRows}`);
                                }
                            });
                        }

                    }
                    // if (FLAG == true) {
                    //     console.log("no places")
                    // }

                })
            }
        }
    })
    //console.log(batchsql1);
    res.send("inserting into CommonAscendentAndMoon Table in Process")
})
app.get("/leastfulldegrees/:num", (req, res) => {
    number = req.params.num;
    const sql5 = `select Place,time,date,State,Country from SameAscendentAndMoonForColumn${number}PlaceAndTime`
    pool.query(sql5, function (err, result) {
        if (err) {
            console.log(err)
        }
        else {
            for (let i = 0; i < result.length; i++) {
                let sql6 = `select Full_degrees from AscendentAndMoon${number} where Place like '${result[i].Place}' and Time like '${result[i].time}' and Planet Like 'Ascendant (As)' and date like '${result[i].date}';select Full_degrees from AscendentAndMoon${number} where Place like '${result[i].Place}' and Time like '${result[i].time}' and Planet Like 'Moon (Mo)' and date like '${result[i].date}';`;
                //console.log(sql6);
                pool.query(`${sql6}`, function (err, result6) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        //console.log(sql6);
                        const subtractedFullDegree = `${parseFloat(result6[0][0].Full_degrees) - parseFloat(result6[1][0].Full_degrees)}`
                        //console.log(`${result[i].Place}', '${result[i].time} = ${subtractedFullDegree}`);
                        let sql7 = `insert into SubtractedDegrees${number}(place,time,Degree,date,State,Country) values('${result[i].Place}', '${result[i].time}' ,${subtractedFullDegree},'${result[i].date}','${result[i].State}','${result[i].Country}') `;
                        pool.query(sql7, function (err, result7) {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                console.log("Rows Effected=" + result7.affectedRows);
                            }
                        });
                    }
                });

            }
        }
    })
    res.send("least Full degree value calculated");
})
//server connection
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`listening on ${port}`)
    console.log("http://localhost:8080/DistinctPlacesAndTimeForMelaficColumn/1");
    console.log("http://localhost:8080/DistinctPlacesAndTimeForMelaficColumn/2");
    console.log("http://localhost:8080/DistinctPlacesAndTimeForMelaficColumn/3");
    console.log("http://localhost:8080/insertDistinctplaceandtimecol/1");
    console.log("http://localhost:8080/insertDistinctplaceandtimecol/2");
    console.log("http://localhost:8080/insertDistinctplaceandtimecol/3");
    console.log("http://localhost:8080/insertvaluesintoascendentandmoonreference/1");
    console.log("http://localhost:8080/insertvaluesintoascendentandmoonreference/2");
    console.log("http://localhost:8080/insertvaluesintoascendentandmoonreference/3");
    console.log("http://localhost:8080/insertIntoAscendentAndMoonTable/1");
    console.log("http://localhost:8080/insertIntoAscendentAndMoonTable/2");
    console.log("http://localhost:8080/insertIntoAscendentAndMoonTable/3");
    console.log("http://localhost:8080/insertcommonvaluesintoascendentandmoon/1");
    console.log("http://localhost:8080/insertcommonvaluesintoascendentandmoon/2");
    console.log("http://localhost:8080/insertcommonvaluesintoascendentandmoon/3");
    // console.log("http://localhost:8080/distinctplaceandtimeforcommonascendentandmoon/1");
    // console.log("http://localhost:8080/distinctplaceandtimeforcommonascendentandmoon/2");
    // console.log("http://localhost:8080/distinctplaceandtimeforcommonascendentandmoon/3");
    console.log("http://localhost:8080/leastfulldegrees/1");
    console.log("http://localhost:8080/leastfulldegrees/2");
    console.log("http://localhost:8080/leastfulldegrees/3");


});