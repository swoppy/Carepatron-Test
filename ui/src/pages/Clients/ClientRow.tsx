import { TableCell, TableRow } from "@mui/material";

export interface IProps {
  client: IClient;
}

export default function ClientListItem({ client }: IProps) {
  const { id, firstName, lastName, email, phoneNumber } = client;

  return (
    <TableRow
      key={id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <TableCell component="th" scope="row" sx={{ color: "#335FFF", fontWeight: 600, paddingX: "2rem" }}>
        {firstName} {lastName}
      </TableCell>
      <TableCell sx={{ paddingX: "2rem" }}>{phoneNumber}</TableCell>
      <TableCell sx={{ paddingX: "2rem" }}>{email}</TableCell>
    </TableRow>
  );
}
