import React from "react";
import { CourseSummary } from "../../types/course";
import styles from "./SearchResults.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

export const SearchResults = ({ results }: { results: CourseSummary[] }) => {
  return (
    <div>
      {results.length > 0 ? (
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className={styles.table}>
            <TableHead>
              <TableRow>
                <TableCell className={styles.headerCell}>時間割番号</TableCell>
                <TableCell className={styles.headerCell}>授業科目名</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((result, index) => (
                <TableRow key={index} className={styles.row}>
                  <TableCell className={styles.cell}>
                    {result.courseNumber}
                  </TableCell>
                  <TableCell className={styles.cell}>
                    <a
                      href={`/class-detail/${result.courseNumber}`}
                      className={styles.link}
                    >
                      {result.name}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography className={styles.noResults}>検索結果なし</Typography>
      )}
    </div>
  );
};
