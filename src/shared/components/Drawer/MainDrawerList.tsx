import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AccountIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

import React from "react";
import Access from "../../../models/Access";
import RouterLink from "../RouterLink";
import paths from "../../path";



interface NavListItem {
  label: string,
  href: string,
  icon: React.ReactNode
}


const navListItems: NavListItem[] = [
  {
    label: "Panel Główny",
    href: paths.HOME,
    icon: <HomeIcon color="primary" />
  }, {
    label: "Moje Konto",
    href: paths.MY_PROFILE,
    icon: <AccountIcon color="primary" />
  }
]

const settingsItem: NavListItem = {
  label: 'Ustawienia Platformy',
  href: paths.SETTINGS,
  icon: <SettingsIcon color="primary" />
};


export default function MainDrawerList(props: { access?: Access }) {

  const result = React.useMemo(() => {
    if (
      props.access?.owner
      && navListItems.filter(({ href }) => href === settingsItem.href).length === 0
    ) {
      navListItems.push(settingsItem);
    }
    return navListItems;
  }, [props])


  return (
    <List>
      {
        result.map(({ label, href, icon }, key) => (
          <ListItem button key={key} component="li">
            <ListItemIcon >
              {icon}
            </ListItemIcon>
            <ListItemText primary={
              <RouterLink to={href}>{label}</RouterLink>
            } />
          </ListItem>
        ))
      }
    </List>
  );
}