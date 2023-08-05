import { memo, useContext, useEffect } from "react";
import { Box, Input, Paper, Typography, debounce } from "@mui/material";
import { StateContext } from "../../store/DataProvider";
import Page from "../../components/Page";
import ClientTable from "./ClientTable";
import { getClients, getClientsByName } from "../../services/api";
import CreateNewClientButton from "../../components/Dialog";

function Clients() {
  const { state, dispatch } = useContext(StateContext);
  const { clients } = state;

  useEffect(() => {
    getClients().then((clients) =>
      dispatch({ type: "FETCH_ALL_CLIENTS", data: clients })
    );
  }, [dispatch]);

  return (
    <Page>
      <Typography
        variant="h4"
        sx={{
          fontSize: "1.75rem",
          fontWeight: 600,
          textAlign: "start"
        }}
      >
        Clients
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <SearchInput />
        <CreateNewClientButton />
      </Box>
      <Paper sx={{ margin: "auto", marginTop: 3 }}>
        <ClientTable clients={clients} />
      </Paper>
    </Page>
  );
}

function SearchInput() {
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
    <div>
      <Input
        placeholder="Search clients..."
        onChange={(e) => onChangeHandler(e.currentTarget.value)}
      />
    </div>
  )
}

export default memo(Clients);
