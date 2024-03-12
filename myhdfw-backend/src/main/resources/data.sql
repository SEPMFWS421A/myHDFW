INSERT INTO myHDFW.employee (id, email, name, password, surname)
VALUES (1, 'admin', 'Max', '$2a$10$M.3CkHwcy2.s2mck4lO1oOUftBaF6NjMciSfQO075fs5Zd6GVW5S2', 'Mustermann');


INSERT INTO myHDFW.location (id, name)
VALUES (1, 'Location 1');


INSERT INTO myHDFW.room (capacity, exam_capacity, id, location_id, equipment, name)
VALUES (10, 10, 1, 1, 'Gar nichts', 'Room 1');


INSERT INTO myHDFW.lecture_series (semester, employee_id, id, name)
VALUES (1, 1, 1, 'Lecture Series 1');


INSERT INTO myHDFW.lecture (duration_min, date, id, lecture_series_id, room_id, name)
VALUES (1, '2024-01-01 01:01:00.000000', 1, 1, 1, 'Lecture 1');


INSERT INTO myHDFW.student_group (id, name)
VALUES (1, 'Group 1');


INSERT INTO myHDFW.student_group_lecture_series (lecture_series_id, student_group_id)
VALUES (1, 1);


INSERT INTO myHDFW.student (exmatriculation_date, id, student_group_id, email, name, password, surname)
VALUES (null, 1, 1, 'email@email.de', 'Max', '$2a$10$vfOGdyGAoXD9t0VBV1VKI.6VoCzF1vedMFoyL3tTkwlpBIK5tWWla',
        'Mustermann');
