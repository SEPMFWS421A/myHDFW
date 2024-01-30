const { Selector } = require("testcafe");

fixture('Event Management')
        .page('http://localhost:5173/eventverwaltung/');

test('Event hinzufügen', async t => {
    await t
            .click('#add_event')
            .typeText('#event_desigantion', 'Business Knigge')
            .typeText('#event_capacity', '30')
            .typeText('#event_starting_point', '10:00')
            .typeText('#event_end_point', '12:30')
            .typeText('#event_duration', '2,5 Stunden')
            .click('#save_event')
            .expect(Selector('#event_data_id td:nth-child(2)').innerText).contains('Business Knigge');
});

test('Event hinzufügen - Abbrechen', async t => {
    await t
            .click('#add_event')
            .typeText('#event_desigantion', 'Business Knigge')
            .typeText('#event_capacity', '30')
            .typeText('#event_starting_point', '10:00')
            .typeText('#event_end_point', '12:30')
            .typeText('#event_duration', '2,5 Stunden')
            .click('#cancel_event')
            .expect(Selector('#event_data_id td:nth-child(1) p-checkbox-box p-component').exists).notOk();
});

test('Event löschen', async t => {
    await t
            .click('#event_data_id td:nth-child(1) p-checkbox-box p-component')
            .click('#delete_event')
            .click('button[aria-label="Yes"]')
            .expect(Selector('#event_data_id td:nth-child(1) p-checkbox-box p-component').exists).notOk();
});

test('Event löschen - abbrechen', async t => {
    await t
            .click('#event_data_id td:nth-child(1) p-checkbox-box p-component')
            .click('#delete_event')
            .click('button[aria-label="No"]')
            .expect(Selector('#event_data_id td:nth-child(1) p-checkbox-box p-component').exists).ok;
});