const { Selector } = require("testcafe");

const addEvent                   = '#add_event';
const EventSave                  = '#add_event_save';
const cancelSaveEventDialog      = '#add_event_cancel';
const deleteEvents               = '#delete_event';
const editEventColumn            = '#table_events tbody td button[id="edit_column"]';
const deleteEventColumn          = '#table_events tbody td button[id="delete_column"]';
const cancelDeleteEventDialog    = '#cancel_delete_event_dialog';
const deleteEventDialog          = '#delete_event_dialog';
const cancelDeleteEventsDialog   = '#cancel_delete_events_dialog';
const deleteEventsDialog         = '#delete_events_dialog';

const searchEvents           = '#search_events';
const checkboxFirst         = '#table_events tbody td:nth-child(1) div';
const dataInTable           = '#table_events tbody td:nth-child(2)';
const designationSelector   = '#designation_event';
const dialogSelector        = 'p-dialog-header';

const testEventAdd           = 'Business Knigge 0';
const testEventCancel        = 'Business Knigge 1';
const testEventDelete        = 'Business Knigge 2';
const testEventsDeleteOne    = 'Business Knigge 3';
const testEventsDeleteTwo    = 'Business Knigge 4';
const testEventEdit          = 'Business Knigge 5';
const testEventEditNew       = 'Business Knigge X';


fixture('Event Management - Create, Update and Delete')
        .page('http://localhost:5173/Eventverwaltung/');

test('Event hinzufügen', async t => {
    await t
            .click(addEvent)
            .typeText(designationSelector   , testEventAdd)
            .typeText('#starting_point' , '10:00')
            .typeText('#end_point'     , '12:30')
            .typeText('#capacity_event'      , '30')
            .typeText('#date'     , '17.02.2024')
            .typeText('#location_event'      , 'Mettmann')
            .click(EventSave)
            .typeText(searchEvents, testEventAdd, { replace: true})
            .expect(Selector(dataInTable).innerText).contains(testEventAdd);
});

test('Event hinzufügen - Abbrechen', async t => {
    await t
            .click(addEvent)
            .typeText(designationSelector, testEventCancel)
            .click(cancelSaveEventDialog)
            .expect(Selector(dialogSelector).exists).notOk()
            .typeText(searchEvents, testEventCancel, { replace: true})
            .expect(Selector(dataInTable).innerText).contains(testEventCancel);
});

test('Event löschen', async t => {
    await t
            .typeText(searchEvents, testEventDelete)
            .click(deleteEventColumn)
            .click(deleteEventDialog)
            .typeText(searchEvents, testEventDelete, { replace: true})
            .expect(Selector(dataInTable).exists).notOk();
});

test('Event löschen - Abbrechen', async t => {
    await t
            .typeText(searchEvents, testEventCancel, { replace: true})
            .click(deleteEventColumn)
            .click(cancelDeleteEventDialog)
            .expect(Selector(dialogSelector).exists).notOk()
            .typeText(searchEvents, testEventCancel, { replace: true})
            .expect(Selector(dataInTable).innerText).contains(testEventCancel);
});

test('Event löschen', async t => {
    await t
            .typeText(searchEvents, testEventsDeleteOne, { replace: true})
            .click(checkboxFirst)
            .typeText(searchEvents, testEventsDeleteTwo, { replace: true})
            .click(checkboxFirst)
            .click(deleteEvents)
            .click(deleteEventsDialog)
            .typeText(searchEvents, testEventsDeleteOne, { replace: true})
            .expect(Selector(dataInTable).exists).notOk()
            .typeText(searchEvents, testEventsDeleteTwo, { replace: true})
            .expect(Selector(dataInTable).exists).notOk();
});

test('Event löschen - abbrechen', async t => {
    await t
            .typeText(searchEvents, testEventCancel, { replace: true})
            .click(checkboxFirst)
            .click(deleteEvents)
            .click(cancelDeleteEventsDialog)
            .expect(Selector(dialogSelector).exists).notOk()
            .typeText(searchEvents, testEventCancel, { replace: true})
            .expect(Selector(dataInTable).innerText).contains(testEventCancel);
});

test('Event bearbeiten', async t => {
    await t
            .typeText(searchEvents, testEventEdit, { replace: true})
            .click(editEventColumn)
            .typeText(designationSelector, testEventEditNew, { replace: true})
            .click(EventSave)
            .typeText(searchEvents, testEventEditNew, { replace: true})
            .expect(Selector(dataInTable).innerText).contains(testEventEditNew);
});

test('Event bearbeiten - abbrechen', async t => {
    await t
            .typeText(searchEvents, testEventCancel, { replace: true})
            .click(editEventColumn)
            .typeText(designationSelector, testEventEditNew, { replace: true})
            .click(cancelSaveEventDialog)
            .expect(Selector(dialogSelector).exists).notOk()
            .typeText(searchEvents, testEventCancel, { replace: true})
            .expect(Selector(dataInTable).innerText).contains(testEventCancel);
});