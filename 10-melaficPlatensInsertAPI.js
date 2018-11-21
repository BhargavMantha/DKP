const express = require('express');
const app = express();
const pool = require('./database');
const timearray = ["00:00:00", "01:00:00", "02:00:00", "03:00:00", "04:00:00", "05:00:00", "06:00:00", "07:00:00", "08:00:00", "09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00", "18:00:00", "19:00:00", "20:00:00", "21:00:00", "22:00:00", "23:00:00"];
const cityArrayFile = require("./15-cities")
const cityarray = cityArrayFile.indiancities;
app.get('/insertmelaficplanetanddatecol/:number', (req, res) => {
    const number=req.params.number;
    for (let j = 0; j < cityarray.length; j++) {
        for (let i = 0; i < timearray.length; i++) {
            let sql = `select planet,Nakshatra,time,place from ${tablename} where time like '${timearray[i]}' and place like '${cityarray[j]}'`;
            selectMelaficPlanets(sql)
        }
    }

    res.send("Planet and Date Data inserted of col"+number);
})

function selectMelaficPlanets(tablename, timearray) {
    //console.log(arrayresultofdatesforcolumn1);


    for (let i = 0; i < timearray.length; i++) {
        const planetarray = [];
        const nakshatraarray=[];
        let sql = `select planet,Nakshatra from ${tablename} where date like '${timearray[i]}'`;
        pool.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                for (let j = 0; j < result.length - 1; j++) {
                    planetarray.push(result[j].planet);
                    nakshatraarray.push(result[j].Nakshatra);
                }
                let melaficplanetname = [];
                let melaficNakshatraname=[]
                for (let k = 0; k < planetarray.length - 1; k++) {
                    if (planetarray[k] == 'Ketu (Ke)') {
                        melaficplanetname.push(planetarray[k]);
                        melaficNakshatraname.push(nakshatraarray[k]);
                    }
                    if (planetarray[k] == 'Rahu (Ra)') {

                        melaficplanetname.push(planetarray[k]);
                        melaficNakshatraname.push(nakshatraarray[k]);
                    }
                    if (planetarray[k] == 'Sun (Su)') {

                        melaficplanetname.push(planetarray[k]);
                        melaficNakshatraname.push(nakshatraarray[k]);
                    }
                    if (planetarray[k] == 'Saturn (Sa)') {

                        melaficplanetname.push(planetarray[k]);
                        melaficNakshatraname.push(nakshatraarray[k]);
                    }
                    if (planetarray[k] == 'Mars (Ma)') {

                        melaficplanetname.push(planetarray[k]);
                        melaficNakshatraname.push(nakshatraarray[k]);
                    }
                }
                if (melaficplanetname.length == 2) {
                    for(a=0;a<melaficplanetname.length;a++)
                        console.log(`2[${a}]:${melaficplanetname[a]} ${melaficNakshatraname[a]} ${datesArray[i]}`)
                }
                // if (melaficplanetname.length == 3){
                //     for(a=0;a<melaficplanetname.length;a++)
                //         console.log(`3[${a}]:${melaficplanetname[a]} ${melaficNakshatraname[a]} ${datesArray[i]}`)
                // }
                if (melaficplanetname.length >= 3){
                    for(a=0;a<melaficplanetname.length;a++)
                        console.log(`3orMore[${a}]:${melaficplanetname[a]} ${melaficNakshatraname[a]} ${datesArray[i]}`)
                }   

            }
        });

    }
}






const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`listening on ${port}`)
});