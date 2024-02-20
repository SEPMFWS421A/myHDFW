const { Selector } = require("testcafe");

const addUser                   = '#add_user';
const UserSave                  = '#add_user_save';
const cancelSaveUserDialog      = '#add_user_cancel';
const deleteUsers               = '#delete_user';
const editUserColumn            = '#table_users tbody td button[id="edit_column"]';
const deleteUserColumn          = '#table_users tbody td button[id="delete_column"]'; 
const cancelDeleteUserDialog    = '#cancel_delete_user_dialog';
const deleteUserDialog          = '#delete_user_dialog';
const cancelDeleteUsersDialog   = '#cancel_delete_users_dialog';
const deleteUsersDialog         = '#delete_users_dialog';

const searchUsers           = '#search_users';
const checkboxFirst         = '#table_users tbody td:nth-child(1) div';
const dataInTable           = '#table_users tbody td:nth-child(2)'; 
const mailSelector          = '#mail_user';
const dialogSelector        = 'p-dialog-header';

const testUserAdd           = 'jeff123@test.com';
const testUserCancel        = 'leo123@test.com';
const testUserDelete        = 'lisa123@test.com';
const testUsersDeleteOne    = 'niklas123@test.com';
const testUsersDeleteTwo    = 'elizabeth123@test.com';
const testUserEdit          = 'kaileb123@test.com';
const testUserEditNew       = 'XXXX';


fixture('Nutzer Management - Create, Update and Delete')
    .page('http://localhost:5173/studentenverwaltung/');
    
    test('Nutzer hinzufügen', async t => {
        await t
            .click(addUser)
            .typeText(mailSelector    , testUserAdd)
            .typeText('#forename_user'       , 'Luna')
            .typeText('#surname_user'        , 'TestNew')
            .typeText('#role_user'           , 'professor')
            .typeText('#entry_user'          , '01.01.1999')
            .typeText('#exit_user'           , '02.02.2002')
            .typeText('#exmatriculated_user' , 'Yes')
            .click(UserSave)
            .typeText(searchUsers, testUserAdd, { replace: true})
            .expect(Selector(dataInTable).innerText).contains(testUserAdd);
    });

    test('Nutzer hinzufügen - Abbrechen', async t => {
        await t
            .click(addUser)
            .typeText(mailSelector, testUserCancel)
            .click(cancelSaveUserDialog)
            .expect(Selector(dialogSelector).exists).notOk()
            .typeText(searchUsers, testUserCancel, { replace: true})
            .expect(Selector(dataInTable).innerText).contains(testUserCancel);
    });

    test('Nutzer löschen', async t => {
        await t
            .typeText(searchUsers, testUserDelete)
            .click(deleteUserColumn)
            .click(deleteUserDialog)
            .typeText(searchUsers, testUserDelete, { replace: true})
            .expect(Selector(dataInTable).exists).notOk();
    }); 
    
    test('Nutzer löschen - Abbrechen', async t => {
        await t
            .typeText(searchUsers, testUserCancel, { replace: true})
            .click(deleteUserColumn)
            .click(cancelDeleteUserDialog)
            .expect(Selector(dialogSelector).exists).notOk()
            .typeText(searchUsers, testUserCancel, { replace: true})
            .expect(Selector(dataInTable).innerText).contains(testUserCancel);
    }); 

    test('Nutzer löschen', async t => {
        await t
            .typeText(searchUsers, testUsersDeleteOne, { replace: true})
            .click(checkboxFirst)
            .typeText(searchUsers, testUsersDeleteTwo, { replace: true})
            .click(checkboxFirst)
            .click(deleteUsers)
            .click(deleteUsersDialog)
            .typeText(searchUsers, testUsersDeleteOne, { replace: true})
            .expect(Selector(dataInTable).exists).notOk()
            .typeText(searchUsers, testUsersDeleteTwo, { replace: true})
            .expect(Selector(dataInTable).exists).notOk();
    }); 

    test('Nutzer löschen - abbrechen', async t => {
        await t
            .typeText(searchUsers, testUserCancel, { replace: true})
            .click(checkboxFirst)
            .click(deleteUsers)
            .click(cancelDeleteUsersDialog)
            .expect(Selector(dialogSelector).exists).notOk()
            .typeText(searchUsers, testUserCancel, { replace: true})
            .expect(Selector(dataInTable).innerText).contains(testUserCancel);
    }); 

    test('Nutzer bearbeiten', async t => {
        await t
        .typeText(searchUsers, testUserEdit, { replace: true})
        .click(editUserColumn)
        .typeText(mailSelector, testUserEditNew, { replace: true})
        .click(UserSave)
        .typeText(searchUsers, testUserEditNew, { replace: true})
        .expect(Selector(dataInTable).innerText).contains(testUserEditNew);
    }); 
    
    test('Nutzer bearbeiten - abbrechen', async t => {
        await t
        .typeText(searchUsers, testUserCancel, { replace: true})
        .click(editUserColumn)
        .typeText(mailSelector, testUserEditNew, { replace: true})
        .click(cancelSaveUserDialog)
        .expect(Selector(dialogSelector).exists).notOk()
        .typeText(searchUsers, testUserCancel, { replace: true})
        .expect(Selector(dataInTable).innerText).contains(testUserCancel);
    });