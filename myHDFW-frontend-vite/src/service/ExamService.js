export const ExamService = {
    getExamsData() {
        return [
            {
                id: '5000',
                study_group: 'MFWS421A',
                lecture: 'Web Technologies and Applications',
                lecturer: 'Temiz',
                semester: '5',
                start_date: '01.01.2023',
                end_date: '01.07.2023',
                form_of_examination: 'Vortrag',
                deadline_lecturer: '31.12.2022'
            },
            {
                id: '5001',
                study_group: 'MFWI421A',
                lecture: 'Implementierung digitaler Geschäftsprozesse',
                lecturer: 'Bloemer',
                semester: '5',
                start_date: '01.01.2023',
                end_date: '01.07.2023',
                form_of_examination: 'Vortrag',
                deadline_lecturer: '31.12.2022'
            },
            {
                id: '5002',
                study_group: 'MFWS420A',
                lecture: 'Entrepreneurship',
                lecturer: 'Körsgen',
                semester: '5',
                start_date: '01.01.2023',
                end_date: '01.07.2023',
                form_of_examination: 'Vortrag',
                deadline_lecturer: '31.12.2022'
            },
            {
                id: '5003',
                study_group: 'MFWS419A',
                lecture: 'Marketing',
                lecturer: 'Helmke',
                semester: '5',
                start_date: '01.01.2023',
                end_date: '01.07.2023',
                form_of_examination: 'Vortrag',
                deadline_lecturer: '31.12.2022'
            },
            {
                id: '5004',
                study_group: 'MFWI421A',
                lecture: 'Software Testing & DevOps',
                lecturer: 'Ströder',
                semester: '5',
                start_date: '01.01.2023',
                end_date: '01.07.2023',
                form_of_examination: 'Vortrag',
                deadline_lecturer: '31.12.2022'
            },
            {
                id: '5005',
                study_group: 'MFWS421A',
                lecture: 'Wirtschaftsrecht',
                lecturer: 'Dieckmann',
                semester: '6',
                start_date: '01.01.2023',
                end_date: '01.07.2023',
                form_of_examination: 'Klausur',
                deadline_lecturer: '31.12.2022'
            },
        ];
    },

    getExams() {
        return Promise.resolve(this.getExamsData());
    }
};