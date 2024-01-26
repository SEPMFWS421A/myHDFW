import {ClientFunction, Selector} from 'testcafe';

fixture('Header Test')
        .page('http://localhost:5173/');
test('Header is present on the page', async t => {
    const header = Selector('.header-container');
    await t.expect(header.exists).ok();
});

test('Header contains all elements', async t => {
    const header_left = Selector('.header-name');
    const header_right = Selector('.header-right-menu');
    const search = header_right.find('.searchbar');
    const notifications = header_right.find('.notifications');
    const profile = header_right.find('.profile');

    await t.expect(header_left.exists).ok()
            .expect(header_right.exists).ok()
            .expect(search.exists).ok()
            .expect(notifications.exists).ok()
            .expect(profile.exists).ok();
});

test('Profile menu is hidden', async t => {
    const profileMenu = Selector('.profile-menu');
    await t.expect(profileMenu.exists).notOk();
});

test('Profile menu is visible after click', async t => {
    const profile = Selector('.header-right-menu').find('.profile');
    const profileMenu = Selector('.profile-menu');

    const profileEntry = profileMenu.find('.p-menuitem').withText('Profil');
    const logoutEntry = profileMenu.find('.p-menuitem').withText('Abmelden');

    await t.expect(profileMenu.exists).notOk()
            .click(profile)
            .expect(profileMenu.exists).ok()
            .expect(profileEntry.exists).ok()
            .expect(logoutEntry.exists).ok();

});

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
