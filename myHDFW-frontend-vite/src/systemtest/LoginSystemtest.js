import {ClientFunction, Selector} from 'testcafe';

fixture('Login Systemtest')
        .page('http://localhost:5173/');

test('Profile Login button is present', async t => {
    const header = Selector('.header-right-menu');
    const profile = header.find('.profile');

    await t.expect(header.exists).ok()
            .expect(profile.exists).ok();
});

test('User can view login menu', async t => {
    const header = Selector('.header-right-menu');
    const buttonProfile = header.find('.profile');
    const loginMenu = Selector('.p-dialog').find('.p-component');
    const buttonCancel = loginMenu.find('.p-button-secondary');

    await t.click(buttonProfile)
            .expect(loginMenu.exists).ok()
            .click(buttonCancel)
            .expect(loginMenu.exists).notOk();
});

test('User is able to log in', async t => {
    const header = Selector('.header-right-menu');
    const buttonProfile = header.find('.profile');
    const loginMenu = Selector('.p-component');
    const buttonLogin = loginMenu.find('.p-button');

    await t.click(buttonProfile)
            .typeText('#username', 'username')
            .typeText('#password', 'password')
            .click(buttonLogin);
});

test('Logged in user can view profile menu and log out', async t => {
    const header = Selector('.header-right-menu');
    const buttonProfile = header.find('.profile');
    const profileMenu = Selector('.profileMenu');

    const profileEntry = profileMenu.find('.p-menuitem-text').withText('Profil');
    const logoutEntry = profileMenu.find('.p-menuitem-text').withText('Abmelden');

    await t.click(buttonProfile)
            .expect(profileMenu.exists).ok()
            .expect(profileEntry.exists).ok()
            .click(logoutEntry);
});