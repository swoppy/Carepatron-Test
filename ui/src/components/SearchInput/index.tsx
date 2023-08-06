import { useContext } from "react";
import { StateContext } from "../../store/DataProvider";
import { Box, TextField, debounce } from "@mui/material";
import { getClients, getClientsByName } from "../../services/api";
import SearchIcon from '@mui/icons-material/Search';

export function SearchInput() {
  const { dispatch } = useContext(StateContext);

  const onChangeHandler = debounce((data: string) => {
    if (data) {
      getClientsByName(data).then((clients) =>
        dispatch({ type: 'SEARCH_CLIENT', data: clients})
      );
    } else {
      getClients().then((clients) =>
      dispatch({ type: "FETCH_ALL_CLIENTS", data: clients })
    );
    }
  }, 700)

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: '0.375rem',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <TextField
        placeholder="Search clients..."
        onChange={(e) => onChangeHandler(e.currentTarget.value)}
        size="small"
        sx={{
          fontSize: "0.75rem",
          lineHeight: "1.25rem",
          width: '14rem',
          "& fieldset": { border: 'none' },
          flexGrow: 1,
        }}
      />
      <SearchIcon
        style={{
          color: "A1A4A5",
          paddingRight: '1rem'
        }}
      />
    </Box>
  )
}