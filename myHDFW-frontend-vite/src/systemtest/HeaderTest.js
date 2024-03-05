import {ClientFunction, Selector} from 'testcafe';

fixture('Header Test')
        .page('http://localhost:5173/');
test('Header is present on the page', async t => {
    const header = Selector('.header-container');
    await t.expect(header.exists).ok();
});

test('Header contains all elements', async t => {
    const header_right = Selector('.header-right-menu');
    const notifications = header_right.find('.notifications');
    const profile = header_right.find('.profile');

    await t.expect(header_right.exists).ok()
            .expect(notifications.exists).ok()
            .expect(profile.exists).ok();
});

test('Profile menu is hidden', async t => {
    const profileMenu = Selector('.profile-menu');
    await t.expect(profileMenu.exists).notOk();
});

test('Login panel is visible instead of profile menu when not logged in on click', async t => {
    const profile = Selector('.header-right-menu').find('.profile');
    const profileMenu = Selector('profile-menu');
    const loginMenu = Selector('.p-component');

    const buttonCancel = loginMenu.find('.p-button-secondary').withText('Cancel');
    const buttonSave = loginMenu.find('.p-button').withText('Save');

    await t.expect(profileMenu.exists).notOk()
            .click(profile)
            .expect(loginMenu.exists).ok()
            .expect(buttonCancel.exists).ok()
            .expect(buttonSave.exists).ok()
            .typeText("#username","admin")
            .typeText("#password", "password")
            .click(buttonSave);
});

test('Profile menu is visible after click when logged in', async t => {
    const profile = Selector('.header-right-menu').find('.profile');
    const profileMenu = Selector('.profile-menu');

    const profileEntry = profileMenu.find('.p-menuitem-text').withText('Profil');
    const logoutEntry = profileMenu.find('.p-menuitem-text').withText('Abmelden');

    await t.expect(profileMenu.exists).notOk()
            .click(profile)
            .expect(profileMenu.exists).ok()
            .expect(profileEntry.exists).ok()
            .expect(logoutEntry.exists).ok();
});

test('Profile menu')
test('Profile menu navigates correctly', async t => {
    const profile = Selector('.header-right-menu').find('.profile');
    const profileMenu = Selector('.profile-menu');

    const profileEntry = profileMenu.find('.p-menuitem').withText('Profil');
    const getLocation = ClientFunction(() => document.location.href);

    await t.expect(profileMenu.exists).notOk()
            .click(profile)
            .expect(profileMenu.exists).ok()
            .expect(profileEntry.exists).ok()
            .click(profileEntry)
            .expect(getLocation()).contains('/profile');
});
