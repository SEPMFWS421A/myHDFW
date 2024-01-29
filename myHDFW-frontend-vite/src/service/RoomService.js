/*
export const RoomService = {

    getRooms() {
        return [
            {
                id: '1000',
                designation: 'M-100',
                capacity: '30',
                exam_capacity: '10',
                equipment: 'Beamer, Elektrizität',
                location: 'Mettmann'
            }
        ];
    }
};
*/
export const RoomService = {
    getRoomsData() {
        return [
            {
                id: '1000',
                designation: 'M-100',
                capacity: '30',
                exam_capacity: '10',
                equipment: 'Beamer, Elektrizität',
                location: 'Mettmann'
            },

        ];
    },

    getRooms() {
        return Promise.resolve(this.getRoomsData());
    }
};