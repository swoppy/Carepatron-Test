import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ClientRow from "./ClientRow";

export default function BasicTable({ clients }: { clients: IClient[] }) {
  const headers = ["Name", "Phone", "Email"];
  return (
    <TableContainer component={Paper} sx={{ maxWidth: "100%", boxShadow: 'none' }}>
      <Table sx={{ minWidth: 400, boxShadow: 'none' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell
                key={index}
                sx={{ fontWeight: 600, paddingX: "2rem", fontSize: "0.75rem"  }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <ClientRow key={client.id} client={client} />
          ))}
          {!clients ||
            (!clients.length && (
              <TableRow sx={{ paddingX: "2rem" }}>
                <TableCell component="th" scope="row">
                  No clients
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
