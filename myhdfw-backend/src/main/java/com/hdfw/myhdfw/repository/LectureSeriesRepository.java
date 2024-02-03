package com.hdfw.myhdfw.repository;

import com.hdfw.myhdfw.model.LectureSeries;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LectureSeriesRepository extends JpaRepository<LectureSeries, Long> {
}
