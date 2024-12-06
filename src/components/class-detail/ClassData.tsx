import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import styles from "../../app/class-detail/[classNumber]/page.module.css";

interface ClassDataProps {
  details: {
    num: string;
    name: string;
    teacher: string;
    location: string;
  };
}

const ClassData: React.FC<ClassDataProps> = ({ details }) => {
  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={styles.tableCellTitle}>授業名</TableCell>
            <TableCell>{details.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={styles.tableCellTitle}>教員</TableCell>
            <TableCell>{details.teacher}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={styles.tableCellTitle}>時間割番号</TableCell>
            <TableCell>{details.num}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={styles.tableCellTitle}>講義室</TableCell>
            <TableCell>{details.location}</TableCell>
          </TableRow>
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
