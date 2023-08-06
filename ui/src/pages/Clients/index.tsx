import { memo, useContext, useEffect } from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { StateContext } from "../../store/DataProvider";
import Page from "../../components/Page";
import ClientTable from "./ClientTable";
import { getClients } from "../../services/api";
import CreateNewClientDialog from "../../components/CreateNewClientDialog";
import { SearchInput } from "../../components/SearchInput";

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
      <Stack
        direction={{ xs: "column", md: "row"}}
        mt={4}
        justifyContent="space-between"
        gap={2}
      >
        <SearchInput />
        <CreateNewClientDialog />
      </Stack>
      <Paper
        sx={{
          margin: "auto",
          marginTop: 3,
          boxShadow: 0,
        }}
      >
        <ClientTable clients={clients} />
      </Paper>
    </Page>
  );
}

export default memo(Clients);
