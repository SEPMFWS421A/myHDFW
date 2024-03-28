import { Selector } from 'testcafe';

fixture('schedule')
        .page('http://localhost:5173/schedule/');

const day = {
    monday: "mon",
    tuesday: "tue",
    wednesday:"wed",
    thursday:"thu",
    friday: "fri",
    saturday: "sat",
    sunday:"sun"
}

let days = Object.keys(day);
test('schedule Click test', async t =>{

    await t // Navigationsleiste-links
            .click('#pv_id_1_0')
            .click('#pv_id_1_1')
            .click('#pv_id_1_2')
            //Logo
            .click('.logo')
            .click('#pv_id_1_2')
            //Monatsansicht
            .click('.fc-dayGridMonth-button.fc-button.fc-button-primary')
            .click('.fc-prev-button.fc-button.fc-button-primary')
            .click('.fc-today-button.fc-button.fc-button-primary')
            .click('.fc-next-button.fc-button.fc-button-primary')
            .click('.fc-today-button.fc-button.fc-button-primary')
                console.log("first start");
                for(let i =0; i <= days.length - 1;i++){
                    await t
                            .click('.fc-day.fc-day-'+day[days[i]]+'.fc-day-past.fc-daygrid-day')
                            .click('.p-button.p-component.p-button-secondary');
                }
                console.log("first end");
                console.log("second start")
                for(let i = 0; i <= days.length - 1;i++){
                    await t
                            .click('.fc-day.fc-day-'+day[days[i]]+'.fc-day-future.fc-day-other.fc-daygrid-day')
                            .click('.p-button.p-component.p-button-secondary');
                }
                console.log("second end");

            //Wochensansicht
            await t .click('.fc-timeGridWeek-button.fc-button.fc-button-primary')
                    .click('.fc-daygrid-day-frame.fc-scrollgrid-sync-inner')
                    .click('.p-button.p-component.p-button-secondary');
            //Tagesansicht
            await t .click('.fc-timeGridDay-button.fc-button.fc-button-primary')
                    .click('.fc-dayGridMonth-button.fc-button.fc-button-primary')
})