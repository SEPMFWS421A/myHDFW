INSERT INTO myHDFW.location (id, name)
VALUES (1, 'Mettmann'),
       (2, 'Düsseldorf'),
       (3, 'Köln');

INSERT INTO myHDFW.room (id, capacity, exam_capacity, location_id, equipment, name)
VALUES (1, 30, 15, 1, 'Beamer', 'Raum 101'),
       (2, 20, 10, 1, 'Whiteboard', 'Raum 102'),
       (3, 30, 15, 1, 'Beamer', 'Raum 103'),
       (4, 40, 20, 1, 'Whiteboard', 'Raum 104');

INSERT INTO myHDFW.student_group (id, name)
VALUES (1, 'ABC2020'),
       (2, 'ABC2021'),
       (3, 'ABC2022');

INSERT INTO myHDFW.student (id, email, password, name, surname, exmatriculation_date, student_group_id)
VALUES (1, 'email@email.de', '$2a$10$iR7ikFkFs0kQ9sO1ph4GFuG2HfprKpUMfqtFZEXf5hGVO/WcSm2u6', 'Max', 'Mustermann', null,
        1),
       (2, 'email2@email.de', '$2a$12$evXSSzVhtIb0p1tec99u4OumQSOU3hmiL3FUGnygE42yKyWFAI4FO', 'Moritz', 'Mustermann',
        null, 1),
       (3, 'email3@email.de', '$2a$12$4l7rMcI.66n4QzSeGBJUcOt125NuPd/rXXKwrJwnLe49YNWto3csy', 'Maria', 'Mustermann',
        null, 2);


INSERT INTO myHDFW.employee (id, email, password, name, surname)
VALUES (1, 'admin', '$2a$12$63YTWDYKxRBgcOQri8mjseMaOf9ZefbOvisfoSwL4p.lMYyGoCiEO', 'Maximilian',
        'Mustermann'),
       (2, 'admin@hdfw.test.de', '$2a$12$8TF6mtf8CW6V4Mwi8GMaX.7PrcDAIhLnjJB5A1anBD6u3Pmtohz0y', 'Professor',
        'Mustermann');

INSERT INTO myHDFW.exam (id, duration_min, exam_type, date, room_id)
VALUES (1, 90, 1, '2024-01-01 15:00:00.000000', 2);

INSERT INTO myHDFW.lecture_series (id, semester, employee_id, exam_id, name)
VALUES (1, 1, 1, 1, 'Testing & DevOps');

INSERT INTO myHDFW.lecture (id, duration_min, date, lecture_series_id, room_id, name)
VALUES (1, 90, '2024-03-18 15:00:00.000000', 1, 1, 'Testing & DevOps (1. Vorlesung)'),
       (2, 90, '2024-03-25 15:00:00.000000', 1, 1, 'Testing & DevOps (2. Vorlesung)'),
       (3, 90, '2024-04-01 15:00:00.000000', 1, 1, 'Testing & DevOps (3. Vorlesung)'),
       (4, 90, '2024-04-08 15:00:00.000000', 1, 1, 'Testing & DevOps (4. Vorlesung)'),
       (5, 90, '2024-04-15 15:00:00.000000', 1, 1, 'Testing & DevOps (5. Vorlesung)'),
       (6, 90, '2024-04-22 15:00:00.000000', 1, 1, 'Testing & DevOps (6. Vorlesung)'),
       (7, 90, '2024-04-29 15:00:00.000000', 1, 1, 'Testing & DevOps (7. Vorlesung)'),
       (8, 90, '2024-05-06 15:00:00.000000', 1, 1, 'Testing & DevOps (8. Vorlesung)'),
       (9, 90, '2024-05-13 15:00:00.000000', 1, 1, 'Testing & DevOps (9. Vorlesung)'),
       (10, 90, '2024-05-20 15:00:00.000000', 1, 1, 'Testing & DevOps (10. Vorlesung)');


INSERT INTO myHDFW.enrollment (id, grade, status, lecture_series_id, student_id)
VALUES (1, null, 1, 1, 1),
       (2, null, 1, 1, 2);