import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import styles from "./ClassData.module.css";
import { CourseDetail } from "@/types/course";

const CourseTableRow = ({ title, data }) => {
  return (
    <TableRow>
      <TableCell className={styles.tableCellTitle}>{title}</TableCell>
      <TableCell>{data}</TableCell>
    </TableRow>
  );
};

const ClassData = ({ details }: { details: CourseDetail }) => {
  return (
    <TableContainer component={Paper} className={styles.table_container}>
      <Table>
        <TableBody>
          <CourseTableRow title={"授業名"} data={details.title} />
          <CourseTableRow title={"教員"} data={details.teacherName} />
          <CourseTableRow title={"時間割番号"} data={details.courseNumber} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClassData;
