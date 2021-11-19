import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AccountIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PeopleIcon from '@mui/icons-material/People';

import React from "react";
import Access from "../../../../models/Access";
import paths from "../../../path";
import AppLink from "../../AppLink";



interface NavListItem {
  label: string,
  href: string,
  icon: React.ReactNode
}


const navListItems: NavListItem[] = [
  {
    label: "Panel Główny",
    href: paths.HOME,
    icon: <HomeIcon />
  }, {
    label: "Moje Konto",
    href: paths.MY_PROFILE,
    icon: <AccountIcon />
  }
];


const settingsItem: NavListItem = {
  label: 'Ustawienia Platformy',
  href: paths.SETTINGS,
  icon: <SettingsIcon />
};


const accessLinkItem: NavListItem = {
  label: 'Klasy dostępu',
  href: paths.ACCESS,
  icon: <VerifiedUserIcon />
};


const usersLinkItem: NavListItem = {
  label: 'Użytkownicy',
  href: paths.USERS,
  icon: <PeopleIcon />
};


export default function MainDrawerList(props: { access?: Access }) {

  const result = React.useMemo(() => {
    let list = Object.assign([], navListItems);

    list.push(usersLinkItem);
    list.push(accessLinkItem);
    list.push(settingsItem);

    return list;
  }, [props.access]);


  return (
    <List>
      {
        result.map(({ label, href, icon }, key) => (
          <ListItem button key={key} component="li">
            <ListItemIcon >
              {icon}
            </ListItemIcon>
            <ListItemText primary={
              <AppLink to={href}>{label}</AppLink>
            } />
          </ListItem>
        ))
      }
    </List>
  );
}