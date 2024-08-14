import React from "react";
import Table from "react-bootstrap/Table";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableRows from "./TableRows";
import TableTitle from "./TableTitle";

export default function TableView({ headers, data, objKeys, ...props }) {
  return (
    <>
    <TableTitle/>
      <Table {...props}>
        <TableHeader headers={headers} />
        <TableBody>
          <TableRows data={data} objKeys={objKeys} />
        </TableBody>
      </Table>
    </>
  );
}