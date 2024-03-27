export const GradeService = {
    getRoomsData() {
        return [
            {
                id: '1000',
                semester: '1',
                modul: 'Software Testing & DevOps',
                status: 'Bestanden',
                grade: '2,0',
                try: '1',
                date: '14.01.2024',
                credits: '5/5'
            },
            {
                id: '1001',
                semester: '1',
                modul: 'Software Engineering Project',
                status: 'Bestanden',
                grade: '3,0',
                try: '1',
                date: '16.01.2024',
                credits: '5/5'
            },
            {
                id: '1002',
                semester: '1',
                modul: 'GPM',
                status: 'Nicht Bestanden',
                grade: '5,0',
                try: '2',
                date: '19.01.2024',
                credits: '0/5'
            },
            {
                id: '1003',
                semester: '1',
                modul: 'IT Security',
                status: 'Bestanden',
                grade: '3,0',
                try: '1',
                date: '25.01.2024',
                credits: '5/5'
            },
            {
                id: '1004',
                semester: '1',
                modul: 'Wirtschaftsrecht',
                status: 'Bestanden',
                grade: '2,3',
                try: '1',
                date: '28.01.2024',
                credits: '5/5'
            },

            {
                id: '1005',
                semester: '2',
                modul: 'BWL',
                status: 'Bestanden',
                grade: '2,7',
                try: '1',
                date: '24.02.2024',
                credits: '5/5'
            },
            {
                id: '1006',
                semester: '2',
                modul: 'Wirtschaftsstatistik',
                status: 'Nicht Bestanden',
                grade: '5,0',
                try: '2',
                date: '27.01.2024',
                credits: '0/5'
            },
            {
                id: '1007',
                semester: '2',
                modul: 'Programmierung 1',
                status: 'Bestanden',
                grade: '1,0',
                try: '1',
                date: '28.01.2024',
                credits: '5/5'
            },
            {
                id: '1008',
                semester: '2',
                modul: 'Business Englisch 1',
                status: 'Bestanden',
                grade: '2,0',
                try: '1',
                date: '01.03.2024',
                credits: '5/5'
            },
            {
                id: '1009',
                semester: '2',
                modul: 'CI',
                status: 'Bestanden',
                grade: '2,7',
                try: '1',
                date: '03.03.2024',
                credits: '5/5'
            },

            {
                id: '1010',
                semester: '3',
                modul: 'DT',
                status: 'Bestanden',
                grade: '2,7',
                try: '1',
                date: '14.04.2024',
                credits: '5/5'
            },
            {
                id: '1011',
                semester: '3',
                modul: 'IR',
                status: 'Bestanden',
                grade: '3,0',
                try: '1',
                date: '16.04.2024',
                credits: '5/5'
            },
            {
                id: '1012',
                semester: '3',
                modul: 'WIA',
                status: 'Bestanden',
                grade: '1,7',
                try: '1',
                date: '24.04.2024',
                credits: '5/5'
            },
            {
                id: '1013',
                semester: '3',
                modul: 'Data Analysis and Maschine Learning',
                status: 'Bestanden',
                grade: '2,0',
                try: '1',
                date: '25.04.2024',
                credits: '5/5'
            },
            {
                id: '1014',
                semester: '3',
                modul: 'Programmierung 2',
                status: 'Bestanden',
                grade: '2,3',
                try: '1',
                date: '27.04.2024',
                credits: '5/5'
            },

            {
                id: '1015',
                semester: '4',
                modul: 'luF',
                status: 'Bestanden',
                grade: '3,0',
                try: '2',
                date: '02.08.2024',
                credits: '5/5'
            },
            {
                id: '1016',
                semester: '4',
                modul: 'Business Englisch 2',
                status: 'Bestanden',
                grade: '2,0',
                try: '2',
                date: '05.08.2024',
                credits: '5/5'
            },
            {
                id: '1017',
                semester: '4',
                modul: 'Projektmanagement',
                status: 'Bestanden',
                grade: '2,7',
                try: '1',
                date: '13.08.2024',
                credits: '5/5'
            },
            {
                id: '1018',
                semester: '4',
                modul: 'Geschäftsprozessmanagement',
                status: 'Bestanden',
                grade: '4,0',
                try: '3',
                date: '15.08.2024',
                credits: '5/5'
            },
            {
                id: '1019',
                semester: '4',
                modul: 'Marketing',
                status: 'Bestanden',
                grade: '3,0',
                try: '1',
                date: '24.01.2024',
                credits: '5/5'
            },
        ];
    },

    getGrades() {
        return Promise.resolve(this.getRoomsData());
    }
};