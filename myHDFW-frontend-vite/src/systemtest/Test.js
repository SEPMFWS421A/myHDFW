import {Selector} from 'testcafe';


fixture('Getting Started')
        .page('http://localhost:5173/');


const checkbox_we = Selector('.checkbox-weekend');
const spring_today = Selector('fc-today-button fc-button fc-button-primary');

test('My first test', async t => {

    //Today nicht clickbar
    Selector(spring_today, {visibilityCheck: false})

    await t
            //Tag, wochen oder Monatsansicht
            .click('fc-timeGridDay-button fc-button fc-button-primary')
            .click('fc-timeGridWeek-button fc-button fc-button-primary')
            .click('fc-timeGridMonth-button fc-button fc-button-primary')

            //wochenden anzeigen
            .click(checkbox_we)
            .expect(checkbox_we.checked).ok()

            // Today nach links click
            .click('fc-icon fc-icon-chevron-left')
            .click('fc-today-button fc-button fc-button-primary')

            // Today nach rechts click
            .click('fc-icon fc-icon-chevron-right')
            .click('fc-today-button fc-button fc-button-primary');
});
