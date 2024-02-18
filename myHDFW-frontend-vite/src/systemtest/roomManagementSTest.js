const {Selector} = require("testcafe");

const addRoom = '#add_room';
const RoomSave = '#add_room_save';
const cancelSaveRoomDialog = '#add_room_cancel';
const deleteRooms = '#delete_room';
const editRoomColumn = '#table_rooms tbody td button[id="edit_column"]';
const deleteRoomColumn = '#table_rooms tbody td button[id="delete_column"]';
const cancelDeleteRoomDialog = '#cancel_delete_room_dialog';
const deleteRoomDialog = '#delete_room_dialog';
const cancelDeleteRoomsDialog = '#cancel_delete_rooms_dialog';
const deleteRoomsDialog = '#delete_rooms_dialog';

const searchRooms = '#search_rooms';
const checkboxFirst = '#table_rooms tbody td:nth-child(1) div';
const dataInTable = '#table_rooms tbody td:nth-child(2)';
const designationSelector = '#designation_room';
const dialogSelector = 'p-dialog-header';

const testRoomAdd = 'T-5000';
const testRoomCancel = 'T-5001';
const testRoomDelete = 'T-5002';
const testRoomsDeleteOne = 'T-5003';
const testRoomsDeleteTwo = 'T-5004';
const testRoomEdit = 'T-5005';
const testRoomEditNew = 'T-XXXX';


fixture('Raum Management - Create, Update and Delete')
        .page('http://localhost:5173/raumverwaltung/');

test('Raum hinzufügen', async t => {
    await t
            .click(addRoom)
            .typeText(designationSelector, testRoomAdd)
            .typeText('#capacity_room', '30')
            .typeText('#capacity_exam_room', '10')
            .typeText('#equipment_room', 'Beamer, Internet, Electricity')
            .typeText('#location_room', 'Mettmann')
            .click(RoomSave)
            .typeText(searchRooms, testRoomAdd, {replace: true})
            .expect(Selector(dataInTable).innerText).contains(testRoomAdd);
});

test('Raum hinzufügen - Abbrechen', async t => {
    await t
            .click(addRoom)
            .typeText(designationSelector, testRoomCancel)
            .click(cancelSaveRoomDialog)
            .expect(Selector(dialogSelector).exists).notOk()
            .typeText(searchRooms, testRoomCancel, {replace: true})
            .expect(Selector(dataInTable).innerText).contains(testRoomCancel);
});

test('Raum löschen', async t => {
    await t
            .typeText(searchRooms, testRoomDelete)
            .click(deleteRoomColumn)
            .click(deleteRoomDialog)
            .typeText(searchRooms, testRoomDelete, {replace: true})
            .expect(Selector(dataInTable).exists).notOk();
});

test('Raum löschen - Abbrechen', async t => {
    await t
            .typeText(searchRooms, testRoomCancel, {replace: true})
            .click(deleteRoomColumn)
            .click(cancelDeleteRoomDialog)
            .expect(Selector(dialogSelector).exists).notOk()
            .typeText(searchRooms, testRoomCancel, {replace: true})
            .expect(Selector(dataInTable).innerText).contains(testRoomCancel);
});

test('Räume löschen', async t => {
    await t
            .typeText(searchRooms, testRoomsDeleteOne, {replace: true})
            .click(checkboxFirst)
            .typeText(searchRooms, testRoomsDeleteTwo, {replace: true})
            .click(checkboxFirst)
            .click(deleteRooms)
            .click(deleteRoomsDialog)
            .typeText(searchRooms, testRoomsDeleteOne, {replace: true})
            .expect(Selector(dataInTable).exists).notOk()
            .typeText(searchRooms, testRoomsDeleteTwo, {replace: true})
            .expect(Selector(dataInTable).exists).notOk();
});

test('Räume löschen - abbrechen', async t => {
    await t
            .typeText(searchRooms, testRoomCancel, {replace: true})
            .click(checkboxFirst)
            .click(deleteRooms)
            .click(cancelDeleteRoomsDialog)
            .expect(Selector(dialogSelector).exists).notOk()
            .typeText(searchRooms, testRoomCancel, {replace: true})
            .expect(Selector(dataInTable).innerText).contains(testRoomCancel);
});

test('Raum bearbeiten', async t => {
    await t
            .typeText(searchRooms, testRoomEdit, {replace: true})
            .click(editRoomColumn)
            .typeText(designationSelector, testRoomEditNew, {replace: true})
            .click(RoomSave)
            .typeText(searchRooms, testRoomEditNew, {replace: true})
            .expect(Selector(dataInTable).innerText).contains(testRoomEditNew);
});

test('Raum bearbeiten - abbrechen', async t => {
    await t
            .typeText(searchRooms, testRoomCancel, {replace: true})
            .click(editRoomColumn)
            .typeText(designationSelector, testRoomEditNew, {replace: true})
            .click(cancelSaveRoomDialog)
            .expect(Selector(dialogSelector).exists).notOk()
            .typeText(searchRooms, testRoomCancel, {replace: true})
            .expect(Selector(dataInTable).innerText).contains(testRoomCancel);
});