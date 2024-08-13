import React from "react";
import Rows from "./Rows";
import Header from "./Header";
import Table from "react-bootstrap/Table";
import { Card } from "react-bootstrap";
import Body from "./Body";

export default function TableView({ headers, data, objKeys, ...props }) {
  return (
    <>
      <Table {...props}>
        <Header headers={headers} />
        <Body>
          <Rows data={data} objKeys={objKeys} />
        </Body>
      </Table>
    </>
  );
}