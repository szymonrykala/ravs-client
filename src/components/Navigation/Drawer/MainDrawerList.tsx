import { Link, List, ListItem, ListItemIcon, ListItemText, SvgIconTypeMap } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AccountIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PeopleIcon from '@mui/icons-material/People';

import React from "react";
import paths from "../../../shared/path";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import useResolvedAccess from "../../pages/protected/hooks/useResolvedAccess";



interface NavListItem {
  label: string,
  href: string,
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
}


const navListItems: NavListItem[] = [
  {
    label: "Panel Główny",
    href: paths.HOME,
    icon: HomeIcon
  }, {
    label: "Moje Konto",
    href: paths.MY_PROFILE,
    icon: AccountIcon
  }
];


const settingsItem: NavListItem = {
  label: 'Ustawienia Platformy',
  href: paths.SETTINGS,
  icon: SettingsIcon
};


const accessLinkItem: NavListItem = {
  label: 'Klasy dostępu',
  href: paths.ACCESS,
  icon: VerifiedUserIcon
};


const usersLinkItem: NavListItem = {
  label: 'Użytkownicy',
  href: paths.USERS,
  icon: PeopleIcon
};


const MainListItem = React.memo((props: NavListItem) =>
  <ListItem button component={Link} href={props.href}>
    <ListItemIcon color="primary">
      {<props.icon color='primary' />}
    </ListItemIcon>
    <ListItemText primary={props.label} />
  </ListItem >
);


export default function MainDrawerList() {
  const { accessAdmin, owner } = useResolvedAccess();

  const result = React.useMemo(() => {
    let list = Object.assign([], navListItems) as NavListItem[];

    list.push(usersLinkItem);
    accessAdmin && list.push(accessLinkItem);
    owner && list.push(settingsItem);

    return list;
  }, [
    accessAdmin,
    owner
  ]);


  const renderedList = React.useMemo(() =>
    result.map((item) => <MainListItem key={item.label} {...item} />)
    , [result]);


  return (
    <List>
      {renderedList}
    </List>
  );
}