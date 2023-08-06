import { Divider, IconButton, List, ListItemButton, ListItemText, Popover, TableCell, TableRow, Typography } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useContext, useState } from "react";
import { deleteClient } from "../../services/api";
import { StateContext } from "../../store/DataProvider";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';

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
      <TableCell sx={{ paddingX: "2rem" }} align="center">
        {id && id === 'xxx' ? (
          <Tooltip title="Option is temporarily unavailable, needs to refresh browser">
            <HelpOutlineIcon style={{ color: "#A1A4A5" }}/>
          </Tooltip>
          ) : <TableActionsPopover clientId={id}/>}
      </TableCell>
    </TableRow>
  );
}

function TableActionsPopover({ clientId }: { clientId: string }) {
  const { dispatch } = useContext(StateContext);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "table-actions-trigger" : undefined;

  return (
    <>
      <IconButton size="small" onClick={handleClick} aria-describedby={id}>
        <MoreHorizIcon style={{ color: "#A1A4A5" }}/>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List sx={{ paddingY: 0 }}>
          <ListItemButton
            onClick={async () => {
              console.log(clientId);
              await deleteClient(clientId);
              dispatch({ type: "OPTIMISCTIC_DELETE_CLIENT", data: clientId });
            }}
          >
            <ListItemText
              disableTypography
              primary={
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    lineHeight: "1.25rem",
                    fontWeight: 500,
                  }}
                >
                  Delete
                </Typography>
              }
            />
          </ListItemButton>
          <Divider />
          <ListItemButton disabled>
            <ListItemText
              disableTypography
              primary={
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    lineHeight: "1.25rem",
                    fontWeight: 500,
                  }}
                >
                  Update
                </Typography>
              }
            />
          </ListItemButton>
        </List>
      </Popover>
    </>
    
  )
}
