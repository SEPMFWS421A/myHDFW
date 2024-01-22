
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
    {
        id: createEventId(),
        title: 'Tagesevent',
        start: todayStr
    },
    {
        id: createEventId(),
        title: 'Mittagspause',
        start: '2024-01-23T10:00:00'
    },
    {
        id: createEventId(),
        title: 'Project Review',
        start: '2024-01-23T10:00:00',
    },
    {
        id: createEventId(),
        title: 'Working ',
        start: '2024-01-26T10:00:00',
    }
]

export function createEventId() {
    return String(eventGuid++)
}
