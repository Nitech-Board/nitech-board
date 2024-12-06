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
interface ClassDataProps {
  details: {
    num: string;
    name: string;
    teacher: string;
    location: string;
  };
}

const CourseTableRow = ({ title, data }) => {
  return (
    <TableRow>
      <TableCell className={styles.tableCellTitle}>{title}</TableCell>
      <TableCell>{data}</TableCell>
    </TableRow>
  );
};

const ClassData: React.FC<ClassDataProps> = ({ details }) => {
  return (
    <TableContainer component={Paper} className={styles.table_container}>
      <Table>
        <TableBody>
          <CourseTableRow title={"授業名"} data={details.name} />
          <CourseTableRow title={"教員"} data={details.teacher} />
          <CourseTableRow title={"時間割番号"} data={details.num} />
          <CourseTableRow title={"講義室"} data={details.location} />
          <TableRow>
            <TableCell className={styles.tableCellTitle}>シラバス</TableCell>
            <TableCell>
              <a href="#" className={styles.tableLink}>
                シラバスリンク
              </a>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClassData;
