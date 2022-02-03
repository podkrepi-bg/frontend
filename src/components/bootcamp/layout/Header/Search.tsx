import * as React from "react";
import { useRouter } from "next/router";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { ListItem, Button, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { context } from "../context";

export default function SearchMenu() {
  const theme = useTheme();
  const store = React.useContext(context);
  const router = useRouter();
  const [open, setOpen] = React.useState(store.isSearchOpen);

  const handleClick = () => {
    store.changeIsSearchOpen(!open);
    setOpen(!open);
  };

  return (
    <>
      <List>
        <ListItem>
          <IconButton onClick={handleClick} style={{ color: "black" }}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
          <Button
            onClick={handleClick}
            style={{ color: "black" }}
            sx={{ ":hover": { color: theme.palette.primary.main } }}
          >
            Search
          </Button>
        </ListItem>
        <ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem>
                <Button
                  sx={{
                    pl: 4,
                    ":hover": { color: theme.palette.primary.main },
                  }}
                  onClick={() => router.push("/bootcamp/search/name")}
                >
                  <Typography textAlign="center">Search by name</Typography>
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  sx={{
                    pl: 4,
                    ":hover": { color: theme.palette.primary.main },
                  }}
                  onClick={() => router.push("/bootcamp/search/email")}
                >
                  <Typography textAlign="center">Search by email</Typography>
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  sx={{
                    pl: 4,
                    ":hover": { color: theme.palette.primary.main },
                  }}
                  onClick={() => router.push("/bootcamp/search/phone")}
                >
                  <Typography textAlign="center">Search by phone</Typography>
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  sx={{
                    pl: 4,
                    ":hover": { color: theme.palette.primary.main },
                  }}
                  onClick={() => router.push("/bootcamp/search/adress")}
                >
                  <Typography textAlign="center">Search by adress</Typography>
                </Button>
              </ListItem>
            </List>
          </Collapse>
        </ListItem>
      </List>
    </>
  );
}
