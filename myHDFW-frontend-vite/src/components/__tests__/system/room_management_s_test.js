const { Selector } = require("testcafe");

fixture('Room Management')
    .page('http://localhost:5173/raumverwaltung/');

    test('Raum hinzufügen', async t => {
        await t
            .click('#add_room')
            .typeText('#room_desigantion', 'M-1111')
            .typeText('#room_capacity', '30')
            .typeText('#room_capacity_exam', '10')
            .typeText('#room_equipment', 'Beamer, Internet, Electricity')
            .typeText('#room_location', 'Mettmann')
            .click('#save_room')
            .expect(Selector('#room_data_id td:nth-child(2)').innerText).contains('M-1111');
    });

    test('Raum hinzufügen - Abbrechen', async t => {
        await t
            .click('#add_room')
            .typeText('#room_desigantion', 'M-1111')
            .typeText('#room_capacity', '30')
            .typeText('#room_capacity_exam', '10')
            .typeText('#room_equipment', 'Beamer, Internet, Electricity')
            .typeText('#room_location', 'Mettmann')
            .click('#cancel_room')
            .expect(Selector('#room_data_id td:nth-child(1) p-checkbox-box p-component').exists).notOk();
    });

    test('Raum löschen', async t => {
        await t
            .click('#room_data_id td:nth-child(1) p-checkbox-box p-component')
            .click('#delete_room')
            .click('button[aria-label="Yes"]')
            .expect(Selector('#room_data_id td:nth-child(1) p-checkbox-box p-component').exists).notOk();
    }); 

    test('Raum löschen - abbrechen', async t => {
        await t
            .click('#room_data_id td:nth-child(1) p-checkbox-box p-component')
            .click('#delete_room')
            .click('button[aria-label="No"]')
            .expect(Selector('#room_data_id td:nth-child(1) p-checkbox-box p-component').exists).ok;
    }); 