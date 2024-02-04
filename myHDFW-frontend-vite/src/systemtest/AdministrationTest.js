const { Selector } = require("testcafe");

fixture('Administration')
        .page('http://localhost:5173/administration/');

test('Path to next Pages', async t => {

    const imageSelector = Selector('@/assets/Eventverwaltung.jpg');


    const targetUrl = '/eventverwaltung/';

    // Klicke auf das Bild
    await t.click(imageSelector);

    // Überprüfe, ob die aktuelle URL der erwarteten Ziel-URL entspricht
    await t.expect(Selector('body').innerText).contains(targetUrl);
});

